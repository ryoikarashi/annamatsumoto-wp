import { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export default class TagFilter extends Component {

  constructor(props) {
    super(props);
    this.goHome = this.goHome.bind(this);
    this.selectWorksByTag = this.selectWorksByTag.bind(this);
  }

  initQueryFilter() {
    const { loadCategories, loadTags } = this.props;
    loadCategories();
    loadTags();
  }

  goHome() {
    const { dispatch } = this.props;
    dispatch(push('/works'));
  }

  getFilteredWorks(categoryInput, tagInput, searchInput) {

    const { dispatch, loadWorks } = this.props;

    let fullUrl = '/works';
    let params = {};

    // if there is no input, then show all works again, if not, then show works filtered by queries
    if (searchInput.value   !== '' || typeof searchInput.value   !== 'undefined' ||
        tagInput.value      !== '' || typeof tagInput.value      !== 'undefined' ||
        categoryInput.value !== '' || typeof categoryInput.value !== 'undefined')
    {
      if (categoryInput.value !== '') {
        fullUrl += `/category/${categoryInput.value}`;
        params.category = categoryInput.value;
      }

      if (tagInput.value !== '') {
        fullUrl += `/tag/${tagInput.value}`;
        params.tag = tagInput.value;
      }

      if (searchInput.value !== '') {
        fullUrl += `/search/${searchInput.value}`;
        params.search = searchInput.value;
      }

      dispatch(push(fullUrl));
      loadWorks(fullUrl, params, false);
    } else {
      dispatch(push('/works'))
      loadWorks('/works', params, false);
    }
  }

  selectWorksByTag(e) {
    this.getFilteredWorks({value: ''}, {value: e.target.value}, {value: ''});
  }

  componentDidMount() {
    this.initQueryFilter();
  }

  render() {

    let categoryInput;
    let tagInput;
    let searchInput;

    return (
      <div className="[ band--small ]">
        <div className="[ wrapper ]">
          <form className="query-filter" onSubmit={e => {
            e.preventDefault();
            this.getFilteredWorks(categoryInput, tagInput, searchInput);
          }}>

            { /* <i className="header__icon [ icon ion-trash-b ] [ hide-mobile hide-palm ]" onClick={this.goHome}></i> */}

            <select className="query-filter__select query-filter__select--category" ref={node => { categoryInput = node}}>
              <option value="">Categories</option>
              {Object.keys(this.props.categories).length
                ? Object.values(this.props.categories).map(category => <option key={category.slug} value={category.slug}>{category.slug}</option>)
                : <option value="">Loading...</option>
              }
            </select>

            <select className="query-filter__select query-filter__select--tag" value="" onChange={this.selectWorksByTag} ref={node => { tagInput = node}}>
              <option value="">Tags</option>
              {Object.keys(this.props.tags).length
                ? Object.values(this.props.tags).map(tag => <option key={tag.slug} value={tag.slug}>{tag.slug}</option>)
                : <option value="">Loading...</option>
              }
            </select>

            <input className="query-filter__input query-filter__input--search" type="text" placeholder="search" ref={node => {
              searchInput = node;
            }} />
            <button className="query-filter__button query-filter__button--submit" type="submit"></button>

          </form>
        </div>
      </div>
    )
  }
}

export default connect()(TagFilter);
