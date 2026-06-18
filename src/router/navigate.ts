import { toBrowserUrl } from './basePath';

export const navigate = (path: string): void => {
  window.history.pushState({}, '', toBrowserUrl(path));
  window.dispatchEvent(new PopStateEvent('popstate'));
}; 