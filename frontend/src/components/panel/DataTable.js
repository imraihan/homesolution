'use client';
import { useMemo, useState } from 'react';
import { BsSearch, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { EmptyState } from './ui';

/**
 * Searchable / filterable / paginated table. On mobile each row collapses into a labelled card (CSS, data-label).
 *  columns:    [{ key, label, render?(row), align? }]
 *  filters:    [{ key, label, options: ['A','B'] }]  (exact match on row[key])
 *  rowActions: (row) => [{ label, icon: <Icon/>, onClick, tone? }]
 */
export default function DataTable({ columns, rows, searchKeys = [], searchPlaceholder = 'Search...', filters = [], pageSize = 8, rowActions, toolbar, empty = 'No records match your filters.', caption }) {
  const [q, setQ] = useState('');
  const [fv, setFv] = useState({});
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (needle && !searchKeys.some((k) => String(r[k] ?? '').toLowerCase().includes(needle))) return false;
      return filters.every((f) => !fv[f.key] || String(r[f.key]) === fv[f.key]);
    });
  }, [rows, q, fv, searchKeys, filters]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const cur = Math.min(page, pages);
  const slice = filtered.slice((cur - 1) * pageSize, cur * pageSize);
  const from = filtered.length ? (cur - 1) * pageSize + 1 : 0;

  return (
    <div className="pn-table">
      <div className="pn-table__bar">
        {searchKeys.length > 0 && (
          <label className="pn-search">
            <BsSearch aria-hidden="true" />
            <input type="search" placeholder={searchPlaceholder} value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} aria-label="Search table" />
          </label>
        )}
        {filters.map((f) => (
          <select key={f.key} className="pn-select" aria-label={`Filter by ${f.label}`} value={fv[f.key] || ''} onChange={(e) => { setFv({ ...fv, [f.key]: e.target.value }); setPage(1); }}>
            <option value="">{f.label}: All</option>
            {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        ))}
        {toolbar && <div className="pn-table__tool">{toolbar}</div>}
      </div>

      <div className="pn-table__scroll">
        <table>
          {caption && <caption className="visually-hidden">{caption}</caption>}
          <thead>
            <tr>
              {columns.map((c) => <th key={c.key} scope="col" className={c.align ? `t-${c.align}` : undefined}>{c.label}</th>)}
              {rowActions && <th scope="col" className="t-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {slice.map((r) => {
              const acts = rowActions ? rowActions(r).filter(Boolean) : [];
              return (
                <tr key={r.id ?? JSON.stringify(r)}>
                  {columns.map((c) => (
                    <td key={c.key} data-label={c.label} className={[c.align && `t-${c.align}`, c.wrap && 'pn-wrap'].filter(Boolean).join(' ') || undefined}>{c.render ? c.render(r) : r[c.key]}</td>
                  ))}
                  {rowActions && (
                    <td data-label="Actions" className="t-right pn-actions">
                      {acts.map((a) => (
                        <button key={a.label} type="button" className={`pn-act ${a.tone ? `pn-act--${a.tone}` : ''}`} title={a.label} aria-label={`${a.label} ${r.id ?? ''}`} onClick={() => a.onClick(r)}>
                          {a.icon}
                          <span>{a.label}</span>
                        </button>
                      ))}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && <EmptyState title="No results" text={empty} />}
      </div>

      <div className="pn-table__foot">
        <span>{filtered.length ? `Showing ${from}-${from + slice.length - 1} of ${filtered.length}` : '0 results'}</span>
        {pages > 1 && (
          <nav className="pn-pager" aria-label="Pagination">
            <button type="button" aria-label="Previous page" disabled={cur === 1} onClick={() => setPage(cur - 1)}><BsChevronLeft aria-hidden="true" /></button>
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <button key={n} type="button" className={n === cur ? 'is-active' : ''} aria-current={n === cur ? 'page' : undefined} onClick={() => setPage(n)}>{n}</button>
            ))}
            <button type="button" aria-label="Next page" disabled={cur === pages} onClick={() => setPage(cur + 1)}><BsChevronRight aria-hidden="true" /></button>
          </nav>
        )}
      </div>
    </div>
  );
}
