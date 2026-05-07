import Link from 'next/link';
import { ArrowLeft, BriefcaseBusiness, ClipboardCheck, GitBranch, MessageCircle, ShieldCheck } from 'lucide-react';
import { Card, Shell, TopNav } from '@/components/ui';

export default function Home() {
  return (
    <><TopNav /><Shell>
      <section className="grid gap-8 py-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
        <div>
          <div className="mb-4 inline-flex rounded-full border border-amber-300/40 bg-slate-950 px-4 py-2 text-sm font-black text-amber-200 shadow-lg shadow-amber-950/10">LSR · Libyan Safe Residence</div>
          <h1 className="max-w-4xl text-4xl font-black leading-tight text-slate-950 sm:text-6xl">شركة الإقامة الآمنة الليبية للخدمات العمالية</h1>
          <p className="mt-5 max-w-2xl text-xl font-black text-amber-800">معنا خطوة بخطوة نحو الأمان</p>
          <p className="mt-4 max-w-2xl text-lg leading-9 text-slate-600">من أول استفسار إلى متابعة الملف مع الجهات الرسمية: إقامة، خروج نهائي، عقود عمل، تأمين صحي، واستجلاب عمالة — كل خدمة تتحول إلى حالة واضحة قابلة للمتابعة من الفريق.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/intake" className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-amber-300 to-orange-500 px-6 py-3 font-black text-slate-950 shadow-lg shadow-amber-950/10 hover:from-amber-200 hover:to-orange-400">ابدأ التقييم <ArrowLeft size={18}/></Link>
            <Link href="/pipeline" className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3 font-bold text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800"><GitBranch size={18}/> مشاهدة مسار العملاء</Link>
            <Link href="/admin" className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 font-bold text-slate-800 hover:border-amber-200 hover:text-amber-900">مشاهدة لوحة الإدارة</Link>
          </div>
          <p className="mt-4 text-sm text-slate-500">هذه النتيجة مبدئية، ويتم تأكيد إمكانية البدء بعد مراجعة الفريق. لا يوجد طلب دفع في البداية.</p>
        </div>
        <Card className="overflow-hidden border-amber-300/20 bg-slate-950 text-white shadow-2xl shadow-slate-950/20">
          <div className="mb-5 rounded-[2rem] border border-amber-300/20 bg-gradient-to-br from-amber-300/20 via-orange-500/10 to-transparent p-5 text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-[1.6rem] bg-gradient-to-br from-amber-300 to-orange-600 text-2xl font-black text-slate-950 shadow-inner shadow-white/30">LSR</div>
            <p className="mt-3 text-sm font-black uppercase tracking-[0.25em] text-amber-200">Libyan Safe Residence</p>
            <p className="mt-1 text-xs text-slate-300">0921010272 · 0910883734</p>
          </div>
          <div className="space-y-4">
            {[
              ['رسائل السوشيال', 'تيك توك وفيسبوك وواتساب لاحقًا', MessageCircle],
              ['تأهيل واضح', 'قواعد شفافة بدون AI لاتخاذ القرار', ClipboardCheck],
              ['ملف حالة', 'حالة، دفع كاش، مسؤول، آخر تحديث', ShieldCheck],
              ['علاقة طويلة', 'ملف عامل وخدمات بعد الإقامة وتشغيل B2B', BriefcaseBusiness],
            ].map(([title, text, Icon]) => <div key={String(title)} className="flex gap-4 rounded-2xl bg-white/10 p-4"><Icon className="mt-1 text-amber-300"/><div><h3 className="font-black">{title as string}</h3><p className="text-sm leading-6 text-slate-300">{text as string}</p></div></div>)}
          </div>
        </Card>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        <Card><h3 className="font-black">خدمات أوسع من الإقامة</h3><p className="mt-2 text-sm leading-7 text-slate-600">خروج نهائي، عقود عمل، تأمين صحي، واستجلاب عمالة داخل نفس نظام المتابعة.</p></Card>
        <Card><h3 className="font-black">خطوة بخطوة</h3><p className="mt-2 text-sm leading-7 text-slate-600">كل عميل يعرف المرحلة الحالية، المطلوب منه، ومن المسؤول عن متابعته.</p></Card>
        <Card><h3 className="font-black">هوية قريبة من المكتب</h3><p className="mt-2 text-sm leading-7 text-slate-600">ألوان ذهبية/برتقالية على خلفية داكنة مثل واجهة LSR الواقعية.</p></Card>
      </section>
    </Shell></>
  );
}
