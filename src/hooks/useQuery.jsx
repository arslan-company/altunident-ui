import { useRouter } from 'next/router';
import { createContext, useContext, useMemo } from 'react';

export const QueryContext = createContext(null);

function QueryContextProvider({ children }) {
  const router = useRouter();
  const { asPath, query } = router;

  const currentPathname = asPath.split('?')[0];
  const getCurrentQuery = () => {
    const newQuery = query;
    // delete newQuery.hospitalSlug;

    return newQuery;
  };

  const setQuery = (queryParams) => {
    router.push({
      pathname: currentPathname,
      query: { ...query, ...queryParams },
    });
  };

  const contextValues = useMemo(() => ({
    currentPathname,
    currentQuery: getCurrentQuery(),
    setQuery,
  }), [currentPathname]);

  return (
    <QueryContext.Provider value={contextValues}>
      {children}
    </QueryContext.Provider>
  );
}

export function useQuery() {
  const context = useContext(QueryContext);

  return context;
}

export default QueryContextProvider;
