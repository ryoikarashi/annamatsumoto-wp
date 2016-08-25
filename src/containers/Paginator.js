import { Component } from 'react';
import { connect } from 'react-redux';
import { loadMorePosts } from '../actions';

class Paginator extends Component {

  constructor(props) {
    super(props);
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this)
  }

  handleLoadMoreClick() {
    const { loadMorePosts, filter, params } = this.props;
    loadMorePosts(filter, params, true);
  }

  render() {
    return (
      <button className="load-more-button [ btn btn--small ]" onClick={this.handleLoadMoreClick}>
        {this.props.postsPagination.isFetching
          ? 'Loading...' : 'Load More'
        }
      </button>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const filter = ownProps.location.pathname;
  const { params } = ownProps;
  return {
    filter,
    params
  };
}

export default connect(mapStateToProps, { loadMorePosts })(Paginator);
