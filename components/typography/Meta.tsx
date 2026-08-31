import { Fragment } from 'react';

type MetaRow = {
  label: string;
  value?: string;
  full?: boolean;
};

type MetaProps = {
  rows: MetaRow[];
  className?: string;
};

export function Meta({ rows, className = '' }: MetaProps) {
  const present = rows.filter((row) => row.value);

  if (present.length === 0) {
    return null;
  }

  return (
    <dl className={`divide-border-inverse border-border-inverse divide-y border-y ${className}`}>
      {present.map((row) => (
        <Fragment key={row.label}>
          {row.full ? (
            <div className="flex flex-col gap-1.5 py-4">
              <dt className="text-inverse-muted font-mono text-xs tracking-wider uppercase">
                {row.label}
              </dt>
              <dd className="text-inverse-text text-sm leading-relaxed">{row.value}</dd>
            </div>
          ) : (
            <div className="flex items-baseline justify-between gap-6 py-3">
              <dt className="text-inverse-muted shrink-0 font-mono text-xs tracking-wider uppercase">
                {row.label}
              </dt>
              <dd className="text-inverse-text text-end text-sm">{row.value}</dd>
            </div>
          )}
        </Fragment>
      ))}
    </dl>
  );
}
