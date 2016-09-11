import { Component } from 'react';
import { connect } from 'react-redux';
import WorkItem from './WorkItem';
import Loading from '../_Common/Loading';
import { loadWorks } from './actions';
import Pagination from '../_Paginate/Paginate';
import WorkFilter from './WorkFilter';
import { loadCategories, loadTags } from '../taxonomy/actions';
import { RouteTransition } from 'react-router-transition';

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
                : <RouteTransition
                    pathname={this.props.location.pathname}
                    atEnter={{ opacity: 0 }}
                    atLeave={{ opacity: 2 }}
                    atActive={{ opacity: 1 }}
                    mapStyles={styles => {
                      if(styles.opacity > 1){
                        return { display: 'none'}
                      }
                      return { opacity: styles.opacity}
                    }}
                  >
                    <div className="[ layout layout--tiny ]">
                      { allWorks.map(item => <WorkItem key={item.id} item={item} />) }
                    </div>
                  </RouteTransition>
            }
          </div>
        </div>
        <div className="[ band ]">
          <div className="wrapper">
            {!nextPageUrl ? '' : <Pagination {...this.props} /> }
          </div>
        </div>
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
