'use client';

import { ChevronLeft, ChevronRight, HelpCircle, X } from 'lucide-react';
import { useState } from 'react';
import { useTutorialState } from '@/hooks/use-tutorial-state';
import { tutorials, type TutorialPage } from '@/lib/tutorials';
import { cn } from '@/lib/utils';

export function TutorialGuide({ page, className }: { page: TutorialPage; className?: string }) {
  const tutorial = tutorials[page];
  const { ready, open, dismiss, restart } = useTutorialState(page);
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = tutorial.steps[stepIndex];
  const isLastStep = stepIndex === tutorial.steps.length - 1;

  const handleRestart = () => {
    setStepIndex(0);
    restart();
  };

  const handleDismiss = () => {
    setStepIndex(0);
    dismiss();
  };

  if (!ready) return null;

  if (!open) {
    return (
      <div className={cn('mb-5 flex justify-end', className)}>
        <button
          type="button"
          onClick={handleRestart}
          className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-white/90 px-4 py-2 text-sm font-black text-amber-900 shadow-sm shadow-amber-950/5 transition hover:border-amber-400 hover:bg-amber-50"
        >
          <HelpCircle size={16} />
          إظهار التعليمات
        </button>
      </div>
    );
  }

  return (
    <section className={cn('relative mb-5 overflow-hidden rounded-3xl border border-amber-300/25 bg-slate-950 text-white shadow-xl shadow-slate-950/10', className)} aria-label={tutorial.title}>
      <div className="grid gap-4 p-4 sm:grid-cols-[1fr_auto] sm:p-5">
        <div className="flex gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-amber-300 to-orange-600 text-slate-950 shadow-inner shadow-white/20">
            <HelpCircle size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-black text-amber-200">{tutorial.eyebrow}</p>
            <h2 className="mt-1 text-lg font-black text-white">{tutorial.title}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-300">{tutorial.summary}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute left-3 top-3 rounded-full border border-white/10 bg-white/10 p-2 text-slate-200 transition hover:bg-white/20 sm:static sm:self-start"
          aria-label="إخفاء التعليمات"
        >
          <X size={16} />
        </button>
      </div>

      <div className="border-t border-white/10 bg-white/[0.04] p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full bg-amber-300/15 px-3 py-1 text-xs font-black text-amber-200">
            الخطوة {stepIndex + 1} من {tutorial.steps.length}
          </span>
          <div className="flex gap-1" aria-hidden="true">
            {tutorial.steps.map((step, index) => (
              <span key={step.title} className={cn('h-2 w-8 rounded-full transition', index === stepIndex ? 'bg-amber-300' : 'bg-white/15')} />
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/10 p-4">
          <h3 className="font-black text-white">{currentStep.title}</h3>
          <p className="mt-2 text-sm leading-7 text-slate-200">{currentStep.body}</p>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <button type="button" onClick={handleDismiss} className="rounded-full px-4 py-2 text-sm font-bold text-slate-300 transition hover:bg-white/10 hover:text-white">
            تخطي
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStepIndex((value) => Math.max(0, value - 1))}
              disabled={stepIndex === 0}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={16} />
              السابق
            </button>
            <button
              type="button"
              onClick={() => isLastStep ? handleDismiss() : setStepIndex((value) => value + 1)}
              className="inline-flex items-center gap-1 rounded-full bg-gradient-to-l from-amber-300 to-orange-500 px-4 py-2 text-sm font-black text-slate-950 transition hover:from-amber-200 hover:to-orange-400"
            >
              {isLastStep ? 'تم' : 'التالي'}
              {!isLastStep && <ChevronLeft size={16} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
