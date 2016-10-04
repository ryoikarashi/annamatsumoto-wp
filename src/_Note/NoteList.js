import { Component } from 'react';
import { connect } from 'react-redux';
import NoteItem from './NoteItem';
import Loading from '../_Common/Loading';
import { loadNotes } from './actions';
import Pagination from '../_Paginate/Paginate';
import NoteFilter from './NoteFilter';
import { loadCategories, loadTags } from '../taxonomy/actions';
import PageTransition from '../_Common/PageTransition';

class NoteList extends Component {

  loadNotes() {
    const { filter, loadNotes, params } = this.props;
    const { lang } = params;
    loadNotes(filter, params, lang);
  }

  componentWillMount() {
    this.loadNotes();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filter !== this.props.filter) {
      this.props.loadNotes(nextProps.filter, nextProps.params, nextProps.params.lang);
    }
  }

  render() {
    const {
      location,
      allNotes,
      nextPageUrl,
      notesPagination: { isFetching },
      lang
    } = this.props;

    return (
      <div>
        <NoteFilter {...this.props} />
        <div className="[ band--small ]">
          <div className="[ wrapper ]">
            {
              !allNotes.length
                ? <Loading isFetching={isFetching} />
                : <PageTransition location={location}>
                    <div className="[ layout layout--tiny ]">
                      { allNotes.map(item => <NoteItem key={item.id} item={item} lang={lang} />) }
                    </div>
                  </PageTransition>
            }
          </div>
        </div>
        {nextPageUrl
          ? <div className="[ band ]">
              <div className="wrapper">
                <Pagination {...this.props} />
              </div>
            </div>
          : ''
        }
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {

  const filter = ownProps.location.pathname;

  const {
    pagination,
    entities: { entities },
    lang: { lang }
  } = state;

  const { notesByFilter } = pagination.lang[lang];
  const { notes, tags, categories } = entities[lang];
  const notesPagination = notesByFilter[filter] || { ids: [] };
  const allNotes = notesPagination.ids.map(id => notes[id]);
  const { nextPageUrl } = notesPagination;

  return {
    tags,
    categories,
    allNotes,
    filter,
    notesPagination,
    nextPageUrl,
    lang
  };
}

export default connect(mapStateToProps, { loadNotes, loadCategories, loadTags })(NoteList);
