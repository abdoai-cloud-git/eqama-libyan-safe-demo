import Link from 'next/link';
import { ArrowLeft, BriefcaseBusiness, ClipboardCheck, GitBranch, MessageCircle, ShieldCheck } from 'lucide-react';
import { Card, Shell, TopNav } from '@/components/ui';

export default function Home() {
  return (
    <><TopNav /><Shell>
      <section className="grid gap-8 py-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
        <div>
          <div className="mb-4 inline-flex rounded-full bg-teal-50 px-4 py-2 text-sm font-bold text-teal-800">ديمو نظام تشغيل خدمات عمالية</div>
          <h1 className="max-w-4xl text-4xl font-black leading-tight text-slate-950 sm:text-6xl">الإقامة الليبية الآمنة للخدمات العمالية</h1>
          <p className="mt-6 max-w-2xl text-lg leading-9 text-slate-600">من أول طلب إقامة إلى خدمات ما بعد الإقامة. اعرف حالتك بشكل مبدئي خلال دقائق، ثم تتحول بياناتك إلى حالة واضحة قابلة للمتابعة من الفريق.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/intake" className="inline-flex items-center gap-2 rounded-2xl bg-teal-700 px-6 py-3 font-bold text-white shadow-lg shadow-teal-900/10 hover:bg-teal-800">ابدأ التقييم <ArrowLeft size={18}/></Link>
            <Link href="/pipeline" className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3 font-bold text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800"><GitBranch size={18}/> مشاهدة مسار العملاء</Link>
            <Link href="/admin" className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 font-bold text-slate-800 hover:border-teal-200 hover:text-teal-800">مشاهدة لوحة الإدارة</Link>
          </div>
          <p className="mt-4 text-sm text-slate-500">هذه النتيجة مبدئية، ويتم تأكيد إمكانية البدء بعد مراجعة الفريق. لا يوجد طلب دفع في البداية.</p>
        </div>
        <Card className="bg-slate-950 text-white">
          <div className="space-y-4">
            {[
              ['رسائل السوشيال', 'تيك توك وفيسبوك وواتساب لاحقًا', MessageCircle],
              ['تأهيل واضح', 'قواعد شفافة بدون AI لاتخاذ القرار', ClipboardCheck],
              ['ملف حالة', 'حالة، دفع كاش، مسؤول، آخر تحديث', ShieldCheck],
              ['علاقة طويلة', 'ملف عامل وخدمات بعد الإقامة وتشغيل B2B', BriefcaseBusiness],
            ].map(([title, text, Icon]) => <div key={String(title)} className="flex gap-4 rounded-2xl bg-white/10 p-4"><Icon className="mt-1 text-teal-300"/><div><h3 className="font-black">{title as string}</h3><p className="text-sm leading-6 text-slate-300">{text as string}</p></div></div>)}
          </div>
        </Card>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        <Card><h3 className="font-black">ليس مجرد بوت</h3><p className="mt-2 text-sm leading-7 text-slate-600">الديمو يوضح كيف تتحول الرسالة إلى حالة قابلة للمتابعة.</p></Card>
        <Card><h3 className="font-black">ليس Google Sheet أجمل</h3><p className="mt-2 text-sm leading-7 text-slate-600">كل حالة لها سبب، خطوة قادمة، دفع، وملاحظات داخلية.</p></Card>
        <Card><h3 className="font-black">يمتد لما بعد الإقامة</h3><p className="mt-2 text-sm leading-7 text-slate-600">ملفات عمال، خدمات لاحقة، وطلبات شركات.</p></Card>
      </section>
    </Shell></>
  );
}
