import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeesModule } from './employees/employees.module';
import { EmployeesRouterModule } from './employees/employees.routes';

/**
 * Root application module.
 *
 * Configures TypeORM with `better-sqlite3` driver pointing to a local
 * `database.sqlite` file. Tables are auto-synchronised from entities
 * (`synchronize: true`).
 *
 * > **Note:** `synchronize: true` is convenient for development but should
 * > be replaced with migrations in production to avoid data loss.
 */
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // DEV ONLY — use migrations in production
    }),
    EmployeesModule,
    EmployeesRouterModule,
  ],
})
export class AppModule {}
