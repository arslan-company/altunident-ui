import { createContext, useContext, useMemo } from 'react';

const HomeContext = createContext(null);

/**
 * @template Data
 * @typedef {import('@tanstack/react-query').QueryObserverResult<Data>} Query
*/

/**
 * @typedef {Object} Data
 * @property {Query<import('types/departments').Departments>} departmentsData
 * @property {Query<import('types/doctors').Doctors>} doctorsData
 * @property {Query<import('types/services').Services>} servicesResponse
*/

/**
 * @param {{
 * children: React.ReactNode;
 * data: Data;
 * }} props
*/
export function HomeProvider({ children, data }) {
  const datas = useMemo(() => data, [data]);

  return (
    <HomeContext.Provider value={datas}>
      {children}
    </HomeContext.Provider>
  );
}

/**
 * @returns {Data}
*/
export default function useHomeModule() {
  const context = useContext(HomeContext);

  return context;
}
