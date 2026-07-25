import type { SpecRow } from '@/content/content-types';

export function SpecTable({ rows }: { rows: SpecRow[] }) {
  return (
    <table className="w-full font-mono text-sm border-collapse">
      <tbody>
        {rows.map((row) => (
          <tr key={row.label} style={{ borderBottom: '1px solid var(--hairline)' }}>
            <th
              scope="row"
              className="text-left py-2 pr-4 font-medium align-top w-1/3"
              style={{ color: 'var(--text-muted)' }}
            >
              {row.label}
            </th>
            <td className="py-2" style={{ color: 'var(--text)' }}>
              {row.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
