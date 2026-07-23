import { Reveal } from './Reveal';

const SERVICES = [
  {
    title: 'Windows & Doors',
    body: 'uPVC and composite windows and doors, supplied over the counter or fitted by our own installers.',
  },
  {
    title: 'Roofline & Guttering',
    body: 'Fascias, soffits, bargeboards and guttering in stock colours, collected same day or fitted on site.',
  },
  {
    title: 'Conservatory Roofs & Cladding',
    body: 'Replacement conservatory roofs, external cladding and interior panelling, measured and made to fit.',
  },
  {
    title: 'Trade Counter & Installation',
    body: 'Open an account and collect from Saltash, or let our surveyors handle the whole job start to finish.',
  },
];

export function Services() {
  return (
    <section className="section scrim" aria-labelledby="services-heading">
      <div className="section-inner">
        <div className="section-head">
          <div>
            <Reveal>
              <p className="eyebrow">What we do</p>
              <h2 className="h2" id="services-heading">
                All services
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} delayMs={index * 70}>
              <div className="service-tile">
                <h3 className="h3">{service.title}</h3>
                <p>{service.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <p className="ghost" aria-hidden="true">
        UPVC · COMPOSITE · ALUMINIUM · TIMBER
      </p>
    </section>
  );
}
