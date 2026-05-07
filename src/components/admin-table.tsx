 'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Badge, Card, statusTone } from '@/components/ui';
import { useDemoStore } from '@/store/demo-store';

export function CasesTable() {
  const cases = useDemoStore((s) => s.cases);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const filtered = useMemo(() => cases.filter((item) => {
    const q = query.trim();
    const matchesQuery = !q || item.fullName.includes(q) || item.phone.includes(q) || item.nationality.includes(q);
    const matchesStatus = status === 'all' || item.status === status;
    return matchesQuery && matchesStatus;
  }), [cases, query, status]);
  const statuses = ['all', ...Array.from(new Set(cases.map((item) => item.status)))];
  return <Card>
    <div className="mb-4 grid gap-3 md:grid-cols-[1fr_240px]"><label className="relative"><Search className="absolute right-3 top-3 h-5 w-5 text-slate-400"/><input className="field pr-10" placeholder="بحث بالاسم أو الهاتف أو الجنسية" value={query} onChange={(e)=>setQuery(e.target.value)}/></label><select className="field" value={status} onChange={(e)=>setStatus(e.target.value)}>{statuses.map(s => <option key={s} value={s}>{s === 'all' ? 'كل الحالات' : s}</option>)}</select></div>
    <div className="overflow-x-auto"><table className="w-full min-w-[900px] text-right text-sm"><thead className="bg-slate-50 text-slate-500"><tr>{['الاسم','الهاتف','الجنسية','المصدر','التصنيف','حالة الطلب','الدفع','آخر تحديث','المسؤول'].map(h=><th className="p-3 font-bold" key={h}>{h}</th>)}</tr></thead><tbody>{filtered.map(item => <tr key={item.id} className="border-t border-slate-100 hover:bg-slate-50"><td className="p-3 font-bold"><Link className="text-teal-800 hover:underline" href={`/admin/cases/${item.id}`}>{item.fullName}</Link></td><td className="p-3">{item.phone}</td><td className="p-3">{item.nationality}</td><td className="p-3">{item.source}</td><td className="p-3"><Badge tone={statusTone(item.qualification.classification)}>{item.qualification.classification}</Badge></td><td className="p-3"><Badge tone={statusTone(item.status)}>{item.status}</Badge></td><td className="p-3"><Badge tone={statusTone(item.paymentStatus)}>{item.paymentStatus}</Badge></td><td className="p-3">{item.lastUpdated}</td><td className="p-3">{item.owner}</td></tr>)}</tbody></table></div>
  </Card>;
}
