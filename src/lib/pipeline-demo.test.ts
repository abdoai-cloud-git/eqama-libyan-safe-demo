import { describe, expect, it } from 'vitest';
import { calculatePipelineCompletion, validateClientDraft } from './pipeline-demo';

describe('pipeline demo helpers', () => {
  it('calculates stage progress from one-based stage position', () => {
    expect(calculatePipelineCompletion(1, 5)).toBe(20);
    expect(calculatePipelineCompletion(2, 5)).toBe(40);
    expect(calculatePipelineCompletion(5, 5)).toBe(100);
  });

  it('validates required editable client card fields', () => {
    const errors = validateClientDraft({
      name: '',
      idNumber: 'EQ-2026-014',
      phone: '123',
      email: 'bad-email',
      address: '',
    });

    expect(errors.name).toBe('يرجى إدخال اسم العميل.');
    expect(errors.phone).toBe('أدخل رقم هاتف صحيح مثل +218 91 123 4567.');
    expect(errors.email).toBe('أدخل بريدًا إلكترونيًا صحيحًا.');
    expect(errors.address).toBe('يرجى إدخال عنوان العميل.');
  });
});
