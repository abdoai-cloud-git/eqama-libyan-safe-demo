'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { ClientPipeline } from '@/components/client-pipeline';
import { Badge, Card, PageTitle, Shell, TopNav, statusTone } from '@/components/ui';
import { useDemoStore } from '@/store/demo-store';

export default function ClientStatusPage() {
  const cases = useDemoStore((s) => s.cases);
  const [query, setQuery] = useState('CASE-0001');
  const item = useMemo(() => {
    const q = query.trim();
    return cases.find((entry) => entry.id === q || entry.phone === q || entry.fullName.includes(q));
  }, [cases, query]);

  return (
    <><TopNav /><Shell>
      <PageTitle title="متابعة حالة العميل" subtitle="صفحة ديمو توضح كيف يمكن للعميل أو الموظف رؤية حالة الطلب والتحديثات بدون الدخول في الملاحظات الداخلية." />
      <Card className="mb-6">
        <label className="mb-2 block text-sm font-bold text-slate-700">ابحث برقم الحالة أو الهاتف أو الاسم</label>
        <div className="relative">
          <Search className="absolute right-3 top-3 h-5 w-5 text-slate-400" />
          <input className="field pr-10" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="مثال: CASE-0001 أو 0911111101" />
        </div>
        <p className="mt-3 text-xs leading-6 text-slate-500">في المنتج الحقيقي يمكن إرسال رابط متابعة خاص للعميل بدل البحث اليدوي.</p>
      </Card>
      {item ? (
        <div className="space-y-6">
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">رقم الحالة</p>
                <h2 className="text-2xl font-black">{item.id}</h2>
                <p className="mt-1 text-slate-600">{item.fullName} — {item.phone}</p>
              </div>
              <Badge tone={statusTone(item.status)}>{item.status}</Badge>
            </div>
          </Card>
          <ClientPipeline item={item} />
        </div>
      ) : (
        <Card>
          <h2 className="text-xl font-black">لم يتم العثور على حالة</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">جرّب CASE-0001 أو CASE-0004 أو رقم هاتف من بيانات الديمو.</p>
          <Link className="mt-4 inline-flex rounded-2xl bg-teal-700 px-5 py-3 font-bold text-white" href="/intake">إنشاء طلب جديد</Link>
        </Card>
      )}
    </Shell></>
  );
}
