import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { LoggerService } from '../logger.service';

@Injectable()
export class TestingUtilsService {
  private ns = '[TestingUtilsService]';

  private testSecret = String.fromCharCode(
    ...new Uint8Array(new TextEncoder().encode(process.env.E2E_SECRET)),
  );

  constructor(private readonly logger: LoggerService) {}

  verifyTokenAndGetRole(request: { headers?: Record<string, unknown> }): any {
    const fn = `${this.ns}[verifyTokenAndGetRole]:`;
    try {
      if (!request) {
        throw new HttpException(
          `${fn} request is not provided. Can't verify test token and role`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const headerValue = request.headers?.['e2eauthorization'];
      const tokenString = typeof headerValue === 'string' ? headerValue : '';
      const testToken = tokenString.split(' ')[1];

      const { role }: any = jwt.verify(testToken, this.testSecret, {
        algorithms: ['HS256'],
      });
      this.logger.info(
        `${fn} test token was verified! Requested test user role is: ${role}`,
      );
      return role;
    } catch (e) {
      this.logger.warn(`${fn} service failed with an error: ${e}`);
      throw new HttpException(
        `${fn} service failed with an error: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  verifyTestUser(userEmail: string): boolean {
    const fn = `${this.ns}[verifyTestUser]:`;
    try {
      if (!userEmail) {
        throw new HttpException(
          `${fn} userEmail is not provided. Can't verify test user`,
          HttpStatus.UNAUTHORIZED,
        );
      }

      return userEmail === process.env.E2E_TEST_USER;
    } catch (e) {
      this.logger.warn(`${fn} service failed with an error: ${e}`);
      throw new HttpException(
        `${fn} service failed with an error: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  verifyTestUserAndToken(userEmail: string, request: Request): any {
    const isTestUser = this.verifyTestUser(userEmail);

    if (!isTestUser) return null;

    // Convert Headers to a plain object
    const headers: Record<string, unknown> = {};
    if (request && request.headers) {
      for (const [key, value] of Object.entries(request.headers as any)) {
        headers[key.toLowerCase()] = value;
      }
    }

    return this.verifyTokenAndGetRole({ headers });
  }
}
