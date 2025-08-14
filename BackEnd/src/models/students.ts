import { Model, Table, Column, DataType } from 'sequelize-typescript';

export interface StudentsAttributes {
  studentid?: number;
  firstName: string;
  lastName: string;
  preferredName?: string | null;
  age?: number | null;
  dateOfBirth?: string | null; // maps date_of_birth
  beltRank?: string; // default white
  startDateUTC: string;
  endDateUTC?: string | null;
  email: string;
  phone?: string | null;
  emergencyContactName?: string | null;
  emergencyContactPhone?: string | null;
  emergencyContactRelationship?: string | null;
  medicalConditions?: string | null;
  allergies?: string | null;
  medications?: string | null;
  waiverSigned?: boolean | null;
  waiverDate?: string | null; // date
  insuranceProvider?: string | null;
  insurancePolicyNumber?: string | null;
  notes?: string | null;
  active?: boolean; // DB default true
  child?: boolean; // DB default false
  lastTestUTC?: string | null;
  eligibleForTesting?: boolean; // DB default false
}

@Table({ tableName: 'students', timestamps: false })
export class students
  extends Model<StudentsAttributes, Partial<StudentsAttributes>>
  implements StudentsAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare studentid?: number;

  @Column({ field: 'firstname', type: DataType.STRING(45), allowNull: false })
  declare firstName: string;

  @Column({ field: 'lastname', type: DataType.STRING(45), allowNull: false })
  declare lastName: string;

  @Column({
    field: 'preferredname',
    type: DataType.STRING(45),
    allowNull: true,
  })
  declare preferredName?: string | null;

  @Column({ field: 'age', type: DataType.INTEGER, allowNull: true })
  declare age?: number | null;

  @Column({ field: 'date_of_birth', type: DataType.DATEONLY, allowNull: true })
  declare dateOfBirth?: string | null;

  @Column({
    field: 'beltrank',
    type: DataType.STRING(45),
    allowNull: false,
    defaultValue: 'white',
  })
  declare beltRank?: string;

  @Column({
    field: 'startdateutc',
    type: DataType.STRING(45),
    allowNull: false,
  })
  declare startDateUTC: string;

  @Column({ field: 'enddateutc', type: DataType.STRING(45), allowNull: true })
  declare endDateUTC?: string | null;

  @Column({ field: 'email', type: DataType.STRING(45), allowNull: false })
  declare email: string;

  @Column({ field: 'phone', type: DataType.STRING(45), allowNull: true })
  declare phone?: string | null;

  @Column({
    field: 'emergency_contact_name',
    type: DataType.STRING(100),
    allowNull: true,
  })
  declare emergencyContactName?: string | null;

  @Column({
    field: 'emergency_contact_phone',
    type: DataType.STRING(20),
    allowNull: true,
  })
  declare emergencyContactPhone?: string | null;

  @Column({
    field: 'emergency_contact_relationship',
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare emergencyContactRelationship?: string | null;

  @Column({ field: 'medical_conditions', type: DataType.TEXT, allowNull: true })
  declare medicalConditions?: string | null;

  @Column({ field: 'allergies', type: DataType.TEXT, allowNull: true })
  declare allergies?: string | null;

  @Column({ field: 'medications', type: DataType.TEXT, allowNull: true })
  declare medications?: string | null;

  @Column({
    field: 'waiver_signed',
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  })
  declare waiverSigned?: boolean | null;

  @Column({ field: 'waiver_date', type: DataType.DATEONLY, allowNull: true })
  declare waiverDate?: string | null;

  @Column({
    field: 'insurance_provider',
    type: DataType.STRING(100),
    allowNull: true,
  })
  declare insuranceProvider?: string | null;

  @Column({
    field: 'insurance_policy_number',
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare insurancePolicyNumber?: string | null;

  @Column({ field: 'notes', type: DataType.TEXT, allowNull: true })
  declare notes?: string | null;

  @Column({
    field: 'active',
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  declare active?: boolean;

  @Column({
    field: 'child',
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare child?: boolean;

  @Column({ field: 'lasttestutc', type: DataType.STRING(45), allowNull: true })
  declare lastTestUTC?: string | null;

  @Column({
    field: 'eligiblefortesting',
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare eligibleForTesting?: boolean;
}
