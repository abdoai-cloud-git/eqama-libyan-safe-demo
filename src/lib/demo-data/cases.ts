import type { ResidencyCase } from '@/lib/types';
import { qualifyApplicant } from '@/lib/qualification/rules';

const people = [
  ['محمد حسن','0911111101','مصري',32,'TikTok','current_residency',true,true,true,'مؤهل مبدئيًا','بانتظار دفع المقدم','بانتظار الدفع'],
  ['آدم سليمان','0911111102','سوداني',29,'Facebook','visa',true,false,false,'مؤهل مبدئيًا','مؤهل مبدئيًا','لم يطلب بعد'],
  ['مصطفى رحمان','0911111103','بنغلاديشي',37,'TikTok','entry_stamp',true,false,false,'مؤهل مبدئيًا','تم استلام المقدم','تم استلام المقدم'],
  ['خالد عمر','0911111104','سوري',68,'Direct Link','visa',true,false,false,'يحتاج مراجعة خاصة','يحتاج معلومات','لم يطلب بعد'],
  ['حسن عبد الله','0911111105','تشادي',24,'TikTok','informal',false,false,false,'غير قابل','غير قابل للبدء حاليًا','لم يطلب بعد'],
  ['علي موسى','0911111106','نيجري',40,'Facebook','current_residency',true,true,false,'غير قابل','غير قابل للبدء حاليًا','لم يطلب بعد'],
  ['يوسف إبراهيم','0911111107','غاني',31,'TikTok','visa',false,false,false,'غير قابل','غير قابل للبدء حاليًا','لم يطلب بعد'],
  ['عبد الرحمن صالح','0911111108','باكستاني',35,'Direct Link','visa',true,false,false,'مؤهل مبدئيًا','تحت الإجراء','تم استلام المقدم'],
  ['سعيد الطاهر','0911111109','مصري',28,'TikTok','current_residency',true,true,true,'مؤهل مبدئيًا','مكتمل','مكتمل'],
  ['أمين سالم','0911111110','سوداني',45,'Facebook','visa',true,false,false,'مؤهل مبدئيًا','يحتاج مستندات','لم يطلب بعد'],
  ['بشير علي','0911111111','تشادي',22,'TikTok','entry_stamp',true,false,false,'مؤهل مبدئيًا','بانتظار دفع المقدم','بانتظار الدفع'],
  ['نور الدين','0911111112','نيجري',39,'Facebook','current_residency',true,true,false,'غير قابل','غير قابل للبدء حاليًا','لم يطلب بعد'],
  ['سامر محمود','0911111113','سوري',27,'Direct Link','visa',true,false,false,'مؤهل مبدئيًا','يحتاج مستندات','لم يطلب بعد'],
  ['كريم فوزي','0911111114','مصري',33,'TikTok','current_residency',true,true,true,'مؤهل مبدئيًا','تحت الإجراء','تم استلام المقدم'],
  ['عمر آدم','0911111115','غاني',44,'Facebook','visa',true,false,false,'مؤهل مبدئيًا','بانتظار دفع المقدم','بانتظار الدفع'],
  ['جمال فضل','0911111116','سوداني',52,'TikTok','entry_stamp',true,false,false,'مؤهل مبدئيًا','مكتمل','مكتمل'],
  ['عبد القادر','0911111117','تشادي',36,'Direct Link','visa',true,false,false,'مؤهل مبدئيًا','يحتاج مستندات','لم يطلب بعد'],
  ['إبراهيم خان','0911111118','باكستاني',30,'TikTok','current_residency',true,true,true,'مؤهل مبدئيًا','مكتمل','مكتمل'],
  ['طه عثمان','0911111119','نيجري',26,'Facebook','informal',false,false,false,'غير قابل','غير قابل للبدء حاليًا','لم يطلب بعد'],
  ['رامي بشير','0911111120','بنغلاديشي',41,'TikTok','visa',true,false,false,'مؤهل مبدئيًا','طلب جديد','لم يطلب بعد'],
] as const;

export const demoCases: ResidencyCase[] = people.map((p, index) => {
  const [fullName, phone, nationality, age, source, entryMethod, hasEntryStamp, hasCurrentResidency, hasReleaseLetter, , status, paymentStatus] = p;
  const answers = {
    fullName, phone, nationality, age,
    isInLibya: true,
    entryMethod,
    hasEntryStamp,
    hasCurrentResidency,
    hasReleaseLetter,
    passportValid: true,
    hasSecurityApproval: index % 3 !== 0,
    requestedService: hasCurrentResidency ? 'ترتيب إقامة حالية' : 'إقامة وافد جديد',
    canPayCashDepositAfterAcceptance: true,
  } as ResidencyCase;
  const qualification = qualifyApplicant(answers);
  return {
    ...answers,
    id: `CASE-${String(index + 1).padStart(4, '0')}`,
    createdAt: `2026-05-${String((index % 20) + 1).padStart(2, '0')}T10:00:00Z`,
    source,
    qualification,
    status,
    paymentStatus,
    depositAmount: paymentStatus === 'لم يطلب بعد' ? undefined : 750,
    depositReceivedAt: paymentStatus === 'تم استلام المقدم' || paymentStatus === 'مكتمل' ? '2026-05-05' : undefined,
    depositReceivedBy: paymentStatus === 'تم استلام المقدم' || paymentStatus === 'مكتمل' ? 'أيوب' : undefined,
    internalNotes: ['تم إنشاء الحالة من بيانات الديمو.', qualification.internalSummary],
    owner: ['أيوب','سارة','محمود'][index % 3],
    lastUpdated: `2026-05-${String((index % 20) + 1).padStart(2, '0')}`,
  };
});
