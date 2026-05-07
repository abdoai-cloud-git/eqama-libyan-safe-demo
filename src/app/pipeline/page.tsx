'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, Clock3, FileText, MessageCircle, Phone, PlusCircle, Send, ShieldCheck } from 'lucide-react';
import ClientCard from '@/components/client-card';
import { Badge, PageTitle, Shell, TopNav, statusTone } from '@/components/ui';
import {
  calculatePipelineCompletion,
  createStageActivity,
  initialPipelineClients,
  nextActionByStage,
  paymentStatusByStage,
  pipelineStages,
  statusByStage,
  type PipelineClient,
} from '@/lib/pipeline-demo';
import { cn } from '@/lib/utils';

export default function PipelinePage() {
  const [clients, setClients] = useState<PipelineClient[]>(initialPipelineClients);
  const [selectedId, setSelectedId] = useState(initialPipelineClients[0].idNumber);
  const selectedClient = clients.find((client) => client.idNumber === selectedId) ?? clients[0];

  const stageCounts = useMemo(() => pipelineStages.map((stage) => ({
    ...stage,
    clients: clients.filter((client) => client.currentStageId === stage.id),
  })), [clients]);

  const completion = calculatePipelineCompletion(selectedClient.currentStageId, pipelineStages.length);

  const updateClient = (updated: PipelineClient, originalIdNumber = updated.idNumber) => {
    setClients((current) => current.map((client) => client.idNumber === originalIdNumber ? updated : client));
    setSelectedId(updated.idNumber);
  };

  const moveClientToStage = (clientId: string, stageId: number) => {
    const targetClient = clients.find((client) => client.idNumber === clientId);
    if (!targetClient || targetClient.currentStageId === stageId) {
      setSelectedId(clientId);
      return;
    }
    setClients((current) => current.map((client) => {
      if (client.idNumber !== clientId) return client;
      return {
        ...client,
        currentStageId: stageId,
        status: statusByStage[stageId] ?? client.status,
        paymentStatus: paymentStatusByStage[stageId] ?? client.paymentStatus,
        nextAction: nextActionByStage[stageId] ?? client.nextAction,
        stageEnteredAt: 'الآن',
        lastUpdated: '2026-05-07',
        activity: [createStageActivity(client.name, stageId), ...client.activity],
      };
    }));
    setSelectedId(clientId);
  };

  return (
    <>
      <TopNav />
      <Shell>
        <PageTitle
          title="مسار العملاء"
          subtitle="فَنَل تشغيلي يوضح أين يقف كل عميل، ما الإجراء التالي، ومن المسؤول عن المتابعة."
        />

        <section className="mb-6 rounded-3xl bg-slate-950 p-5 text-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-teal-200">العميل المحدد</p>
              <h2 className="mt-1 text-2xl font-black">{selectedClient.name}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-300">{selectedClient.idNumber} · {selectedClient.owner} · {selectedClient.stageEnteredAt}</p>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              <Summary label="التقدم" value={`${completion}%`} />
              <Summary label="الحالة" value={selectedClient.status} />
              <Summary label="الدفع" value={selectedClient.paymentStatus} />
            </div>
          </div>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10" dir="rtl">
            <div className="h-full rounded-full bg-teal-400 transition-all" style={{ width: `${completion}%` }} />
          </div>
        </section>

        <section className="mb-6 grid gap-3 md:grid-cols-5">
          {stageCounts.map((stage) => (
            <button
              key={stage.id}
              type="button"
              onClick={() => moveClientToStage(selectedClient.idNumber, stage.id)}
              className={cn(
                'rounded-3xl border p-4 text-start transition hover:-translate-y-0.5 hover:shadow-md',
                selectedClient.currentStageId === stage.id ? 'border-teal-300 bg-teal-50' : 'border-slate-200 bg-white hover:border-teal-200'
              )}
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-black text-slate-600">{stage.clients.length} عملاء</span>
                {selectedClient.currentStageId > stage.id ? <CheckCircle2 className="text-emerald-600" size={20} /> : selectedClient.currentStageId === stage.id ? <Clock3 className="text-teal-700" size={20} /> : <ArrowLeft className="text-slate-400" size={20} />}
              </div>
              <h3 className="font-black text-slate-950">{stage.name}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-500">{stage.description}</p>
            </button>
          ))}
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_.9fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-slate-950">لوحة مراحل العملاء</h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">اختر بطاقة عميل أو انقله مباشرة للمرحلة التالية.</p>
              </div>
              <Badge tone="teal">{clients.length} عملاء في الديمو</Badge>
            </div>
            <div className="grid gap-4 lg:grid-cols-5">
              {stageCounts.map((stage) => (
                <div key={stage.id} className="min-h-48 rounded-3xl bg-slate-50 p-3">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <h3 className="text-sm font-black text-slate-800">{stage.name}</h3>
                    <span className="rounded-full bg-white px-2 py-1 text-xs font-black text-slate-500">{stage.clients.length}</span>
                  </div>
                  <div className="space-y-3">
                    {stage.clients.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-4 text-xs leading-6 text-slate-500">لا توجد حالات هنا الآن.</div>
                    ) : stage.clients.map((client) => (
                      <button
                        key={client.idNumber}
                        type="button"
                        onClick={() => setSelectedId(client.idNumber)}
                        className={cn('w-full rounded-2xl border bg-white p-3 text-start shadow-sm transition hover:border-teal-300 hover:shadow-md', selectedClient.idNumber === client.idNumber && 'border-teal-400 ring-4 ring-teal-50')}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-black text-slate-950">{client.name}</p>
                            <p className="mt-1 text-xs text-slate-500" dir="ltr">{client.idNumber}</p>
                          </div>
                          <Badge tone={statusTone(client.status)}>{client.status}</Badge>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                          <span>{client.owner}</span>
                          <span>·</span>
                          <span>{client.stageEnteredAt}</span>
                        </div>
                        {client.currentStageId < pipelineStages.length && (
                          <span onClick={(event) => { event.stopPropagation(); moveClientToStage(client.idNumber, client.currentStageId + 1); }} className="mt-3 inline-flex rounded-full bg-teal-700 px-3 py-1.5 text-xs font-bold text-white">
                            نقل للمرحلة التالية
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <NextAction client={selectedClient} onMoveNext={() => selectedClient.currentStageId < pipelineStages.length && moveClientToStage(selectedClient.idNumber, selectedClient.currentStageId + 1)} />
            <ClientCard key={`${selectedClient.idNumber}-${selectedClient.currentStageId}-${selectedClient.lastUpdated}`} client={selectedClient} onSave={updateClient} />
            <Documents client={selectedClient} />
            <Activity client={selectedClient} />
          </aside>
        </div>
      </Shell>
    </>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return <div className="min-w-36 rounded-2xl bg-white/10 p-3"><p className="text-xs font-bold text-slate-300">{label}</p><p className="mt-1 text-lg font-black text-white">{value}</p></div>;
}

function NextAction({ client, onMoveNext }: { client: PipelineClient; onMoveNext: () => void }) {
  const canMove = client.currentStageId < pipelineStages.length;
  return (
    <section className="rounded-3xl border border-teal-200 bg-teal-50 p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-teal-700 p-3 text-white"><ShieldCheck size={22} /></div>
        <div>
          <h2 className="font-black text-slate-950">الإجراء المطلوب الآن</h2>
          <p className="mt-2 text-sm leading-7 text-slate-700">{client.nextAction}</p>
        </div>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <button className="btn-primary"><MessageCircle size={16} /> إرسال واتساب</button>
        <button className="btn-secondary"><FileText size={16} /> طلب مستندات</button>
        <button className="btn-secondary"><Phone size={16} /> اتصال</button>
        <button className="btn-secondary"><PlusCircle size={16} /> إضافة ملاحظة</button>
      </div>
      <button className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white disabled:opacity-50" onClick={onMoveNext} disabled={!canMove}>
        <Send size={16} /> {canMove ? 'نقل للمرحلة التالية' : 'الحالة مكتملة'}
      </button>
    </section>
  );
}

function Documents({ client }: { client: PipelineClient }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="font-black text-slate-950">قائمة المستندات</h2>
      <div className="mt-4 space-y-2">
        {client.documents.map((doc) => <div key={doc.id} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3"><span className="text-sm font-bold text-slate-700">{doc.label}</span><Badge tone={doc.status === 'مطلوب' ? 'amber' : doc.status === 'تم الاستلام' ? 'green' : 'blue'}>{doc.status}</Badge></div>)}
      </div>
    </section>
  );
}

function Activity({ client }: { client: PipelineClient }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="font-black text-slate-950">سجل المتابعة</h2>
      <div className="mt-4 space-y-3">
        {client.activity.map((item) => <article key={item.id} className="border-s border-teal-200 pe-4"><p className="text-xs font-bold text-slate-500" dir="ltr">{item.at}</p><h3 className="mt-1 font-black text-slate-900">{item.title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p><p className="mt-1 text-xs text-slate-500">بواسطة {item.actor}</p></article>)}
      </div>
    </section>
  );
}
