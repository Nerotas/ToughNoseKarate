import { Op } from 'sequelize';

export const operatorConverter = (dataGridOperator: string): symbol => {
  switch (dataGridOperator) {
    case 'equals':
      return Op.eq;
    case 'notEquals':
      return Op.ne;
    case 'contains':
      return Op.substring;
    case 'notContains':
      return Op.notLike;
    case 'startsWith':
      return Op.like;
    case 'isEmpty':
      return Op.is;
    case 'isNotEmpty':
      return Op.not;
    case 'isAnyOf':
      return Op.in;
    case 'greaterThan':
      return Op.gt;
    case 'greaterThanOrEqual':
      return Op.gte;
    case 'lessThan':
      return Op.lt;
    case 'lessThanOrEqual':
      return Op.lte;
    case 'and':
      return Op.and;
    case 'or':
      return Op.or;
    case 'is':
      return Op.eq;
    default:
      return Op.eq;
  }
};

export default operatorConverter;
