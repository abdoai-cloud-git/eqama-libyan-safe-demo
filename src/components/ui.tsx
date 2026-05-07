import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Shell({ children }: { children: ReactNode }) {
  return <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>;
}

export function TopNav() {
  const links = [
    ['لوحة الإدارة','/admin'], ['الحالات','/admin'], ['متابعة عميل','/status'], ['العمال','/admin/workers'], ['الخدمات','/admin/services'], ['طلبات B2B','/admin/b2b'],
  ];
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-teal-700 text-lg font-black text-white">آ</span>
          <span><span className="block font-bold text-slate-950">الإقامة الليبية الآمنة</span><span className="text-xs text-slate-500">للخدمات العمالية</span></span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map(([label, href]) => <Link key={href+label} href={href} className="rounded-full px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-teal-800">{label}</Link>)}
        </nav>
        <Link href="/intake" className="rounded-full bg-teal-700 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-teal-800">ابدأ التقييم</Link>
      </div>
    </header>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn('rounded-3xl border border-slate-200 bg-white p-5 shadow-sm', className)}>{children}</section>;
}

export function Badge({ children, tone='slate' }: { children: ReactNode; tone?: 'slate'|'green'|'red'|'amber'|'blue'|'teal'|'purple' }) {
  const tones = {
    slate:'bg-slate-100 text-slate-700', green:'bg-emerald-100 text-emerald-800', red:'bg-rose-100 text-rose-800', amber:'bg-amber-100 text-amber-800', blue:'bg-blue-100 text-blue-800', teal:'bg-teal-100 text-teal-800', purple:'bg-purple-100 text-purple-800'
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
