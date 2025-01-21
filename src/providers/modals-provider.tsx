import React from 'react';

import { GeneralSearchModal } from '@/features/general-search';

export default function ModalsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GeneralSearchModal />
      {children}
    </>
  );
}
