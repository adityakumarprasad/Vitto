// ============================================================
// applicationSchema.js – Zod schema for the combined Home form
// ============================================================

import { z } from 'zod';
import { BUSINESS_TYPES, LOAN_PURPOSES } from '../utils/constants';

const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

export const applicationSchema = z
  .object({
    ownerName: z
      .string()
      .trim()
      .min(3, 'Owner name must be at least 3 characters'),

    pan: z
      .string()
      .trim()
      .transform((v) => v.toUpperCase())
      .refine((v) => panRegex.test(v), 'PAN must match format ABCDE1234F'),

    businessType: z
      .string()
      .min(1, 'Select a business type')
      .refine((v) => BUSINESS_TYPES.includes(v), 'Invalid business type'),

    monthlyRevenue: z.coerce
      .number({ invalid_type_error: 'Revenue must be a number' })
      .positive('Monthly revenue must be positive'),

    loanAmount: z.coerce
      .number({ invalid_type_error: 'Loan amount must be a number' })
      .positive('Loan amount must be positive'),

    tenure: z.coerce
      .number({ invalid_type_error: 'Tenure must be a number' })
      .int('Tenure must be a whole number')
      .min(6, 'Tenure must be at least 6 months')
      .max(120, 'Tenure cannot exceed 120 months'),

    purpose: z
      .string()
      .min(1, 'Select a loan purpose')
      .refine((v) => LOAN_PURPOSES.includes(v), 'Invalid loan purpose'),
  })
  .superRefine((data, ctx) => {
    if (data.loanAmount > data.monthlyRevenue * 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['loanAmount'],
        message: 'Loan amount cannot exceed 100x monthly revenue',
      });
    }
  });
