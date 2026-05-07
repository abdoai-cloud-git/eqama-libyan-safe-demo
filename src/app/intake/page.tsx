 'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Badge, Card, PageTitle, Shell, TopNav, statusTone } from '@/components/ui';
import type { ApplicantAnswers, EntryMethod } from '@/lib/types';
import { useDemoStore } from '@/store/demo-store';

type Draft = Partial<ApplicantAnswers>;
const nationalities = ['مصري','سوداني','تشادي','نيجري','سوري','بنغلاديشي','باكستاني','غاني'];
const services = ['إقامة وافد جديد','ترتيب إقامة حالية','نقل كفالة / إخلاء طرف','استشارة حالة','خدمات ما بعد الإقامة'];

export default function IntakePage() {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>({ isInLibya: true, passportValid: true, canPayCashDepositAfterAcceptance: true });
  const [createdId, setCreatedId] = useState<string | null>(null);
  const addCase = useDemoStore((s) => s.addCaseFromIntake);
  const createdCase = useDemoStore((s) => s.cases.find((c) => c.id === createdId));

  const steps = useMemo(() => [
    { label:'الاسم الكامل', render: <input className="field" value={draft.fullName ?? ''} onChange={(e)=>setDraft({...draft, fullName:e.target.value})} placeholder="مثال: محمد حسن"/> },
    { label:'رقم الهاتف / واتساب', render: <input className="field" value={draft.phone ?? ''} onChange={(e)=>setDraft({...draft, phone:e.target.value})} placeholder="091..."/> },
    { label:'الجنسية', render: <div className="grid grid-cols-2 gap-2">{nationalities.map(n => <Choice key={n} active={draft.nationality===n} onClick={()=>setDraft({...draft,nationality:n})}>{n}</Choice>)}</div> },
    { label:'العمر', render: <input className="field" type="number" value={draft.age ?? ''} onChange={(e)=>setDraft({...draft, age:Number(e.target.value)})} placeholder="مثال: 32"/> },
    { label:'هل أنت داخل ليبيا حاليًا؟', render: <YesNo value={draft.isInLibya} set={(v)=>setDraft({...draft,isInLibya:v})}/> },
    { label:'كيف دخلت ليبيا؟', render: <div className="grid gap-2"><Choice active={draft.entryMethod==='visa'} onClick={()=>setDraft({...draft,entryMethod:'visa', hasCurrentResidency:false})}>بتأشيرة</Choice><Choice active={draft.entryMethod==='entry_stamp'} onClick={()=>setDraft({...draft,entryMethod:'entry_stamp', hasCurrentResidency:false})}>ختم دخول فقط</Choice><Choice active={draft.entryMethod==='informal'} onClick={()=>setDraft({...draft,entryMethod:'informal', hasEntryStamp:false, hasCurrentResidency:false})}>دخول غير رسمي</Choice><Choice active={draft.entryMethod==='current_residency'} onClick={()=>setDraft({...draft,entryMethod:'current_residency', hasCurrentResidency:true, hasEntryStamp:true})}>لدي إقامة حالية</Choice></div> },
    { label:'هل لديك ختم دخول رسمي؟', render: <YesNo value={draft.hasEntryStamp} set={(v)=>setDraft({...draft,hasEntryStamp:v})}/> },
    { label:'هل لديك إقامة حالية؟', render: <YesNo value={draft.hasCurrentResidency} set={(v)=>setDraft({...draft,hasCurrentResidency:v, entryMethod: v ? 'current_residency' : (draft.entryMethod as EntryMethod)})}/> },
    { label:'إذا لديك إقامة: هل لديك إخلاء طرف من الكفيل السابق؟', render: <YesNo value={draft.hasReleaseLetter} set={(v)=>setDraft({...draft,hasReleaseLetter:v})}/> },
    { label:'هل جواز السفر ساري؟', render: <YesNo value={draft.passportValid} set={(v)=>setDraft({...draft,passportValid:v})}/> },
    { label:'هل لديك موافقة أمنية؟', render: <YesNo value={draft.hasSecurityApproval} set={(v)=>setDraft({...draft,hasSecurityApproval:v})}/> },
    { label:'ما الخدمة التي تحتاجها؟', render: <div className="grid gap-2">{services.map(s => <Choice key={s} active={draft.requestedService===s} onClick={()=>setDraft({...draft,requestedService:s})}>{s}</Choice>)}</div> },
    { label:'هل تستطيع دفع مقدم كاش بعد قبول الحالة؟', render: <YesNo value={draft.canPayCashDepositAfterAcceptance} set={(v)=>setDraft({...draft,canPayCashDepositAfterAcceptance:v})}/> },
  ], [draft]);

  const canSubmit = draft.fullName && draft.phone && draft.nationality && draft.age && draft.entryMethod && draft.requestedService;
  const submit = () => {
    if (!canSubmit) return;
    const newCase = addCase({
      fullName: draft.fullName!, phone: draft.phone!, nationality: draft.nationality!, age: Number(draft.age),
      isInLibya: Boolean(draft.isInLibya), entryMethod: draft.entryMethod!, hasEntryStamp: Boolean(draft.hasEntryStamp),
      hasCurrentResidency: Boolean(draft.hasCurrentResidency), hasReleaseLetter: Boolean(draft.hasReleaseLetter),
      passportValid: Boolean(draft.passportValid), hasSecurityApproval: Boolean(draft.hasSecurityApproval),
      requestedService: draft.requestedService!, canPayCashDepositAfterAcceptance: Boolean(draft.canPayCashDepositAfterAcceptance),
    });
    setCreatedId(newCase.id);
  };

  return <><TopNav/><Shell><PageTitle title="شات التأهيل" subtitle="سؤال واحد في كل مرة. لا نذكر سعرًا ولا نطلب دفعًا قبل مراجعة الفريق." />
    <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
      <Card><div className="mb-4 flex items-center justify-between"><span className="font-bold">التقدم</span><Badge><span dir="rtl">الخطوة {Math.min(step+1, steps.length)} من {steps.length}</span></Badge></div><div className="h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full bg-teal-700 transition-all" style={{width:`${((step+1)/steps.length)*100}%`}} /></div><p className="mt-4 text-sm leading-7 text-slate-600">الهدف ليس أخذ قرار نهائي، بل تصنيف مبدئي واضح وتحويل العميل إلى حالة للفريق.</p></Card>
      <Card>
        {createdCase ? <div className="space-y-5"><CheckCircle2 className="h-12 w-12 text-teal-700"/><Badge tone={statusTone(createdCase.qualification.classification)}>{createdCase.qualification.classification}</Badge><h2 className="text-2xl font-black">{createdCase.qualification.caseStatus}</h2><p className="leading-8 text-slate-700">{createdCase.qualification.customerMessage}</p><div className="rounded-2xl bg-slate-50 p-4 text-sm leading-7"><b>السبب:</b> {createdCase.qualification.reason}<br/><b>الخطوة القادمة:</b> {createdCase.qualification.nextStep}</div><Link href={`/admin/cases/${createdCase.id}`} className="inline-flex rounded-2xl bg-teal-700 px-5 py-3 font-bold text-white">فتح الحالة في لوحة الفريق</Link></div> : <div><p className="mb-4 text-sm font-bold text-teal-800">{steps[step].label}</p>{steps[step].render}<div className="mt-8 flex justify-between"><button className="btn-secondary" disabled={step===0} onClick={()=>setStep(Math.max(0,step-1))}><ArrowRight size={16}/> السابق</button>{step < steps.length-1 ? <button className="btn-primary" onClick={()=>setStep(step+1)}>التالي <ArrowLeft size={16}/></button> : <button className="btn-primary" disabled={!canSubmit} onClick={submit}>إظهار النتيجة</button>}</div></div>}
      </Card>
    </div>
  </Shell></>;
}

function Choice({ active, onClick, children }: { active?: boolean; onClick: ()=>void; children: React.ReactNode }) { return <button onClick={onClick} className={`rounded-2xl border px-4 py-3 text-right font-bold transition ${active ? 'border-teal-700 bg-teal-50 text-teal-900' : 'border-slate-200 bg-white text-slate-700 hover:border-teal-300'}`}>{children}</button> }
function YesNo({ value, set }: { value?: boolean; set: (v:boolean)=>void }) { return <div className="grid grid-cols-2 gap-2"><Choice active={value===true} onClick={()=>set(true)}>نعم</Choice><Choice active={value===false} onClick={()=>set(false)}>لا</Choice></div> }
