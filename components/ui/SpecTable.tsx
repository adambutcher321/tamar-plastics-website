import type { SpecRow } from '@/content/content-types';

export function SpecTable({ rows }: { rows: SpecRow[] }) {
  return (
    <table className="w-full font-mono text-sm border-collapse">
      <tbody>
        {rows.map((row) => (
          <tr key={row.label} className="border-b border-ink-200">
            <th scope="row" className="text-left py-2 pr-4 font-medium text-ink-600 align-top w-1/3">
              {row.label}
            </th>
            <td className="py-2 text-tamar-black">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
