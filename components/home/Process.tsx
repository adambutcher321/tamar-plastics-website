import { Reveal } from './Reveal';

const STEPS = [
  {
    title: 'Ask',
    body: 'Call or visit our counter in Saltash, or request a free survey if you would like us to fit it.',
  },
  {
    title: 'Confirm',
    body: 'Trade price on account or a fixed homeowner quote — with zero obligation either way.',
  },
  {
    title: 'Collect or fit',
    body: 'Collect same-day from our Saltash counter, or our expert team fits it on the date agreed.',
  },
];

export function Process() {
  return (
    <section className="section scrim" aria-labelledby="process-heading">
      <div className="section-inner">
        <div className="section-head">
          <div>
            <Reveal>
              <p className="eyebrow">How it works</p>
              <h2 className="h2" id="process-heading">
                Three-step order
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="process-grid">
          {STEPS.map((step, index) => (
            <Reveal key={step.title} delayMs={index * 70}>
              <div className="process-step">
                <h3 className="h3">{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <p className="ghost" aria-hidden="true">
        one two three
      </p>
    </section>
  );
}
