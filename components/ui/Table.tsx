'use client';

import { type HTMLAttributes, forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { Skeleton } from './Skeleton';

export interface Column<T> {
  key: string;
  header: string;
  accessor: (row: T) => React.ReactNode;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string;
  className?: string;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyAccessor: (row: T) => string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onSort?: (key: string, order: 'asc' | 'desc') => void;
  emptyMessage?: string;
  loading?: boolean;
  rowClassName?: (row: T) => string;
  striped?: boolean;
  hoverable?: boolean;
  caption?: string;
}

export function Table<T>({
  columns,
  data,
  keyAccessor,
  sortBy,
  sortOrder,
  onSort,
  emptyMessage = 'No data available',
  loading = false,
  rowClassName,
  striped = true,
  hoverable = true,
  caption,
}: TableProps<T>) {
  const tableId = useId();

  const handleSort = (key: string) => {
    if (!onSort) return;
    if (sortBy === key) {
      onSort(key, sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      onSort(key, 'asc');
    }
  };

  if (loading) {
    return (
      <div className="overflow-x-auto">
        <table className="data-table" role="grid" aria-busy="true">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} className={cn(column.className)} style={{ width: column.width }}>
                  <Skeleton variant="text" className="w-full" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                {columns.map((column) => (
                  <td key={column.key} className={cn(column.className)}>
                    <Skeleton variant="text" className="w-full" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="panel-elevated p-8 text-center">
        <p className="text-text-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="data-table" id={tableId} role="grid" aria-describedby={caption ? `${tableId}-caption` : undefined}>
        {caption && (
          <caption id={`${tableId}-caption`} className="sr-only">
            {caption}
          </caption>
        )}
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cn(
                  column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : '',
                  column.className
                )}
                style={{ width: column.width }}
                aria-sort={column.sortable && onSort && sortBy === column.key
                  ? (sortOrder === 'asc' ? 'ascending' : 'descending')
                  : 'none'}
              >
                {column.sortable && onSort ? (
                  <button
                    onClick={() => handleSort(column.key)}
                    className="flex items-center gap-1.5 hover:text-text transition-colors"
                  >
                    {column.header}
                    {sortBy === column.key ? (
                      sortOrder === 'asc' ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronsUpDown className="h-3.5 w-3.5 text-text-subtle" />
                    )}
                  </button>
                ) : (
                  column.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={keyAccessor(row)}
              className={cn(
                rowClassName?.(row),
                striped && rowIndex % 2 === 1 && 'bg-surface-elevated/30'
              )}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : '',
                    column.className
                  )}
                >
                  {column.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}