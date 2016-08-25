import { Component } from 'react';
import { connect } from 'react-redux';
import MemoItem from '../components/MemoItem';
import Loading from '../components/Loading';
import { loadPosts } from '../actions';
import Paginator from './Paginator';

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
        <div className="[ band ]">
          <div className="wrapper">
            <div className="layout">
              {
                !allPosts.length
                  ? <Loading isFetching={isFetching} />
                  : allPosts.map(item => <MemoItem key={item.id} item={item} />)
              }
            </div>
          </div>
        </div>
        <div className="wrapper">
          {!nextPageUrl ? '' : <Paginator {...this.props} /> }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {

  const filter = ownProps.location.pathname;

  const {
    pagination: { postsByFilter },
    entities: { posts }
  } = state;

  const postsPagination = postsByFilter[filter] || { ids: [] };
  const allPosts = postsPagination.ids.map(id => posts[id]);
  const { nextPageUrl } = postsPagination;

  return {
    allPosts,
    filter,
    postsPagination,
    nextPageUrl
  };
}

export default connect(mapStateToProps, { loadPosts })(MemoList);
