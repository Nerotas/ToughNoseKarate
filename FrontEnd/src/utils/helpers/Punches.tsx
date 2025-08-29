import * as Yup from 'yup';

export const validationSchema = Yup.object({
  name: Yup.string().trim().min(2, 'Too short').max(100, 'Too long').nullable(),
  korean: Yup.string().trim().max(100, 'Too long').nullable(),
  description: Yup.string().trim().max(2000, 'Too long').nullable(),
  belt: Yup.string().trim().nullable(),
  beltColor: Yup.string().trim().nullable(),
  target: Yup.string().trim().max(200, 'Too long').nullable(),
  execution: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]).nullable(),
  keyPoints: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]).nullable(),
  commonMistakes: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]).nullable(),
  applications: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]).nullable(),
});
