import type { CaseStatus, CaseUpdate } from '@/lib/types';

export const pipelineStages: CaseStatus[] = [
  'طلب جديد',
  'يحتاج معلومات',
  'يحتاج مستندات',
  'مؤهل مبدئيًا',
  'بانتظار دفع المقدم',
  'تم استلام المقدم',
  'تحت الإجراء',
  'مكتمل',
];

export function getClientStatusMessage(status: CaseStatus): string {
  const messages: Record<CaseStatus, string> = {
    'طلب جديد': 'تم استلام طلبك وسيتم فرزه مبدئيًا من الفريق.',
    'يحتاج معلومات': 'طلبك يحتاج معلومات إضافية قبل أن نقدر نكمل المراجعة.',
    'يحتاج مستندات': 'طلبك يحتاج مستندات إضافية. سيقوم الفريق بتحديد المطلوب.',
    'مؤهل مبدئيًا': 'حالتك مؤهلة مبدئيًا، وسيقوم الفريق بتأكيد الخطوة التالية بعد المراجعة.',
    'بانتظار دفع المقدم': 'تم قبول الحالة مبدئيًا. الخطوة التالية هي دفع المقدم كاش حسب تعليمات الفريق.',
    'تم استلام المقدم': 'تم تسجيل استلام المقدم، وسيتم تحويل الحالة للمتابعة الإجرائية.',
    'تحت الإجراء': 'حالتك الآن تحت الإجراء والمتابعة من الفريق.',
    'مكتمل': 'تم اكتمال الحالة. يمكن الآن متابعة خدمات ما بعد الإقامة عند الحاجة.',
    'غير قابل للبدء حاليًا': 'حالتك غير قابلة للبدء حاليًا. يرجى مراجعة السبب والخطوة المطلوبة.',
    'مغلق': 'تم إغلاق الحالة. يمكن إعادة فتحها لاحقًا عند توفر شروط جديدة.',
  };
  return messages[status];
}

export function createCaseUpdate(status: CaseStatus, internalNote?: string): CaseUpdate {
  return {
    id: `UPD-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    at: new Date().toISOString(),
    status,
    title: `تحديث الحالة: ${status}`,
    clientMessage: getClientStatusMessage(status),
    internalNote: internalNote ?? `تم تحديث مسار العميل إلى: ${status}`,
    visibleToClient: true,
  };
}

export function getPipelineIndex(status: CaseStatus): number {
  const index = pipelineStages.indexOf(status);
  if (index >= 0) return index;
  if (status === 'غير قابل للبدء حاليًا' || status === 'مغلق') return -1;
  return 0;
}
