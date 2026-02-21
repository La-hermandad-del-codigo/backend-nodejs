import { RouterModule, Routes } from '@nestjs/core';
import { EmployeesModule } from './employees.module';

/**
 * Route definitions for the Employees module.
 *
 * Mounts all employee endpoints under the `/api/v1` prefix
 * using NestJS `RouterModule`.
 *
 * Resulting base path: `GET /api/v1/employees`, etc.
 */
export const employeesRoutes: Routes = [
  {
    path: 'api/v1',
    module: EmployeesModule,
  },
];

/**
 * Pre-configured `RouterModule` import for convenience.
 * Import this in `AppModule` to register the routes.
 */
export const EmployeesRouterModule = RouterModule.register(employeesRoutes);
