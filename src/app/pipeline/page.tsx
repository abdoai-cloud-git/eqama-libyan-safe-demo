'use client';

import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  FileText,
  GripVertical,
  MessageCircle,
  Phone,
  PlusCircle,
  Send,
  ShieldCheck,
  X,
} from 'lucide-react';
import ClientCard from '@/components/client-card';
import { Badge, PageTitle, Shell, TopNav, statusTone } from '@/components/ui';
import {
  calculatePipelineCompletion,
  initialPipelineClients,
  movePipelineClient,
  pipelineStages,
  type PipelineClient,
} from '@/lib/pipeline-demo';
import { cn } from '@/lib/utils';

export default function PipelinePage() {
  const [clients, setClients] = useState<PipelineClient[]>(initialPipelineClients);
  const [selectedId, setSelectedId] = useState(initialPipelineClients[0].idNumber);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const selectedClient = clients.find((client) => client.idNumber === selectedId) ?? clients[0];

  const stageCounts = useMemo(() => pipelineStages.map((stage) => ({
    ...stage,
    clients: clients.filter((client) => client.currentStageId === stage.id),
  })), [clients]);

  const completion = calculatePipelineCompletion(selectedClient.currentStageId, pipelineStages.length);

  const selectClient = (clientId: string) => {
    setSelectedId(clientId);
    setDrawerOpen(true);
  };

  const updateClient = (updated: PipelineClient, originalIdNumber = updated.idNumber) => {
    setClients((current) => current.map((client) => client.idNumber === originalIdNumber ? updated : client));
    setSelectedId(updated.idNumber);
  };

  const moveClientToStage = (clientId: string, stageId: number, openDrawer = false) => {
    setClients((current) => movePipelineClient(current, clientId, stageId));
    setSelectedId(clientId);
    if (openDrawer) setDrawerOpen(true);
  };

  const handleDrop = (stageId: number, draggedClientId?: string) => {
    if (!draggingId || draggedClientId !== draggingId) return;
    moveClientToStage(draggingId, stageId);
    setDraggingId(null);
  };

  return (
    <>
      <TopNav />
      <Shell>
        <PageTitle
          title="مسار العملاء"
          subtitle="فَنَل تشغيلي يدعم السحب والإفلات بين المراحل، مع درج جانبي لتعديل العميل ومتابعة المستندات والسجل."
        />

        <section className="mb-6 rounded-3xl bg-slate-950 p-5 text-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-amber-200">العميل المحدد</p>
              <h2 className="mt-1 text-2xl font-black">{selectedClient.name}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-300">{selectedClient.idNumber} · {selectedClient.owner} · {selectedClient.stageEnteredAt}</p>
            </div>
            <div className="grid w-full gap-2 sm:w-auto sm:grid-cols-3">
              <Summary label="التقدم" value={`${completion}%`} />
              <Summary label="الحالة" value={selectedClient.status} />
              <Summary label="الدفع" value={selectedClient.paymentStatus} />
            </div>
          </div>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10" dir="rtl">
            <div className="h-full rounded-full bg-amber-400 transition-all" style={{ width: `${completion}%` }} />
          </div>
        </section>

        <section className="mb-6 overflow-x-auto pb-2">
          <div className="grid min-w-[920px] grid-cols-5 gap-3 md:min-w-0">
            {stageCounts.map((stage) => (
              <button
                key={stage.id}
                type="button"
                onClick={() => moveClientToStage(selectedClient.idNumber, stage.id)}
                className={cn(
                  'rounded-3xl border p-4 text-start transition hover:-translate-y-0.5 hover:shadow-md',
                  selectedClient.currentStageId === stage.id ? 'border-amber-300 bg-amber-50' : 'border-slate-200 bg-white hover:border-amber-200'
                )}
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-black text-slate-600">{stage.clients.length} عملاء</span>
                  {selectedClient.currentStageId > stage.id ? <CheckCircle2 className="text-emerald-600" size={20} /> : selectedClient.currentStageId === stage.id ? <Clock3 className="text-amber-600" size={20} /> : <ArrowLeft className="text-slate-400" size={20} />}
                </div>
                <h3 className="font-black text-slate-950">{stage.name}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-500">{stage.description}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-slate-950">لوحة مراحل العملاء</h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">اسحب بطاقة العميل إلى أي مرحلة، أو افتح البطاقة للتعديل من الدرج الجانبي.</p>
            </div>
            <Badge tone="teal">{clients.length} عملاء في الديمو</Badge>
          </div>

          <div className="overflow-x-auto pb-3">
            <div className="grid min-w-[1180px] grid-cols-5 gap-4 xl:min-w-0">
              {stageCounts.map((stage) => (
                <div
                  key={stage.id}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    handleDrop(stage.id, event.dataTransfer.getData('text/plain'));
                  }}
                  className={cn(
                    'min-h-[26rem] rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-3 transition',
                    draggingId && 'border-amber-300 bg-amber-50/40'
                  )}
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <h3 className="text-sm font-black text-slate-800">{stage.name}</h3>
                    <span className="rounded-full bg-white px-2 py-1 text-xs font-black text-slate-500">{stage.clients.length}</span>
                  </div>
                  <div className="space-y-3">
                    {stage.clients.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-4 text-xs leading-6 text-slate-500">اسحب بطاقة عميل إلى هنا.</div>
                    ) : stage.clients.map((client) => (
                      <article
                        key={client.idNumber}
                        className={cn(
                          'rounded-2xl border bg-white p-3 text-start shadow-sm transition hover:border-amber-300 hover:shadow-md',
                          selectedClient.idNumber === client.idNumber && 'border-amber-400 ring-4 ring-amber-50',
                          draggingId === client.idNumber && 'opacity-60'
                        )}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <button type="button" onClick={() => selectClient(client.idNumber)} className="min-w-0 flex-1 text-start">
                            <p className="font-black text-slate-950">{client.name}</p>
                            <p className="mt-1 text-xs text-slate-500" dir="ltr">{client.idNumber}</p>
                          </button>
                          <button
                            type="button"
                            draggable
                            onDragStart={(event) => {
                              setDraggingId(client.idNumber);
                              event.dataTransfer.setData('text/plain', client.idNumber);
                              event.dataTransfer.effectAllowed = 'move';
                            }}
                            onDragEnd={() => setDraggingId(null)}
                            className="shrink-0 cursor-grab rounded-full p-1 text-slate-300 hover:bg-slate-100 hover:text-amber-600"
                            aria-label={`اسحب ${client.name} إلى مرحلة أخرى`}
                          >
                            <GripVertical size={18} aria-hidden="true" />
                          </button>
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-2">
                          <Badge tone={statusTone(client.status)}>{client.status}</Badge>
                          <span className="text-xs text-slate-500">{client.owner}</span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                          <span>{client.stageEnteredAt}</span>
                          <span>·</span>
                          <span>{client.paymentStatus}</span>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <button type="button" onClick={() => selectClient(client.idNumber)} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700">فتح التفاصيل</button>
                          {client.currentStageId < pipelineStages.length && (
                            <button type="button" onClick={() => moveClientToStage(client.idNumber, client.currentStageId + 1)} className="rounded-full bg-amber-600 px-3 py-1.5 text-xs font-bold text-white">
                              نقل للتالي
                            </button>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Shell>

      <ClientDrawer
        open={drawerOpen}
        client={selectedClient}
        onClose={() => setDrawerOpen(false)}
        onMoveNext={() => selectedClient.currentStageId < pipelineStages.length && moveClientToStage(selectedClient.idNumber, selectedClient.currentStageId + 1, true)}
        onSave={updateClient}
      />
    </>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return <div className="min-w-0 rounded-2xl bg-white/10 p-3"><p className="text-xs font-bold text-slate-300">{label}</p><p className="mt-1 truncate text-lg font-black text-white">{value}</p></div>;
}

function ClientDrawer({ open, client, onClose, onMoveNext, onSave }: { open: boolean; client: PipelineClient; onClose: () => void; onMoveNext: () => void; onSave: (client: PipelineClient, originalIdNumber?: string) => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button type="button" aria-label="إغلاق الدرج" className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={onClose} />
      <aside className="absolute inset-x-0 bottom-0 max-h-[92vh] overflow-y-auto rounded-t-[2rem] bg-white p-4 shadow-2xl sm:inset-x-auto sm:inset-y-0 sm:right-0 sm:h-full sm:max-h-none sm:w-[480px] sm:rounded-l-[2rem] sm:rounded-tr-none sm:p-5">
        <div className="sticky top-0 z-10 mb-4 flex items-start justify-between gap-3 border-b border-slate-100 bg-white/95 pb-4 backdrop-blur">
          <div>
            <p className="text-xs font-bold text-amber-600">درج تفاصيل العميل</p>
            <h2 className="mt-1 text-xl font-black text-slate-950">{client.name}</h2>
            <p className="mt-1 text-xs text-slate-500" dir="ltr">{client.idNumber}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50" aria-label="إغلاق">
            <X size={18} />
          </button>
        </div>
        <div className="space-y-5">
          <NextAction client={client} onMoveNext={onMoveNext} />
          <ClientCard key={`${client.idNumber}-${client.currentStageId}-${client.lastUpdated}`} client={client} onSave={onSave} />
          <Documents client={client} />
          <Activity client={client} />
        </div>
      </aside>
    </div>
  );
}

function NextAction({ client, onMoveNext }: { client: PipelineClient; onMoveNext: () => void }) {
  const canMove = client.currentStageId < pipelineStages.length;
  return (
    <section className="rounded-3xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-amber-600 p-3 text-white"><ShieldCheck size={22} /></div>
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
        {client.activity.map((item) => <article key={item.id} className="border-s border-amber-200 pe-4"><p className="text-xs font-bold text-slate-500" dir="ltr">{item.at}</p><h3 className="mt-1 font-black text-slate-900">{item.title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p><p className="mt-1 text-xs text-slate-500">بواسطة {item.actor}</p></article>)}
      </div>
    </section>
  );
}
