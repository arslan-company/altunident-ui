import useDom from '@/hooks/useDom';
import { DoctorCardBottom, DoctorCardContainer, DoctorCardTop } from './root';
import { useFile } from '@/hooks/useFile';
import isValidFileName from '@/utils/isValidFileName';

/**
 * @typedef {{
 *  id: string | number;
 *  name: string;
 *  education: string;
 *  specializationTraining: string;
 *  languages: string;
 *  departmentName: string;
 *  doctorHospitals: { name: string; id: string | number }[];
 *  image: string;
 * }} DoctorCardData
*/

/**
 * @param {{
 * data: DoctorCardData;
 * size: 'small' | 'medium';
 * showInformation: boolean;
 * } & React.ComponentProps<typeof DoctorCardContainer>} props
*/
export default function DoctorCard(props) {
  const { domLoaded } = useDom();

  const { data = {}, showInformation, ...rest } = props;
  const {
    departmentName,
    name,
    id,
    education,
    doctorHospitals = [],
    languages,
    specializationTraining,
    image,
  } = data;

  const imageResponse = useFile({
    params: {
      fileName: image,
    },
    options: {
      enabled: !!image && isValidFileName(image, ['.png', '.jpg', 'jpeg']),
      retry: false,
    },
  });

  if (!domLoaded) return null;

  return (
    <DoctorCardContainer {...rest}>
      <DoctorCardTop
        education={education}
        specializationTraining={specializationTraining}
        languages={languages}
        hospitals={doctorHospitals}
        image={imageResponse?.data}
        showInformation={showInformation}
      />
      <DoctorCardBottom
        departmentName={departmentName}
        name={name}
        id={id}
      />
    </DoctorCardContainer>
  );
}

// JSDOC type exports
export { };
