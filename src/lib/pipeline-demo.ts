import type { CaseStatus, Client, PaymentStatus, PipelineStage } from '@/lib/types';

export interface PipelineActivity {
  id: string;
  at: string;
  actor: string;
  title: string;
  description: string;
}

export interface PipelineDocument {
  id: string;
  label: string;
  status: 'مطلوب' | 'تم الاستلام' | 'قيد المراجعة';
}

export interface PipelineClient extends Client {
  source: string;
  owner: string;
  stageEnteredAt: string;
  nextAction: string;
  paymentStatus: PaymentStatus;
  documents: PipelineDocument[];
  activity: PipelineActivity[];
}

export type ClientDraftErrors = Partial<Record<'name' | 'idNumber' | 'phone' | 'email' | 'address', string>>;

export const pipelineStages: PipelineStage[] = [
  { id: 1, name: 'طلب جديد', description: 'تم استلام بيانات العميل من الفورم أو الرسائل.' },
  { id: 2, name: 'مراجعة المستندات', description: 'الفريق يتحقق من الجواز، الختم، والإقامة الحالية.' },
  { id: 3, name: 'بانتظار دفع المقدم', description: 'العميل مؤهل مبدئيًا وبانتظار دفع المقدم كاش.' },
  { id: 4, name: 'تحت الإجراء', description: 'تم استلام المقدم وبدأت متابعة الإجراء داخليًا.' },
  { id: 5, name: 'مكتمل', description: 'انتهت الحالة ويمكن فتح خدمات ما بعد الإقامة.' },
];

export const statusByStage: Record<number, CaseStatus> = {
  1: 'طلب جديد',
  2: 'يحتاج مستندات',
  3: 'بانتظار دفع المقدم',
  4: 'تحت الإجراء',
  5: 'مكتمل',
};

export const nextActionByStage: Record<number, string> = {
  1: 'مراجعة البيانات الأولية وتحديد نقص المعلومات.',
  2: 'طلب صورة الجواز وختم الدخول من العميل عبر واتساب.',
  3: 'إرسال تعليمات دفع المقدم الرسمية وتأكيد الاستلام.',
  4: 'متابعة الإجراء الداخلي وتحديث العميل عند كل خطوة.',
  5: 'فتح خدمات ما بعد الإقامة أو إغلاق الحالة.',
};

export const paymentStatusByStage: Record<number, PaymentStatus> = {
  1: 'لم يطلب بعد',
  2: 'لم يطلب بعد',
  3: 'بانتظار الدفع',
  4: 'تم استلام المقدم',
  5: 'مكتمل',
};

export function calculatePipelineCompletion(stageId: number, totalStages: number) {
  if (totalStages <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((stageId / totalStages) * 100)));
}

export function validateClientDraft(client: Pick<Client, 'name' | 'idNumber' | 'phone' | 'email' | 'address'>): ClientDraftErrors {
  const errors: ClientDraftErrors = {};
  if (!client.name.trim()) errors.name = 'يرجى إدخال اسم العميل.';
  if (!client.idNumber.trim()) errors.idNumber = 'يرجى إدخال رقم الملف.';
  if (!/^\+?\d[\d\s-]{7,}$/.test(client.phone.trim())) errors.phone = 'أدخل رقم هاتف صحيح مثل +218 91 123 4567.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(client.email.trim())) errors.email = 'أدخل بريدًا إلكترونيًا صحيحًا.';
  if (!client.address.trim()) errors.address = 'يرجى إدخال عنوان العميل.';
  return errors;
}

export function createStageActivity(clientName: string, stageId: number): PipelineActivity {
  const stage = pipelineStages.find((item) => item.id === stageId);
  return {
    id: `activity-${stageId}-${Date.now()}`,
    at: '2026-05-07 14:30',
    actor: 'سارة',
    title: `تم نقل العميل إلى ${stage?.name ?? 'مرحلة جديدة'}`,
    description: `${clientName} أصبح الآن في مرحلة ${stage?.name ?? 'غير محددة'}.`,
  };
}

export function movePipelineClient(clients: PipelineClient[], clientId: string, stageId: number): PipelineClient[] {
  const targetClient = clients.find((client) => client.idNumber === clientId);
  const stageExists = pipelineStages.some((stage) => stage.id === stageId);
  if (!stageExists || !targetClient || targetClient.currentStageId === stageId) return clients;

  return clients.map((client) => {
    if (client.idNumber !== clientId) return client;
    return {
      ...client,
      currentStageId: stageId,
      status: statusByStage[stageId] ?? client.status,
      paymentStatus: paymentStatusByStage[stageId] ?? client.paymentStatus,
      nextAction: nextActionByStage[stageId] ?? client.nextAction,
      stageEnteredAt: 'الآن',
      lastUpdated: '2026-05-07',
      activity: [createStageActivity(client.name, stageId), ...client.activity],
    };
  });
}

