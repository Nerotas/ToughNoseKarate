import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  Unique,
  CreatedAt,
  UpdatedAt,
  DataType,
} from 'sequelize-typescript';

export interface InstructorAttributes {
  instructor_id?: number;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  role?: 'instructor' | 'admin';
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
  last_login?: Date;
}

export type InstructorCreationAttributes = Omit<
  InstructorAttributes,
  'instructor_id' | 'created_at' | 'updated_at'
>;

@Table({
  tableName: 'instructors',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Instructors extends Model<
  InstructorAttributes,
  InstructorCreationAttributes
> {
  // Use "declare" so TS does not emit runtime fields that shadow Sequelize’s accessors
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, field: 'instructor_id' })
  declare instructor_id: number;

  @Unique
  @Column({ type: DataType.STRING(255), allowNull: false })
  declare email: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare password_hash: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  declare first_name: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  declare last_name: string;

  @Column({
    type: DataType.ENUM('instructor', 'admin'),
    defaultValue: 'instructor',
    allowNull: false,
  })
  declare role: 'instructor' | 'admin';

  @Column({ type: DataType.BOOLEAN, defaultValue: true, allowNull: false })
  declare is_active: boolean;

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'created_at' })
  declare created_at: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: 'updated_at' })
  declare updated_at: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  declare last_login: Date | null;

  // Virtuals/helpers
  get fullName(): string {
    return `${this.first_name} ${this.last_name}`;
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }

  toSafeObject() {
    const { password_hash, ...safeData } = this.toJSON();
    return safeData;
  }
}

export default Instructors;
