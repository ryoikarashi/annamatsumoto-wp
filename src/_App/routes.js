import { Route, IndexRoute } from 'react-router';
import App from './App';
import NotFound from '../_Common/NotFound';
import WorkSingle from '../_Work/WorkSingle';
import WorkList from '../_Work/WorkList';
import NoteSingle from '../_Note/NoteSingle';
import NoteList from '../_Note/NoteList';
import Top from '../_Top/Top';
import Me from '../_Me/Me';

const innerRoutes = (
  <Route>
    <IndexRoute component={Top} />
    <Route path="me" component={Me} />

    <Route path="works" component={WorkList} />
    <Route path="works/:slug" component={WorkSingle} />

    <Route path="works/tag/:tag" component={WorkList} />
    <Route path="works/tag/:tag/search/:search" component={WorkList} />

    <Route path="works/search/:search"component={WorkList} />

    <Route path="works/time/:year" component={WorkList} />
    <Route path="works/time/:year/search/:search" component={WorkList} />
    <Route path="works/time/:year/:month" component={WorkList} />
    <Route path="works/time/:year/:month/search/:search" component={WorkList} />
    <Route path="works/time/:year/:month/:day" component={WorkList} />
    <Route path="works/time/:year/:month/:day/search/:search" component={WorkList} />

    <Route path="notes" component={NoteList} />
    <Route path="notes/:slug" component={NoteSingle} />

    <Route path="notes/tag/:tag" component={NoteList} />
    <Route path="notes/tag/:tag/search/:search" component={NoteList} />

    <Route path="notes/search/:search"component={NoteList} />

    <Route path="notes/time/:year" component={NoteList} />
    <Route path="notes/time/:year/search/:search" component={NoteList} />
    <Route path="notes/time/:year/:month" component={NoteList} />
    <Route path="notes/time/:year/:month/search/:search" component={NoteList} />
    <Route path="notes/time/:year/:month/:day" component={NoteList} />
    <Route path="notes/time/:year/:month/:day/search/:search" component={NoteList} />
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
