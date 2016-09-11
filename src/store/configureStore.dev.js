import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import createSagaMiddleware, { END } from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
import rootReducer from '../_App/reducers';
import DevTools from '../utils/DevTools'

const configureStore = (initialState = {}) => {

  const sagaMiddleware = createSagaMiddleware();

  const enhancer = compose(
    applyMiddleware(
      sagaMiddleware,
      routerMiddleware(browserHistory),
      createLogger()
    ),
    DevTools.instrument()
  );

  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../_App/reducers', () => {
      const nextRootReducer = require('../_App/reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
};

export default configureStore;
