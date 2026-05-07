 'use client';

import { BriefcaseBusiness, ClipboardList, CreditCard, FileCheck2, FileClock, Users } from 'lucide-react';
import { Badge, Card, PageTitle, Shell, TopNav } from '@/components/ui';
import { CasesTable } from '@/components/admin-table';
import { useDemoStore } from '@/store/demo-store';

export default function AdminPage() {
  const cases = useDemoStore((s) => s.cases);
  const workers = useDemoStore((s) => s.workers);
  const services = useDemoStore((s) => s.services);
  const stats = [
    { label: 'إجمالي الطلبات', value: cases.length, Icon: ClipboardList },
    { label: 'مؤهل مبدئيًا', value: cases.filter(c=>c.status==='مؤهل مبدئيًا').length, Icon: FileCheck2 },
    { label: 'غير قابل للبدء', value: cases.filter(c=>c.status==='غير قابل للبدء حاليًا').length, Icon: FileClock },
    { label: 'بانتظار الدفع', value: cases.filter(c=>c.paymentStatus==='بانتظار الدفع').length, Icon: CreditCard },
    { label: 'تحت الإجراء', value: cases.filter(c=>c.status==='تحت الإجراء').length, Icon: FileClock },
    { label: 'ملفات العمال', value: workers.length, Icon: Users },
    { label: 'خدمات لاحقة', value: services.length, Icon: BriefcaseBusiness },
  ];
  return <><TopNav/><Shell><PageTitle title="لوحة إدارة الحالات" subtitle="هنا يظهر الفرق بين شات تأهيل بسيط ونظام متابعة: كل عميل له حالة، سبب، دفع، مسؤول، وآخر تحديث." />
    <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{stats.map(({ label, value, Icon }) => <Card key={label} className="p-4"><div className="flex items-start justify-between"><div><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-black">{value}</p></div><Icon className="text-teal-700"/></div></Card>)}</div>
    <div className="mb-4 flex flex-wrap gap-2">{['TikTok','Facebook','Direct Link','الدفع كاش فقط','لا طلب دفع قبل القبول'].map(x => <Badge key={x} tone={x.includes('لا')?'amber':'teal'}>{x}</Badge>)}</div>
    <CasesTable />
  </Shell></>;
}
