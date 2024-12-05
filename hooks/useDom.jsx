import { useEffect, useState } from 'react';

export default function useDom() {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return {
    /**
     * Some UI components may work incompatible with the server in the browser.
     * To avoid this, the DOM content needs to be loaded first. You can check this with `domLoaded`.
     * @see https://stackoverflow.com/a/72318597
    */
    domLoaded,
  };
}
