import { Component } from 'react';
import { connect } from 'react-redux';
import { loadMoreWorks } from '../_Work/actions';

class Paginate extends Component {

  constructor(props) {
    super(props);
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this)
  }

  handleLoadMoreClick() {
    const { loadMoreWorks, filter, params, lang } = this.props;
    loadMoreWorks(filter, params, lang);
  }

  render() {
    return (
      <button className="load-more-button [ btn btn--small ]" onClick={this.handleLoadMoreClick}>
        {this.props.worksPagination.isFetching
          ? 'Loading...' : 'Load More'
        }
      </button>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const filter = ownProps.location.pathname;
  const { params } = ownProps;
  const { lang: {lang} } = state;
  return {
    filter,
    params,
    lang
  };
}

export default connect(mapStateToProps, { loadMoreWorks })(Paginate);
