import { createContext, useContext, useMemo } from 'react';

const DoctorsListContext = createContext(null);

/**
 * @typedef {Object} Data
 * @property {import('types/departments').Departments} departmentsData
 * @property {import('types/doctors').Doctors} doctorsData
 * @property {import('types/hospitals').Hospitals} hospitalsData
*/

/**
 * @param {{
 * children: React.ReactNode;
 * data: Data;
 * }} props
*/
export function DoctorsListProvider({ children, data }) {
  const datas = useMemo(() => data, [data]);

  return (
    <DoctorsListContext.Provider value={datas}>
      {children}
    </DoctorsListContext.Provider>
  );
}

/**
 * @returns {Data}
*/
export default function useDoctorsListModule() {
  const context = useContext(DoctorsListContext);

  return context;
}
