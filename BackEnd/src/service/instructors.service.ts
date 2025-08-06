import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  Instructors,
  InstructorCreationAttributes,
} from '../models/instructors';
import * as bcrypt from 'bcrypt';

export interface CreateInstructorDto {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role?: 'instructor' | 'admin';
}

export interface UpdateInstructorDto {
  email?: string;
  first_name?: string;
  last_name?: string;
  role?: 'instructor' | 'admin';
  is_active?: boolean;
}

@Injectable()
export class InstructorsService {
  constructor(
    @InjectModel(Instructors)
    private instructorModel: typeof Instructors,
  ) {}

  async create(createInstructorDto: CreateInstructorDto): Promise<Instructors> {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(
        createInstructorDto.password,
        10,
      );

      const instructorData: InstructorCreationAttributes = {
        email: createInstructorDto.email,
        password_hash: hashedPassword,
        first_name: createInstructorDto.first_name,
        last_name: createInstructorDto.last_name,
        role: createInstructorDto.role || 'instructor',
        is_active: true,
      };

      const instructor = await this.instructorModel.create(instructorData);
      return instructor;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<Instructors[]> {
    return this.instructorModel.findAll({
      attributes: { exclude: ['password_hash'] }, // Never return password hashes
    });
  }

  async findById(id: number): Promise<Instructors | null> {
    return this.instructorModel.findByPk(id);
  }

  async findByEmail(email: string): Promise<Instructors | null> {
    return this.instructorModel.findOne({
      where: { email },
    });
  }

  async findByIdSafe(id: number): Promise<Instructors | null> {
    return this.instructorModel.findByPk(id, {
      attributes: { exclude: ['password_hash'] }, // Safe version without password
    });
  }

  async update(
    id: number,
    updateInstructorDto: UpdateInstructorDto,
  ): Promise<Instructors> {
    const instructor = await this.findById(id);
    if (!instructor) {
      throw new NotFoundException(`Instructor with ID ${id} not found`);
    }

    try {
      await instructor.update(updateInstructorDto);
      return instructor;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async updateLastLogin(id: number): Promise<void> {
    await this.instructorModel.update(
      { last_login: new Date() },
      { where: { instructor_id: id } },
    );
  }

  async changePassword(id: number, newPassword: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.instructorModel.update(
      { password_hash: hashedPassword },
      { where: { instructor_id: id } },
    );
  }

  async deactivate(id: number): Promise<void> {
    const instructor = await this.findById(id);
    if (!instructor) {
      throw new NotFoundException(`Instructor with ID ${id} not found`);
    }

    await instructor.update({ is_active: false });
  }

  async activate(id: number): Promise<void> {
    const instructor = await this.findById(id);
    if (!instructor) {
      throw new NotFoundException(`Instructor with ID ${id} not found`);
    }

    await instructor.update({ is_active: true });
  }

  async remove(id: number): Promise<void> {
    const instructor = await this.findById(id);
    if (!instructor) {
      throw new NotFoundException(`Instructor with ID ${id} not found`);
    }

    await instructor.destroy();
  }

  async validatePassword(
    instructor: Instructors,
    password: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, instructor.getDataValue('password_hash'));
  }

  async count(): Promise<number> {
    return this.instructorModel.count();
  }

  async findActiveInstructors(): Promise<Instructors[]> {
    return this.instructorModel.findAll({
      where: { is_active: true },
      attributes: { exclude: ['password_hash'] },
    });
  }
}
