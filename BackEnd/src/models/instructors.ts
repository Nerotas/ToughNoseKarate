import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  Unique,
  CreatedAt,
  UpdatedAt,
  DataType,
} from 'sequelize-typescript';

export interface InstructorAttributes {
  instructor_id?: number;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  role?: 'instructor' | 'admin';
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
  last_login?: Date;
}

export type InstructorCreationAttributes = Omit<
  InstructorAttributes,
  'instructor_id' | 'created_at' | 'updated_at'
>;

@Table({
  tableName: 'instructors',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Instructors extends Model<
  InstructorAttributes,
  InstructorCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    field: 'instructor_id',
  })
  instructor_id!: number;

  @Unique
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  password_hash!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  first_name!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  last_name!: string;

  @Column({
    type: DataType.ENUM('instructor', 'admin'),
    defaultValue: 'instructor',
    allowNull: false,
  })
  role!: 'instructor' | 'admin';

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  })
  is_active!: boolean;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    field: 'created_at',
  })
  created_at!: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    field: 'updated_at',
  })
  updated_at!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  last_login?: Date;

  // Virtual properties for easier access
  get fullName(): string {
    return `${this.first_name} ${this.last_name}`;
  }

  // Method to check if instructor is admin
  isAdmin(): boolean {
    return this.role === 'admin';
  }

  // Method to safely return instructor data (without password)
  toSafeObject() {
    const { password_hash, ...safeData } = this.toJSON();
    return safeData;
  }
}

export default Instructors;
