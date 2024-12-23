import { useRouter } from 'next/router';

import pathnames from '@/constants/pathnames';

export default function useHospitalRoutes() {
  const router = useRouter();
  const { hospitalSlug: currentHospitalSlug } = router.query;

  const defaultHospitalPathname = pathnames.DEFAULT_PATHNAME;
  const defaultHospitalSlug = pathnames.DEFAULT_PATHNAME;

  const currentHospitalSlugUrl = !currentHospitalSlug
    || currentHospitalSlug === defaultHospitalPathname
    ? `/${defaultHospitalPathname}`
    : `/${currentHospitalSlug}`;

  const isDefaultHospitalSlugSelected = currentHospitalSlug === defaultHospitalSlug
    || !currentHospitalSlug;

  return {
    /**
     * Pathname that should be used when no hospital is selected.
     *
     * Use {@link defaultHospitalSlug} instead.
     *
     * @deprecated
    */
    defaultHospitalPathname,
    /**
     * Slug that should be used when no hospital is selected.
    */
    defaultHospitalSlug,
    /**
     * Slug data of the currently selected hospital.
     *
     * for example: `yalova-hospital`
     *
     * @type {string}
    */
    currentHospitalSlug,
    /**
     * The slug url of the currently selected hospital.
     *
     * for example: `/yalova-hospital`
    */
    currentHospitalSlugUrl,
    /**
     * It is used to verify if there are any selected hospitals.
     * Returns `true` if the default hospital slug is selected.
     *
     * @example
     *
     * currentHospitalSlug === defaultHospitalSlug
    */
    isDefaultHospitalSlugSelected,
  };
}
