import 'babel-polyfill';

import './styles/main.css';

import { render } from 'react-dom';
import Root from './components/Root';
import configureStore from './store/configureStore';
import rootSaga from './sagas';

import './utils/hotreloadExtractedFiles';

const store = configureStore(window.__INITIAL_STATE__);
store.runSaga(rootSaga);

render(
  <Root store={store} />,
  document.getElementById('root')
);
