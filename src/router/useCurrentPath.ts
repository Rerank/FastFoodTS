import { useState, useEffect } from 'react';
import { toAppPath } from './basePath';


export const useCurrentPath = (): string => {
  const [path, setPath] = useState(toAppPath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => setPath(toAppPath(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return path;
};