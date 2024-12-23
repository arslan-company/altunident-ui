import { useQuery } from '../../hooks/useQuery';

function Pagination(props) {
  const page = Number(props?.page);
  const pages = Number(props?.pages);
  const goTopElement = props?.goTopElement;

  const updatedPages = [];
  const goTopHref = goTopElement || '!#';

  for (let i = 1; i < pages + 1; i += 1) {
    updatedPages.push(i);
  }

  const handlePage = (e, pageNumber) => {
    useQuery({ page: pageNumber });
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
        useQuery({ page: 1 });
      } else {
        useQuery({ page: page + 1 });
      }
    },
    goPrevPage: () => {
      if (page === 1) {
        // if the page is first:
        useQuery({ page: pages });
      } else {
        useQuery({ page: page - 1 });
      }
    },
  };

  return (
    <div className="pagination">
      <nav aria-label="Page navigation example text-center">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link page-links" onClick={pagination.goPrevPage} href={goTopHref}>
              <i className="bx bx-chevrons-left" />
            </a>
          </li>
          {page > 3 && (
            <>
              <li className={`page-item ${page === 1 && 'active'}`}>
                <a href={goTopHref} className="page-link" onClick={() => useQuery({ page: 1 })}>1</a>
              </li>
              {page > 4 && (
                <li className="page-item">
                  <div
                    href="!#"
                    onClick={(e) => e.preventDefault()}
                    className="page-link disable"
                  >
                    ...
                  </div>
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
                <a href={goTopHref} className="page-link" onClick={(e) => handlePage(e, pageNumber)}>{pageNumber}</a>
              </li>
            ))
          }
          {page < pages - 2 && (
            <>
              {page < pages - 3 && (
                <li className="page-item">
                  <div
                    href="!#"
                    onClick={(e) => e.preventDefault()}
                    className="page-link disable"
                  >
                    ...
                  </div>
                </li>
              )}
              <li className={`page-item ${page === pages && 'active'}`}>
                <a href={goTopHref} className="page-link" onClick={() => useQuery({ page: pages })}>{pages}</a>
              </li>
            </>
          )}
          <li className="page-item">
            <a className="page-link" onClick={pagination.goNextPage} href={goTopHref}>
              <i className="bx bx-chevrons-right" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
