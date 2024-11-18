import { useEffect } from 'react';

const useReloadPageOnce = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isPageReloaded = sessionStorage.getItem('isPageReloaded');

      if (!isPageReloaded) {
        sessionStorage.setItem('isPageReloaded', 'true');
        window.location.reload();
      }
    }
  }, []);
};

export default useReloadPageOnce;