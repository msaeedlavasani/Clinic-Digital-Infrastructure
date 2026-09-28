# ARGON demo walkthrough

## Launch

From the repository root, run:

```sh
python3 -m http.server 4178 --directory prototype/argon-e01
```

Open: <http://localhost:4178/>

No build step or runtime dependency is required.

## Recommended Persian presentation sequence

1. Open in Persian on **«زیبایی، با دقت بیشتر.»** Introduce ARGON as the clinic identity.
2. Choose **«مشاهده خدمات»**. Show the treatment selector and select **«لیزر موهای زائد»**.
3. Choose **«مشاهده درمان»**. The one-second controlled light sweep is a conceptual Laser signifier; it does not change skin or depict an outcome.
4. Choose **«ادامه به اطلاعات درمان»** to show the treatment overview, qualitative facts, provider link, technology link, and consultation CTA.
5. Continue to the clearly labeled demonstration doctor.
6. Show the illustrative clinic room and supporting technology context.
7. Finish at **«درخواست مشاوره»**. The form clears its fields and confirms no request was sent or saved.
8. Optionally select **EN** and **FA** in the masthead to show the same scene in LTR and RTL.

## Presenter controls

- Wheel / trackpad and touch swipe move one scene at a time; the document stays fixed.
- Click the visible contextual actions, or use the lower-right progression controls where shown.
- Persian keyboard controls: `ArrowDown` / `ArrowLeft` advance; `ArrowUp` / `ArrowRight` go back. The horizontal mapping reverses in English. `Home` and `End` jump to the first and last scene.
- The desktop masthead links directly to **خدمات**, **پزشکان**, **تکنولوژی**, and **مشاوره**. On mobile, tap **بخش‌ها**.
- Direct scene links: `?state=hero`, `?state=treatments`, `?state=laser-event`, `?state=laserDetail`, `?state=doctor`, `?state=technology`, `?state=consultation`. Add `&event=1`, `&lang=en`, or `&reduced=1` as needed.

## Known limitations

- This is a local presentation demo with no production routing, booking service, backend, or form submission.
- The doctor name and portrait are demonstration placeholders, not a real clinician or credential.
- The clinic phone and WhatsApp links are placeholders.
- The room and device image is illustrative and does not identify a specific Argon device model.
- Only Laser has a complete information path; other treatments remain discovery entries.
