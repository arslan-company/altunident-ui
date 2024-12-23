import { createContext, useContext, useMemo } from 'react';

const DoctorDetailContext = createContext(null);

/**
 * @typedef {Object} Data
 * @property {import('types/doctors').Doctor} doctorData
 * @property {import('types/doctors').DoctorWorkingHours} doctorWorkingHoursData
 * @property {import('types/doctors').DoctorHospitals} doctorHospitalsData
 * @property {import('types/hospitals').Hospitals} hospitalsData
 * @property {import('types/departments').Department} departmentData
 * @property {import('types/react-query').QueryResult<any>} doctorImageData
 * @property {import('types/react-query')
 * .QueryResult<import('types/doctors').DoctorYoutubeLinks>} doctorYoutubeLinksData
*/

/**
 * @param {{
 * children: React.ReactNode;
 * data: Data;
 * }} props
*/
export function DoctorDetailProvider({ children, data }) {
  const datas = useMemo(() => data, [data]);

  return (
    <DoctorDetailContext.Provider value={datas}>
      {children}
    </DoctorDetailContext.Provider>
  );
}

/**
 * @returns {Data}
*/
export default function useDoctorDetailModule() {
  const context = useContext(DoctorDetailContext);

  return context;
}
