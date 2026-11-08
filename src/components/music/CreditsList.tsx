import React from 'react';
import { Credit } from '../../types/music';

interface CreditsListProps {
  title?: string;
  credits?: Credit[];
}

export const CreditsList: React.FC<CreditsListProps> = ({
  title = 'Credits',
  credits = [],
}) => {
  if (!credits || credits.length === 0) return null;

  return (
    <div className="w-full">
      <h4 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100 mb-4">
        {title}
      </h4>

      <dl className="divide-y divide-[#E2DAC8]/50 dark:divide-[#2D2B26]/50 text-xs sm:text-sm font-sans">
        {credits.map((credit, idx) => (
          <div key={idx} className="py-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
            <dt className="text-stone-500 dark:text-stone-400 font-normal">
              {credit.role}
            </dt>
            <dd className="font-medium text-stone-900 dark:text-stone-200 text-left sm:text-right m-0">
              {credit.name}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
