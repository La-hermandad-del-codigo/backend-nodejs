import { ConflictException } from '@nestjs/common';

/**
 * Custom exception thrown when attempting to create an employee
 * with an email that already exists in the database.
 *
 * Extends NestJS `ConflictException` (HTTP 409) and adds a machine-readable
 * `errorCode` for programmatic error handling on the client side.
 */
export class EmployeeAlreadyExistsException extends ConflictException {
  constructor(email: string) {
    super({
      statusCode: 409,
      message: `Employee with email ${email} already exists`,
      errorCode: 'EMPLOYEE_ALREADY_EXISTS',
    });
  }
}
