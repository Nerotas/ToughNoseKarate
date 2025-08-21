import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException, ConflictException } from '@nestjs/common';
import { AuthService, LoginDto, JwtPayload } from './auth.service';
import {
  InstructorsService,
  CreateInstructorDto,
} from '../service/instructors.service';
import { Instructors } from '../models/instructors';

describe('AuthService', () => {
  let service: AuthService;
  let instructorsService: jest.Mocked<InstructorsService>;
  let jwtService: jest.Mocked<JwtService>;

  const mockInstructorsService = {
    findByEmail: jest.fn(),
    findById: jest.fn(),
    findByIdSafe: jest.fn(),
    validatePassword: jest.fn(),
    updateLastLogin: jest.fn(),
    create: jest.fn(),
    changePassword: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  const mockInstructor = {
    instructor_id: 1,
    email: 'test@example.com',
    password_hash: 'hashedPassword',
    first_name: 'Test',
    last_name: 'User',
    role: 'instructor' as const,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
    last_login: new Date(),
    getDataValue: jest.fn(),
    update: jest.fn(),
    save: jest.fn(),
    toSafeObject: jest.fn().mockReturnValue({
      instructor_id: 1,
      email: 'test@example.com',
      first_name: 'Test',
      last_name: 'User',
      role: 'instructor',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      last_login: new Date(),
    }),
    fullName: 'Test User',
    isAdmin: jest.fn().mockReturnValue(false),
  } as unknown as Instructors;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: InstructorsService,
          useValue: mockInstructorsService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    instructorsService = module.get(InstructorsService);
    jwtService = module.get(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateInstructor', () => {
    it('should validate instructor successfully', async () => {
      const email = 'test@example.com';
      const password = 'password123';

      (mockInstructor.getDataValue as jest.Mock)
        .mockReturnValueOnce(true) // is_active
        .mockReturnValueOnce(1); // instructor_id

      instructorsService.findByEmail.mockResolvedValue(mockInstructor);
      instructorsService.validatePassword.mockResolvedValue(true);
      instructorsService.updateLastLogin.mockResolvedValue(undefined);

      const result = await service.validateInstructor(email, password);

      expect(instructorsService.findByEmail).toHaveBeenCalledWith(email);
      expect(instructorsService.validatePassword).toHaveBeenCalledWith(
        mockInstructor,
        password,
      );
      expect(instructorsService.updateLastLogin).toHaveBeenCalledWith(1);
      expect(result).toBe(mockInstructor);
    });

    it('should return null when instructor not found', async () => {
      const email = 'nonexistent@example.com';
      const password = 'password123';

      instructorsService.findByEmail.mockResolvedValue(null);

      const result = await service.validateInstructor(email, password);

      expect(result).toBeNull();
      expect(instructorsService.validatePassword).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException when account is deactivated', async () => {
      const email = 'test@example.com';
      const password = 'password123';

      (mockInstructor.getDataValue as jest.Mock).mockReturnValueOnce(false); // is_active = false

      instructorsService.findByEmail.mockResolvedValue(mockInstructor);

      await expect(service.validateInstructor(email, password)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(instructorsService.validatePassword).not.toHaveBeenCalled();
    });

    it('should return null when password is invalid', async () => {
      const email = 'test@example.com';
      const password = 'wrongpassword';

      (mockInstructor.getDataValue as jest.Mock).mockReturnValueOnce(true); // is_active

      instructorsService.findByEmail.mockResolvedValue(mockInstructor);
      instructorsService.validatePassword.mockResolvedValue(false);

      const result = await service.validateInstructor(email, password);

      expect(result).toBeNull();
      expect(instructorsService.updateLastLogin).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should generate tokens and return instructor data', async () => {
      const mockTokens = {
        access_token: 'access-token',
        refresh_token: 'refresh-token',
      };

      (mockInstructor.getDataValue as jest.Mock)
        .mockReturnValueOnce('test@example.com') // email
        .mockReturnValueOnce(1) // instructor_id
        .mockReturnValueOnce('admin') // role
        .mockReturnValueOnce(1) // instructor_id (second call)
        .mockReturnValueOnce('test@example.com') // email (second call)
        .mockReturnValueOnce('John') // first_name
        .mockReturnValueOnce('Doe') // last_name
        .mockReturnValueOnce('admin'); // role (second call)

      jwtService.sign
        .mockReturnValueOnce(mockTokens.access_token)
        .mockReturnValueOnce(mockTokens.refresh_token);

      const result = await service.login(mockInstructor);

      expect(jwtService.sign).toHaveBeenCalledWith(
        {
          email: 'test@example.com',
          sub: 1,
          role: 'admin',
        },
        { expiresIn: '15m' },
      );
      expect(jwtService.sign).toHaveBeenCalledWith(
        {
          email: 'test@example.com',
          sub: 1,
          role: 'admin',
        },
        { expiresIn: '7d' },
      );
      expect(result).toEqual({
        access_token: 'access-token',
        refresh_token: 'refresh-token',
        instructor: {
          id: 1,
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
          role: 'admin',
        },
      });
    });
  });

  describe('loginWithCredentials', () => {
    it('should login successfully with valid credentials', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockLoginResult = {
        access_token: 'access-token',
        refresh_token: 'refresh-token',
        instructor: {
          id: 1,
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
          role: 'admin',
        },
      };

      jest
        .spyOn(service, 'validateInstructor')
        .mockResolvedValue(mockInstructor);
      jest.spyOn(service, 'login').mockResolvedValue(mockLoginResult);

      const result = await service.loginWithCredentials(loginDto);

      expect(service.validateInstructor).toHaveBeenCalledWith(
        loginDto.email,
        loginDto.password,
      );
      expect(service.login).toHaveBeenCalledWith(mockInstructor);
      expect(result).toEqual(mockLoginResult);
    });

    it('should throw UnauthorizedException with invalid credentials', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      jest.spyOn(service, 'validateInstructor').mockResolvedValue(null);

      await expect(service.loginWithCredentials(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('register', () => {
    it('should create instructor successfully', async () => {
      const createInstructorDto: CreateInstructorDto = {
        email: 'new@example.com',
        first_name: 'Jane',
        last_name: 'Smith',
        password: 'password123',
        role: 'instructor',
      };

      instructorsService.create.mockResolvedValue(mockInstructor);

      const result = await service.register(createInstructorDto);

      expect(instructorsService.create).toHaveBeenCalledWith(
        createInstructorDto,
      );
      expect(result).toBe(mockInstructor);
    });

    it('should handle ConflictException', async () => {
      const createInstructorDto: CreateInstructorDto = {
        email: 'existing@example.com',
        first_name: 'Jane',
        last_name: 'Smith',
        password: 'password123',
        role: 'instructor',
      };

      instructorsService.create.mockRejectedValue(
        new ConflictException('Email already exists'),
      );

      await expect(service.register(createInstructorDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should handle other errors', async () => {
      const createInstructorDto: CreateInstructorDto = {
        email: 'new@example.com',
        first_name: 'Jane',
        last_name: 'Smith',
        password: 'password123',
        role: 'instructor',
      };

      instructorsService.create.mockRejectedValue(new Error('Database error'));

      await expect(service.register(createInstructorDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('changePassword', () => {
    it('should change password successfully', async () => {
      const instructorId = 1;
      const currentPassword = 'oldpassword';
      const newPassword = 'newpassword';

      instructorsService.findById.mockResolvedValue(mockInstructor);
      instructorsService.validatePassword.mockResolvedValue(true);
      instructorsService.changePassword.mockResolvedValue(undefined);

      await service.changePassword(instructorId, currentPassword, newPassword);

      expect(instructorsService.findById).toHaveBeenCalledWith(instructorId);
      expect(instructorsService.validatePassword).toHaveBeenCalledWith(
        mockInstructor,
        currentPassword,
      );
      expect(instructorsService.changePassword).toHaveBeenCalledWith(
        instructorId,
        newPassword,
      );
    });

    it('should throw UnauthorizedException when instructor not found', async () => {
      const instructorId = 999;
      const currentPassword = 'oldpassword';
      const newPassword = 'newpassword';

      instructorsService.findById.mockResolvedValue(null);

      await expect(
        service.changePassword(instructorId, currentPassword, newPassword),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when current password is invalid', async () => {
      const instructorId = 1;
      const currentPassword = 'wrongpassword';
      const newPassword = 'newpassword';

      instructorsService.findById.mockResolvedValue(mockInstructor);
      instructorsService.validatePassword.mockResolvedValue(false);

      await expect(
        service.changePassword(instructorId, currentPassword, newPassword),
      ).rejects.toThrow(UnauthorizedException);
      expect(instructorsService.changePassword).not.toHaveBeenCalled();
    });
  });

  describe('getProfile', () => {
    it('should return instructor profile', async () => {
      const instructorId = 1;
      const mockProfile = {
        instructor_id: 1,
        email: 'test@example.com',
        password_hash: 'hashedPassword',
        first_name: 'John',
        last_name: 'Doe',
        role: 'admin',
        is_active: true,
        last_login: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        getDataValue: jest.fn(),
        update: jest.fn(),
        save: jest.fn(),
        toSafeObject: jest.fn(),
        fullName: 'John Doe',
        isAdmin: jest.fn(),
      } as unknown as Instructors;

      instructorsService.findByIdSafe.mockResolvedValue(mockProfile);

      const result = await service.getProfile(instructorId);

      expect(instructorsService.findByIdSafe).toHaveBeenCalledWith(
        instructorId,
      );
      expect(result).toEqual({
        id: 1,
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'admin',
        isActive: true,
        lastLogin: mockProfile.last_login,
        createdAt: mockProfile.created_at,
      });
    });

    it('should throw UnauthorizedException when instructor not found', async () => {
      const instructorId = 999;

      instructorsService.findByIdSafe.mockResolvedValue(null);

      await expect(service.getProfile(instructorId)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('refreshToken', () => {
    it('should generate new access token', async () => {
      const instructorId = 1;
      const mockAccessToken = 'new-access-token';

      (mockInstructor.getDataValue as jest.Mock)
        .mockReturnValueOnce(true) // is_active
        .mockReturnValueOnce('test@example.com') // email
        .mockReturnValueOnce(1) // instructor_id
        .mockReturnValueOnce('admin'); // role

      instructorsService.findById.mockResolvedValue(mockInstructor);
      jwtService.sign.mockReturnValue(mockAccessToken);

      const result = await service.refreshToken(instructorId);

      expect(instructorsService.findById).toHaveBeenCalledWith(instructorId);
      expect(jwtService.sign).toHaveBeenCalledWith(
        {
          email: 'test@example.com',
          sub: 1,
          role: 'admin',
        },
        { expiresIn: '15m' },
      );
      expect(result).toEqual({ access_token: mockAccessToken });
    });

    it('should throw UnauthorizedException when instructor not found', async () => {
      const instructorId = 999;

      instructorsService.findById.mockResolvedValue(null);

      await expect(service.refreshToken(instructorId)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException when account is deactivated', async () => {
      const instructorId = 1;

      (mockInstructor.getDataValue as jest.Mock).mockReturnValueOnce(false); // is_active = false

      instructorsService.findById.mockResolvedValue(mockInstructor);

      await expect(service.refreshToken(instructorId)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('issueAccessToken', () => {
    it('should issue access token', async () => {
      const user = {
        email: 'test@example.com',
        instructorId: 1,
        role: 'admin',
      };
      const mockAccessToken = 'access-token';

      jwtService.sign.mockReturnValue(mockAccessToken);

      const result = await service.issueAccessToken(user);

      expect(jwtService.sign).toHaveBeenCalledWith(
        {
          email: 'test@example.com',
          sub: 1,
          role: 'admin',
        },
        { expiresIn: '15m' },
      );
      expect(result).toBe(mockAccessToken);
    });
  });

  describe('validate', () => {
    it('should validate JWT payload', async () => {
      const payload: JwtPayload = {
        email: 'test@example.com',
        sub: 1,
        role: 'admin',
      };

      const result = await service.validate(payload);

      expect(result).toEqual({
        instructorId: 1,
        email: 'test@example.com',
        role: 'admin',
      });
    });
  });
});
