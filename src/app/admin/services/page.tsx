 'use client';

import { Badge, Card, PageTitle, Shell, statusTone, TopNav } from '@/components/ui';
import { useDemoStore } from '@/store/demo-store';

export default function ServicesPage() {
  const services = useDemoStore((s) => s.services);
  return <><TopNav/><Shell><PageTitle title="خدمات ما بعد الإقامة" subtitle="إدارة الطلبات المتكررة: حساب مصرفي، شريحة، رخصة، سكن، تذاكر، خطابات وعقود تشغيل." />
    <Card><div className="overflow-x-auto"><table className="w-full min-w-[780px] text-right text-sm"><thead className="bg-slate-50 text-slate-500"><tr>{['العامل','الخدمة','الحالة','الأولوية','المسؤول','آخر تحديث','ملاحظات'].map(h=><th key={h} className="p-3">{h}</th>)}</tr></thead><tbody>{services.map(s=><tr key={s.id} className="border-t border-slate-100"><td className="p-3 font-bold">{s.workerName}</td><td className="p-3">{s.serviceType}</td><td className="p-3"><Badge tone={statusTone(s.status)}>{s.status}</Badge></td><td className="p-3"><Badge tone={s.priority==='عالية'?'red':s.priority==='متوسطة'?'amber':'slate'}>{s.priority}</Badge></td><td className="p-3">{s.owner}</td><td className="p-3">{s.lastUpdated}</td><td className="p-3 text-slate-600">{s.notes}</td></tr>)}</tbody></table></div></Card>
  </Shell></>;
}
