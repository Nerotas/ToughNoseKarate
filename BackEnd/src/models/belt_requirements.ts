import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface belt_requirementsAttributes {
  belt_order: number;
  belt_rank: string;
  forms: object;
  stances: object;
  blocks: object;
  punches: object;
  kicks: object;
  jumps: object;
  falling: object;
  one_steps: object;
  self_defense: object;
  comments?: string;
}

export type belt_requirementsPk = 'belt_order';
export type belt_requirementsId = belt_requirements[belt_requirementsPk];
export type belt_requirementsOptionalAttributes = 'comments';
export type belt_requirementsCreationAttributes = Optional<
  belt_requirementsAttributes,
  belt_requirementsOptionalAttributes
>;

export class belt_requirements
  extends Model<
    belt_requirementsAttributes,
    belt_requirementsCreationAttributes
  >
  implements belt_requirementsAttributes
{
  belt_order!: number;
  belt_rank!: string;
  forms!: object;
  stances!: object;
  blocks!: object;
  punches!: object;
  kicks!: object;
  jumps!: object;
  falling!: object;
  one_steps!: object;
  self_defense!: object;
  comments?: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof belt_requirements {
    return belt_requirements.init(
      {
        belt_order: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        belt_rank: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        forms: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        stances: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        blocks: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        punches: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        kicks: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        jumps: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        falling: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        one_steps: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        self_defense: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        comments: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'belt_requirements',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'belt_order' }],
          },
        ],
      },
    );
  }
}
