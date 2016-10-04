import { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export default class TagFilter extends Component {

  constructor(props) {
    super(props);
    this.selectNotesByTag = this.selectNotesByTag.bind(this);
    this.currentTag = this.props.params.tag;
  }

  initQueryFilter() {
    const { loadTags, lang } = this.props;
    loadTags(lang);
  }

  getFilteredNotes(tagInput = '', searchInput = '') {

    const { dispatch, loadNotes, lang } = this.props;
    const langPath = lang === 'ja' ? '/' : `/${lang}/`;

    let fullUrl = `${langPath}notes`;
    let params = {};

    // if there is no input, then show all notes again, if not, then show notes filtered by queries
    if (searchInput.value   !== '' || typeof searchInput.value   !== 'undefined' ||
        tagInput.value      !== '' || typeof tagInput.value      !== 'undefined')
    {

      if (tagInput.value !== '' && tagInput.value !== 'all') {
        fullUrl += `/tag/${tagInput.value}`;
        params.tag = tagInput.value;
      }

      if (searchInput.value !== '') {
        fullUrl += `/search/${searchInput.value}`;
        params.search = searchInput.value;
      }
    }

    dispatch(push(fullUrl));
    loadNotes(fullUrl, params, false);
    this.refs.tag.value = tagInput.value;
  }

  selectNotesByTag(e) {
    this.getFilteredNotes({value: e.target.value}, {value: ''});
  }

  componentWillMount() {
    this.initQueryFilter();
  }

  render() {
    return (
      <div className="[ band--small ]">
        <div className="[ wrapper ]">
          <form className="query-filter" onSubmit={e => {
            e.preventDefault();
            this.getFilteredNotes();
          }}>

            <select className="query-filter__select query-filter__select--tag" value={this.currentTag} onChange={this.selectNotesByTag} ref="tag">
              <option value="all">all</option>
              {Object.keys(this.props.tags).length
                ? Object.values(this.props.tags).map(tag => <option key={tag.slug} value={tag.slug}>{tag.slug}</option>)
                : <option value="">Loading...</option>
              }
            </select>

            <input className="query-filter__input query-filter__input--search" type="text" placeholder="search" ref="search" />

          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { lang: {lang} } = state;
  return { lang };
}

export default connect(mapStateToProps)(TagFilter);
