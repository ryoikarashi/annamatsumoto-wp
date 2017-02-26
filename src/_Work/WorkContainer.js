import { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../_Common/Loading';
import WorkList from './WorkList';
import { loadCategories, loadTags } from '../taxonomy/actions';

class MemoContainer extends Component {

  initQueryFilter() {
    const { loadTags, lang } = this.props;
    loadTags(lang);
  }

  componentWillMount() {
    this.initQueryFilter();
  }

  render() {
    const { tags } = this.props;

    return (
      <div>
        { Object.keys(tags).length
          ? <WorkList {...this.props} />
          : <Loading isFetching={true} />
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

  const { worksByFilter } = pagination.lang[lang];
  const { works, tags, categories } = entities[lang];
  const worksPagination = worksByFilter[filter] || { ids: [] };
  const allWorks = worksPagination.ids.map(id => works[id]);
  const { nextPageUrl } = worksPagination;

  return {
    tags,
    categories,
    allWorks,
    filter,
    worksPagination,
    nextPageUrl,
    lang
  };
}

export default connect(mapStateToProps, { loadCategories, loadTags })(MemoContainer);
