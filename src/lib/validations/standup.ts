import * as yup from 'yup';

export const standupSchema = yup.object({
  yesterday: yup
    .string()
    .min(10, 'Please provide more details about yesterday\'s work (at least 10 characters)')
    .required('Yesterday\'s accomplishments are required'),
  today: yup
    .string()
    .min(10, 'Please provide more details about today\'s plans (at least 10 characters)')
    .required('Today\'s plans are required'),
  blockers: yup
    .string()
    .default('None'),
});

export type StandupFormData = yup.InferType<typeof standupSchema>;