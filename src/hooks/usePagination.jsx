import {
  createContext,
  useContext,
  useMemo,
} from 'react';
import { useQuery } from './useQuery';

export const PaginationContext = createContext(null);

// components
function Pagination(props) {
  const { setQuery, currentQuery } = useQuery();

  const page = Number(props?.page);
  const pages = Number(props?.pages);
  // const goTopElement = props?.goTopElement;

  const updatedPages = [];
  // const goTopHref = goTopElement || '';

  for (let i = 1; i < pages + 1; i += 1) {
    updatedPages.push(i);
  }

  const handlePage = (pageNumber) => {
    setQuery({ ...currentQuery, page: pageNumber });
  };

  const pagination = {
    getMinPage: () => {
      let value = 0;

      if (page >= 4) {
        // if the page is inside the first 3 pages:
        value = page - 3;
      } else {
        value = 0;
      }

      return value;
    },
    getMaxPage: () => {
      let value;

      if (page >= 4) {
        // if the page is inside the first 3 pages:
        value = page + 2;
      } else {
        value = 5;
      }

      return value;
    },
    goNextPage: () => {
      if (page === pages) {
        // if the page is last:
        setQuery({ ...currentQuery, page: 1 });
      } else {
        setQuery({ ...currentQuery, page: page + 1 });
      }
    },
    goPrevPage: () => {
      if (page === 1) {
        // if the page is first:
        setQuery({ ...currentQuery, page: pages });
      } else {
        setQuery({ ...currentQuery, page: page - 1 });
      }
    },
  };

  return (
    <div className="pagination">
      <nav aria-label="Page navigation example text-center">
        <ul className="pagination">
          <li className="page-item">
            <button type="button" className="page-link page-links" onClick={pagination.goPrevPage}>
              <i className="bx bx-chevrons-left" />
            </button>
          </li>
          {page > 3 && (
            <>
              <li className={`page-item ${page === 1 && 'active'}`}>
                <button type="button" className="page-link" onClick={() => setQuery({ ...currentQuery, page: 1 })}>1</button>
              </li>
              {page > 4 && (
                <li className="page-item">
                  <button
                    type="button"
                    onClick={() => {}}
                    className="page-link disable"
                  >
                    ...
                  </button>
                </li>
              )}
            </>
          )}
          {
            updatedPages.slice(
              pagination.getMinPage(),
              pagination.getMaxPage(),
            ).map((pageNumber) => (
              <li className={`page-item ${page === pageNumber && 'active'}`} key={pageNumber}>
                <button type="button" className="page-link" onClick={() => handlePage(pageNumber)}>{pageNumber}</button>
              </li>
            ))
        }
          {page < pages - 2 && (
            <>
              {page < pages - 3 && (
                <li className="page-item">
                  <button
                    type="button"
                    onClick={() => {}}
                    className="page-link disable"
                  >
                    ...
                  </button>
                </li>
              )}
              <li className={`page-item ${page === pages && 'active'}`}>
                <button type="button" className="page-link" onClick={() => setQuery({ ...currentQuery, page: pages })}>{pages}</button>
              </li>
            </>
          )}
          <li className="page-item">
            <button type="button" className="page-link" onClick={pagination.goNextPage}>
              <i className="bx bx-chevrons-right" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function PaginationContextProvider({ children }) {
  const contextValues = useMemo(() => ({
    Pagination,
  }));

  return (
    <PaginationContext.Provider value={contextValues}>
      {children}
    </PaginationContext.Provider>
  );
}

export function usePagination() {
  const context = useContext(PaginationContext);

  return context;
}

export default PaginationContextProvider;
