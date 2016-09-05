import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import hljs from 'highlight.js';
import 'date-utils';
import $ from 'jquery';
import Loading from '../components/Loading';
import { loadPosts } from '../actions';
import { RouteTransition } from 'react-router-transition';

class Single extends Component {

  addParagraphFlag() {
    $('iframe').map((index, item) => {
      if(item.src.indexOf('//www.youtube.com') !== -1 || item.src.indexOf('//player.vimeo.com') !== -1) {
        $(item).parents('p').addClass('video wide');
      }
    });
    $('img').parents('p').addClass('wide');
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
    this.addParagraphFlag();
  }

  componentDidUpdate() {
    this.highlightBlock();
    this.addParagraphFlag();
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
              <article className="entry" ref="post">
                <div className="container">
                  <h1 className="entry__title">{item.title.rendered}</h1>
                  <time className="entry__time">
                    created at <Link to={`/works/time/${this.getDate(item.date)}`}>{this.getDate(item.date)}</Link>
                  </time>
                  <div className="entry__body" dangerouslySetInnerHTML={{__html: item.content.rendered}}></div>
                </div>
              </article>
            </RouteTransition>
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
