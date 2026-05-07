'use client';

import { create } from 'zustand';
import type { ApplicantAnswers, CaseStatus, PaymentStatus, ResidencyCase, ServiceRequest, WorkerProfile } from '@/lib/types';
import { demoCases } from '@/lib/demo-data/cases';
import { demoWorkers } from '@/lib/demo-data/workers';
import { demoServices } from '@/lib/demo-data/services';
import { qualifyApplicant } from '@/lib/qualification/rules';
import { createCaseUpdate } from '@/lib/pipeline';

type DemoStore = {
  cases: ResidencyCase[];
  workers: WorkerProfile[];
  services: ServiceRequest[];
  addCaseFromIntake: (answers: ApplicantAnswers) => ResidencyCase;
  updateCaseStatus: (id: string, status: CaseStatus) => void;
  updatePayment: (id: string, paymentStatus: PaymentStatus) => void;
  addNote: (id: string, note: string) => void;
  convertToWorker: (id: string) => void;
};

const today = () => new Date().toISOString().slice(0, 10);

export const useDemoStore = create<DemoStore>((set, get) => ({
  cases: demoCases,
  workers: demoWorkers,
  services: demoServices,
  addCaseFromIntake: (answers) => {
    const qualification = qualifyApplicant(answers);
    const id = `CASE-${String(get().cases.length + 1).padStart(4, '0')}`;
    const newCase: ResidencyCase = {
      ...answers,
      id,
      createdAt: new Date().toISOString(),
      source: 'Direct Link',
      qualification,
      status: qualification.caseStatus,
      paymentStatus: 'لم يطلب بعد',
      internalNotes: ['تم إنشاء الحالة من شات التأهيل.', qualification.internalSummary],
      clientUpdates: [createCaseUpdate(qualification.caseStatus, qualification.internalSummary)],
      owner: 'غير محدد',
      lastUpdated: today(),
    };
    set((state) => ({ cases: [newCase, ...state.cases] }));
    return newCase;
  },
  updateCaseStatus: (id, status) => set((state) => ({
    cases: state.cases.map((item) => item.id === id ? {
      ...item,
      status,
      lastUpdated: today(),
      internalNotes: [`تم تغيير الحالة إلى: ${status}`, ...item.internalNotes],
      clientUpdates: [createCaseUpdate(status), ...item.clientUpdates],
    } : item),
  })),
  updatePayment: (id, paymentStatus) => set((state) => ({
    cases: state.cases.map((item) => item.id === id ? {
      ...item,
      paymentStatus,
      depositAmount: paymentStatus === 'لم يطلب بعد' ? undefined : item.depositAmount ?? 750,
      depositReceivedAt: paymentStatus === 'تم استلام المقدم' || paymentStatus === 'مكتمل' ? today() : item.depositReceivedAt,
      depositReceivedBy: paymentStatus === 'تم استلام المقدم' || paymentStatus === 'مكتمل' ? 'أيوب' : item.depositReceivedBy,
      lastUpdated: today(),
      internalNotes: [`تم تحديث الدفع إلى: ${paymentStatus}`, ...item.internalNotes],
      clientUpdates: [
        createCaseUpdate(paymentStatus === 'تم استلام المقدم' ? 'تم استلام المقدم' : item.status, `تم تحديث حالة الدفع إلى: ${paymentStatus}`),
        ...item.clientUpdates,
      ],
    } : item),
  })),
  addNote: (id, note) => set((state) => ({
    cases: state.cases.map((item) => item.id === id ? { ...item, internalNotes: [note, ...item.internalNotes], lastUpdated: today() } : item),
  })),
  convertToWorker: (id) => {
    const item = get().cases.find((entry) => entry.id === id);
    if (!item) return;
    const exists = get().workers.some((worker) => worker.caseId === id);
    if (exists) return;
    const worker: WorkerProfile = {
      id: `W-${String(get().workers.length + 1).padStart(3, '0')}`,
      caseId: item.id,
      name: item.fullName,
      nationality: item.nationality,
      phone: item.phone,
      residencyStatus: 'الإقامة مكتملة',
      residencyCompletedAt: today(),
      sponsorCompany: 'الإقامة الليبية الآمنة',
      workplace: 'غير محدد',
      receivedServices: ['إقامة'],
      activeServices: [],
      legalNotes: 'تم التحويل من حالة إقامة مكتملة.',
      lastUpdated: today(),
    };
    set((state) => ({ workers: [worker, ...state.workers] }));
  },
}));
