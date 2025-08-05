# JWT Authentication & Authorization Roadmap

**Goal: Restrict student information to logged-in instructors only**

## 🎯 **OVERVIEW**

Implement a complete JWT-based authentication system that:

- Authenticates instructors with username/password
- Issues JWT tokens for valid sessions
- Protects student endpoints with JWT validation
- Provides role-based access control (instructor vs admin)
- Integrates seamlessly with existing frontend

---

## 📋 **PHASE 1: Database & Models Setup**

### **1.1 Create Instructors Table & Model**

```sql
-- Database migration
CREATE TABLE instructors (
  instructor_id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role ENUM('instructor', 'admin') DEFAULT 'instructor',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL
);

-- Insert default admin
INSERT INTO instructors (email, password_hash, first_name, last_name, role)
VALUES ('admin@toughnosekarate.com', '$hashed_password', 'Admin', 'User', 'admin');
```

### **1.2 Sequelize Model**

```typescript
// src/models/instructors.ts
@Table({ tableName: "instructors" })
export class Instructors extends Model<Instructors> {
  @PrimaryKey
  @AutoIncrement
  @Column
  instructor_id: number;

  @Unique
  @Column
  email: string;

  @Column
  password_hash: string;

  @Column
  first_name: string;

  @Column
  last_name: string;

  @Column({
    type: DataType.ENUM("instructor", "admin"),
    defaultValue: "instructor",
  })
  role: "instructor" | "admin";

  @Column({ defaultValue: true })
  is_active: boolean;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @Column
  last_login: Date;
}
```

---

## 📋 **PHASE 2: Authentication Infrastructure**

### **2.1 JWT Module Configuration**

```typescript
// Add to app.module.ts
JwtModule.registerAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    secret: configService.get<string>("JWT_SECRET"),
    signOptions: {
      expiresIn: configService.get<string>("JWT_EXPIRATION", "1d"),
    },
  }),
  inject: [ConfigService],
});
```

### **2.2 JWT Strategy**

```typescript
// src/auth/jwt.strategy.ts
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private instructorsService: InstructorsService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET"),
    });
  }

  async validate(payload: any): Promise<InstructorPayload> {
    const instructor = await this.instructorsService.findById(payload.sub);
    if (!instructor || !instructor.is_active) {
      throw new UnauthorizedException("Invalid token");
    }
    return {
      instructorId: instructor.instructor_id,
      email: instructor.email,
      role: instructor.role,
    };
  }
}
```

### **2.3 Authentication Guards**

```typescript
// src/auth/jwt-auth.guard.ts
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException("Access denied");
    }
    return user;
  }
}

// src/auth/roles.guard.ts (update existing)
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user.role);
  }
}
```

---

## 📋 **PHASE 3: Authentication Service & Controller**

### **3.1 Authentication Service**

```typescript
// src/auth/auth.service.ts
@Injectable()
export class AuthService {
  constructor(
    private instructorsService: InstructorsService,
    private jwtService: JwtService
  ) {}

  async validateInstructor(email: string, password: string): Promise<any> {
    const instructor = await this.instructorsService.findByEmail(email);
    if (
      instructor &&
      (await bcrypt.compare(password, instructor.password_hash))
    ) {
      await this.instructorsService.updateLastLogin(instructor.instructor_id);
      const { password_hash, ...result } = instructor;
      return result;
    }
    return null;
  }

  async login(instructor: any) {
    const payload = {
      email: instructor.email,
      sub: instructor.instructor_id,
      role: instructor.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      instructor: {
        id: instructor.instructor_id,
        email: instructor.email,
        firstName: instructor.first_name,
        lastName: instructor.last_name,
        role: instructor.role,
      },
    };
  }

  async register(createInstructorDto: CreateInstructorDto) {
    const hashedPassword = await bcrypt.hash(createInstructorDto.password, 10);
    return this.instructorsService.create({
      ...createInstructorDto,
      password_hash: hashedPassword,
    });
  }
}
```

### **3.2 Authentication Controller**

```typescript
// src/auth/auth.controller.ts
@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @ApiOperation({ summary: "Login instructor" })
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    const instructor = await this.authService.validateInstructor(
      loginDto.email,
      loginDto.password
    );
    if (!instructor) {
      throw new UnauthorizedException("Invalid credentials");
    }
    return this.authService.login(instructor);
  }

  @Post("register")
  @ApiOperation({ summary: "Register new instructor (admin only)" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  async register(@Body() createInstructorDto: CreateInstructorDto) {
    return this.authService.register(createInstructorDto);
  }

  @Get("profile")
  @ApiOperation({ summary: "Get current instructor profile" })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT")
  async getProfile(@User() user: InstructorPayload) {
    return user;
  }
}
```

