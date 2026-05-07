import type { ApplicantAnswers, QualificationResult } from '@/lib/types';

const missing = (answers: ApplicantAnswers) => {
  const items: string[] = [];
  if (!answers.fullName.trim()) items.push('الاسم الكامل');
  if (!answers.phone.trim()) items.push('رقم الهاتف / واتساب');
  if (!answers.nationality.trim()) items.push('الجنسية');
  if (!answers.requestedService.trim()) items.push('الخدمة المطلوبة');
  if (!answers.passportValid) items.push('جواز سفر ساري');
  return items;
};

export function qualifyApplicant(answers: ApplicantAnswers): QualificationResult {
  const missingInfo = missing(answers);
  if (missingInfo.length > 0) {
    return {
      classification: 'يحتاج معلومات',
      caseStatus: 'يحتاج معلومات',
      reason: `البيانات ناقصة: ${missingInfo.join('، ')}`,
      customerMessage: 'بياناتك تحتاج استكمال قبل مراجعة الحالة. سيطلب منك الفريق المعلومات الناقصة.',
      internalSummary: `حالة تحتاج استكمال بيانات: ${missingInfo.join('، ')}`,
      nextStep: 'استكمال البيانات الناقصة ثم إعادة التصنيف.',
      missingInfo,
    };
  }

  if (answers.entryMethod === 'informal') {
    return {
      classification: 'غير قابل للبدء حاليًا',
      caseStatus: 'غير قابل للبدء حاليًا',
      reason: 'دخول غير رسمي إلى ليبيا.',
      customerMessage: 'حالتك غير قابلة للبدء حاليًا لأن طريقة الدخول غير رسمية. يجب أن يكون لديك دخول رسمي موثق قبل تقديم طلب جديد.',
      internalSummary: `${answers.fullName} غير قابل للبدء: دخول غير رسمي.` ,
      nextStep: 'الحصول على دخول رسمي موثق ثم تقديم طلب جديد.',
      missingInfo: [],
    };
  }

  if (!answers.hasEntryStamp && !answers.hasCurrentResidency) {
    return {
      classification: 'غير قابل للبدء حاليًا',
      caseStatus: 'غير قابل للبدء حاليًا',
      reason: 'لا يوجد ختم دخول رسمي.',
      customerMessage: 'حالتك غير قابلة للبدء حاليًا لأنك لا تملك ختم دخول رسمي. بعد استكمال هذا الشرط يمكنك تقديم طلب جديد.',
      internalSummary: `${answers.fullName} غير قابل للبدء: لا يوجد ختم دخول رسمي.`,
      nextStep: 'الحصول على دخول رسمي موثق بختم دخول، ثم تقديم طلب جديد.',
      missingInfo: [],
    };
  }

  if (answers.hasCurrentResidency && !answers.hasReleaseLetter) {
    return {
      classification: 'غير قابل للبدء حاليًا',
      caseStatus: 'غير قابل للبدء حاليًا',
      reason: 'لديه إقامة حالية لكن لا يملك إخلاء طرف من الكفيل السابق.',
      customerMessage: 'لا يمكن البدء في إجراءاتك حاليًا لأن لديك إقامة سابقة ولا تملك إخلاء طرف من الكفيل السابق.',
      internalSummary: `${answers.fullName} لديه إقامة سابقة بدون إخلاء طرف.` ,
      nextStep: 'الحصول على إخلاء الطرف، وبعدها يمكن تقديم طلب جديد للمراجعة.',
      missingInfo: ['إخلاء طرف من الكفيل السابق'],
    };
  }

  if (answers.age > 65) {
    return {
      classification: 'يحتاج مراجعة خاصة',
      caseStatus: 'يحتاج معلومات',
      reason: 'العمر فوق 65 سنة ويحتاج مسار مراجعة خاصة.',
      customerMessage: 'حالتك تحتاج مراجعة خاصة من الفريق. تم حفظ بياناتك مبدئيًا وسيقوم الفريق بمراجعتها.',
      internalSummary: `${answers.fullName} عمره ${answers.age} سنة ويحتاج مراجعة خاصة.` ,
      nextStep: 'تحويل الحالة لمسؤول مراجعة خاصة قبل طلب أي دفع.',
      missingInfo: [],
    };
  }

  if (answers.hasCurrentResidency && answers.hasReleaseLetter) {
    return {
      classification: 'مؤهل مبدئيًا — إقامة حالية',
      caseStatus: 'مؤهل مبدئيًا',
      reason: 'لديه إقامة حالية وإخلاء طرف.',
      customerMessage: 'حالتك مؤهلة مبدئيًا. سيقوم الفريق بمراجعة بياناتك والتواصل معك لتأكيد الخطوة التالية. هذه النتيجة ليست موافقة نهائية.',
      internalSummary: `${answers.fullName} مؤهل مبدئيًا كحالة إقامة حالية مع إخلاء طرف.` ,
      nextStep: 'مراجعة الفريق ثم طلب المستندات أو المقدم عند القبول المبدئي.',
      missingInfo: [],
    };
  }

  return {
    classification: 'مؤهل مبدئيًا — وافد جديد',
    caseStatus: 'مؤهل مبدئيًا',
    reason: 'وافد جديد لديه دخول رسمي موثق.',
    customerMessage: 'حالتك مؤهلة مبدئيًا. سيقوم الفريق بمراجعة بياناتك والتواصل معك لتأكيد الخطوة التالية. هذه النتيجة ليست موافقة نهائية.',
    internalSummary: `${answers.fullName} مؤهل مبدئيًا كوافد جديد لديه ختم دخول.` ,
    nextStep: 'مراجعة الفريق ثم طلب المستندات أو المقدم عند القبول المبدئي.',
    missingInfo: [],
  };
}
