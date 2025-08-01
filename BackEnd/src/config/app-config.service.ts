import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  EnvironmentConfig,
  getCorsOrigins,
  isProduction,
  isDevelopment,
} from './environment.config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService<EnvironmentConfig>) {}

  // Server configuration
  get port(): number {
    return this.configService.get<number>('PORT', { infer: true })!;
  }

  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV', { infer: true })!;
  }

  get isProduction(): boolean {
    return isProduction(
      this.configService.get<EnvironmentConfig>('NODE_ENV') as any,
    );
  }

  get isDevelopment(): boolean {
    return isDevelopment(
      this.configService.get<EnvironmentConfig>('NODE_ENV') as any,
    );
  }

  get apiPrefix(): string {
    return this.configService.get<string>('API_PREFIX', { infer: true })!;
  }

  // Database configuration
  get database() {
    return {
      host: this.configService.get<string>('DB_HOST', { infer: true })!,
      port: this.configService.get<number>('DB_PORT', { infer: true })!,
      username: this.configService.get<string>('DB_USERNAME', { infer: true })!,
      password: this.configService.get<string>('DB_PASSWORD', { infer: true })!,
      database: this.configService.get<string>('DB_NAME', { infer: true })!,
      ssl: this.configService.get<boolean>('DB_SSL', { infer: true })!,
    };
  }

  // CORS configuration
  get corsOrigins(): string[] {
    const origins = this.configService.get<string>('CORS_ORIGINS', {
      infer: true,
    })!;
    return getCorsOrigins({ CORS_ORIGINS: origins } as EnvironmentConfig);
  }

  // JWT configuration
  get jwt() {
    return {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRATION', {
        infer: true,
      })!,
    };
  }

  // Throttling configuration
  get throttle() {
    return {
      ttl: this.configService.get<number>('THROTTLE_TTL', { infer: true })!,
      limit: this.configService.get<number>('THROTTLE_LIMIT', { infer: true })!,
    };
  }

  // Google Services configuration
  get googleServices() {
    return {
      email: this.configService.get<string>('GOOGLE_SERVICE_ACCOUNT_EMAIL'),
      clientId: this.configService.get<string>(
        'GOOGLE_SERVICE_ACCOUNT_CLIENT_ID',
      ),
      projectId: this.configService.get<string>(
        'GOOGLE_SERVICE_ACCOUNT_PROJECT_ID',
      ),
      keyPath: this.configService.get<string>('GOOGLE_SERVICE_KEY_PATH'),
      keyId: this.configService.get<string>('GOOGLE_SERVICE_ACCOUNT_KEY_ID'),
    };
  }

  // Validation helper - ensures all required configs are present
  validateRequiredConfigs(): void {
    const requiredConfigs = [
      { key: 'DB_HOST', value: this.database.host },
      { key: 'DB_USERNAME', value: this.database.username },
      { key: 'DB_NAME', value: this.database.database },
    ];

    // In production, JWT secret is also required
    if (this.isProduction && !this.jwt.secret) {
      requiredConfigs.push({ key: 'JWT_SECRET', value: this.jwt.secret });
    }

    const missingConfigs = requiredConfigs.filter((config) => !config.value);

    if (missingConfigs.length > 0) {
      const missingKeys = missingConfigs.map((config) => config.key).join(', ');
      throw new Error(`Missing required environment variables: ${missingKeys}`);
    }
  }

  // Get database connection string for logging (without password)
  getDatabaseConnectionInfo(): string {
    const db = this.database;
    return `${db.username}@${db.host}:${db.port}/${db.database}`;
  }
}
