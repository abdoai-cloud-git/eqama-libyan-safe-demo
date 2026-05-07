'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, RotateCcw, Save } from 'lucide-react';
import type { PipelineClient } from '@/lib/pipeline-demo';
import { validateClientDraft } from '@/lib/pipeline-demo';

interface ClientCardProps {
  client: PipelineClient;
  onSave: (client: PipelineClient, originalIdNumber: string) => void;
}

export default function ClientCard({ client, onSave }: ClientCardProps) {
  const [draft, setDraft] = useState<PipelineClient>(client);
  const [saveState, setSaveState] = useState<'idle' | 'saved'>('idle');
  const [showErrors, setShowErrors] = useState(false);

  const errors = useMemo(() => validateClientDraft(draft), [draft]);
  const hasErrors = Object.keys(errors).length > 0;
  const hasChanges = JSON.stringify(draft) !== JSON.stringify(client);

  const updateField = <K extends keyof PipelineClient>(key: K, value: PipelineClient[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setSaveState('idle');
  };

  const save = () => {
    setShowErrors(true);
    if (hasErrors) return;
    onSave({ ...draft, lastUpdated: '2026-05-07' }, client.idNumber);
    setSaveState('saved');
  };

  const reset = () => {
    setDraft(client);
    setShowErrors(false);
    setSaveState('idle');
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-slate-950">بطاقة العميل</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">عدّل البيانات ثم احفظ التغييرات بشكل واضح.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {hasChanges && <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">تغييرات غير محفوظة</span>}
          {saveState === 'saved' && <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800"><CheckCircle2 size={14} /> تم الحفظ</span>}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="اسم العميل" error={showErrors ? errors.name : undefined}>
          <input className="field" value={draft.name} onChange={(event) => updateField('name', event.target.value)} />
        </Field>
        <Field label="رقم الملف / الهوية">
          <input className="field bg-slate-50 text-slate-500" dir="ltr" value={draft.idNumber} readOnly aria-readonly="true" />
          <span className="block text-xs text-slate-500">رقم الملف ثابت لمنع تكرار الحالات. يمكن تعديل باقي بيانات العميل.</span>
        </Field>
        <Field label="رقم الهاتف" error={showErrors ? errors.phone : undefined}>
          <input className="field" dir="ltr" type="tel" value={draft.phone} onChange={(event) => updateField('phone', event.target.value)} />
        </Field>
        <Field label="البريد الإلكتروني" error={showErrors ? errors.email : undefined}>
          <input className="field" dir="ltr" type="email" value={draft.email} onChange={(event) => updateField('email', event.target.value)} />
        </Field>
        <Field label="العنوان" error={showErrors ? errors.address : undefined}>
          <input className="field" value={draft.address} onChange={(event) => updateField('address', event.target.value)} />
        </Field>
        <Field label="المسؤول">
          <input className="field" value={draft.owner} onChange={(event) => updateField('owner', event.target.value)} />
        </Field>
        <Field label="تاريخ فتح الملف">
          <input className="field" type="date" value={draft.applicationDate} onChange={(event) => updateField('applicationDate', event.target.value)} />
        </Field>
        <Field label="حالة المتابعة">
          <input className="field bg-slate-50 text-slate-500" value={draft.status} readOnly aria-readonly="true" />
          <span className="block text-xs text-slate-500">يتم تغيير الحالة من أزرار المسار لضمان توافق المرحلة والدفع والإجراء التالي.</span>
        </Field>
      </div>

      <div className="mt-5 flex flex-wrap justify-between gap-3 border-t border-slate-100 pt-4">
        <button type="button" className="btn-secondary" onClick={reset} disabled={!hasChanges}>
          <RotateCcw size={16} /> إلغاء
        </button>
        <button type="button" className="btn-primary" onClick={save}>
          <Save size={16} /> حفظ بيانات العميل
        </button>
      </div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="space-y-2">
      <span className="block text-sm font-bold text-slate-700">{label}</span>
      {children}
      {error && <span className="block text-xs font-bold text-rose-700">{error}</span>}
    </label>
  );
}
