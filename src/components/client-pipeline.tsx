'use client';

import type { ResidencyCase } from '@/lib/types';
import { getPipelineIndex, pipelineStages } from '@/lib/pipeline';
import { Badge, Card, statusTone } from '@/components/ui';

function formatUpdateTime(value: string) {
  const [date = value, rawTime = ''] = value.split('T');
  const time = rawTime.slice(0, 5);
  return time ? `${date} ${time}` : date;
}

export function ClientPipeline({ item }: { item: ResidencyCase }) {
  const activeIndex = getPipelineIndex(item.status);
  const isStopped = activeIndex < 0;
  const updates = item.clientUpdates ?? [];

  return (
    <Card>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black">مسار الطلب</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">هذا هو التحديث الذي يمكن للفريق مشاركته مع العميل بدون كشف الملاحظات الداخلية.</p>
        </div>
        <Badge tone={statusTone(item.status)}>{item.status}</Badge>
      </div>

      {isStopped ? (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm leading-7 text-rose-900">
          {item.qualification.customerMessage}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {pipelineStages.map((stage, index) => {
            const done = index <= activeIndex;
            const current = index === activeIndex;
            return (
              <div key={stage} className={`rounded-2xl border p-3 ${done ? 'border-teal-200 bg-teal-50' : 'border-slate-200 bg-slate-50'} ${current ? 'ring-2 ring-teal-500/20' : ''}`}>
                <div className={`mb-2 grid h-8 w-8 place-items-center rounded-full text-xs font-black ${done ? 'bg-teal-700 text-white' : 'bg-white text-slate-400'}`}>{index + 1}</div>
                <p className="text-sm font-black text-slate-800">{stage}</p>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6">
        <h3 className="mb-3 font-black">تحديثات العميل</h3>
        <div className="space-y-3">
          {updates.map((update) => (
            <div key={update.id} className="rounded-2xl border border-slate-100 bg-white p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <Badge tone={statusTone(update.status)}>{update.status}</Badge>
                <span className="text-xs text-slate-400">{formatUpdateTime(update.at)}</span>
              </div>
              <p className="font-bold text-slate-900">{update.title}</p>
              <p className="mt-1 text-sm leading-7 text-slate-600">{update.clientMessage}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
