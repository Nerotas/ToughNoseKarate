import type { Sequelize } from 'sequelize';
import { belt_requirements as _belt_requirements } from './belt_requirements';
import type {
  belt_requirementsAttributes,
  belt_requirementsCreationAttributes,
} from './belt_requirements';
import { combinations as _combinations } from './combinations';
import type {
  combinationsAttributes,
  combinationsCreationAttributes,
} from './combinations';
import { falling as _falling } from './falling';
import type { fallingAttributes, fallingCreationAttributes } from './falling';
import { forms as _forms } from './forms';
import type { formsAttributes, formsCreationAttributes } from './forms';
import { one_steps as _one_steps } from './one_steps';
import type {
  one_stepsAttributes,
  one_stepsCreationAttributes,
} from './one_steps';
import { parent_mapping as _parent_mapping } from './parent_mapping';
import type {
  parent_mappingAttributes,
  parent_mappingCreationAttributes,
} from './parent_mapping';
import { parents as _parents } from './parents';
import type { parentsAttributes, parentsCreationAttributes } from './parents';
import { stances as _stances } from './stances';
import type { stancesAttributes, stancesCreationAttributes } from './stances';
import { students as _students } from './students';
import type {
  studentsAttributes,
  studentsCreationAttributes,
} from './students';

export {
  _belt_requirements as belt_requirements,
  _combinations as combinations,
  _falling as falling,
  _forms as forms,
  _one_steps as one_steps,
  _parent_mapping as parent_mapping,
  _parents as parents,
  _stances as stances,
  _students as students,
};

export type {
  belt_requirementsAttributes,
  belt_requirementsCreationAttributes,
  combinationsAttributes,
  combinationsCreationAttributes,
  fallingAttributes,
  fallingCreationAttributes,
  formsAttributes,
  formsCreationAttributes,
  one_stepsAttributes,
  one_stepsCreationAttributes,
  parent_mappingAttributes,
  parent_mappingCreationAttributes,
  parentsAttributes,
  parentsCreationAttributes,
  stancesAttributes,
  stancesCreationAttributes,
  studentsAttributes,
  studentsCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const belt_requirements = _belt_requirements.initModel(sequelize);
  const combinations = _combinations.initModel(sequelize);
  const falling = _falling.initModel(sequelize);
  const forms = _forms.initModel(sequelize);
  const one_steps = _one_steps.initModel(sequelize);
  const parent_mapping = _parent_mapping.initModel(sequelize);
  const parents = _parents.initModel(sequelize);
  const stances = _stances.initModel(sequelize);
  const students = _students.initModel(sequelize);

  combinations.belongsTo(students, { as: 'student', foreignKey: 'studentid' });
  students.hasOne(combinations, { as: 'combination', foreignKey: 'studentid' });
  falling.belongsTo(students, { as: 'student', foreignKey: 'studentid' });
  students.hasOne(falling, { as: 'falling', foreignKey: 'studentid' });
  forms.belongsTo(students, { as: 'student', foreignKey: 'studentid' });
  students.hasOne(forms, { as: 'form', foreignKey: 'studentid' });
  one_steps.belongsTo(students, { as: 'student', foreignKey: 'studentid' });
  students.hasOne(one_steps, { as: 'one_step', foreignKey: 'studentid' });
  stances.belongsTo(students, { as: 'student', foreignKey: 'studentid' });
  students.hasOne(stances, { as: 'stance', foreignKey: 'studentid' });

  return {
    belt_requirements: belt_requirements,
    combinations: combinations,
    falling: falling,
    forms: forms,
    one_steps: one_steps,
    parent_mapping: parent_mapping,
    parents: parents,
    stances: stances,
    students: students,
  };
}
