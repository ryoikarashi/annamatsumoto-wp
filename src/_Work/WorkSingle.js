import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import hljs from 'highlight.js';
import 'date-utils';
import $ from 'jquery';
import Loading from '../_Common/Loading';
import { loadWorks } from './actions';
import PageTransition from '../_Common/PageTransition';

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
    const { filter, params, loadWorks } = this.props;
    loadWorks(filter, params);
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
      location,
      allWorks,
      worksPagination: { isFetching }
    } = this.props;

    const isEmpty = allWorks.length === 0;
    const item = allWorks[0];

    return (
      <div>
        {!isEmpty
          ?
            <Helmet title={item.title.rendered} />
          : ''
        }

        {isEmpty
          ? <Loading isFetching={isFetching} />
          : <PageTransition location={location}>
              <article className="entry" ref="post">
                <div className="container">
                  <h1 className="entry__title">{item.title.rendered}</h1>
                  <time className="entry__time">
                    created at <Link to={`/works/time/${this.getDate(item.date)}`}>{this.getDate(item.date)}</Link>
                  </time>
                  <div className="entry__body" dangerouslySetInnerHTML={{__html: item.content.rendered}}></div>
                </div>
              </article>
            </PageTransition>
        }
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const filter = ownProps.location.pathname;

  const {
    pagination: { worksByFilter },
    entities: { works }
  } = state;

  const worksPagination = worksByFilter[filter] || { ids: [] };
  const allWorks = worksPagination.ids.map(id => works[id]);

  return {
    allWorks,
    filter,
    worksPagination
  };
}

export default connect(mapStateToProps, { loadWorks })(Single);
