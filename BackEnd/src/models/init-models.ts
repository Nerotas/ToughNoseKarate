import type { Sequelize } from 'sequelize';
import { belt_requirements as _belt_requirements } from './belt_requirements';
import type {
  belt_requirementsAttributes,
  belt_requirementsCreationAttributes,
} from './belt_requirements';
import { blocks as _blocks } from './blocks';
import type { blocksAttributes, blocksCreationAttributes } from './blocks';
import { combinations as _combinations } from './combinations';
import type {
  combinationsAttributes,
  combinationsCreationAttributes,
} from './combinations';
import { falling as _falling } from './falling';
import type { fallingAttributes, fallingCreationAttributes } from './falling';
import { families as _families } from './families';
import type {
  familiesAttributes,
  familiesCreationAttributes,
} from './families';
import { forms as _forms } from './forms';
import type { formsAttributes, formsCreationAttributes } from './forms';
import { kicks as _kicks } from './kicks';
import type { kicksAttributes, kicksCreationAttributes } from './kicks';
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
import { punches as _punches } from './punches';
import type { punchesAttributes, punchesCreationAttributes } from './punches';
import { stance_definitions as _stance_definitions } from './stance_definitions';
import type {
  stance_definitionsAttributes,
  stance_definitionsCreationAttributes,
} from './stance_definitions';
import { stances as _stances } from './stances';
import type { stancesAttributes, stancesCreationAttributes } from './stances';
import { students as _students } from './students';
import type {
  studentsAttributes,
  studentsCreationAttributes,
} from './students';
import { students_staging as _students_staging } from './students_staging';
import type {
  students_stagingAttributes,
  students_stagingCreationAttributes,
} from './students_staging';

export {
  _belt_requirements as belt_requirements,
  _blocks as blocks,
  _combinations as combinations,
  _falling as falling,
  _families as families,
  _forms as forms,
  _kicks as kicks,
  _one_steps as one_steps,
  _parent_mapping as parent_mapping,
  _parents as parents,
  _punches as punches,
  _stance_definitions as stance_definitions,
  _stances as stances,
  _students as students,
  _students_staging as students_staging,
};

export type {
  belt_requirementsAttributes,
  belt_requirementsCreationAttributes,
  blocksAttributes,
  blocksCreationAttributes,
  combinationsAttributes,
  combinationsCreationAttributes,
  fallingAttributes,
  fallingCreationAttributes,
  familiesAttributes,
  familiesCreationAttributes,
  formsAttributes,
  formsCreationAttributes,
  kicksAttributes,
  kicksCreationAttributes,
  one_stepsAttributes,
  one_stepsCreationAttributes,
  parent_mappingAttributes,
  parent_mappingCreationAttributes,
  parentsAttributes,
  parentsCreationAttributes,
  punchesAttributes,
  punchesCreationAttributes,
  stance_definitionsAttributes,
  stance_definitionsCreationAttributes,
  stancesAttributes,
  stancesCreationAttributes,
  studentsAttributes,
  studentsCreationAttributes,
  students_stagingAttributes,
  students_stagingCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const belt_requirements = _belt_requirements.initModel(sequelize);
  const blocks = _blocks.initModel(sequelize);
  const combinations = _combinations.initModel(sequelize);
  const falling = _falling.initModel(sequelize);
  const families = _families.initModel(sequelize);
  const forms = _forms.initModel(sequelize);
  const kicks = _kicks.initModel(sequelize);
  const one_steps = _one_steps.initModel(sequelize);
  const parent_mapping = _parent_mapping.initModel(sequelize);
  const parents = _parents.initModel(sequelize);
  const punches = _punches.initModel(sequelize);
  const stance_definitions = _stance_definitions.initModel(sequelize);
  const stances = _stances.initModel(sequelize);
  const students = _students.initModel(sequelize);
  const students_staging = _students_staging.initModel(sequelize);

  parent_mapping.belongsTo(parents, { as: 'parent', foreignKey: 'parentid' });
  parents.hasMany(parent_mapping, {
    as: 'parent_mappings',
    foreignKey: 'parentid',
  });
  blocks.belongsTo(students, { as: 'student', foreignKey: 'studentid' });
  students.hasMany(blocks, { as: 'blocks', foreignKey: 'studentid' });
  combinations.belongsTo(students, { as: 'student', foreignKey: 'studentid' });
  students.hasMany(combinations, {
    as: 'combinations',
    foreignKey: 'studentid',
  });
  falling.belongsTo(students, { as: 'student', foreignKey: 'studentid' });
  students.hasMany(falling, { as: 'fallings', foreignKey: 'studentid' });
  forms.belongsTo(students, { as: 'student', foreignKey: 'studentid' });
  students.hasMany(forms, { as: 'forms', foreignKey: 'studentid' });
  kicks.belongsTo(students, { as: 'student', foreignKey: 'studentid' });
  students.hasMany(kicks, { as: 'kicks', foreignKey: 'studentid' });
  one_steps.belongsTo(students, { as: 'student', foreignKey: 'studentid' });
  students.hasMany(one_steps, { as: 'one_steps', foreignKey: 'studentid' });
  parent_mapping.belongsTo(students, {
    as: 'student',
    foreignKey: 'studentid',
  });
  students.hasMany(parent_mapping, {
    as: 'parent_mappings',
    foreignKey: 'studentid',
  });
  punches.belongsTo(students, { as: 'student', foreignKey: 'studentid' });
  students.hasMany(punches, { as: 'punches', foreignKey: 'studentid' });
  stances.belongsTo(students, { as: 'student', foreignKey: 'studentid' });
  students.hasMany(stances, { as: 'stances', foreignKey: 'studentid' });

  return {
    belt_requirements: belt_requirements,
    blocks: blocks,
    combinations: combinations,
    falling: falling,
    families: families,
    forms: forms,
    kicks: kicks,
    one_steps: one_steps,
    parent_mapping: parent_mapping,
    parents: parents,
    punches: punches,
    stance_definitions: stance_definitions,
    stances: stances,
    students: students,
    students_staging: students_staging,
  };
}
