import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

// Listen for changes to the current location.
const unlisten = history.listen((location, action) => {
	// location is an object like window.location
	console.log(action, location.pathname, location.state);
});

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
