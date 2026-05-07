 'use client';

import { Badge, Card, PageTitle, Shell, TopNav } from '@/components/ui';
import { useDemoStore } from '@/store/demo-store';

export default function WorkersPage() {
  const workers = useDemoStore((s) => s.workers);
  return <><TopNav/><Shell><PageTitle title="ملفات العمال" subtitle="بعد اكتمال الإقامة لا تنتهي العلاقة؛ يتحول العميل إلى ملف عامل قابل للخدمات المتكررة." />
    <Card><div className="overflow-x-auto"><table className="w-full min-w-[820px] text-right text-sm"><thead className="bg-slate-50 text-slate-500"><tr>{['اسم العامل','الجنسية','رقم الهاتف','حالة الإقامة','مكان العمل','الخدمات النشطة','آخر تحديث'].map(h=><th key={h} className="p-3">{h}</th>)}</tr></thead><tbody>{workers.map(w=><tr key={w.id} className="border-t border-slate-100"><td className="p-3 font-bold">{w.name}</td><td className="p-3">{w.nationality}</td><td className="p-3">{w.phone}</td><td className="p-3"><Badge tone="green">{w.residencyStatus}</Badge></td><td className="p-3">{w.workplace}</td><td className="p-3"><div className="flex flex-wrap gap-1">{w.activeServices.length ? w.activeServices.map(s=><Badge key={s} tone="teal">{s}</Badge>) : <span className="text-slate-400">لا توجد</span>}</div></td><td className="p-3">{w.lastUpdated}</td></tr>)}</tbody></table></div></Card>
  </Shell></>;
}
