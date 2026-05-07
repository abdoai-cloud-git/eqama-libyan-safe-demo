'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { HelpCircle, Search, ShieldCheck } from 'lucide-react';
import { ClientPipeline } from '@/components/client-pipeline';
import { Badge, Card, PageTitle, Shell, TopNav, statusTone } from '@/components/ui';
import { useDemoStore } from '@/store/demo-store';

function nextCustomerAction(status: string) {
  if (status === 'بانتظار دفع المقدم') return 'انتظر رسالة الفريق بتعليمات الدفع الرسمية، ولا تدفع لأي جهة غير القنوات المعتمدة.';
  if (status === 'يحتاج مستندات') return 'جهّز المستندات المطلوبة وسيقوم الفريق بإرسال قائمة واضحة عبر واتساب.';
  if (status === 'يحتاج معلومات') return 'راجع بياناتك وتأكد من رقم الهاتف حتى يتمكن الفريق من التواصل معك.';
  if (status === 'تحت الإجراء') return 'لا يوجد إجراء مطلوب منك الآن. سيتم تحديثك عند ظهور خطوة جديدة.';
  if (status === 'مكتمل') return 'تم اكتمال الطلب. يمكنك طلب خدمات ما بعد الإقامة من الفريق.';
  return 'سيقوم الفريق بمراجعة الحالة وتحديثك بالخطوة التالية.';
}

export default function ClientStatusPage() {
  const cases = useDemoStore((s) => s.cases);
  const [caseQuery, setCaseQuery] = useState('CASE-0001');
  const [phoneQuery, setPhoneQuery] = useState('0911111101');
  const [submitted, setSubmitted] = useState<{ caseId: string; phone: string } | null>(null);
  const item = useMemo(() => {
    if (!submitted) return undefined;
    const caseId = submitted.caseId.trim();
    const phone = submitted.phone.trim();
    if (!caseId || !phone) return undefined;
    return cases.find((entry) => entry.id === caseId && entry.phone === phone);
  }, [cases, submitted]);

  return (
    <><TopNav /><Shell>
      <PageTitle title="متابعة حالة العميل" subtitle="صفحة ديمو توضح كيف يمكن للعميل رؤية حالة الطلب، الإجراء التالي، والتحديثات العامة بدون كشف الملاحظات الداخلية." />
      <Card className="mb-6">
        <div className="mb-3 flex items-start gap-3 rounded-2xl bg-slate-50 p-3 text-sm leading-7 text-slate-600">
          <ShieldCheck className="mt-1 text-teal-700" size={18} />
          <p>لحماية الخصوصية، يتطلب البحث رقم الحالة ورقم الهاتف معًا. في المنتج الحقيقي يمكن استبدال ذلك برابط متابعة خاص وآمن.</p>
        </div>
        <div className="grid gap-3 md:grid-cols-[1fr_1fr_140px]">
          <label className="space-y-2">
            <span className="block text-sm font-bold text-slate-700">رقم الحالة</span>
            <div className="relative">
              <Search className="absolute right-3 top-3 h-5 w-5 text-slate-400" />
              <input className="field pr-10" dir="ltr" value={caseQuery} onChange={(event) => setCaseQuery(event.target.value)} placeholder="CASE-0001" />
            </div>
          </label>
          <label className="space-y-2">
            <span className="block text-sm font-bold text-slate-700">رقم الهاتف</span>
            <input className="field" dir="ltr" value={phoneQuery} onChange={(event) => setPhoneQuery(event.target.value)} placeholder="0911111101" />
          </label>
          <div className="flex items-end"><button type="button" className="btn-primary w-full justify-center" onClick={() => setSubmitted({ caseId: caseQuery, phone: phoneQuery })}>بحث</button></div>
        </div>
      </Card>
      {item ? (
        <div className="space-y-6">
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">رقم الحالة</p>
                <h2 className="text-2xl font-black" dir="ltr">{item.id}</h2>
                <p className="mt-1 text-slate-600">{item.fullName} — <span dir="ltr">{item.phone}</span></p>
              </div>
              <Badge tone={statusTone(item.status)}>{item.status}</Badge>
            </div>
          </Card>

          <div className="grid gap-6 lg:grid-cols-[1fr_.75fr]">
            <Card className="border-teal-200 bg-teal-50">
              <div className="flex gap-3">
                <div className="rounded-2xl bg-teal-700 p-3 text-white"><ShieldCheck size={22} /></div>
                <div>
                  <h2 className="font-black text-slate-950">الإجراء المطلوب منك الآن</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{nextCustomerAction(item.status)}</p>
                </div>
              </div>
            </Card>
            <Card className="border-amber-200 bg-amber-50">
              <div className="flex gap-3">
                <div className="rounded-2xl bg-amber-500 p-3 text-white"><HelpCircle size={22} /></div>
                <div>
                  <h2 className="font-black text-slate-950">ملاحظة أمان</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-700">لا يتم طلب الدفع إلا بعد القبول المبدئي ومن خلال تعليمات الفريق الرسمية. تأكد من رقم الحالة قبل أي دفع.</p>
                </div>
              </div>
            </Card>
          </div>

          <ClientPipeline item={item} />
        </div>
      ) : submitted ? (
        <Card>
          <h2 className="text-xl font-black">لم يتم العثور على حالة</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">يجب أن يتطابق رقم الحالة ورقم الهاتف معًا. جرّب CASE-0001 مع 0911111101 من بيانات الديمو.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" className="btn-secondary" onClick={() => { setCaseQuery('CASE-0001'); setPhoneQuery('0911111101'); setSubmitted({ caseId: 'CASE-0001', phone: '0911111101' }); }}>تجربة بيانات الديمو</button>
            <Link className="inline-flex rounded-2xl bg-teal-700 px-5 py-3 font-bold text-white" href="/intake">إنشاء طلب جديد</Link>
          </div>
        </Card>
      ) : (
        <Card>
          <h2 className="text-xl font-black">ابدأ البحث الآمن</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">أدخل رقم الحالة ورقم الهاتف معًا ثم اضغط بحث. يمكنك استخدام بيانات الديمو الجاهزة لتجربة الصفحة.</p>
          <button type="button" className="mt-4 btn-primary" onClick={() => setSubmitted({ caseId: 'CASE-0001', phone: '0911111101' })}>تجربة بيانات الديمو</button>
        </Card>
      )}
    </Shell></>
  );
}
