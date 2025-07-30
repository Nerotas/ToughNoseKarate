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

  async verifyTokenAndGetRole(request: Request): Promise<any> {
    const fn = `${this.ns}[verifyTokenAndGetRole]:`;
    try {
      if (!request) {
        throw new HttpException(
          `${fn} request is not provided. Can't verify test token and role`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const testToken = (request?.headers || {})['e2eauthorization']?.split(
        ' ',
      )[1];
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

  async verifyTestUserAndToken(
    userEmail: string,
    request: Request,
  ): Promise<any> {
    const isTestUser = this.verifyTestUser(userEmail);

    if (!isTestUser) return null;

    return this.verifyTokenAndGetRole(request);
  }
}
