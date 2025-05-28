
import React from 'react';

interface TableColumn<T> {
  key: keyof T | string; // Allow string for custom render keys
  header: string;
  render?: (item: T) => React.ReactNode; // Optional custom renderer
  sortable?: boolean; // Placeholder for sort functionality
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
}

const Table = <T extends { id: string | number }>(
  { columns, data, onRowClick, isLoading }: TableProps<T>,
): React.ReactElement => {
  if (isLoading) {
    return <div className="text-center p-10">Loading data...</div>;
  }

  if (!data || data.length === 0) {
    return <div className="text-center p-10 text-slate-500">No data available.</div>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                scope="col"
                className="px-6 py-4 text-left text-sm font-semibold text-slate-700 tracking-wider"
              >
                {col.header}
                {/* Placeholder for sort icon */}
                {col.sortable && <span className="ml-1">↕</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {data.map((item) => (
            <tr 
              key={item.id} 
              className={`hover:bg-slate-50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
              onClick={() => onRowClick && onRowClick(item)}
            >
              {columns.map((col) => (
                <td key={`${item.id}-${String(col.key)}`} className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {col.render ? col.render(item) : String(item[col.key as keyof T] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
