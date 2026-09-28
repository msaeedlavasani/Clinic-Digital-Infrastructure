import { SelectField, TextField } from "@/design-system/components/forms";
import type { ClinicContext, RouteLocale } from "@/cdi/runtime/model";
import { submitConsultation } from "@/app/(clinic)/[locale]/consultation/actions";

const copy = {
  fa: {
    name: "نام", phone: "شماره تماس", treatment: "موضوع موردنظر", select: "یک گزینه انتخاب کنید",
    helper: "این نمونه هیچ اطلاعاتی را ذخیره یا به سامانه‌ای ارسال نمی‌کند.", required: "الزامی", optional: "اختیاری",
    send: "ارسال درخواست نمونه", success: "اعتبارسنجی انجام شد. هیچ اطلاعاتی ذخیره یا ارسال نشده است.",
    unavailable: "ارسال این فرم در این محیط در دسترس نیست.", invalid: "لطفاً موارد مشخص‌شده را بررسی کنید.",
    nameError: "نام را بین ۲ تا ۸۰ نویسه وارد کنید.", phoneError: "شمارهٔ تماس معتبر را وارد کنید.", treatmentError: "یک گزینهٔ منتشرشده انتخاب کنید.",
  },
  en: {
    name: "Name", phone: "Contact number", treatment: "What would you like to discuss?", select: "Select an option",
    helper: "This fixture does not store or send any information.", required: "Required", optional: "Optional",
    send: "Submit validation request", success: "Validation succeeded. No details were stored or sent.",
    unavailable: "Submission is unavailable in this environment.", invalid: "Please review the marked fields.",
    nameError: "Enter a name between 2 and 80 characters.", phoneError: "Enter a valid contact number.", treatmentError: "Choose a published treatment option.",
  },
} as const;

export function ConsultationForm({
  clinic,
  locale,
  options,
  defaultTreatmentId,
  status = "",
  invalidFields = [],
}: {
  clinic: ClinicContext;
  locale: RouteLocale;
  options: Array<{ id: string; label: string }>;
  defaultTreatmentId?: string;
  status?: string;
  invalidFields?: string[];
}) {
  const text = copy[locale];
  const action = submitConsultation.bind(null, clinic.id, locale);
  const treatmentOptions = [{ value: "", label: text.select }, ...options.map(({ id, label }) => ({ value: id, label }))];
  const errors = {
    name: invalidFields.includes("name") ? text.nameError : undefined,
    phone: invalidFields.includes("phone") ? text.phoneError : undefined,
    treatmentId: invalidFields.includes("treatmentId") ? text.treatmentError : undefined,
  };

  return (
    <form className="cdi-consultation-form" action={action} data-testid="consultation-form">
      {status === "invalid" && <div className="cdi-form-status cdi-form-status--error" role="alert" tabIndex={-1}>{text.invalid}</div>}
      {status === "success" && <div className="cdi-form-status cdi-form-status--success" role="status">{text.success}</div>}
      {status === "unavailable" && <div className="cdi-form-status cdi-form-status--error" role="alert">{text.unavailable}</div>}
      <TextField id="consultation-name" name="name" label={text.name} autoComplete="name" required requiredLabel={text.required} optionalLabel={text.optional} error={errors.name} />
      <TextField id="consultation-phone" name="phone" label={text.phone} type="tel" inputMode="tel" autoComplete="tel" required requiredLabel={text.required} optionalLabel={text.optional} error={errors.phone} />
      <SelectField id="consultation-treatment" name="treatmentId" label={text.treatment} options={treatmentOptions} required requiredLabel={text.required} optionalLabel={text.optional} error={errors.treatmentId} defaultValue={defaultTreatmentId && options.some((option) => option.id === defaultTreatmentId) ? defaultTreatmentId : ""} />
      <p className="type-caption cdi-consultation-form__notice">{text.helper}</p>
      <div className="cdi-action-zone cdi-consultation-form__actions"><button className="cdi-button cdi-button--primary" type="submit">{text.send}</button></div>
    </form>
  );
}
