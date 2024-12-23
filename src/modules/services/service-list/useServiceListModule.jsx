import { createContext, useContext, useMemo } from 'react';

const ServiceListContext = createContext(null);

/**
 * @typedef {Object} Data
 * @property {import('types/services').Services} servicesData
*/

/**
 * @param {{
 * children: React.ReactNode;
 * data: Data;
 * }} props
*/
export function ServiceListProvider({ children, data }) {
  const datas = useMemo(() => data, [data]);

  return (
    <ServiceListContext.Provider value={datas}>
      {children}
    </ServiceListContext.Provider>
  );
}

/**
 * @returns {Data}
*/
export default function useServiceListModule() {
  const context = useContext(ServiceListContext);

  return context;
}
