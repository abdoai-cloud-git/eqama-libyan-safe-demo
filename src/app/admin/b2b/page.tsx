import { Badge, Card, PageTitle, Shell, statusTone, TopNav } from '@/components/ui';
import { demoB2BRequests } from '@/lib/demo-data/b2b';

export default function B2BPage() {
  return <><TopNav/><Shell><PageTitle title="طلبات الشركات / تشغيل العمالة" subtitle="هذا القسم ليس MVP كامل، لكنه يعرض الرؤية: ربط ملفات العمال بطلبات جهات العمل والشركات." />
    <Card><div className="overflow-x-auto"><table className="w-full min-w-[820px] text-right text-sm"><thead className="bg-slate-50 text-slate-500"><tr>{['اسم الجهة','نوع النشاط','عدد العمال','الموقع','الحالة','الجنسيات المفضلة','ملاحظات'].map(h=><th key={h} className="p-3">{h}</th>)}</tr></thead><tbody>{demoB2BRequests.map(r=><tr key={r.id} className="border-t border-slate-100"><td className="p-3 font-bold">{r.companyName}</td><td className="p-3">{r.activityType}</td><td className="p-3">{r.workersNeeded}</td><td className="p-3">{r.location}</td><td className="p-3"><Badge tone={statusTone(r.status)}>{r.status}</Badge></td><td className="p-3">{r.preferredNationalities}</td><td className="p-3 text-slate-600">{r.notes}</td></tr>)}</tbody></table></div></Card>
  </Shell></>;
}
