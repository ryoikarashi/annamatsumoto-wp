import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import NotFound from './components/NotFound';
import Single from './containers/Single';
import MemoList from './containers/MemoList';
import Top from './components/Top';
import Me from './containers/Me';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Top} />

    <Route path="me" component={Me} />

    <Route path="works" component={MemoList} />
    <Route path="works/:slug" component={Single} />

    <Route path="works/category/:category"component={MemoList} />
    <Route path="works/category/:category/search/:search" component={MemoList} />
    <Route path="works/category/:category/tag/:tag" component={MemoList} />
    <Route path="works/category/:category/tag/:tag/search/:search" component={MemoList} />

    <Route path="works/tag/:tag" component={MemoList} />
    <Route path="works/tag/:tag/search/:search" component={MemoList} />

    <Route path="works/search/:search"component={MemoList} />

    <Route path="works/time/:year" component={MemoList} />
    <Route path="works/time/:year/search/:search" component={MemoList} />
    <Route path="works/time/:year/:month" component={MemoList} />
    <Route path="works/time/:year/:month/search/:search" component={MemoList} />
    <Route path="works/time/:year/:month/:day" component={MemoList} />
    <Route path="works/time/:year/:month/:day/search/:search" component={MemoList} />

    <Route path="*" component={NotFound} />
  </Route>
);
