import { NotFoundException } from '@nestjs/common';

/**
 * Custom exception thrown when an employee cannot be found by the given ID.
 *
 * Extends NestJS `NotFoundException` (HTTP 404) and adds a machine-readable
 * `errorCode` for programmatic error handling on the client side.
 */
export class EmployeeNotFoundException extends NotFoundException {
  constructor(id: string) {
    super({
      statusCode: 404,
      message: `Employee with id ${id} not found`,
      errorCode: 'EMPLOYEE_NOT_FOUND',
    });
  }
}
