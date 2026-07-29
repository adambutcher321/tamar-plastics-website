# Tamar Plastics — Analytics & Privacy Event Tracking Plan

## Privacy & UK GDPR Compliance
- **Consent-First Architecture:** No non-essential analytical scripts or tracking pixels load until explicit cookie consent is granted via the Cookie Banner ([components/privacy/CookieSettingsButton.tsx](file:///Users/adambutcher/Desktop/Tamar%20Plastics%20Website/components/privacy/CookieSettingsButton.tsx)).
- **Placeholder Implementation:** Environment placeholders `[GA4_MEASUREMENT_ID]`, `[CLARITY_PROJECT_ID]`, and `[SEARCH_CONSOLE_VERIFICATION]` reserved in configuration.

---

## Recommended GA4 Custom Events Map

| Event Name | Trigger Action | Business Purpose | Parameters Tracked |
|---|---|---|---|
| `phone_click` | Clicking `tel:+441752841234` links | Track phone call intent from mobile & desktop | `link_location`, `page_path` |
| `email_click` | Clicking `mailto:info@tamarplasticsltd.co.uk` | Track email inquiry initiation | `link_location`, `page_path` |
| `quote_form_start` | Typing in any field of `/book-a-survey/` or `/contact/` form | Measure form completion funnel drop-off | `form_id`, `page_path` |
| `quote_form_submit` | Successfully submitting the survey or contact form | Core conversion measurement | `form_type`, `service_requested`, `postcode_district` |
| `directions_click` | Clicking trade counter address / map directions link | Track trade counter visit intent | `destination`, `page_path` |
| `trade_account_enquiry` | Clicking "Buy Supply-Only / Contact Us" from trade card | Track commercial trade lead generation | `product_category` |
| `product_enquiry` | Clicking "Book a Free Home Survey" on product page | Track retail installation lead generation | `product_category` |
