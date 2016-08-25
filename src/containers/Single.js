import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import hljs from 'highlight.js';
import 'date-utils';
import $ from 'jquery';
import Loading from '../components/Loading';
import { loadPosts } from '../actions';

class Single extends Component {

  addIframeFlag() {
    $('iframe').parents('p').addClass('iframe');
  }

  getDate(date) {
    date = new Date(date);
    return date.toFormat('YYYY/MM/DD');
  }

  highlightBlock() {
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  }

  componentDidMount() {
    const { filter, params, loadPosts } = this.props;
    loadPosts(filter, params);
    this.highlightBlock();
    this.addIframeFlag();
    /* eslint-disable no-undef */
    twttr.widgets.load();
  }

  componentDidUpdate() {
    this.highlightBlock();
    this.addIframeFlag();
    /* eslint-disable no-undef */
    twttr.widgets.load();
  }

  render() {

    const {
      allPosts,
      postsPagination: { isFetching }
    } = this.props;

    const isEmpty = allPosts.length === 0;
    const item = allPosts[0];

    return (
      <div>
        {!isEmpty
          ?
            <Helmet title={item.title.rendered} />
          : ''
        }

        {isEmpty
          ?  <Loading isFetching={isFetching} />
          :  <article className="single-post [ markdown-body ]">
              <h1 className="single-post__title">{item.title.rendered}</h1>
              <time className="single-post__time">
                created at <Link to={`/time/${this.getDate(item.date)}`}>{this.getDate(item.date)}</Link>
              </time>
              <div className="single-post__body" dangerouslySetInnerHTML={{__html: item.content.rendered}}></div>
            </article>
        }
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

  return {
    allPosts,
    filter,
    postsPagination
  };
}

export default connect(mapStateToProps, { loadPosts })(Single);
