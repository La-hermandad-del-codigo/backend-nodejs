import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Employee entity representing the `employees` table in the database.
 *
 * Uses UUID as primary key and supports soft-delete via the `isActive` flag.
 * SQLite does not have a native decimal type — TypeORM stores it as TEXT
 * internally but handles numeric conversion transparently.
 */
@Entity('employees')
export class Employee {
  /** Unique identifier (UUID v4, auto-generated) */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Employee's first name */
  @Column()
  firstName: string;

  /** Employee's last name */
  @Column()
  lastName: string;

  /** Employee's email address — must be unique across all records */
  @Column({ unique: true })
  email: string;

  /** Employee's phone number */
  @Column()
  phone: string;

  /** Job position / title */
  @Column()
  position: string;

  /** Department the employee belongs to */
  @Column()
  department: string;

  /**
   * Monthly salary.
   * Stored with precision 10, scale 2 (e.g. 99999999.99).
   * SQLite stores this as TEXT but TypeORM handles the conversion.
   */
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  salary: number;

  /** Date the employee was hired (ISO date string, e.g. "2024-01-15") */
  @Column({ type: 'date' })
  hireDate: string;

  /**
   * Soft-delete flag.
   * When `false` the employee is considered "deactivated" and
   * will not appear in regular queries.
   */
  @Column({ default: true })
  isActive: boolean;

  /** Timestamp when the record was created (auto-managed by TypeORM) */
  @CreateDateColumn()
  createdAt: Date;

  /** Timestamp when the record was last updated (auto-managed by TypeORM) */
  @UpdateDateColumn()
  updatedAt: Date;
}
