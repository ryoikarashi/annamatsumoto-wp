import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import createSagaMiddleware, { END } from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

const configureStore = (initialState = {}) => {

  const sagaMiddleware = createSagaMiddleware();

  const enhancer = compose(
    applyMiddleware(
      sagaMiddleware,
      routerMiddleware(browserHistory)
    )
  );

  const store = createStore(rootReducer, initialState, enhancer);

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
};

export default configureStore;
