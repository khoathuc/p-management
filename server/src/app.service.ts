import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Get server's health check
   * @returns string
   */
  getHealthz(): string {
    return 'health ok';
  }
}
