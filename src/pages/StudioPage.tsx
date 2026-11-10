import React from 'react';
import { Studio } from 'sanity';
import sanityConfig from '../sanity.config';

export const StudioPage: React.FC = () => {
  return (
    <div className="w-full h-screen fixed inset-0 z-[9999] bg-stone-900 overflow-hidden">
      <Studio config={sanityConfig} />
    </div>
  );
};
