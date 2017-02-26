import { Route, IndexRoute } from 'react-router';
import App from './App';
import NotFound from '../_Common/NotFound';
import WorkSingle from '../_Work/WorkSingle';
import WorkContainer from '../_Work/WorkContainer';
import Top from '../_Top/Top';
import Me from '../_Me/Me';

const innerRoutes = (
  <Route>
    <IndexRoute component={Top} />
    <Route path="me" component={Me} />

    <Route path="works" component={WorkContainer} />
    <Route path="works/:slug" component={WorkSingle} />

    <Route path="works/tag/:tag" component={WorkContainer} />
    <Route path="works/tag/:tag/search/:search" component={WorkContainer} />

    <Route path="works/search/:search"component={WorkContainer} />

    <Route path="works/time/:year" component={WorkContainer} />
    <Route path="works/time/:year/search/:search" component={WorkContainer} />
    <Route path="works/time/:year/:month" component={WorkContainer} />
    <Route path="works/time/:year/:month/search/:search" component={WorkContainer} />
    <Route path="works/time/:year/:month/:day" component={WorkContainer} />
    <Route path="works/time/:year/:month/:day/search/:search" component={WorkContainer} />
  </Route>
);

export default (
  <Route path="/" component={App}>
    {innerRoutes}
    <Route path=":lang">
      {innerRoutes}
    </Route>
    <Route path="*" component={NotFound} />
  </Route>
);
