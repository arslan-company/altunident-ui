import { createContext, useContext, useMemo } from 'react';

const DepartmentListContext = createContext(null);

/**
 * @typedef {Object} Data
 * @property {import('types/departments').Departments} departmentsData
 * @property {import('types/hospitals').Hospitals} hospitalsData
*/

/**
 * @param {{
 * children: React.ReactNode;
 * data: Data;
 * }} props
*/
export function DepartmentListProvider({ children, data }) {
  const datas = useMemo(() => data, [data]);

  return (
    <DepartmentListContext.Provider value={datas}>
      {children}
    </DepartmentListContext.Provider>
  );
}

/**
 * @returns {Data}
*/
export default function useDepartmentListModule() {
  const context = useContext(DepartmentListContext);

  return context;
}
