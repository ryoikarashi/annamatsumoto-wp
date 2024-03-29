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
import Share from '../_Common/Share';

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
    date = new Date( date.getTime() - date.getTimezoneOffset() * -60000 );
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

    window.scrollTo(0, 0);

    const { location, allWorks, lang, worksPagination: { isFetching } } = this.props;
    const isEmpty = allWorks.length === 0;
    const item = allWorks[0];
    const langPath = lang === 'ja' ? '/works' : `/${lang}/works`;

    return (
      <div>
        { !isEmpty ? <Helmet title={item.title.rendered} /> : '' }

        { isEmpty
            ? <Loading isFetching={isFetching && isEmpty} />
            : <PageTransition location={location}>
                <article className="entry" ref="post">
                  <div className="container">
                    <h1 className="entry__title">{item.title.rendered}</h1>
                    <time className="entry__time">
                      created at <Link to={`${langPath}/time/${this.getDate(item.date)}`}>{this.getDate(item.date)}</Link>
                    </time>
                    <div className="entry__body">
                      <div>
                        <div dangerouslySetInnerHTML={{__html: item.content.rendered}} />
                        <Share pathname={lang === 'ja' ? `/ja${location.pathname}` : location.pathname} title={item.title.rendered} />
                      </div>
                    </div>
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
    pagination,
    entities: { entities },
    lang: {lang}
  } = state;

  const { worksByFilter } = pagination.lang[lang];
  const worksPagination = worksByFilter[filter] || { ids: [] };

  const { works } = entities[lang];
  const allWorks = !!works[slug] ? [works[slug]] : [];

  return {
    allWorks,
    filter,
    lang,
    worksPagination
  };
}

export default connect(mapStateToProps, { loadWorks })(Single);
