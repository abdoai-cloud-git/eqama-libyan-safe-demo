import type { B2BRequest } from '@/lib/types';
export const demoB2BRequests: B2BRequest[] = [
  { id:'B2B-001', companyName:'شركة البناء الحديث', activityType:'مقاولات', workersNeeded:8, location:'طرابلس', preferredNationalities:'مصري، سوداني', status:'قيد المراجعة', notes:'تحتاج عمال خلال أسبوع', lastUpdated:'2026-05-06' },
  { id:'B2B-002', companyName:'مطعم المدينة', activityType:'مطاعم', workersNeeded:3, location:'مصراتة', preferredNationalities:'أي جنسية', status:'يحتاج متابعة', notes:'طباخ ومساعدين', lastUpdated:'2026-05-05' },
  { id:'B2B-003', companyName:'ورشة النور', activityType:'صيانة سيارات', workersNeeded:2, location:'بنغازي', preferredNationalities:'باكستاني، بنغلاديشي', status:'طلب جديد', notes:'فنيين ميكانيكا', lastUpdated:'2026-05-04' },
  { id:'B2B-004', companyName:'مخازن المتوسط', activityType:'لوجستيات', workersNeeded:5, location:'طرابلس', preferredNationalities:'تشادي، نيجري', status:'تم توفير عمال', notes:'تم توفير 5 ملفات', lastUpdated:'2026-05-02' },
  { id:'B2B-005', companyName:'شركة اليسر', activityType:'نظافة وتشغيل', workersNeeded:10, location:'سبها', preferredNationalities:'غاني، سوداني', status:'مغلق', notes:'تم إغلاق الطلب', lastUpdated:'2026-04-30' },
];
