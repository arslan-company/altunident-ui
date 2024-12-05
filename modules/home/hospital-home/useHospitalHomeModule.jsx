import { createContext, useContext, useMemo } from 'react';

const HospitalHomeContext = createContext(null);

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
export function HospitalHomeProvider({ children, data }) {
  const datas = useMemo(() => data, [data]);

  return (
    <HospitalHomeContext.Provider value={datas}>
      {children}
    </HospitalHomeContext.Provider>
  );
}

/**
 * @returns {Data}
*/
export default function useHospitalHomeModule() {
  const context = useContext(HospitalHomeContext);

  return context;
}
