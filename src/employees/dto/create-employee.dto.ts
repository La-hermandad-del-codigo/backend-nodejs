import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNumber,
  IsDateString,
  IsNotEmpty,
  Min,
} from 'class-validator';

/**
 * DTO for creating a new employee.
 *
 * Does **not** include `id`, `isActive`, `createdAt`, or `updatedAt` —
 * those are managed automatically by the entity / database.
 */
export class CreateEmployeeDto {
  /** Employee's first name */
  @ApiProperty({
    description: 'First name of the employee',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  /** Employee's last name */
  @ApiProperty({
    description: 'Last name of the employee',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  /** Employee's email address (must be unique) */
  @ApiProperty({
    description: 'Unique email address of the employee',
    example: 'john.doe@company.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /** Employee's phone number */
  @ApiProperty({
    description: 'Phone number of the employee',
    example: '+1-555-123-4567',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  /** Job position / title */
  @ApiProperty({
    description: 'Job position or title',
    example: 'Senior Developer',
  })
  @IsString()
  @IsNotEmpty()
  position: string;

  /** Department the employee belongs to */
  @ApiProperty({
    description: 'Department the employee belongs to',
    example: 'Engineering',
  })
  @IsString()
  @IsNotEmpty()
  department: string;

  /** Monthly salary (must be a positive number) */
  @ApiProperty({
    description: 'Monthly salary of the employee',
    example: 5000.0,
  })
  @IsNumber()
  @Min(0)
  salary: number;

  /** Hire date in ISO 8601 format (YYYY-MM-DD) */
  @ApiProperty({
    description: 'Date the employee was hired (ISO 8601)',
    example: '2024-01-15',
  })
  @IsDateString()
  @IsNotEmpty()
  hireDate: string;
}
