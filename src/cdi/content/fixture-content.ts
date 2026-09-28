import type { ConcernContent, DeviceContent, DoctorContent, HomeContent, LocalizedEntity, TechnologyContent, TreatmentContent } from "../runtime/model";

export const homeContent: Record<"fa" | "en", HomeContent> = {
  fa: {
    title: "آرامش، با شناخت روشن‌تر آغاز می‌شود",
    lede: "این تجربهٔ نمونه نشان می‌دهد یک سامانهٔ مشترک چگونه اطلاعات و مسیرهای مراقبت را به‌شکل روشن و مسئولانه ارائه می‌کند.",
    discoveryTitle: "از دغدغه‌ای که برایتان مهم است شروع کنید",
    discoveryPrompt: "چه چیزی دوست دارید بهتر بشناسید؟",
  },
  en: {
    title: "A clearer understanding starts with care",
    lede: "This reference experience shows how one shared platform can present care information and pathways with clarity and restraint.",
    discoveryTitle: "Start with what matters to you",
    discoveryPrompt: "What would you like to understand better?",
  },
};

export const treatmentEntities: readonly LocalizedEntity<TreatmentContent>[] = [
  {
    id: "TREATMENT.LASER_HAIR_REMOVAL",
    representations: {
      fa: {
        locale: "fa", publication: "PUBLISHED", slug: "لیزر-موهای-ناخواسته",
        seo: { title: "آشنایی با خدمات مبتنی بر نور | کلینیک مرجع CDI", description: "اطلاعات نمونه و غیرپزشکی دربارهٔ یک خدمت مبتنی بر نور در تجربهٔ مرجع CDI." },
        content: {
          title: "خدمات مبتنی بر نور",
          summary: "یک معرفی آموزشی دربارهٔ نور، تمرکز و دقت؛ بدون شبیه‌سازی نتیجه یا ادعای اثربخشی.",
          overview: "این محتوای نمایشی فقط برای ارزیابی معماری و ترکیب‌بندی رابط نوشته شده است. برای هیچ روش پزشکی توصیه، نتیجه یا مناسب‌بودن فردی را بیان نمی‌کند.",
          concernIds: ["CONCERN.UNWANTED_HAIR"],
          facts: [],
          sections: [
            { heading: "دربارهٔ این نمونه", body: "اطلاعات واقعی دربارهٔ روش‌ها باید توسط متخصصان واجد صلاحیت بررسی، بومی‌سازی و پیش از انتشار تأیید شود. این نمونه برای تصمیم‌گیری درمانی نیست." },
            { heading: "مرزهای محتوا", body: "هیچ وعده‌ای دربارهٔ نتیجه، تعداد جلسات، ماندگاری یا مناسب‌بودن برای فرد ارائه نمی‌شود. اطلاعات ضروریِ پزشکیِ تأییدشده در محتوای نمونه موجود نیست." },
          ],
        },
      },
      en: {
        locale: "en", publication: "PUBLISHED", slug: "light-based-care",
        seo: { title: "Light-based care information | CDI Reference Clinic", description: "Non-clinical sample information about a light-based service in the CDI reference experience." },
        content: {
          title: "Light-based care",
          summary: "An educational introduction to light, focus, and precision, without simulating outcomes or claiming efficacy.",
          overview: "This demonstration content exists to validate runtime architecture and composition. It does not offer medical advice, results, or individualized suitability claims.",
          concernIds: ["CONCERN.UNWANTED_HAIR"],
          facts: [],
          sections: [
            { heading: "About this fixture", body: "Real treatment information must be reviewed by qualified clinicians, localized, and approved before publication. This sample must not guide care decisions." },
            { heading: "Content boundaries", body: "No result, session count, longevity, or personal suitability is promised. Verified medical details are intentionally absent from this fixture." },
          ],
        },
      },
    },
  },
  {
    id: "TREATMENT.BOTULINUM_TOXIN_TREATMENT",
    representations: {
      en: {
        locale: "en", publication: "PUBLISHED", slug: "botulinum-toxin-fixture",
        seo: { title: "Hidden treatment fixture | CDI", description: "Internal route-resolution fixture." },
        content: { title: "Hidden treatment fixture", summary: "This entity is intentionally not included in public discovery.", overview: "Validation-only content.", concernIds: [], facts: [], sections: [] },
      },
    },
  },
  {
    id: "TREATMENT.SKIN_REJUVENATION",
    representations: {
      en: {
        locale: "en", publication: "DRAFT", slug: "draft-skin-treatment",
        seo: { title: "Draft fixture", description: "Must not be public." },
        content: { title: "Unpublished fixture", summary: "Must not be rendered publicly.", overview: "Draft.", concernIds: [], facts: [], sections: [] },
      },
    },
  },
];

