'use client';

import { useMemo, useState } from 'react';
import ClientCard from '@/components/client-card';
import PipelineStages from '@/components/pipeline-stages';
import { PageTitle, Shell, TopNav } from '@/components/ui';
import type { Client, PipelineStage } from '@/lib/types';

const initialClient: Client = {
  name: 'أحمد محمد',
  idNumber: 'EQ-2026-014',
  currentStageId: 2,
  status: 'يحتاج مستندات',
  email: 'ahmed@example.com',
  phone: '+218 91 123 4567',
  address: 'طرابلس، ليبيا',
  applicationDate: '2026-05-01',
  lastUpdated: '2026-05-07',
};

const pipelineStages: PipelineStage[] = [
  { id: 1, name: 'طلب جديد', description: 'تم استلام بيانات العميل من الفورم أو الرسائل.' },
  { id: 2, name: 'مراجعة المستندات', description: 'الفريق يتحقق من الجواز، الختم، والإقامة الحالية.' },
  { id: 3, name: 'بانتظار دفع المقدم', description: 'العميل مؤهل مبدئيًا وبانتظار دفع المقدم كاش.' },
  { id: 4, name: 'تحت الإجراء', description: 'تم استلام المقدم وبدأت متابعة الإجراء داخليًا.' },
  { id: 5, name: 'مكتمل', description: 'انتهت الحالة ويمكن فتح خدمات ما بعد الإقامة.' },
];

const statusByStage: Record<number, Client['status']> = {
  1: 'طلب جديد',
  2: 'يحتاج مستندات',
  3: 'بانتظار دفع المقدم',
  4: 'تحت الإجراء',
  5: 'مكتمل',
};

export default function PipelinePage() {
  const [client, setClient] = useState<Client>(initialClient);

  const completion = useMemo(() => Math.round(((client.currentStageId - 1) / (pipelineStages.length - 1)) * 100), [client.currentStageId]);

  const moveClientToStage = (stageId: number) => {
    setClient((currentClient) => ({
      ...currentClient,
      currentStageId: stageId,
      status: statusByStage[stageId] ?? currentClient.status,
      lastUpdated: '2026-05-07',
    }));
  };

  return (
    <>
      <TopNav />
      <Shell>
        <PageTitle
          title="Pipeline العملاء"
          subtitle="صفحة فَنَل تعرض مراحل العميل خطوة بخطوة، مع بطاقة قابلة للتعديل لبيانات العميل وحالة المتابعة."
        />

        <div className="mb-6 rounded-3xl bg-slate-950 p-5 text-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-teal-200">تقدم الحالة</p>
              <h2 className="mt-1 text-2xl font-black">{completion}% داخل المسار</h2>
            </div>
            <div className="min-w-48 rounded-2xl bg-white/10 p-4 text-sm leading-7 text-slate-200">
              العميل: <span className="font-black text-white">{client.name}</span><br />
              الحالة: <span className="font-black text-white">{client.status}</span>
            </div>
          </div>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-teal-400 transition-all" style={{ width: `${completion}%` }} />
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
          <PipelineStages client={client} stages={pipelineStages} onStageChange={moveClientToStage} />
          <ClientCard client={client} onChange={setClient} />
        </div>
      </Shell>
    </>
  );
}
