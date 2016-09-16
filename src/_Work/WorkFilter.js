import { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export default class TagFilter extends Component {

  constructor(props) {
    super(props);
    this.selectWorksByTag = this.selectWorksByTag.bind(this);
    this.currentTag = this.props.location.pathname.indexOf('/works/tag/') !== -1 ? this.props.location.pathname.replace('/works/tag/', '') : '';
  }

  initQueryFilter() {
    const { loadTags } = this.props;
    loadTags();
  }

  getFilteredWorks(tagInput = '', searchInput = '') {

    const { dispatch, loadWorks } = this.props;

    let fullUrl = '/works';
    let params = {};

    // if there is no input, then show all works again, if not, then show works filtered by queries
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

    this.currentTag =

    dispatch(push(fullUrl));
    loadWorks(fullUrl, params, false);
    this.refs.tag.value = tagInput.value;
  }

  selectWorksByTag(e) {
    this.getFilteredWorks({value: e.target.value}, {value: ''});
  }

  componentDidMount() {
    this.initQueryFilter();
  }

  render() {
    return (
      <div className="[ band--small ]">
        <div className="[ wrapper ]">
          <form className="query-filter" onSubmit={e => {
            e.preventDefault();
            this.getFilteredWorks();
          }}>

            <select className="query-filter__select query-filter__select--tag" value={this.currentTag} onChange={this.selectWorksByTag} ref="tag">
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

export default connect()(TagFilter);
