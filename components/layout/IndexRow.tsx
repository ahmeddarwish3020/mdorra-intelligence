import type { ReactNode } from 'react';

type IndexRowProps = {
  index: string;
  title: string;
  description?: string;
  meta?: string;
  headingLevel?: 2 | 3;
  children?: ReactNode;
};

export function IndexRow({
  index,
  title,
  description,
  meta,
  headingLevel = 3,
  children,
}: IndexRowProps) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';

  return (
    <div className="grid grid-cols-4 items-baseline gap-x-5 py-8 md:grid-cols-12">
      <span className="text-accent col-span-1 font-mono text-xs">{index}</span>
      <div className="col-span-3 md:col-span-5">
        <Heading className="text-xl font-medium tracking-tight md:text-2xl">{title}</Heading>
        {meta && <p className="text-text-secondary mt-2 font-mono text-xs">{meta}</p>}
      </div>
      <p className="text-text-secondary col-span-4 mt-4 text-sm leading-relaxed md:col-span-5 md:mt-0">
        {description}
      </p>
      {children && <div className="col-span-4 md:col-span-1">{children}</div>}
    </div>
  );
}
