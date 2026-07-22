import Link from 'next/link';

interface BreadcrumbItem {
  name: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-ink-600">
      <ol className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {index === items.length - 1 ? (
              <span aria-current="page" className="text-tamar-black">{item.name}</span>
            ) : (
              <Link href={item.href} className="hover:text-tamar-black">{item.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
