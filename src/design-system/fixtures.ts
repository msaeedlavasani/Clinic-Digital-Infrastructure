export const LOCALES = {
  "fa-IR": {
    dir: "rtl",
    name: "فارسی",
    short: "این یک نمونهٔ کوتاه برای بررسی نقش تایپوگرافی است.",
    long: "این متن بلند برای سنجش خوانایی، فاصلهٔ خطوط، شکست سطرها و فضای کافی در یک ترکیب راست‌به‌چپ نوشته شده است. طول متن نباید باعث بریدگی عنوان، جابه‌جایی ناخواستهٔ رسانه یا گم‌شدن کنش اصلی شود.",
    button: "مشاهدهٔ مسیرهای مراقبت و دریافت راهنمایی بیشتر",
  },
  en: {
    dir: "ltr",
    name: "English",
    short: "A short fixture for checking a semantic text role.",
    long: "This longer validation paragraph checks reading measure, line height, wrapping, spacing, and action placement. Text expansion must not crop a heading, obscure the focal subject, or detach an action from its content.",
    button: "Explore the available care pathways and read the complete guidance",
  },
  ar: {
    dir: "rtl",
    name: "العربية",
    short: "نص قصير لاختبار وضوح دور الكتابة واتجاه القراءة.",
    long: "هذا نص أطول للتحقق من عرض القراءة وارتفاع السطر والتفاف الفقرات والمسافات وموضع الإجراء. يجب ألا يؤدي طول النص إلى قص العنوان أو حجب العنصر البصري الأساسي أو فصل الإجراء عن محتواه.",
    button: "استكشف مسارات الرعاية المتاحة واقرأ الإرشادات كاملةً",
  },
  ru: {
    dir: "ltr",
    name: "Русский",
    short: "Короткий пример для проверки семантической роли текста.",
    long: "Этот расширенный текст помогает проверить ширину строки, межстрочный интервал, переносы, ритм абзацев и положение действия. Длина текста не должна обрезать заголовок, перекрывать главный объект или отделять действие от его содержания.",
    button: "Посмотреть доступные направления и прочитать полную информацию",
  },
} as const;

export type LocaleFixture = keyof typeof LOCALES;

export const TEXT_ROLES = [
  { role: "Hero", className: "type-hero" },
  { role: "Scene Title", className: "type-scene-title" },
  { role: "Display", className: "type-display" },
  { role: "H1", className: "type-h1" },
  { role: "H2", className: "type-h2" },
  { role: "H3", className: "type-h3" },
  { role: "Title", className: "type-title" },
  { role: "Body Large", className: "type-body-large" },
  { role: "Body", className: "type-body" },
  { role: "Small", className: "type-small" },
  { role: "Caption", className: "type-caption" },
  { role: "Label", className: "type-label" },
] as const;

type CompositionFixture = {
  id: string;
  label: string;
  intent: string;
  media?: "landscape" | "portrait" | "technology";
};

export const COMPOSITION_FIXTURES: CompositionFixture[] = [
  { id: "hero", label: "Hero", intent: "Positioning statement, media field, one related action.", media: "landscape" },
  { id: "treatment-discovery", label: "Treatment Discovery", intent: "Concern-led choice with readable options." },
  { id: "treatment-experience", label: "Treatment Experience", intent: "Abstract sensory signature; no outcome depiction." },
  { id: "treatment-information", label: "Treatment Information", intent: "Editorial facts and explanatory copy." },
  { id: "doctor", label: "Doctor", intent: "Identity, credential, and protected portrait placeholder.", media: "portrait" },
  { id: "technology", label: "Technology", intent: "Technology/environment placeholder and capability statement.", media: "technology" },
  { id: "evidence", label: "Evidence", intent: "Governed evidence structure with non-evidence placeholders." },
  { id: "before-after", label: "Before / After", intent: "Explicitly non-evidence fixture; labels and geometry only." },
  { id: "consultation", label: "Consultation", intent: "Form hierarchy and safe action relationship; no submission." },
  { id: "editorial-content", label: "Editorial Content", intent: "Reading measure, hierarchy, and in-flow contextual links." },
];

export const STRESS_FIXTURES = [
  "LONG_PERSIAN",
  "LONG_ENGLISH",
  "ARABIC_RTL",
  "RUSSIAN_CYRILLIC",
  "MIXED_SCRIPT",
  "LONG_BUTTON_LABEL",
  "MISSING_OPTIONAL_MEDIA",
  "PORTRAIT_MEDIA",
  "LANDSCAPE_MEDIA",
  "NARROW_MOBILE",
  "WIDE_DESKTOP",
] as const;
