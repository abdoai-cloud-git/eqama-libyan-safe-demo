'use client';

import type { Client } from '@/lib/types';

interface ClientCardProps {
  client: Client;
  onChange: (client: Client) => void;
}

const fields: Array<{ key: keyof Client; label: string; type?: string }> = [
  { key: 'name', label: 'اسم العميل' },
  { key: 'idNumber', label: 'رقم الملف / الهوية' },
  { key: 'phone', label: 'رقم الهاتف', type: 'tel' },
  { key: 'email', label: 'البريد الإلكتروني', type: 'email' },
  { key: 'address', label: 'العنوان' },
  { key: 'applicationDate', label: 'تاريخ فتح الملف', type: 'date' },
  { key: 'lastUpdated', label: 'آخر تحديث', type: 'date' },
];

export default function ClientCard({ client, onChange }: ClientCardProps) {
  const updateField = (key: keyof Client, value: string) => {
    onChange({ ...client, [key]: key === 'currentStageId' ? Number(value) : value });
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-black text-slate-950">بطاقة العميل</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">تعديل بيانات العميل مباشرة أثناء متابعته في الفَنَل.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.key} className="space-y-2">
            <span className="block text-sm font-bold text-slate-700">{field.label}</span>
            <input
              type={field.type ?? 'text'}
              value={String(client[field.key])}
              onChange={(event) => updateField(field.key, event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-100"
            />
          </label>
        ))}

        <label className="space-y-2 md:col-span-2">
          <span className="block text-sm font-bold text-slate-700">حالة المتابعة</span>
          <select
            value={client.status}
            onChange={(event) => updateField('status', event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-100"
          >
            <option value="طلب جديد">طلب جديد</option>
            <option value="يحتاج معلومات">يحتاج معلومات</option>
            <option value="يحتاج مستندات">يحتاج مستندات</option>
            <option value="مؤهل مبدئيًا">مؤهل مبدئيًا</option>
            <option value="بانتظار دفع المقدم">بانتظار دفع المقدم</option>
            <option value="تم استلام المقدم">تم استلام المقدم</option>
            <option value="تحت الإجراء">تحت الإجراء</option>
            <option value="مكتمل">مكتمل</option>
            <option value="مغلق">مغلق</option>
          </select>
        </label>
      </div>
    </section>
  );
}
