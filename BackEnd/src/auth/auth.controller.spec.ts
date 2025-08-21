import { Test, TestingModule } from '@nestjs/testing';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Response, Request } from 'express';
import { AuthController } from './auth.controller';
import { AuthService, LoginDto } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RefreshJwtAuthGuard } from './refresh-jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { CreateInstructorDto } from '../service/instructors.service';
import { InstructorPayload } from './jwt.strategy';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  const mockAuthService = {
    loginWithCredentials: jest.fn(),
    register: jest.fn(),
    getProfile: jest.fn(),
    refreshToken: jest.fn(),
    issueAccessToken: jest.fn(),
    changePassword: jest.fn(),
  };

  const mockResponse = {
    cookie: jest.fn(),
    clearCookie: jest.fn(),
    json: jest.fn(),
  } as unknown as Response;

  const mockInstructorPayload: InstructorPayload = {
    instructorId: 1,
    email: 'test@example.com',
    role: 'admin',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    })
      .overrideGuard(ThrottlerGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RefreshJwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should login successfully and set cookies', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockLoginResponse = {
        access_token: 'access-token',
        refresh_token: 'refresh-token',
        instructor: {
          id: 1,
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
          role: 'admin' as const,
        },
      };

      authService.loginWithCredentials.mockResolvedValue(mockLoginResponse);

      const result = await controller.login(loginDto, mockResponse);

      expect(authService.loginWithCredentials).toHaveBeenCalledWith(loginDto);
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'accessToken',
        'access-token',
        expect.objectContaining({
          httpOnly: true,
          maxAge: 15 * 60 * 1000, // 15 minutes
        }),
      );
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'refreshToken',
        'refresh-token',
        expect.objectContaining({
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        }),
      );
      expect(result).toEqual({
        success: true,
        instructor: mockLoginResponse.instructor,
      });
    });

    it('should handle login failure', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      authService.loginWithCredentials.mockRejectedValue(
        new Error('Invalid credentials'),
      );

      await expect(controller.login(loginDto, mockResponse)).rejects.toThrow(
        'Invalid credentials',
      );
      expect(mockResponse.cookie).not.toHaveBeenCalled();
    });
  });

  describe('register', () => {
    it('should register instructor successfully', async () => {
      const createInstructorDto: CreateInstructorDto = {
        email: 'new@example.com',
        first_name: 'Jane',
        last_name: 'Smith',
        password: 'password123',
        role: 'instructor',
      };

      const mockCreatedInstructor = {
        instructor_id: 2,
        email: 'new@example.com',
        first_name: 'Jane',
        last_name: 'Smith',
        role: 'instructor' as const,
        is_active: true,
        created_at: new Date(),
      } as any;

      authService.register.mockResolvedValue(mockCreatedInstructor);

      const result = await controller.register(
        createInstructorDto,
        mockInstructorPayload,
      );

      expect(authService.register).toHaveBeenCalledWith(createInstructorDto);
      expect(result).toEqual({
        id: 2,
        email: 'new@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'instructor',
        isActive: true,
        createdAt: mockCreatedInstructor.created_at,
      });
    });

    it('should handle duplicate email', async () => {
      const createInstructorDto: CreateInstructorDto = {
        email: 'existing@example.com',
        first_name: 'Jane',
        last_name: 'Smith',
        password: 'password123',
        role: 'instructor',
      };

      authService.register.mockRejectedValue(new Error('Email already exists'));

      await expect(
        controller.register(createInstructorDto, mockInstructorPayload),
      ).rejects.toThrow('Email already exists');
    });
  });

  describe('refresh', () => {
    it('should refresh tokens successfully', async () => {
      const mockAccessToken = 'new-access-token';
      const mockRefreshToken = 'new-refresh-token';

      authService.issueAccessToken.mockResolvedValue(mockAccessToken);
      authService.refreshToken.mockResolvedValue({
        access_token: mockRefreshToken,
      });

      const result = await controller.refresh(
        mockInstructorPayload,
        mockResponse,
      );

      expect(authService.issueAccessToken).toHaveBeenCalledWith(
        mockInstructorPayload,
      );
      expect(authService.refreshToken).toHaveBeenCalledWith(
        mockInstructorPayload,
      );
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'accessToken',
        mockAccessToken,
        expect.objectContaining({
          httpOnly: true,
          maxAge: 15 * 60 * 1000,
        }),
      );
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'refreshToken',
        { access_token: mockRefreshToken },
        expect.objectContaining({
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        }),
      );
      expect(result).toEqual({ success: true });
    });

    it('should handle refresh token failure', async () => {
      authService.issueAccessToken.mockRejectedValue(
        new Error('Invalid token'),
      );

      await expect(
        controller.refresh(mockInstructorPayload, mockResponse),
      ).rejects.toThrow('Invalid token');
    });
  });

  describe('profile', () => {
    it('should return instructor profile', async () => {
      const mockProfile = {
        id: 1,
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'admin' as const,
        isActive: true,
        lastLogin: new Date(),
        createdAt: new Date(),
      };

      authService.getProfile.mockResolvedValue(mockProfile);

      const result = await controller.profile(mockInstructorPayload);

      expect(authService.getProfile).toHaveBeenCalledWith(
        mockInstructorPayload.instructorId,
      );
      expect(result).toEqual(mockProfile);
    });

    it('should handle profile not found', async () => {
      authService.getProfile.mockRejectedValue(new Error('Profile not found'));

      await expect(controller.profile(mockInstructorPayload)).rejects.toThrow(
        'Profile not found',
      );
    });

    it('should handle missing user in payload', async () => {
      await expect(controller.profile(null)).rejects.toThrow(
        'No user found in JWT payload',
      );
    });

    it('should handle missing instructorId in payload', async () => {
      const invalidPayload = {
        ...mockInstructorPayload,
        instructorId: undefined,
      };
      await expect(controller.profile(invalidPayload)).rejects.toThrow(
        'No user found in JWT payload',
      );
    });
  });

  describe('logout', () => {
    it('should logout successfully', async () => {
      const result = await controller.logout(mockResponse);

      expect(mockResponse.clearCookie).toHaveBeenCalledWith(
        'accessToken',
        expect.objectContaining({
          httpOnly: true,
        }),
      );
      expect(mockResponse.clearCookie).toHaveBeenCalledWith(
        'refreshToken',
        expect.objectContaining({
          httpOnly: true,
        }),
      );
      expect(result).toEqual({
        success: true,
        message: 'Logout successful.',
      });
    });
  });

  describe('changePassword', () => {
    it('should change password successfully', async () => {
      const changePasswordDto = {
        currentPassword: 'oldpassword',
        newPassword: 'newpassword',
      };

      authService.changePassword.mockResolvedValue(undefined);

      const result = await controller.changePassword(
        changePasswordDto,
        mockInstructorPayload,
      );

      expect(authService.changePassword).toHaveBeenCalledWith(
        mockInstructorPayload.instructorId,
        changePasswordDto.currentPassword,
        changePasswordDto.newPassword,
      );
      expect(result).toEqual({ message: 'Password changed successfully' });
    });

    it('should handle incorrect current password', async () => {
      const changePasswordDto = {
        currentPassword: 'wrongpassword',
        newPassword: 'newpassword',
      };

      authService.changePassword.mockRejectedValue(
        new Error('Current password is incorrect'),
      );

      await expect(
        controller.changePassword(changePasswordDto, mockInstructorPayload),
      ).rejects.toThrow('Current password is incorrect');
    });
  });
});
