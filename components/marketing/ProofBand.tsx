interface ProofBandProps {
  tradeStats: { label: string; value: string }[];
  homeownerStats: { label: string; value: string }[];
}

export function ProofBand({ tradeStats, homeownerStats }: ProofBandProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <div>
        <h3 className="font-mono text-sm uppercase tracking-wide text-ink-600 mb-4">Trade &amp; supply</h3>
        <dl className="space-y-3">
          {tradeStats.map((stat) => (
            <div key={stat.label} className="flex justify-between border-b border-ink-200 pb-2">
              <dt className="text-base text-ink-800">{stat.label}</dt>
              <dd className="font-mono text-base text-tamar-black">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div>
        <h3 className="font-mono text-sm uppercase tracking-wide text-ink-600 mb-4">Home improvements</h3>
        <dl className="space-y-3">
          {homeownerStats.map((stat) => (
            <div key={stat.label} className="flex justify-between border-b border-ink-200 pb-2">
              <dt className="text-base text-ink-800">{stat.label}</dt>
              <dd className="font-mono text-base text-tamar-black">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
