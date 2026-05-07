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
    <section className={cn('relative mb-5 overflow-hidden rounded-3xl border border-amber-300/25 bg-slate-950 text-white shadow-lg shadow-slate-950/10', className)} aria-label={tutorial.title}>
      <div className="grid gap-3 p-4 lg:grid-cols-[1fr_1.2fr_auto] lg:items-center">
        <div className="flex gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-amber-300 to-orange-600 text-slate-950 shadow-inner shadow-white/20">
            <HelpCircle size={20} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-black text-amber-200">{tutorial.eyebrow}</p>
            <h2 className="mt-0.5 text-base font-black text-white sm:text-lg">{tutorial.title}</h2>
            <p className="mt-1 line-clamp-2 text-xs leading-6 text-slate-300 sm:text-sm">{tutorial.summary}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <span className="rounded-full bg-amber-300/15 px-3 py-1 text-[11px] font-black text-amber-200">
              دليل الاستخدام: {stepIndex + 1} من {tutorial.steps.length}
            </span>
            <div className="flex gap-1" aria-hidden="true">
              {tutorial.steps.map((step, index) => (
                <span key={step.title} className={cn('h-1.5 w-7 rounded-full transition', index === stepIndex ? 'bg-amber-300' : 'bg-white/15')} />
              ))}
            </div>
          </div>
          <h3 className="text-sm font-black text-white">{currentStep.title}</h3>
          <p className="mt-1 text-xs leading-6 text-slate-200 sm:text-sm">{currentStep.body}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 lg:flex-col lg:items-stretch">
          <button
            type="button"
            onClick={handleDismiss}
            className="rounded-full border border-white/10 bg-white/10 p-2 text-slate-200 transition hover:bg-white/20 lg:absolute lg:left-3 lg:top-3"
            aria-label="إخفاء التعليمات"
          >
            <X size={16} />
          </button>
          <button type="button" onClick={handleDismiss} className="rounded-full px-3 py-2 text-xs font-bold text-slate-300 transition hover:bg-white/10 hover:text-white">
            تخطي الدليل
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStepIndex((value) => Math.max(0, value - 1))}
              disabled={stepIndex === 0}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-bold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={15} />
              السابق في الدليل
            </button>
            <button
              type="button"
              onClick={() => isLastStep ? handleDismiss() : setStepIndex((value) => value + 1)}
              className="inline-flex items-center gap-1 rounded-full bg-gradient-to-l from-amber-300 to-orange-500 px-3 py-2 text-xs font-black text-slate-950 transition hover:from-amber-200 hover:to-orange-400"
            >
              {isLastStep ? 'تم' : 'التالي في الدليل'}
              {!isLastStep && <ChevronLeft size={15} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
