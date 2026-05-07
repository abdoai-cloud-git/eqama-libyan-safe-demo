import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Shell({ children }: { children: ReactNode }) {
  return <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>;
}

export function TopNav() {
  const links = [
    ['لوحة الإدارة','/admin'], ['الحالات','/admin'], ['مسار العملاء','/pipeline'], ['متابعة عميل','/status'], ['العمال','/admin/workers'], ['الخدمات','/admin/services'], ['طلبات الشركات','/admin/b2b'],
  ];
  return (
    <header className="sticky top-0 z-20 border-b border-amber-300/20 bg-slate-950/95 text-white shadow-lg shadow-slate-950/10 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl border border-amber-300/40 bg-gradient-to-br from-amber-300 to-orange-600 text-sm font-black text-slate-950 shadow-inner shadow-white/20">LSR</span>
          <span><span className="block font-bold text-white">الإقامة الآمنة الليبية</span><span className="text-xs text-amber-200">معنا خطوة بخطوة نحو الأمان</span></span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map(([label, href]) => <Link key={href+label} href={href} className="rounded-full px-3 py-2 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-amber-200">{label}</Link>)}
        </nav>
        <Link href="/intake" className="rounded-full bg-gradient-to-l from-amber-300 to-orange-500 px-4 py-2 text-sm font-black text-slate-950 shadow-sm hover:from-amber-200 hover:to-orange-400">ابدأ التقييم</Link>
      </div>
    </header>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn('rounded-3xl border border-amber-900/10 bg-white p-5 shadow-sm shadow-amber-950/5', className)}>{children}</section>;
}

export function Badge({ children, tone='slate' }: { children: ReactNode; tone?: 'slate'|'green'|'red'|'amber'|'blue'|'teal'|'purple' }) {
  const tones = {
    slate:'bg-slate-100 text-slate-700', green:'bg-emerald-100 text-emerald-800', red:'bg-rose-100 text-rose-800', amber:'bg-amber-100 text-amber-800', blue:'bg-blue-100 text-blue-800', teal:'bg-amber-100 text-amber-900', purple:'bg-purple-100 text-purple-800'
  };
  return <span className={cn('inline-flex rounded-full px-2.5 py-1 text-xs font-bold', tones[tone])}>{children}</span>;
}

export function PageTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return <div className="mb-6"><h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">{title}</h1><p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">{subtitle}</p></div>;
}

export const statusTone = (status: string): 'slate'|'green'|'red'|'amber'|'blue'|'teal'|'purple' => {
  if (status.includes('مؤهل') || status.includes('مكتمل')) return 'green';
  if (status.includes('غير قابل') || status.includes('ملغي')) return 'red';
  if (status.includes('دفع') || status.includes('مستندات') || status.includes('معلومات')) return 'amber';
  if (status.includes('الإجراء') || status.includes('المتابعة')) return 'blue';
  if (status.includes('مراجعة')) return 'purple';
  return 'slate';
};
