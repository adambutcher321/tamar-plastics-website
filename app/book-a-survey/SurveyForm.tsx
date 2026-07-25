'use client';

import { useState, useRef, useId, useActionState } from 'react';
import Link from 'next/link';
import { PRODUCT_CATEGORIES } from '@/content/product-categories';
import { submitSurveyRequest, type SurveyFormState } from './actions';
import { BUSINESS } from '@/content/business';

const INITIAL_STATE: SurveyFormState = { status: 'idle' };

const TIME_WINDOWS = [
  { id: 'morning', label: 'Morning (8:00am – 12:00pm)' },
  { id: 'afternoon', label: 'Afternoon (12:00pm – 5:00pm)' },
  { id: 'no-preference', label: 'No preference / Any time' },
];

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
];

export function SurveyForm() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [state, formAction, isPending] = useActionState(submitSurveyRequest, INITIAL_STATE);

  // Form local state for multi-step preservation and review
  const [projectType, setProjectType] = useState<string>('Windows');
  const [propertyType, setPropertyType] = useState<string>('Home / Residential');
  const [projectDetails, setProjectDetails] = useState<string>('');

  const [addressLine1, setAddressLine1] = useState<string>('');
  const [addressLine2, setAddressLine2] = useState<string>('');
  const [townCity, setTownCity] = useState<string>('');
  const [postcode, setPostcode] = useState<string>('');

  const [preferredTime, setPreferredTime] = useState<string>('Morning (8:00am – 12:00pm)');
  const [selectedDays, setSelectedDays] = useState<string[]>(['Monday', 'Wednesday']);
  const [accessNotes, setAccessNotes] = useState<string>('');
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);

  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [contactMethod, setContactMethod] = useState<string>('phone');

  // Step 1 Validation
  const [step1Error, setStep1Error] = useState<string | null>(null);
  const [step2Error, setStep2Error] = useState<string | null>(null);
  const [step3Error, setStep3Error] = useState<string | null>(null);

  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const errorSummaryId = useId();

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectDetails || projectDetails.trim().length < 10) {
      setStep1Error('Please enter a short description of your project (at least 10 characters).');
      return;
    }
    setStep1Error(null);
    setStep(2);
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressLine1 || addressLine1.trim().length < 3) {
      setStep2Error('Please enter your street address.');
      return;
    }
    if (!townCity || townCity.trim().length < 2) {
      setStep2Error('Please enter your town or city.');
      return;
    }
    if (!postcode || postcode.trim().length < 4) {
      setStep2Error('Please enter a valid UK postcode.');
      return;
    }
    if (selectedDays.length === 0) {
      setStep2Error('Please select at least one preferred day of the week.');
      return;
    }
    setStep2Error(null);
    setStep(3);
  };

  const handleNextStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || fullName.trim().length < 2) {
      setStep3Error('Please enter your full name.');
      return;
    }
    if (!email || !email.includes('@')) {
      setStep3Error('Please enter a valid email address.');
      return;
    }
    if (!phone || phone.trim().length < 7) {
      setStep3Error('Please enter a valid UK telephone number.');
      return;
    }
    setStep3Error(null);
    setStep(4); // Move to Review
  };

  const handleDayToggle = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const validFiles = filesArray.filter((file) => {
        if (file.size > 5 * 1024 * 1024) {
          alert(`File "${file.name}" exceeds the 5MB size limit.`);
          return false;
        }
        return true;
      });
      setSelectedPhotos((prev) => [...prev, ...validFiles].slice(0, 4));
    }
  };

  const handleRemovePhoto = (index: number) => {
    setSelectedPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  // Render Success Confirmation
  if (state.status === 'success') {
    const info = state.submittedData;
    return (
      <div className="survey-success-card" role="region" aria-label="Survey request confirmation">
        <div className="survey-success-icon" aria-hidden="true">✓</div>
        <h2 className="survey-success-heading">Your survey request has been received</h2>
        <p className="survey-success-text">
          Thank you, <strong>{info?.fullName || fullName}</strong>. Our team will review your project details and contact you to agree a suitable date and time for our visit.
        </p>

        <div className="survey-summary-box">
          <h3 className="survey-summary-title">Summary of Request</h3>
          <dl className="survey-summary-dl">
            <div>
              <dt>Project Category:</dt>
              <dd>{info?.projectType || projectType}</dd>
            </div>
            <div>
              <dt>Postcode Location:</dt>
              <dd>{info?.postcode || postcode}</dd>
            </div>
            <div>
              <dt>Preferred Visit Window:</dt>
              <dd>{info?.preferredTime || preferredTime}</dd>
            </div>
            <div>
              <dt>Preferred Days:</dt>
              <dd>{info?.preferredDays || selectedDays.join(', ')}</dd>
            </div>
            <div>
              <dt>Preferred Contact:</dt>
              <dd>{(info?.contactMethod || contactMethod) === 'phone' ? 'Phone call' : 'Email'}</dd>
            </div>
          </dl>
        </div>

        <div className="survey-next-steps">
          <h4>What happens next?</h4>
          <ol>
            <li>We review your property address and measurement requirements.</li>
            <li>A member of our team contacts you via your preferred method to confirm the visit time.</li>
            <li>Our surveyor visits your property to discuss options and take precise measurements.</li>
          </ol>
        </div>

        <div className="survey-success-actions">
          <Link href="/" className="survey-btn survey-btn--primary">
            Return to Homepage
          </Link>
          <a href={`tel:${BUSINESS.phone}`} className="survey-btn survey-btn--secondary">
            Call counter: {BUSINESS.phoneDisplay}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="survey-form-container">
      {/* ── Progress Header ────────────────────────────────────────────── */}
      <div className="survey-progress-bar" aria-label="Form progress">
        <span className="survey-progress-badge">
          Step {step} of 4 — {
            step === 1 ? 'Your project' :
            step === 2 ? 'Property & visit' :
            step === 3 ? 'Contact details' : 'Review & submit'
          }
        </span>
        <div className="survey-progress-track" aria-hidden="true">
          <div
            className="survey-progress-fill"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* ── Error Summary ──────────────────────────────────────────────── */}
      {(state.status === 'error' || state.message) && (
        <div
          ref={errorSummaryRef}
          id={errorSummaryId}
          tabIndex={-1}
          className="survey-error-summary"
          role="alert"
        >
          <h3 className="survey-error-title">Please correct the following:</h3>
          <p>{state.message || 'Some fields require attention before submitting.'}</p>
          {state.fieldErrors && (
            <ul>
              {Object.entries(state.fieldErrors).map(([field, msg]) => (
                <li key={field}>{msg}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* ── Main Form ──────────────────────────────────────────────────── */}
      <form action={formAction} noValidate>
        {/* STEP 1: YOUR PROJECT */}
        {step === 1 && (
          <div className="survey-step-panel">
            <h2 className="survey-step-heading">1. Tell us about your project</h2>
            <p className="survey-step-desc">
              Select the product or service area you need surveyed and describe your requirements.
            </p>

            {step1Error && (
              <div className="survey-inline-error" role="alert">
                {step1Error}
              </div>
            )}

            {/* Category selection */}
            <fieldset className="survey-fieldset">
              <legend className="survey-label">
                What would you like us to survey? <span className="survey-required">*</span>
              </legend>
              <div className="survey-category-grid">
                {PRODUCT_CATEGORIES.map((cat) => (
                  <label
                    key={cat.slug}
                    className={`survey-category-card ${
                      projectType === cat.name ? 'survey-category-card--active' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="projectType"
                      value={cat.name}
                      checked={projectType === cat.name}
                      onChange={() => setProjectType(cat.name)}
                      className="sr-only"
                    />
                    <span className="survey-category-title">{cat.name}</span>
                    <span className="survey-category-blurb">{cat.blurb}</span>
                  </label>
                ))}
                <label
                  className={`survey-category-card ${
                    projectType === 'Other / General' ? 'survey-category-card--active' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="projectType"
                    value="Other / General"
                    checked={projectType === 'Other / General'}
                    onChange={() => setProjectType('Other / General')}
                    className="sr-only"
                  />
                  <span className="survey-category-title">General / Multiple</span>
                  <span className="survey-category-blurb">Multiple products or general inquiry.</span>
                </label>
              </div>
            </fieldset>

            {/* Property type */}
            <div className="survey-field-group">
              <label htmlFor="propertyType" className="survey-label">
                Property type
              </label>
              <select
                id="propertyType"
                name="propertyType"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="survey-input"
              >
                <option value="Home / Residential">Home / Residential property</option>
                <option value="Commercial / Trade Premises">Commercial / Trade premises</option>
                <option value="Rental / Investment Property">Rental / Investment property</option>
              </select>
            </div>

            {/* Project Details */}
            <div className="survey-field-group">
              <label htmlFor="projectDetails" className="survey-label">
                Brief project description <span className="survey-required">*</span>
              </label>
              <p className="survey-hint">
                e.g. "Looking to replace 4 double-glazed windows and a front door", or "Need fascias and guttering surveyed for replacement."
              </p>
              <textarea
                id="projectDetails"
                name="projectDetails"
                rows={4}
                value={projectDetails}
                onChange={(e) => setProjectDetails(e.target.value)}
                className="survey-textarea"
                placeholder="Tell us what you're planning or looking to replace..."
                required
              />
            </div>

            <div className="survey-form-actions">
              <button
                type="button"
                onClick={handleNextStep1}
                className="survey-btn survey-btn--primary"
              >
                Continue to Property &amp; Visit →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PROPERTY & PREFERRED VISIT */}
        {step === 2 && (
          <div className="survey-step-panel">
            <h2 className="survey-step-heading">2. Property address &amp; visit preferences</h2>
            <p className="survey-step-desc">
              Where should our surveyor visit, and when generally suits your schedule?
            </p>

            {step2Error && (
              <div className="survey-inline-error" role="alert">
                {step2Error}
              </div>
            )}

            {/* Address fields */}
            <div className="survey-field-group">
              <label htmlFor="addressLine1" className="survey-label">
                Street address <span className="survey-required">*</span>
              </label>
              <input
                type="text"
                id="addressLine1"
                name="addressLine1"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                className="survey-input"
                placeholder="House number and street name"
                required
              />
            </div>

            <div className="survey-field-grid">
              <div className="survey-field-group">
                <label htmlFor="townCity" className="survey-label">
                  Town or City <span className="survey-required">*</span>
                </label>
                <input
                  type="text"
                  id="townCity"
                  name="townCity"
                  value={townCity}
                  onChange={(e) => setTownCity(e.target.value)}
                  className="survey-input"
                  placeholder="e.g. Saltash, Plymouth, Liskeard"
                  required
                />
              </div>

              <div className="survey-field-group">
                <label htmlFor="postcode" className="survey-label">
                  Postcode <span className="survey-required">*</span>
                </label>
                <input
                  type="text"
                  id="postcode"
                  name="postcode"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                  className="survey-input"
                  placeholder="e.g. PL12 6TW"
                  required
                />
              </div>
            </div>

            {/* Preferred Time Window */}
            <fieldset className="survey-fieldset">
              <legend className="survey-label">
                Preferred time of day <span className="survey-required">*</span>
              </legend>
              <div className="survey-radio-group">
                {TIME_WINDOWS.map((win) => (
                  <label key={win.id} className="survey-radio-option">
                    <input
                      type="radio"
                      name="preferredTime"
                      value={win.label}
                      checked={preferredTime === win.label}
                      onChange={() => setPreferredTime(win.label)}
                    />
                    <span>{win.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Preferred Days */}
            <fieldset className="survey-fieldset">
              <legend className="survey-label">
                Preferred days of the week <span className="survey-required">*</span>
              </legend>
              <p className="survey-hint">Select all days that generally suit you for a visit.</p>
              <div className="survey-checkbox-group">
                {DAYS_OF_WEEK.map((day) => (
                  <label key={day} className="survey-checkbox-option">
                    <input
                      type="checkbox"
                      name="preferredDays"
                      value={day}
                      checked={selectedDays.includes(day)}
                      onChange={() => handleDayToggle(day)}
                    />
                    <span>{day}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Access Notes */}
            <div className="survey-field-group">
              <label htmlFor="accessNotes" className="survey-label">
                Access considerations (Optional)
              </label>
              <input
                type="text"
                id="accessNotes"
                name="accessNotes"
                value={accessNotes}
                onChange={(e) => setAccessNotes(e.target.value)}
                className="survey-input"
                placeholder="e.g. Side gate access, parking notes, or dog on premises"
              />
            </div>

            {/* Optional Photo Upload */}
            <div className="survey-field-group">
              <label htmlFor="photos" className="survey-label">
                Add photographs (Optional)
              </label>
              <p className="survey-hint">
                Photographs of the window, door, or roofline area help us understand the project before visiting. Max 4 files (JPG, PNG, WebP under 5MB).
              </p>
              <div className="survey-file-wrapper">
                <input
                  ref={fileInputRef}
                  type="file"
                  id="photos"
                  name="photos"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="survey-file-input"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="survey-btn survey-btn--ghost"
                >
                  📷 Choose photos...
                </button>
              </div>

              {selectedPhotos.length > 0 && (
                <ul className="survey-photo-list">
                  {selectedPhotos.map((file, i) => (
                    <li key={i} className="survey-photo-item">
                      <span>{file.name} ({(file.size / 1024).toFixed(0)} KB)</span>
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(i)}
                        className="survey-photo-remove"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="survey-form-actions">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="survey-btn survey-btn--ghost"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleNextStep2}
                className="survey-btn survey-btn--primary"
              >
                Continue to Contact Details →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: YOUR DETAILS */}
        {step === 3 && (
          <div className="survey-step-panel">
            <h2 className="survey-step-heading">3. Your contact details</h2>
            <p className="survey-step-desc">
              Where should we send your quote and how should we contact you to confirm the appointment?
            </p>

            {step3Error && (
              <div className="survey-inline-error" role="alert">
                {step3Error}
              </div>
            )}

            <div className="survey-field-group">
              <label htmlFor="fullName" className="survey-label">
                Full name <span className="survey-required">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="survey-input"
                placeholder="e.g. Sarah Jenkins"
                required
              />
            </div>

            <div className="survey-field-grid">
              <div className="survey-field-group">
                <label htmlFor="email" className="survey-label">
                  Email address <span className="survey-required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="survey-input"
                  placeholder="name@example.co.uk"
                  required
                />
              </div>

              <div className="survey-field-group">
                <label htmlFor="phone" className="survey-label">
                  Telephone number <span className="survey-required">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="survey-input"
                  placeholder="01752 123456 or 07123 456789"
                  required
                />
              </div>
            </div>

            {/* Preferred Contact Method */}
            <fieldset className="survey-fieldset">
              <legend className="survey-label">
                Preferred contact method <span className="survey-required">*</span>
              </legend>
              <div className="survey-radio-group">
                <label className="survey-radio-option">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="phone"
                    checked={contactMethod === 'phone'}
                    onChange={() => setContactMethod('phone')}
                  />
                  <span>Phone call (Fastest route to arrange)</span>
                </label>
                <label className="survey-radio-option">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="email"
                    checked={contactMethod === 'email'}
                    onChange={() => setContactMethod('email')}
                  />
                  <span>Email</span>
                </label>
              </div>
            </fieldset>

            <div className="survey-privacy-notice">
              We’ll use the information you provide to respond to your request and arrange your survey. Read our{' '}
              <Link href="/privacy-policy/" target="_blank" className="cookie-link">
                Privacy Policy
              </Link>
              .
            </div>

            <div className="survey-form-actions">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="survey-btn survey-btn--ghost"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleNextStep3}
                className="survey-btn survey-btn--primary"
              >
                Review Request →
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW BEFORE SUBMITTING */}
        {step === 4 && (
          <div className="survey-step-panel">
            <h2 className="survey-step-heading">4. Review your survey request</h2>
            <p className="survey-step-desc">
              Please double-check your details below before submitting. Your request will be sent to our Saltash team.
            </p>

            {/* Hidden fields carrying values to Server Action */}
            <input type="hidden" name="projectType" value={projectType} />
            <input type="hidden" name="propertyType" value={propertyType} />
            <input type="hidden" name="projectDetails" value={projectDetails} />
            <input type="hidden" name="addressLine1" value={addressLine1} />
            <input type="hidden" name="addressLine2" value={addressLine2} />
            <input type="hidden" name="townCity" value={townCity} />
            <input type="hidden" name="postcode" value={postcode} />
            <input type="hidden" name="preferredTime" value={preferredTime} />
            {selectedDays.map((day) => (
              <input key={day} type="hidden" name="preferredDays" value={day} />
            ))}
            <input type="hidden" name="accessNotes" value={accessNotes} />
            <input type="hidden" name="fullName" value={fullName} />
            <input type="hidden" name="email" value={email} />
            <input type="hidden" name="phone" value={phone} />
            <input type="hidden" name="contactMethod" value={contactMethod} />

            {/* Review Cards */}
            <div className="survey-review-grid">
              {/* Group 1: Project */}
              <div className="survey-review-card">
                <div className="survey-review-header">
                  <h3>1. Project</h3>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="survey-change-btn"
                  >
                    Change
                  </button>
                </div>
                <dl className="survey-review-dl">
                  <div>
                    <dt>Category:</dt>
                    <dd>{projectType}</dd>
                  </div>
                  <div>
                    <dt>Property Type:</dt>
                    <dd>{propertyType}</dd>
                  </div>
                  <div>
                    <dt>Description:</dt>
                    <dd>{projectDetails}</dd>
                  </div>
                </dl>
              </div>

              {/* Group 2: Property & Visit */}
              <div className="survey-review-card">
                <div className="survey-review-header">
                  <h3>2. Property &amp; Visit</h3>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="survey-change-btn"
                  >
                    Change
                  </button>
                </div>
                <dl className="survey-review-dl">
                  <div>
                    <dt>Address:</dt>
                    <dd>
                      {addressLine1}
                      {addressLine2 ? `, ${addressLine2}` : ''}, {townCity}, {postcode}
                    </dd>
                  </div>
                  <div>
                    <dt>Time Window:</dt>
                    <dd>{preferredTime}</dd>
                  </div>
                  <div>
                    <dt>Preferred Days:</dt>
                    <dd>{selectedDays.join(', ')}</dd>
                  </div>
                  {accessNotes && (
                    <div>
                      <dt>Access Notes:</dt>
                      <dd>{accessNotes}</dd>
                    </div>
                  )}
                  {selectedPhotos.length > 0 && (
                    <div>
                      <dt>Attached Photos:</dt>
                      <dd>{selectedPhotos.length} image(s)</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Group 3: Contact */}
              <div className="survey-review-card">
                <div className="survey-review-header">
                  <h3>3. Contact Details</h3>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="survey-change-btn"
                  >
                    Change
                  </button>
                </div>
                <dl className="survey-review-dl">
                  <div>
                    <dt>Full Name:</dt>
                    <dd>{fullName}</dd>
                  </div>
                  <div>
                    <dt>Email:</dt>
                    <dd>{email}</dd>
                  </div>
                  <div>
                    <dt>Phone:</dt>
                    <dd>{phone}</dd>
                  </div>
                  <div>
                    <dt>Contact Method:</dt>
                    <dd>{contactMethod === 'phone' ? 'Phone call' : 'Email'}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="survey-form-actions">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="survey-btn survey-btn--ghost"
                disabled={isPending}
              >
                ← Back
              </button>
              <button
                type="submit"
                className="survey-btn survey-btn--primary"
                disabled={isPending}
              >
                {isPending ? 'Sending request...' : 'Request my survey →'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
