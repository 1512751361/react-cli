import createBrowserHistory from 'history/createBrowserHistory';

export const history = createBrowserHistory();

export const getLocation = () => history.location;

// (path, [state])
export const historyPush = history.push;

// (path, [state])
export const historyReplace = history.replace;

// (n)
export const historyGo = history.go;

export const historyGoBack = history.goBack;

export const historyGoForward = history.goForward;

// (n) only in createMemoryHistory
export const historyCanGo = history.canGo;
