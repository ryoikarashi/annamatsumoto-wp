/* eslint-disable no-extra-boolean-cast */

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

  componentWillMount() {
    const { filter, params, loadWorks, allWorks } = this.props;
    const { lang } = params;

    if (!allWorks.length) {
      loadWorks(filter, params, lang);
    }
  }

  componentDidMount() {
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

    const { location, allWorks } = this.props;

    const isEmpty = allWorks.length === 0;
    const item = allWorks[0];

    return (
      <div>
        { !isEmpty ? <Helmet title={item.title.rendered} /> : '' }

        { isEmpty
            ? <Loading isFetching={isEmpty} />
            : <PageTransition location={location}>
                <article className="entry" ref="post">
                  <div className="container">
                    <h1 className="entry__title">{item.title.rendered}</h1>
                    <time className="entry__time">
                      created at <Link to={`time/${this.getDate(item.date)}`}>{this.getDate(item.date)}</Link>
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
  const { slug } = ownProps.params;

  const {
    entities: { entities },
    lang: {lang}
  } = state;

  const { works } = entities[lang];
  const allWorks = !!works[slug] ? [works[slug]] : [];

  return {
    allWorks,
    filter
  };
}

export default connect(mapStateToProps, { loadWorks })(Single);
