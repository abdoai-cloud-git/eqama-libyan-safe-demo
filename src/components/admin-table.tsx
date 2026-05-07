 'use client';

import Link from 'next/link';
import { Eye, MessageCircle, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Badge, Card, statusTone } from '@/components/ui';
import { useDemoStore } from '@/store/demo-store';

export function CasesTable() {
  const cases = useDemoStore((s) => s.cases);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const filtered = useMemo(() => cases.filter((item) => {
    const q = query.trim();
    const matchesQuery = !q || item.fullName.includes(q) || item.phone.includes(q) || item.nationality.includes(q) || item.id.includes(q);
    const matchesStatus = status === 'all' || item.status === status;
    return matchesQuery && matchesStatus;
  }), [cases, query, status]);
  const statuses = ['all', ...Array.from(new Set(cases.map((item) => item.status)))];
  return <Card>
    <div className="mb-4 grid gap-3 md:grid-cols-[1fr_240px]"><label className="relative"><Search className="absolute right-3 top-3 h-5 w-5 text-slate-400"/><input className="field pr-10" placeholder="بحث بالاسم أو الهاتف أو الجنسية أو رقم الحالة" value={query} onChange={(e)=>setQuery(e.target.value)}/><span className="mt-2 block text-xs font-bold text-amber-800">ابحث بالاسم أو الهاتف للوصول للحالة بسرعة.</span></label><select className="field" value={status} onChange={(e)=>setStatus(e.target.value)}>{statuses.map(s => <option key={s} value={s}>{s === 'all' ? 'كل الحالات' : s}</option>)}</select></div>
    <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500"><span>النتائج: <b className="text-slate-900">{filtered.length}</b> من {cases.length}</span><span>اضغط “عرض” لفتح ملف الحالة أو “واتساب” للتواصل.</span></div>
    <div className="overflow-x-auto"><table className="w-full min-w-[980px] text-right text-sm"><thead className="sticky top-0 bg-slate-50 text-slate-500"><tr>{['الاسم','الهاتف','الجنسية','المصدر','التصنيف','حالة الطلب','الدفع','آخر تحديث','المسؤول','إجراءات'].map(h=><th className="p-3 font-bold" key={h}>{h}</th>)}</tr></thead><tbody>{filtered.map(item => <tr key={item.id} className="border-t border-slate-100 hover:bg-slate-50"><td className="p-3 font-bold"><Link className="text-amber-900 hover:underline" href={`/admin/cases/${item.id}`}>{item.fullName}</Link></td><td className="p-3" dir="ltr">{item.phone}</td><td className="p-3">{item.nationality}</td><td className="p-3">{item.source === 'Direct Link' ? 'رابط مباشر' : item.source}</td><td className="p-3"><Badge tone={statusTone(item.qualification.classification)}>{item.qualification.classification}</Badge></td><td className="p-3"><Badge tone={statusTone(item.status)}>{item.status}</Badge></td><td className="p-3"><Badge tone={statusTone(item.paymentStatus)}>{item.paymentStatus}</Badge></td><td className="p-3" dir="ltr">{item.lastUpdated}</td><td className="p-3">{item.owner}</td><td className="p-3"><div className="flex flex-wrap gap-2"><Link href={`/admin/cases/${item.id}`} className="inline-flex items-center gap-1 rounded-full bg-amber-600 px-3 py-1.5 text-xs font-bold text-white"><Eye size={14}/> عرض</Link><button type="button" className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700"><MessageCircle size={14}/> واتساب</button></div></td></tr>)}</tbody></table></div>
    {filtered.length === 0 && <div className="mt-4 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center"><h3 className="font-black text-slate-900">لا توجد نتائج مطابقة</h3><p className="mt-2 text-sm leading-7 text-slate-600">جرّب البحث بالاسم أو رقم الهاتف أو الجنسية، أو غيّر فلتر الحالة.</p><button type="button" className="mt-3 rounded-2xl bg-amber-600 px-4 py-2 text-sm font-bold text-white" onClick={()=>{ setQuery(''); setStatus('all'); }}>إعادة ضبط البحث</button></div>}
  </Card>;
}
