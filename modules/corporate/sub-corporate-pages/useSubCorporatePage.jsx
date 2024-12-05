import { createContext, useContext, useMemo } from 'react';

const SubCorporatePageContext = createContext(null);

/**
 * @template Data
 * @typedef {import('@tanstack/react-query').QueryObserverResult<Data>} Query
*/

/**
 * @typedef {Object} Data
 * @property {Query<import('types/corporate-pages').CorporatePage>} corporatePageData
 * @property {Query<any>} imageData
*/

/**
 * @param {{
 * children: React.ReactNode;
 * data: Data;
 * }} props
*/
export function SubCorporatePageProvider({ children, data }) {
  const datas = useMemo(() => data, [data]);

  return (
    <SubCorporatePageContext.Provider value={datas}>
      {children}
    </SubCorporatePageContext.Provider>
  );
}

/**
 * @returns {Data}
*/
export default function useSubCorporatePageModule() {
  const context = useContext(SubCorporatePageContext);

  return context;
}
