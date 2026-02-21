import { PartialType } from '@nestjs/swagger';
import { CreateEmployeeDto } from './create-employee.dto';

/**
 * DTO for updating an existing employee.
 *
 * Extends `CreateEmployeeDto` via `PartialType`, making every field optional.
 * Swagger will automatically document all properties as optional.
 */
export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
