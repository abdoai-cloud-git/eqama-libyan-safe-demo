import type { ServiceRequest } from '@/lib/types';
export const demoServices: ServiceRequest[] = [
  { id:'S-001', workerName:'محمد حسن', serviceType:'فتح حساب مصرفي', status:'قيد المتابعة', priority:'عالية', owner:'سارة', notes:'بانتظار موعد المصرف', requestedAt:'2026-05-01', lastUpdated:'2026-05-06' },
  { id:'S-002', workerName:'آدم سليمان', serviceType:'سكن عمالي', status:'طلب جديد', priority:'متوسطة', owner:'أيوب', notes:'يريد سكن قريب من العمل', requestedAt:'2026-05-02', lastUpdated:'2026-05-02' },
  { id:'S-003', workerName:'مصطفى رحمان', serviceType:'رخصة قيادة', status:'يحتاج مستندات', priority:'متوسطة', owner:'محمود', notes:'ناقص صورة شخصية', requestedAt:'2026-05-03', lastUpdated:'2026-05-05' },
  { id:'S-004', workerName:'خالد عمر', serviceType:'حجز تذكرة', status:'مكتمل', priority:'منخفضة', owner:'سارة', notes:'تم الحجز', requestedAt:'2026-04-28', lastUpdated:'2026-05-01' },
  { id:'S-005', workerName:'سعيد الطاهر', serviceType:'شريحة هاتف', status:'قيد المتابعة', priority:'متوسطة', owner:'أيوب', notes:'بانتظار توقيع الاستلام', requestedAt:'2026-05-04', lastUpdated:'2026-05-06' },
  { id:'S-006', workerName:'جمال فضل', serviceType:'عقد تشغيل', status:'يحتاج معلومات', priority:'عالية', owner:'محمود', notes:'ناقص بيانات جهة العمل', requestedAt:'2026-05-01', lastUpdated:'2026-05-04' },
  { id:'S-007', workerName:'إبراهيم خان', serviceType:'تسجيل سيارة', status:'طلب جديد', priority:'منخفضة', owner:'سارة', notes:'سيارة مستعملة', requestedAt:'2026-05-05', lastUpdated:'2026-05-05' },
  { id:'S-008', workerName:'عبد الرحمن صالح', serviceType:'إيجار سيارة', status:'ملغي', priority:'منخفضة', owner:'أيوب', notes:'ألغي من العميل', requestedAt:'2026-04-25', lastUpdated:'2026-04-27' },
  { id:'S-009', workerName:'محمد حسن', serviceType:'خطاب إداري', status:'قيد المتابعة', priority:'عالية', owner:'محمود', notes:'خطاب لجهة العمل', requestedAt:'2026-05-06', lastUpdated:'2026-05-06' },
  { id:'S-010', workerName:'آدم سليمان', serviceType:'متابعة طلب إداري', status:'يحتاج مستندات', priority:'متوسطة', owner:'سارة', notes:'ناقص صورة جواز', requestedAt:'2026-05-03', lastUpdated:'2026-05-05' },
];
