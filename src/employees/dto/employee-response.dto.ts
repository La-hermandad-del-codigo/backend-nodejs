import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Response DTO for employee data returned to the client.
 *
 * Uses `@Exclude()` at class level so that only properties explicitly
 * decorated with `@Expose()` are included in the serialised response.
 * This prevents accidental leakage of internal/sensitive fields.
 *
 * Exposed fields:
 * - `id`         — unique identifier
 * - `firstName`  — first name
 * - `lastName`   — last name
 * - `email`      — email address
 * - `phone`      — phone number
 * - `position`   — job position
 * - `department` — department
 * - `salary`     — monthly salary
 * - `hireDate`   — date of hire
 * - `isActive`   — active status
 * - `createdAt`  — creation timestamp
 * - `updatedAt`  — last-update timestamp
 */
@Exclude()
export class EmployeeResponseDto {
  @Expose()
  @ApiProperty({
    description: 'Unique identifier (UUID)',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  id: string;

  @Expose()
  @ApiProperty({ description: 'First name', example: 'John' })
  firstName: string;

  @Expose()
  @ApiProperty({ description: 'Last name', example: 'Doe' })
  lastName: string;

  @Expose()
  @ApiProperty({
    description: 'Email address',
    example: 'john.doe@company.com',
  })
  email: string;

  @Expose()
  @ApiProperty({ description: 'Phone number', example: '+1-555-123-4567' })
  phone: string;

  @Expose()
  @ApiProperty({ description: 'Job position', example: 'Senior Developer' })
  position: string;

  @Expose()
  @ApiProperty({ description: 'Department', example: 'Engineering' })
  department: string;

  @Expose()
  @ApiProperty({ description: 'Monthly salary', example: 5000.0 })
  salary: number;

  @Expose()
  @ApiProperty({ description: 'Hire date (ISO 8601)', example: '2024-01-15' })
  hireDate: string;

  @Expose()
  @ApiProperty({ description: 'Whether the employee is active', example: true })
  isActive: boolean;

  @Expose()
  @ApiProperty({ description: 'Record creation timestamp' })
  createdAt: Date;

  @Expose()
  @ApiProperty({ description: 'Record last-update timestamp' })
  updatedAt: Date;
}
