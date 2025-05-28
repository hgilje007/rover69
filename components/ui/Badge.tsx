
import React from 'react';
import { ApprovalStatus } from '../../types';

interface BadgeProps {
  status: ApprovalStatus;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ status, className = '' }) => {
  let colors = '';
  switch (status) {
    case ApprovalStatus.Approved:
      colors = 'bg-green-100 text-green-700 border border-green-300';
      break;
    case ApprovalStatus.Pending:
      colors = 'bg-yellow-100 text-yellow-700 border border-yellow-300';
      break;
    case ApprovalStatus.Rejected:
      colors = 'bg-red-100 text-red-700 border border-red-300';
      break;
    default:
      colors = 'bg-slate-100 text-slate-700 border border-slate-300';
  }

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full inline-block ${colors} ${className}`}
    >
      {status}
    </span>
  );
};

export default Badge;
