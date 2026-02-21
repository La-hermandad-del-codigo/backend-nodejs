import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Employee } from './entities/employee.entity';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';

/**
 * Feature module for the Employees resource.
 *
 * Registers the `Employee` entity with TypeORM and declares
 * the controller and service. Exports `EmployeesService`
 * so other modules can import it if needed.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [EmployeesService],
})
export class EmployeesModule {}
