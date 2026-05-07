import { describe, expect, it } from 'vitest';
import { calculatePipelineCompletion, initialPipelineClients, movePipelineClient, validateClientDraft } from './pipeline-demo';

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

  it('moves a pipeline client through a single transition helper', () => {
    const clients = movePipelineClient(initialPipelineClients, 'EQ-2026-014', 3);
    const moved = clients.find((client) => client.idNumber === 'EQ-2026-014');

    expect(moved?.currentStageId).toBe(3);
    expect(moved?.status).toBe('بانتظار دفع المقدم');
    expect(moved?.paymentStatus).toBe('بانتظار الدفع');
    expect(moved?.nextAction).toContain('دفع المقدم');
    expect(moved?.activity[0].title).toBe('تم نقل العميل إلى بانتظار دفع المقدم');
  });

  it('does not create activity when dropped onto the same stage', () => {
    const original = initialPipelineClients.find((client) => client.idNumber === 'EQ-2026-014');
    const clients = movePipelineClient(initialPipelineClients, 'EQ-2026-014', 2);
    const moved = clients.find((client) => client.idNumber === 'EQ-2026-014');

    expect(moved?.activity.length).toBe(original?.activity.length);
  });

  it('ignores invalid stage ids so clients cannot disappear from the board', () => {
    const clients = movePipelineClient(initialPipelineClients, 'EQ-2026-014', 99);
    const moved = clients.find((client) => client.idNumber === 'EQ-2026-014');

    expect(moved?.currentStageId).toBe(2);
    expect(moved?.status).toBe('يحتاج مستندات');
  });
});
