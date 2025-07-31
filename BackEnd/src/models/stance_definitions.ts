import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface stance_definitionsAttributes {
  id: number;
  name: string;
  korean: string;
  belt: string;
  belt_color: string;
  description: string;
  position: string;
  body_position: string;
  key_points: object;
  common_mistakes: object;
  applications: object;
  created_at?: Date;
  updated_at?: Date;
}

export type stance_definitionsPk = 'id';
export type stance_definitionsId = stance_definitions[stance_definitionsPk];
export type stance_definitionsOptionalAttributes =
  | 'id'
  | 'created_at'
  | 'updated_at';
export type stance_definitionsCreationAttributes = Optional<
  stance_definitionsAttributes,
  stance_definitionsOptionalAttributes
>;

export class stance_definitions
  extends Model<
    stance_definitionsAttributes,
    stance_definitionsCreationAttributes
  >
  implements stance_definitionsAttributes
{
  id!: number;
  name!: string;
  korean!: string;
  belt!: string;
  belt_color!: string;
  description!: string;
  position!: string;
  body_position!: string;
  key_points!: object;
  common_mistakes!: object;
  applications!: object;
  created_at?: Date;
  updated_at?: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof stance_definitions {
    return stance_definitions.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: 'unique_name',
        },
        korean: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        belt: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        belt_color: {
          type: DataTypes.STRING(7),
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        position: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        body_position: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        key_points: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        common_mistakes: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        applications: {
          type: DataTypes.JSON,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'stance_definitions',
        timestamps: true,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'unique_name',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'name' }],
          },
          {
            name: 'idx_belt',
            using: 'BTREE',
            fields: [{ name: 'belt' }],
          },
        ],
      },
    );
  }
}
