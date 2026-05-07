 'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowRight, Plus } from 'lucide-react';
import { useState } from 'react';
import { Badge, Card, PageTitle, Shell, TopNav, statusTone } from '@/components/ui';
import { ClientPipeline } from '@/components/client-pipeline';
import type { CaseStatus, PaymentStatus } from '@/lib/types';
import { useDemoStore } from '@/store/demo-store';

const statuses: CaseStatus[] = ['طلب جديد','يحتاج معلومات','يحتاج مستندات','مؤهل مبدئيًا','بانتظار دفع المقدم','تم استلام المقدم','تحت الإجراء','مكتمل','غير قابل للبدء حاليًا','مغلق'];
const payments: PaymentStatus[] = ['لم يطلب بعد','بانتظار الدفع','تم استلام المقدم','مكتمل'];

export default function CaseDetailPage() {
  const params = useParams<{ id: string }>();
  const item = useDemoStore((s) => s.cases.find((c) => c.id === params.id));
  const updateCaseStatus = useDemoStore((s) => s.updateCaseStatus);
  const updatePayment = useDemoStore((s) => s.updatePayment);
  const addNote = useDemoStore((s) => s.addNote);
  const convertToWorker = useDemoStore((s) => s.convertToWorker);
  const [note, setNote] = useState('');
  if (!item) return <><TopNav/><Shell><Card>الحالة غير موجودة</Card></Shell></>;
  return <><TopNav/><Shell><Link href="/admin" className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-amber-900"><ArrowRight size={16}/> رجوع للوحة</Link><PageTitle title={`${item.fullName} — ${item.id}`} subtitle="ملف الحالة يربط بيانات التأهيل، سبب التصنيف، الخطوة القادمة، الدفع الكاش، والملاحظات الداخلية." />
    <div className="grid gap-6 lg:grid-cols-[1fr_.9fr]">
      <div className="space-y-6"><Card><div className="flex flex-wrap gap-2"><Badge tone={statusTone(item.qualification.classification)}>{item.qualification.classification}</Badge><Badge tone={statusTone(item.status)}>{item.status}</Badge><Badge tone={statusTone(item.paymentStatus)}>{item.paymentStatus}</Badge></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{[['الهاتف',item.phone],['الجنسية',item.nationality],['العمر',item.age],['المصدر',item.source],['طريقة الدخول',item.entryMethod],['المسؤول',item.owner]].map(([k,v])=><div key={String(k)} className="rounded-2xl bg-slate-50 p-4"><p className="text-xs text-slate-500">{k}</p><p className="mt-1 font-bold">{String(v)}</p></div>)}</div></Card>
      <Card><h2 className="mb-3 text-lg font-black">نتيجة التأهيل</h2><p className="leading-8 text-slate-700">{item.qualification.customerMessage}</p><div className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm leading-7 text-amber-950"><b>السبب:</b> {item.qualification.reason}<br/><b>الخطوة القادمة:</b> {item.qualification.nextStep}</div></Card>
      <ClientPipeline item={item} />
      <Card><h2 className="mb-3 text-lg font-black">سجل التحديثات والملاحظات</h2><div className="flex gap-2"><input className="field" value={note} onChange={(e)=>setNote(e.target.value)} placeholder="أضف ملاحظة داخلية"/><button aria-label="إضافة ملاحظة" className="btn-primary" onClick={()=>{ if(note.trim()){ addNote(item.id,note); setNote(''); } }}><Plus size={16}/></button></div><ul className="mt-4 space-y-2">{item.internalNotes.map((n,i)=><li key={i} className="rounded-2xl bg-slate-50 p-3 text-sm leading-6">{n}</li>)}</ul></Card></div>
      <div className="space-y-6"><Card><h2 className="mb-3 text-lg font-black">أزرار الديمو</h2><div className="grid gap-2">{statuses.map(s=><button key={s} className="btn-secondary justify-center" onClick={()=>updateCaseStatus(item.id,s)}>نقل إلى: {s}</button>)}</div></Card><Card><h2 className="mb-3 text-lg font-black">الدفع الكاش</h2><p className="mb-3 text-sm leading-7 text-slate-600">قاعدة الديمو: لا يتم طلب الدفع إلا بعد مراجعة الحالة وقبولها مبدئيًا.</p><div className="grid gap-2">{payments.map(p=><button key={p} className="btn-secondary justify-center" onClick={()=>updatePayment(item.id,p)}>{p}</button>)}</div></Card><Card><h2 className="mb-3 text-lg font-black">بعد اكتمال الإقامة</h2><button className="btn-primary w-full justify-center" onClick={()=>convertToWorker(item.id)}>تحويل إلى ملف عامل</button><Link className="mt-3 block text-center text-sm font-bold text-amber-900" href="/admin/workers">مشاهدة ملفات العمال</Link></Card></div>
    </div>
  </Shell></>;
}
