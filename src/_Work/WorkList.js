import { Component } from 'react';
import { connect } from 'react-redux';
import WorkItem from './WorkItem';
import Loading from '../_Common/Loading';
import { loadWorks } from './actions';
import Pagination from '../_Paginate/Paginate';
import WorkFilter from './WorkFilter';
import { loadCategories, loadTags } from '../taxonomy/actions';
import PageTransition from '../_Common/PageTransition';

class MemoList extends Component {

  loadWorks() {
    const { filter, loadWorks, params } = this.props;
    loadWorks(filter, params);
  }

  componentWillMount() {
    this.loadWorks();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filter !== this.props.filter) {
      this.loadWorks(nextProps.filter, nextProps.params);
    }
  }

  render() {
    const {
      location,
      allWorks,
      nextPageUrl,
      worksPagination: { isFetching }
    } = this.props;

    return (
      <div>
        <WorkFilter {...this.props} />
        <div className="[ band--small ]">
          <div className="[ wrapper ]">
            {
              !allWorks.length
                ? <Loading isFetching={isFetching} />
                : <PageTransition location={location}>
                    <div className="[ layout layout--tiny ]">
                      { allWorks.map(item => <WorkItem key={item.id} item={item} />) }
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
    pagination: { worksByFilter },
    entities: { works, tags, categories }
  } = state;

  const worksPagination = worksByFilter[filter] || { ids: [] };
  const allWorks = worksPagination.ids.map(id => works[id]);
  const { nextPageUrl } = worksPagination;

  return {
    tags,
    categories,
    allWorks,
    filter,
    worksPagination,
    nextPageUrl
  };
}

export default connect(mapStateToProps, { loadWorks, loadCategories, loadTags })(MemoList);
