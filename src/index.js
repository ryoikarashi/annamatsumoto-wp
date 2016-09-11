import 'babel-polyfill';

import './styles/main.css';

import { render } from 'react-dom';
import Root from './_App/Root';
import configureStore from './store/configureStore';
import rootSaga from './_App/sagas';

import './utils/hotreloadExtractedFiles';

const store = configureStore(window.__INITIAL_STATE__);
store.runSaga(rootSaga);

render(
  <Root store={store} />,
  document.getElementById('root')
);