export const concernEntities: readonly LocalizedEntity<ConcernContent>[] = [{
  id: "CONCERN.UNWANTED_HAIR",
  representations: {
    fa: { locale: "fa", publication: "PUBLISHED", slug: "موهای-ناخواسته", seo: { title: "موهای ناخواسته", description: "محتوای نمونه برای مسیر کاوش دغدغه." }, content: { label: "موهای ناخواسته", description: "آشنایی با گزینه‌های منتشرشدهٔ مرتبط؛ این بخش تشخیص یا پیشنهاد مناسب‌بودن نیست." } },
    en: { locale: "en", publication: "PUBLISHED", slug: "unwanted-hair", seo: { title: "Unwanted hair", description: "A reference fixture for patient-centered concern discovery." }, content: { label: "Unwanted hair", description: "Explore published related options. This content does not diagnose or assess suitability." } },
  },
}];

export const doctorEntities: readonly LocalizedEntity<DoctorContent>[] = [{
  id: "DOCTOR.EXAMPLE_CLINICIAN_01",
  representations: {
    fa: { locale: "fa", publication: "PUBLISHED", slug: "پزشک-نمونه", seo: { title: "پروفایل نمایشی", description: "پروفایل آزمایشی غیرواقعی." }, content: { name: "پروفایل پزشک نمونه", title: "عنوان حرفه‌ای در این نمونه تأیید نشده", summary: "این نمایه فقط برای بررسی ساختار است و به شخص واقعی اشاره ندارد.", credentialNotice: "مدرک یا صلاحیت حرفه‌ای در این نمونه ادعا نشده است." } },
    en: { locale: "en", publication: "PUBLISHED", slug: "example-clinician", seo: { title: "Example clinician fixture", description: "A fictional, non-clinical profile specimen." }, content: { name: "Example clinician", title: "Professional title not asserted", summary: "This profile exists only to validate shared content and composition boundaries.", credentialNotice: "No real person, credential, or clinical qualification is represented." } },
  },
}];

export const technologyEntities: readonly LocalizedEntity<TechnologyContent>[] = [{
  id: "TECHNOLOGY.LASER",
  representations: {
    fa: { locale: "fa", publication: "PUBLISHED", slug: "فناوری-نور", seo: { title: "فناوری نمونه", description: "اطلاعات فناوری نمایشی." }, content: { name: "فناوری مبتنی بر نور", summary: "ردهٔ فناوری در محتوای نمایشی؛ بدون ادعای تجهیز یا استاندارد واقعی." } },
    en: { locale: "en", publication: "PUBLISHED", slug: "light-technology", seo: { title: "Technology fixture", description: "Sample technology context." }, content: { name: "Light-based technology", summary: "A generic technology category in fixture content, without claims about real equipment or standards." } },
  },
}];

export const deviceEntities: readonly LocalizedEntity<DeviceContent>[] = [{
  id: "DEVICE.DEMO_LIGHT_PLATFORM",
  representations: {
    fa: { locale: "fa", publication: "PUBLISHED", slug: "سکوی-نمایشی", seo: { title: "سکوی نمایشی", description: "نمایش دستگاه عمومی." }, content: { name: "سکوی دستگاه عمومی", summary: "هیچ مدل یا مالکیتی در این نمونه تعیین نشده است.", ownership: "NOT_ASSERTED" } },
    en: { locale: "en", publication: "PUBLISHED", slug: "generic-platform-fixture", seo: { title: "Generic platform fixture", description: "Non-specific equipment context." }, content: { name: "Generic equipment platform", summary: "No model or ownership is asserted in this reference fixture.", ownership: "NOT_ASSERTED" } },
  },
}];

export const homeSeo: Record<"fa" | "en", { title: string; description: string }> = {
  fa: { title: "تجربهٔ مرجع CDI | سامانهٔ زیرساخت دیجیتال درمانگاه", description: "نمونهٔ غیرواقعی CDI برای اعتبارسنجی تجربهٔ چندکلینیکی و چندزبانه." },
  en: { title: "CDI Reference Experience | Clinic Digital Infrastructure", description: "A fictional CDI fixture for validating a multilingual, multi-clinic runtime." },
};
