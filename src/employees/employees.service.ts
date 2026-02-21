import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeResponseDto } from './dto/employee-response.dto';
import { EmployeeNotFoundException } from './exceptions/employee-not-found.exception';
import { EmployeeAlreadyExistsException } from './exceptions/employee-already-exists.exception';

/**
 * Service responsible for all employee-related business logic.
 *
 * Uses the TypeORM `Repository` pattern and transforms every entity
 * into an `EmployeeResponseDto` before returning it to the controller
 * via `plainToInstance` with `excludeExtraneousValues: true`.
 */
@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  /**
   * Create a new employee.
   *
   * @param dto - Data for the new employee
   * @returns The newly created employee as `EmployeeResponseDto`
   * @throws {EmployeeAlreadyExistsException} If an employee with the same email already exists
   */
  async create(dto: CreateEmployeeDto): Promise<EmployeeResponseDto> {
    const existing = await this.employeeRepository.findOne({
      where: { email: dto.email },
    });

    if (existing) {
      throw new EmployeeAlreadyExistsException(dto.email);
    }

    const employee = this.employeeRepository.create(dto);
    const saved = await this.employeeRepository.save(employee);

    return plainToInstance(EmployeeResponseDto, saved, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Retrieve all active employees.
   *
   * @returns Array of active employees as `EmployeeResponseDto[]`
   */
  async findAll(): Promise<EmployeeResponseDto[]> {
    const employees = await this.employeeRepository.find({
      where: { isActive: true },
    });

    return plainToInstance(EmployeeResponseDto, employees, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Retrieve a single active employee by ID.
   *
   * @param id - UUID of the employee
   * @returns The employee as `EmployeeResponseDto`
   * @throws {EmployeeNotFoundException} If no active employee with the given ID exists
   */
  async findOne(id: string): Promise<EmployeeResponseDto> {
    const employee = await this.employeeRepository.findOne({
      where: { id, isActive: true },
    });

    if (!employee) {
      throw new EmployeeNotFoundException(id);
    }

    return plainToInstance(EmployeeResponseDto, employee, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Update an existing employee.
   *
   * Only the fields present in `dto` will be updated (partial update).
   * If a new email is provided, it is checked for uniqueness first.
   *
   * @param id  - UUID of the employee to update
   * @param dto - Partial data to apply
   * @returns The updated employee as `EmployeeResponseDto`
   * @throws {EmployeeNotFoundException}      If the employee does not exist or is inactive
   * @throws {EmployeeAlreadyExistsException}  If the new email is already in use by another employee
   */
  async update(
    id: string,
    dto: UpdateEmployeeDto,
  ): Promise<EmployeeResponseDto> {
    const employee = await this.employeeRepository.findOne({
      where: { id, isActive: true },
    });

    if (!employee) {
      throw new EmployeeNotFoundException(id);
    }

    // If a new email is provided, verify it is not already in use
    if (dto.email && dto.email !== employee.email) {
      const emailInUse = await this.employeeRepository.findOne({
        where: { email: dto.email },
      });

      if (emailInUse) {
        throw new EmployeeAlreadyExistsException(dto.email);
      }
    }

    Object.assign(employee, dto);
    const saved = await this.employeeRepository.save(employee);

    return plainToInstance(EmployeeResponseDto, saved, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Soft-delete an employee by setting `isActive` to `false`.
   *
   * The record is **not** physically removed from the database.
   *
   * @param id - UUID of the employee to deactivate
   * @returns Confirmation message
   * @throws {EmployeeNotFoundException} If the employee does not exist or is already inactive
   */
  async remove(id: string): Promise<{ message: string }> {
    const employee = await this.employeeRepository.findOne({
      where: { id, isActive: true },
    });

    if (!employee) {
      throw new EmployeeNotFoundException(id);
    }

    employee.isActive = false;
    await this.employeeRepository.save(employee);

    return { message: `Employee ${id} deactivated successfully` };
  }
}
