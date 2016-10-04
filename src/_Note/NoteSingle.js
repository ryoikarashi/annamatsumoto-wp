/* eslint-disable no-extra-boolean-cast */

import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import hljs from 'highlight.js';
import 'date-utils';
import $ from 'jquery';
import Loading from '../_Common/Loading';
import { loadNotes } from './actions';
import PageTransition from '../_Common/PageTransition';
import Share from '../_Common/Share';
import { titles } from '../data';

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
    const { filter, params, loadNotes, allNotes } = this.props;
    const { lang } = params;

    if (!allNotes.length) {
      loadNotes(filter, params, lang);
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

    const { location, allNotes, lang, isFetching } = this.props;
    const isEmpty = allNotes.length === 0;
    const item = allNotes[0];
    const langPath = lang === 'ja' ? '/notes' : `/${lang}/notes`;

    const title = !isFetching && !isEmpty ? item.title.rendered : titles.notFound;

    return (
      <div>
        <Helmet title={title} />

        { isEmpty
            ? <Loading isFetching={isFetching} noContent={isEmpty} />
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
    entities: { entities },
    lang: {lang},
    pagination
  } = state;

  const { notes } = entities[lang];
  const allNotes = !!notes[slug] ? [notes[slug]] : [];
  const { isFetching } = pagination.lang[lang].notesByFilter[filter] || true;

  return {
    allNotes,
    filter,
    isFetching,
    lang
  };
}

export default connect(mapStateToProps, { loadNotes })(Single);
