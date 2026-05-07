import { describe, expect, it } from 'vitest';
import { qualifyApplicant } from './rules';

describe('qualifyApplicant', () => {
  it('marks informal entry as not startable', () => {
    const result = qualifyApplicant({
      fullName: 'أحمد علي',
      phone: '0910000000',
      nationality: 'مصري',
      age: 34,
      isInLibya: true,
      entryMethod: 'informal',
      hasEntryStamp: false,
      hasCurrentResidency: false,
      hasReleaseLetter: false,
      passportValid: true,
      hasSecurityApproval: false,
      requestedService: 'إقامة جديدة',
      canPayCashDepositAfterAcceptance: true,
    });

    expect(result.classification).toBe('غير قابل للبدء حاليًا');
    expect(result.caseStatus).toBe('غير قابل للبدء حاليًا');
    expect(result.reason).toContain('دخول غير رسمي');
  });

  it('requires release letter for existing residency', () => {
    const result = qualifyApplicant({
      fullName: 'محمد حسن',
      phone: '0920000000',
      nationality: 'سوداني',
      age: 41,
      isInLibya: true,
      entryMethod: 'current_residency',
      hasEntryStamp: true,
      hasCurrentResidency: true,
      hasReleaseLetter: false,
      passportValid: true,
      hasSecurityApproval: true,
      requestedService: 'نقل كفالة / ترتيب إقامة',
      canPayCashDepositAfterAcceptance: true,
    });

    expect(result.classification).toBe('غير قابل للبدء حاليًا');
    expect(result.reason).toContain('إخلاء طرف');
    expect(result.nextStep).toContain('إخلاء الطرف');
  });

  it('qualifies current residency with release letter', () => {
    const result = qualifyApplicant({
      fullName: 'آدم سليمان',
      phone: '0930000000',
      nationality: 'تشادي',
      age: 29,
      isInLibya: true,
      entryMethod: 'current_residency',
      hasEntryStamp: true,
      hasCurrentResidency: true,
      hasReleaseLetter: true,
      passportValid: true,
      hasSecurityApproval: true,
      requestedService: 'إقامة حالية مع إخلاء طرف',
      canPayCashDepositAfterAcceptance: true,
    });

    expect(result.classification).toBe('مؤهل مبدئيًا — إقامة حالية');
    expect(result.caseStatus).toBe('مؤهل مبدئيًا');
  });

  it('qualifies a new arrival with entry stamp', () => {
    const result = qualifyApplicant({
      fullName: 'مصطفى رحمان',
      phone: '0940000000',
      nationality: 'بنغلاديشي',
      age: 25,
      isInLibya: true,
      entryMethod: 'visa',
      hasEntryStamp: true,
      hasCurrentResidency: false,
      hasReleaseLetter: false,
      passportValid: true,
      hasSecurityApproval: false,
      requestedService: 'إقامة وافد جديد',
      canPayCashDepositAfterAcceptance: true,
    });

    expect(result.classification).toBe('مؤهل مبدئيًا — وافد جديد');
    expect(result.caseStatus).toBe('مؤهل مبدئيًا');
  });

  it('routes applicants above 65 to special review before normal approval', () => {
    const result = qualifyApplicant({
      fullName: 'خالد عمر',
      phone: '0950000000',
      nationality: 'سوري',
      age: 68,
      isInLibya: true,
      entryMethod: 'visa',
      hasEntryStamp: true,
      hasCurrentResidency: false,
      hasReleaseLetter: false,
      passportValid: true,
      hasSecurityApproval: true,
      requestedService: 'إقامة وافد جديد',
      canPayCashDepositAfterAcceptance: true,
    });

    expect(result.classification).toBe('يحتاج مراجعة خاصة');
    expect(result.caseStatus).toBe('يحتاج معلومات');
    expect(result.reason).toContain('65');
  });
});
