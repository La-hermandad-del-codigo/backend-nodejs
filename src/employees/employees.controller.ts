import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeResponseDto } from './dto/employee-response.dto';

/**
 * REST controller for the Employees resource.
 *
 * All endpoints are documented with Swagger decorators.
 * UUID parameters are validated automatically via `ParseUUIDPipe`.
 */
@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  /**
   * Create a new employee.
   *
   * @param dto - Employee creation payload
   * @returns The newly created employee
   */
  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new employee' })
  @ApiResponse({
    status: 201,
    description: 'Employee created successfully',
    type: EmployeeResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error — invalid or missing fields',
  })
  @ApiResponse({
    status: 409,
    description: 'An employee with this email already exists',
  })
  async create(@Body() dto: CreateEmployeeDto): Promise<EmployeeResponseDto> {
    return this.employeesService.create(dto);
  }

  /**
   * Retrieve all active employees.
   *
   * @returns List of active employees
   */
  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'List all active employees' })
  @ApiResponse({
    status: 200,
    description: 'List of active employees',
    type: [EmployeeResponseDto],
  })
  async findAll(): Promise<EmployeeResponseDto[]> {
    return this.employeesService.findAll();
  }

  /**
   * Retrieve a single employee by UUID.
   *
   * @param id - UUID of the employee
   * @returns The requested employee
   */
  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get an employee by ID' })
  @ApiParam({
    name: 'id',
    description: 'Employee UUID',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @ApiResponse({
    status: 200,
    description: 'Employee found',
    type: EmployeeResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<EmployeeResponseDto> {
    return this.employeesService.findOne(id);
  }

  /**
   * Update an employee (partial update).
   *
   * @param id  - UUID of the employee to update
   * @param dto - Fields to update
   * @returns The updated employee
   */
  @Patch(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update an employee (partial)' })
  @ApiParam({
    name: 'id',
    description: 'Employee UUID',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @ApiResponse({
    status: 200,
    description: 'Employee updated successfully',
    type: EmployeeResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  @ApiResponse({
    status: 409,
    description: 'Email already in use by another employee',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateEmployeeDto,
  ): Promise<EmployeeResponseDto> {
    return this.employeesService.update(id, dto);
  }

  /**
   * Soft-delete (deactivate) an employee.
   *
   * @param id - UUID of the employee to deactivate
   * @returns Confirmation message
   */
  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Deactivate an employee (soft delete)' })
  @ApiParam({
    name: 'id',
    description: 'Employee UUID',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @ApiResponse({ status: 200, description: 'Employee deactivated' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ message: string }> {
    return this.employeesService.remove(id);
  }
}
