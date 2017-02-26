import { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export default class TagFilter extends Component {

  constructor(props) {
    super(props);
    this.selectWorksByTag = this.selectWorksByTag.bind(this);
    this.isWrongTag = !!this.props.params.tag && !this.props.tags[this.props.params.tag];
    this.currentTagID = !this.isWrongTag ? !this.props.params.tag ? '' : this.props.tags[this.props.params.tag].id : '';
    this.currentTagName = this.props.params.tag || '';
  }

  getFilteredWorks(tagInput = {}, searchInput = {}) {

    const { dispatch, loadWorks, lang } = this.props;
    const langPath = lang === 'ja' ? '/' : `/${lang}/`;

    let fullUrl = `${langPath}works`;
    let params = {};

    // if there is no input, then show all works again, if not, then show works filtered by queries
    if (searchInput.value   !== '' || typeof searchInput.value   !== 'undefined' ||
        tagInput.id      !== '' || typeof tagInput.id      !== 'undefined')
    {

      if (tagInput.id !== '' && tagInput.id !== 'all') {
        fullUrl += `/tag/${tagInput.slug}`;
        params.tag = tagInput.id;
      }

      if (searchInput.value !== '') {
        fullUrl += `/search/${searchInput.value}`;
        params.search = searchInput.value;
      }
    }

    dispatch(push(fullUrl));
    loadWorks(fullUrl, params, false);
  }

  selectWorksByTag(e) {
    const tag = JSON.parse(e.target.value);
    this.getFilteredWorks(tag, {value: ''});
  }

  render() {
    const { tags } = this.props;

    return (
      <div className="[ band--small ]">
        <div className="[ wrapper ]">
          <form className="query-filter" onSubmit={e => {
            e.preventDefault();
            this.getFilteredWorks();
          }}>

            <select className="query-filter__select query-filter__select--tag" onChange={this.selectWorksByTag} value={JSON.stringify(tags[this.currentTagName])}>
              {this.isWrongTag ? <option value="{}">Select</option> : null}
              <option value={JSON.stringify({id: 'all', slug: 'all'})}>all</option>
              {Object.keys(tags).length
                ? Object.values(tags).map(tag => <option key={tag.id} value={JSON.stringify(tag)}>{tag.slug}</option>)
                : null
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
