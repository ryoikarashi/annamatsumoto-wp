import { Component } from 'react';
import { connect } from 'react-redux';
import MemoItem from '../components/MemoItem';
import Loading from '../components/Loading';
import { loadPosts } from '../actions';
import Paginator from './Paginator';
import QueryFilter from './QueryFilter';
import { loadCategories, loadTags } from '../actions';
import { RouteTransition } from 'react-router-transition';

class MemoList extends Component {

  loadPosts() {
    const { filter, loadPosts, params } = this.props;
    loadPosts(filter, params);
  }

  componentWillMount() {
    this.loadPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filter !== this.props.filter) {
      this.loadPosts(nextProps.filter, nextProps.params);
    }
  }

  render() {
    const {
      allPosts,
      nextPageUrl,
      postsPagination: { isFetching }
    } = this.props;

    return (
      <div>
        <QueryFilter {...this.props} />
        <div className="[ band--small ]">
          <div className="[ wrapper ]">
            {
              !allPosts.length
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
                      { allPosts.map(item => <MemoItem key={item.id} item={item} />) }
                    </div>
                  </RouteTransition>
            }
          </div>
        </div>
        <div className="[ band ]">
          <div className="wrapper">
            {!nextPageUrl ? '' : <Paginator {...this.props} /> }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {

  const filter = ownProps.location.pathname;

  const {
    pagination: { postsByFilter },
    entities: { posts, tags, categories }
  } = state;

  const postsPagination = postsByFilter[filter] || { ids: [] };
  const allPosts = postsPagination.ids.map(id => posts[id]);
  const { nextPageUrl } = postsPagination;

  return {
    tags,
    categories,
    allPosts,
    filter,
    postsPagination,
    nextPageUrl
  };
}

export default connect(mapStateToProps, { loadPosts, loadCategories, loadTags })(MemoList);
