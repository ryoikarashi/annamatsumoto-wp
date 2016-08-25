import { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export default class TagFilter extends Component {

  constructor(props) {
    super(props);
    this.goHome = this.goHome.bind(this);
  }

  initQueryFilter() {
    const { loadCategories, loadTags } = this.props;
    loadCategories();
    loadTags();
  }

  goHome() {
    const { dispatch } = this.props;
    dispatch(push('/'));
  }

  getFilteredPosts(categoryInput, tagInput, searchInput) {

    const { dispatch, loadPosts } = this.props;

    let fullUrl = '';
    let params = {};

    // if there is no input, then show all posts again, if not, then show posts filtered by queries
    if (searchInput.value   !== '' ||
        tagInput.value      !== '' ||
        categoryInput.value !== '')
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
      loadPosts(fullUrl, params, false);
    } else {
      dispatch(push('/'))
      loadPosts('/', params, false);
    }
  }

  componentDidMount() {
    this.initQueryFilter();
  }

  render() {

    let categoryInput;
    let tagInput;
    let searchInput;

    return (
      <div>
        <form className="query-filter" onSubmit={e => {
          e.preventDefault();
          this.getFilteredPosts(categoryInput, tagInput, searchInput);
        }}>

          <i className="header__icon [ icon ion-trash-b ] [ hide-mobile hide-palm ]" onClick={this.goHome}></i>

          <select className="query-filter__select query-filter__select--category" ref={node => { categoryInput = node}}>
            <option value="">Categories</option>
            {Object.keys(this.props.categories).length
              ? Object.values(this.props.categories).map(category => <option key={category.slug} value={category.slug}>{category.slug}</option>)
              : <option value="">Loading...</option>
            }
          </select>

          <select className="query-filter__select query-filter__select--tag" ref={node => { tagInput = node}}>
            <option value="">Tags</option>
            {Object.keys(this.props.tags).length
              ? Object.values(this.props.tags).map(tag => <option key={tag.slug} value={tag.slug}>{tag.slug}</option>)
              : <option value="">Loading...</option>
            }
          </select>

          <input className="query-filter__input query-filter__input--search" type="text" placeholder="search" ref={node => {
            searchInput = node;
          }}/>
          <button className="query-filter__button query-filter__button--submit" type="submit"></button>
        </form>
      </div>
    )
  }
}

export default connect()(TagFilter);