export const initialPipelineClients: PipelineClient[] = [
  {
    name: 'أحمد محمد',
    idNumber: 'EQ-2026-014',
    currentStageId: 2,
    status: 'يحتاج مستندات',
    email: 'ahmed@example.com',
    phone: '+218 91 123 4567',
    address: 'طرابلس، ليبيا',
    applicationDate: '2026-05-01',
    lastUpdated: '2026-05-07',
    source: 'تيك توك',
    owner: 'سارة',
    stageEnteredAt: 'منذ يومين',
    nextAction: nextActionByStage[2],
    paymentStatus: 'لم يطلب بعد',
    documents: [
      { id: 'passport', label: 'صورة الجواز', status: 'مطلوب' },
      { id: 'stamp', label: 'ختم الدخول', status: 'قيد المراجعة' },
      { id: 'photo', label: 'صورة شخصية', status: 'تم الاستلام' },
    ],
    activity: [
      { id: 'a1', at: '2026-05-07 10:00', actor: 'سارة', title: 'تم طلب المستندات', description: 'تم إرسال رسالة واتساب للعميل بطلب صورة الجواز وختم الدخول.' },
      { id: 'a2', at: '2026-05-01 09:00', actor: 'النظام', title: 'تم فتح الملف', description: 'دخل العميل من حملة تيك توك وتم إنشاء حالة متابعة.' },
    ],
  },
  {
    name: 'محمد حسن',
    idNumber: 'EQ-2026-001',
    currentStageId: 3,
    status: 'بانتظار دفع المقدم',
    email: 'mohamed@example.com',
    phone: '+218 92 111 1101',
    address: 'مصراتة، ليبيا',
    applicationDate: '2026-05-01',
    lastUpdated: '2026-05-07',
    source: 'فيسبوك',
    owner: 'أيوب',
    stageEnteredAt: 'منذ 6 ساعات',
    nextAction: nextActionByStage[3],
    paymentStatus: 'بانتظار الدفع',
    documents: [
      { id: 'passport', label: 'صورة الجواز', status: 'تم الاستلام' },
      { id: 'stamp', label: 'ختم الدخول', status: 'تم الاستلام' },
    ],
    activity: [
      { id: 'b1', at: '2026-05-07 12:00', actor: 'أيوب', title: 'تم قبول الحالة مبدئيًا', description: 'الخطوة التالية هي دفع المقدم كاش حسب القنوات الرسمية.' },
    ],
  },
  {
    name: 'مصطفى رحمان',
    idNumber: 'EQ-2026-003',
    currentStageId: 4,
    status: 'تحت الإجراء',
    email: 'mustafa@example.com',
    phone: '+218 94 111 1103',
    address: 'بنغازي، ليبيا',
    applicationDate: '2026-05-03',
    lastUpdated: '2026-05-08',
    source: 'تيك توك',
    owner: 'محمود',
    stageEnteredAt: 'منذ 3 أيام',
    nextAction: nextActionByStage[4],
    paymentStatus: 'تم استلام المقدم',
    documents: [
      { id: 'passport', label: 'صورة الجواز', status: 'تم الاستلام' },
      { id: 'stamp', label: 'ختم الدخول', status: 'تم الاستلام' },
    ],
    activity: [
      { id: 'c1', at: '2026-05-08 15:20', actor: 'محمود', title: 'بدأ الإجراء الداخلي', description: 'تم تأكيد المقدم ونقل الملف للمتابعة.' },
    ],
  },
  {
    name: 'سعيد الطاهر',
    idNumber: 'EQ-2026-009',
    currentStageId: 5,
    status: 'مكتمل',
    email: 'saeed@example.com',
    phone: '+218 91 111 1109',
    address: 'سبها، ليبيا',
    applicationDate: '2026-05-02',
    lastUpdated: '2026-05-09',
    source: 'رابط مباشر',
    owner: 'محمود',
    stageEnteredAt: 'منذ يوم',
    nextAction: nextActionByStage[5],
    paymentStatus: 'مكتمل',
    documents: [
      { id: 'passport', label: 'صورة الجواز', status: 'تم الاستلام' },
      { id: 'stamp', label: 'ختم الدخول', status: 'تم الاستلام' },
    ],
    activity: [
      { id: 'd1', at: '2026-05-09 16:00', actor: 'النظام', title: 'اكتملت الحالة', description: 'يمكن الآن فتح خدمات ما بعد الإقامة.' },
    ],
  },
  {
    name: 'خالد عمر',
    idNumber: 'EQ-2026-004',
    currentStageId: 1,
    status: 'طلب جديد',
    email: 'khaled@example.com',
    phone: '+218 95 111 1104',
    address: 'طرابلس، ليبيا',
    applicationDate: '2026-05-07',
    lastUpdated: '2026-05-07',
    source: 'فيسبوك',
    owner: 'أيوب',
    stageEnteredAt: 'منذ ساعة',
    nextAction: nextActionByStage[1],
    paymentStatus: 'لم يطلب بعد',
    documents: [{ id: 'passport', label: 'صورة الجواز', status: 'مطلوب' }],
    activity: [{ id: 'e1', at: '2026-05-07 13:00', actor: 'النظام', title: 'طلب جديد', description: 'تم إنشاء الطلب من نموذج التقييم.' }],
  },
];
