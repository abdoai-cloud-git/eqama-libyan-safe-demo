'use client';

import { CheckCircle2, Circle, Clock3 } from 'lucide-react';
import type { Client, PipelineStage } from '@/lib/types';
import { cn } from '@/lib/utils';

interface PipelineStagesProps {
  client: Client;
  stages: PipelineStage[];
  onStageChange: (stageId: number) => void;
}

export default function PipelineStages({ client, stages, onStageChange }: PipelineStagesProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-slate-950">مسار الحالة</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">اضغط على أي مرحلة لتحريك العميل داخل الفَنَل.</p>
        </div>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-900">
          المرحلة الحالية: {stages.find((stage) => stage.id === client.currentStageId)?.name}
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-5">
        {stages.map((stage) => {
          const isDone = stage.id < client.currentStageId;
          const isCurrent = stage.id === client.currentStageId;
          const Icon = isDone ? CheckCircle2 : isCurrent ? Clock3 : Circle;

          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => onStageChange(stage.id)}
              className={cn(
                'group rounded-3xl border p-4 text-right transition hover:-translate-y-0.5 hover:shadow-md',
                isCurrent && 'border-amber-300 bg-amber-50 shadow-sm',
                isDone && 'border-emerald-200 bg-emerald-50',
                !isCurrent && !isDone && 'border-slate-200 bg-slate-50 hover:border-amber-200'
              )}
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-black text-slate-500">{stage.id}</span>
                <Icon className={cn('h-5 w-5', isCurrent ? 'text-amber-600' : isDone ? 'text-emerald-700' : 'text-slate-400')} />
              </div>
              <h3 className="font-black text-slate-950">{stage.name}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-500">{stage.description}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
