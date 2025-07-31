import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { blocks, blocksId } from './blocks';
import type { combinations, combinationsId } from './combinations';
import type { falling, fallingId } from './falling';
import type { forms, formsId } from './forms';
import type { kicks, kicksId } from './kicks';
import type { one_steps, one_stepsId } from './one_steps';
import type { parent_mapping, parent_mappingId } from './parent_mapping';
import type { punches, punchesId } from './punches';
import type { stances, stancesId } from './stances';

export interface studentsAttributes {
  studentid: number;
  firstName: string;
  lastName: string;
  preferedName?: string;
  age?: number;
  rank: string;
  startDateUTC: string;
  endDateUTC?: string;
  email: string;
  phone?: string;
  notes?: string;
  active: number;
  child?: number;
}

export type studentsPk = 'studentid';
export type studentsId = students[studentsPk];
export type studentsOptionalAttributes =
  | 'studentid'
  | 'preferedName'
  | 'age'
  | 'rank'
  | 'endDateUTC'
  | 'phone'
  | 'notes'
  | 'active'
  | 'child';
export type studentsCreationAttributes = Optional<
  studentsAttributes,
  studentsOptionalAttributes
>;

export class students
  extends Model<studentsAttributes, studentsCreationAttributes>
  implements studentsAttributes
{
  studentid!: number;
  firstName!: string;
  lastName!: string;
  preferedName?: string;
  age?: number;
  rank!: string;
  startDateUTC!: string;
  endDateUTC?: string;
  email!: string;
  phone?: string;
  notes?: string;
  active!: number;
  child?: number;

  // students hasMany blocks via studentid
  blocks!: blocks[];
  getBlocks!: Sequelize.HasManyGetAssociationsMixin<blocks>;
  setBlocks!: Sequelize.HasManySetAssociationsMixin<blocks, blocksId>;
  addBlock!: Sequelize.HasManyAddAssociationMixin<blocks, blocksId>;
  addBlocks!: Sequelize.HasManyAddAssociationsMixin<blocks, blocksId>;
  createBlock!: Sequelize.HasManyCreateAssociationMixin<blocks>;
  removeBlock!: Sequelize.HasManyRemoveAssociationMixin<blocks, blocksId>;
  removeBlocks!: Sequelize.HasManyRemoveAssociationsMixin<blocks, blocksId>;
  hasBlock!: Sequelize.HasManyHasAssociationMixin<blocks, blocksId>;
  hasBlocks!: Sequelize.HasManyHasAssociationsMixin<blocks, blocksId>;
  countBlocks!: Sequelize.HasManyCountAssociationsMixin;
  // students hasMany combinations via studentid
  combinations!: combinations[];
  getCombinations!: Sequelize.HasManyGetAssociationsMixin<combinations>;
  setCombinations!: Sequelize.HasManySetAssociationsMixin<
    combinations,
    combinationsId
  >;
  addCombination!: Sequelize.HasManyAddAssociationMixin<
    combinations,
    combinationsId
  >;
  addCombinations!: Sequelize.HasManyAddAssociationsMixin<
    combinations,
    combinationsId
  >;
  createCombination!: Sequelize.HasManyCreateAssociationMixin<combinations>;
  removeCombination!: Sequelize.HasManyRemoveAssociationMixin<
    combinations,
    combinationsId
  >;
  removeCombinations!: Sequelize.HasManyRemoveAssociationsMixin<
    combinations,
    combinationsId
  >;
  hasCombination!: Sequelize.HasManyHasAssociationMixin<
    combinations,
    combinationsId
  >;
  hasCombinations!: Sequelize.HasManyHasAssociationsMixin<
    combinations,
    combinationsId
  >;
  countCombinations!: Sequelize.HasManyCountAssociationsMixin;
  // students hasMany falling via studentid
  fallings!: falling[];
  getFallings!: Sequelize.HasManyGetAssociationsMixin<falling>;
  setFallings!: Sequelize.HasManySetAssociationsMixin<falling, fallingId>;
  addFalling!: Sequelize.HasManyAddAssociationMixin<falling, fallingId>;
  addFallings!: Sequelize.HasManyAddAssociationsMixin<falling, fallingId>;
  createFalling!: Sequelize.HasManyCreateAssociationMixin<falling>;
  removeFalling!: Sequelize.HasManyRemoveAssociationMixin<falling, fallingId>;
  removeFallings!: Sequelize.HasManyRemoveAssociationsMixin<falling, fallingId>;
  hasFalling!: Sequelize.HasManyHasAssociationMixin<falling, fallingId>;
  hasFallings!: Sequelize.HasManyHasAssociationsMixin<falling, fallingId>;
  countFallings!: Sequelize.HasManyCountAssociationsMixin;
  // students hasMany forms via studentid
  forms!: forms[];
  getForms!: Sequelize.HasManyGetAssociationsMixin<forms>;
  setForms!: Sequelize.HasManySetAssociationsMixin<forms, formsId>;
  addForm!: Sequelize.HasManyAddAssociationMixin<forms, formsId>;
  addForms!: Sequelize.HasManyAddAssociationsMixin<forms, formsId>;
  createForm!: Sequelize.HasManyCreateAssociationMixin<forms>;
  removeForm!: Sequelize.HasManyRemoveAssociationMixin<forms, formsId>;
  removeForms!: Sequelize.HasManyRemoveAssociationsMixin<forms, formsId>;
  hasForm!: Sequelize.HasManyHasAssociationMixin<forms, formsId>;
  hasForms!: Sequelize.HasManyHasAssociationsMixin<forms, formsId>;
  countForms!: Sequelize.HasManyCountAssociationsMixin;
  // students hasMany kicks via studentid
  kicks!: kicks[];
  getKicks!: Sequelize.HasManyGetAssociationsMixin<kicks>;
  setKicks!: Sequelize.HasManySetAssociationsMixin<kicks, kicksId>;
  addKick!: Sequelize.HasManyAddAssociationMixin<kicks, kicksId>;
  addKicks!: Sequelize.HasManyAddAssociationsMixin<kicks, kicksId>;
  createKick!: Sequelize.HasManyCreateAssociationMixin<kicks>;
  removeKick!: Sequelize.HasManyRemoveAssociationMixin<kicks, kicksId>;
  removeKicks!: Sequelize.HasManyRemoveAssociationsMixin<kicks, kicksId>;
  hasKick!: Sequelize.HasManyHasAssociationMixin<kicks, kicksId>;
  hasKicks!: Sequelize.HasManyHasAssociationsMixin<kicks, kicksId>;
  countKicks!: Sequelize.HasManyCountAssociationsMixin;
  // students hasMany one_steps via studentid
  one_steps!: one_steps[];
  getOne_steps!: Sequelize.HasManyGetAssociationsMixin<one_steps>;
  setOne_steps!: Sequelize.HasManySetAssociationsMixin<one_steps, one_stepsId>;
  addOne_step!: Sequelize.HasManyAddAssociationMixin<one_steps, one_stepsId>;
  addOne_steps!: Sequelize.HasManyAddAssociationsMixin<one_steps, one_stepsId>;
  createOne_step!: Sequelize.HasManyCreateAssociationMixin<one_steps>;
  removeOne_step!: Sequelize.HasManyRemoveAssociationMixin<
    one_steps,
    one_stepsId
  >;
  removeOne_steps!: Sequelize.HasManyRemoveAssociationsMixin<
    one_steps,
    one_stepsId
  >;
  hasOne_step!: Sequelize.HasManyHasAssociationMixin<one_steps, one_stepsId>;
  hasOne_steps!: Sequelize.HasManyHasAssociationsMixin<one_steps, one_stepsId>;
  countOne_steps!: Sequelize.HasManyCountAssociationsMixin;
  // students hasMany parent_mapping via studentid
  parent_mappings!: parent_mapping[];
  getParent_mappings!: Sequelize.HasManyGetAssociationsMixin<parent_mapping>;
  setParent_mappings!: Sequelize.HasManySetAssociationsMixin<
    parent_mapping,
    parent_mappingId
  >;
  addParent_mapping!: Sequelize.HasManyAddAssociationMixin<
    parent_mapping,
    parent_mappingId
  >;
  addParent_mappings!: Sequelize.HasManyAddAssociationsMixin<
    parent_mapping,
    parent_mappingId
  >;
  createParent_mapping!: Sequelize.HasManyCreateAssociationMixin<parent_mapping>;
  removeParent_mapping!: Sequelize.HasManyRemoveAssociationMixin<
    parent_mapping,
    parent_mappingId
  >;
  removeParent_mappings!: Sequelize.HasManyRemoveAssociationsMixin<
    parent_mapping,
    parent_mappingId
  >;
  hasParent_mapping!: Sequelize.HasManyHasAssociationMixin<
    parent_mapping,
    parent_mappingId
  >;
  hasParent_mappings!: Sequelize.HasManyHasAssociationsMixin<
    parent_mapping,
    parent_mappingId
  >;
  countParent_mappings!: Sequelize.HasManyCountAssociationsMixin;
  // students hasMany punches via studentid
  punches!: punches[];
  getPunches!: Sequelize.HasManyGetAssociationsMixin<punches>;
  setPunches!: Sequelize.HasManySetAssociationsMixin<punches, punchesId>;
  addPunch!: Sequelize.HasManyAddAssociationMixin<punches, punchesId>;
  addPunches!: Sequelize.HasManyAddAssociationsMixin<punches, punchesId>;
  createPunch!: Sequelize.HasManyCreateAssociationMixin<punches>;
  removePunch!: Sequelize.HasManyRemoveAssociationMixin<punches, punchesId>;
  removePunches!: Sequelize.HasManyRemoveAssociationsMixin<punches, punchesId>;
  hasPunch!: Sequelize.HasManyHasAssociationMixin<punches, punchesId>;
  hasPunches!: Sequelize.HasManyHasAssociationsMixin<punches, punchesId>;
  countPunches!: Sequelize.HasManyCountAssociationsMixin;
  // students hasMany stances via studentid
  stances!: stances[];
  getStances!: Sequelize.HasManyGetAssociationsMixin<stances>;
  setStances!: Sequelize.HasManySetAssociationsMixin<stances, stancesId>;
  addStance!: Sequelize.HasManyAddAssociationMixin<stances, stancesId>;
  addStances!: Sequelize.HasManyAddAssociationsMixin<stances, stancesId>;
  createStance!: Sequelize.HasManyCreateAssociationMixin<stances>;
  removeStance!: Sequelize.HasManyRemoveAssociationMixin<stances, stancesId>;
  removeStances!: Sequelize.HasManyRemoveAssociationsMixin<stances, stancesId>;
  hasStance!: Sequelize.HasManyHasAssociationMixin<stances, stancesId>;
  hasStances!: Sequelize.HasManyHasAssociationsMixin<stances, stancesId>;
  countStances!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof students {
    return students.init(
      {
        studentid: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        firstName: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        preferedName: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        age: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        rank: {
          type: DataTypes.STRING(45),
          allowNull: false,
          defaultValue: 'white',
        },
        startDateUTC: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        endDateUTC: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        notes: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: 1,
        },
        child: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        tableName: 'students',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'studentid' }],
          },
        ],
      },
    );
  }
}
