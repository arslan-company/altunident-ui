import { useRouter } from 'next/router';

export default function useURLSearchParams() {
  const router = useRouter();
  const { asPath, query } = router;

  const currentPathname = asPath.split('?')[0];

  /**
   * @param {{
   * [key: string]: any;
   * }} queryParams
   *
   * @returns {void}
  */
  const setSearchParams = (queryParams) => {
    router.push({
      pathname: currentPathname,
      query: { ...query, ...queryParams },
    });
  };

  return {
    setSearchParams,
    query,
  };
}