---

## 📋 **PHASE 4: Protect Student Endpoints**

### **4.1 Update Students Controller**

```typescript
// src/controller/students.controller.ts
@ApiTags("Students")
@Controller("students")
@UseGuards(JwtAuthGuard) // Apply to entire controller
@ApiBearerAuth("JWT")
export class StudentsController {
  @Get()
  @ApiOperation({ summary: "Get all students (instructors only)" })
  @Roles("instructor", "admin")
  @UseGuards(RolesGuard)
  async findAll(
    @Query("limit") limit: number = 50,
    @Query("offset") offset: number = 0,
    @User() instructor: InstructorPayload
  ) {
    // Log access for audit
    console.log(`Instructor ${instructor.email} accessed students list`);
    return this.studentsService.findAll(limit, offset);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get student details (instructors only)" })
  @Roles("instructor", "admin")
  @UseGuards(RolesGuard)
  async findOne(
    @Param("id") id: string,
    @User() instructor: InstructorPayload
  ) {
    console.log(`Instructor ${instructor.email} accessed student ${id}`);
    return this.studentsService.findOne(+id);
  }

  // Apply to all CRUD operations...
}
```

### **4.2 Protect Related Endpoints**

```typescript
// Apply same pattern to:
// - StudentAssessmentsController
// - StudentProgressController
// - StudentTestsController
// - FamiliesController (for student family data)
```

---

## 📋 **PHASE 5: Frontend Integration**

### **5.1 Authentication Context**

```typescript
// src/contexts/AuthContext.tsx
interface AuthContextType {
  instructor: Instructor | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      // Validate token and get instructor profile
      validateAndSetInstructor(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.login(email, password);
    localStorage.setItem("accessToken", response.access_token);
    setInstructor(response.instructor);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setInstructor(null);
  };

  return (
    <AuthContext.Provider
      value={{
        instructor,
        isAuthenticated: !!instructor,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
```

### **5.2 Protected Route Wrapper**

```typescript
// src/components/ProtectedRoute.tsx
const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
```

### **5.3 Login Page**

```typescript
// src/app/auth/login/page.tsx
const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (values: LoginForm) => {
    try {
      await login(values.email, values.password);
      router.push("/students");
    } catch (error) {
      // Handle login error
    }
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Instructor Login
          </Typography>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSubmit}
          >
            {/* Login form */}
          </Formik>
        </CardContent>
      </Card>
    </Container>
  );
};
```

### **5.4 API Service Updates**

```typescript
// src/services/apiService.ts
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add token to all requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);
```

---

## 📋 **PHASE 6: Security Enhancements**

### **6.1 Password Requirements**

```typescript
// Strong password validation
const passwordSchema = Joi.string()
  .min(8)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
  .message(
    "Password must contain uppercase, lowercase, number, and special character"
  );
```

### **6.2 Rate Limiting for Auth**

```typescript
// Separate throttler for auth endpoints
@UseGuards(ThrottlerGuard)
@Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 attempts per minute
@Post('login')
async login(@Body() loginDto: LoginDto) {
  // Login logic
}
```

### **6.3 JWT Refresh Tokens**

```typescript
// Optional: Implement refresh token rotation
interface TokenPair {
  access_token: string;
  refresh_token: string;
}
```

---

## 🎯 **IMPLEMENTATION TIMELINE**

### **Week 1: Foundation**

- [ ] Database schema and Instructors model
- [ ] JWT module configuration
- [ ] Basic authentication service

### **Week 2: Backend Auth**

- [ ] JWT strategy and guards
- [ ] Authentication controller
- [ ] Protect all student endpoints

### **Week 3: Frontend Integration**

- [ ] Authentication context and hooks
- [ ] Login page and protected routes
- [ ] API service token integration

### **Week 4: Security & Testing**

- [ ] Password requirements and validation
- [ ] Rate limiting for auth endpoints
- [ ] Comprehensive testing

---

## 📈 **EXPECTED BENEFITS**

- 🔒 **Complete Security**: Student data only accessible to authenticated instructors
- 🎯 **Role-Based Access**: Different permissions for instructors vs admins
- 📊 **Audit Trail**: Log all access to sensitive data
- ⚡ **Seamless UX**: Modern JWT-based authentication
- 🛡️ **Production Ready**: Industry-standard security practices

---

## 🔧 **TESTING STRATEGY**

### **Unit Tests**

- Authentication service methods
- JWT strategy validation
- Guard functionality

### **Integration Tests**

- Login/logout flows
- Protected endpoint access
- Token validation

### **E2E Tests**

- Complete authentication flow
- Unauthorized access attempts
- Session management

This roadmap provides a complete, production-ready authentication system that will secure your student data while maintaining excellent user experience for instructors.
