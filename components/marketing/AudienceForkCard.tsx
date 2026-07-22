import Link from 'next/link';

interface AudienceForkCardProps {
  title: string;
  description: string;
  href: string;
  variant: 'trade' | 'home';
}

export function AudienceForkCard({ title, description, href, variant }: AudienceForkCardProps) {
  const isTrade = variant === 'trade';
  return (
    <Link
      href={href}
      className={`min-h-[44px] block p-6 rounded-sm border transition-colors ${
        isTrade
          ? 'bg-white border-ink-200 hover:border-tamar-orange'
          : 'bg-ink-050 border-ink-200 hover:border-tamar-orange'
      }`}
    >
      <h3 className="font-display font-bold text-xl text-tamar-black mb-2">{title}</h3>
      <p className="font-body text-base text-ink-600">{description}</p>
    </Link>
  );
}
