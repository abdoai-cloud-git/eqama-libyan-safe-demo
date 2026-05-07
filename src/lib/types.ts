export type LeadSource = 'TikTok' | 'Facebook' | 'Direct Link';
export type EntryMethod = 'visa' | 'entry_stamp' | 'informal' | 'current_residency';
export type CaseStatus =
  | 'طلب جديد'
  | 'يحتاج معلومات'
  | 'يحتاج مستندات'
  | 'مؤهل مبدئيًا'
  | 'بانتظار دفع المقدم'
  | 'تم استلام المقدم'
  | 'تحت الإجراء'
  | 'مكتمل'
  | 'غير قابل للبدء حاليًا'
  | 'مغلق';
export type PaymentStatus = 'لم يطلب بعد' | 'بانتظار الدفع' | 'تم استلام المقدم' | 'مكتمل';
export type Classification = 'مؤهل مبدئيًا — إقامة حالية' | 'مؤهل مبدئيًا — وافد جديد' | 'غير قابل للبدء حاليًا' | 'يحتاج مراجعة خاصة' | 'يحتاج معلومات';

export interface ApplicantAnswers {
  fullName: string;
  phone: string;
  nationality: string;
  age: number;
  isInLibya: boolean;
  entryMethod: EntryMethod;
  hasEntryStamp: boolean;
  hasCurrentResidency: boolean;
  hasReleaseLetter: boolean;
  passportValid: boolean;
  hasSecurityApproval: boolean;
  requestedService: string;
  canPayCashDepositAfterAcceptance: boolean;
}

export interface QualificationResult {
  classification: Classification;
  caseStatus: CaseStatus;
  reason: string;
  customerMessage: string;
  internalSummary: string;
  nextStep: string;
  missingInfo: string[];
}

export interface ResidencyCase extends ApplicantAnswers {
  id: string;
  createdAt: string;
  source: LeadSource;
  qualification: QualificationResult;
  status: CaseStatus;
  paymentStatus: PaymentStatus;
  depositAmount?: number;
  depositReceivedAt?: string;
  depositReceivedBy?: string;
  internalNotes: string[];
  owner: string;
  lastUpdated: string;
}

export interface WorkerProfile {
  id: string;
  caseId?: string;
  name: string;
  nationality: string;
  phone: string;
  residencyStatus: string;
  residencyCompletedAt: string;
  sponsorCompany: string;
  workplace: string;
  receivedServices: string[];
  activeServices: string[];
  legalNotes: string;
  lastUpdated: string;
}

export type ServiceStatus = 'طلب جديد' | 'يحتاج معلومات' | 'يحتاج مستندات' | 'قيد المتابعة' | 'مكتمل' | 'ملغي';
export interface ServiceRequest {
  id: string;
  workerName: string;
  serviceType: string;
  status: ServiceStatus;
  priority: 'منخفضة' | 'متوسطة' | 'عالية';
  owner: string;
  notes: string;
  requestedAt: string;
  lastUpdated: string;
}

export type B2BStatus = 'طلب جديد' | 'قيد المراجعة' | 'يحتاج متابعة' | 'تم توفير عمال' | 'مغلق';
export interface B2BRequest {
  id: string;
  companyName: string;
  activityType: string;
  workersNeeded: number;
  location: string;
  preferredNationalities: string;
  status: B2BStatus;
  notes: string;
  lastUpdated: string;
}
