import { Component } from 'react';
import { connect } from 'react-redux';
import { loadMe } from './actions';
import { switchLang } from '../i18n/actions';
import Loading from '../_Common/Loading';
import PageTransition from '../_Common/PageTransition';

const MeInfo = ({ me }) => (
  <div className="[ layout layout--flush ]">
    {/* Basic Info */}
    <article className="[ layout__item ]" dangerouslySetInnerHTML={{__html: me.acf.basic}} />

    {/* Education */}
    {me.acf.education.length
      ?
        <article className="history [ layout__item ]">
          <ul>
            { me.acf.education.map((item, index) => <li key={`${item.date}-${index}`}><span>{item.date}</span>{item.content}</li>) }
          </ul>
        </article>
      : ''
    }

    {/* History */}
    {me.acf.history.length
      ?
        <article className="history [ layout__item ]">
          <ul>
            { me.acf.history.map((item, index) => <li key={`${item.date}-${index}`}><span>{item.date}</span>{item.content}</li>) }
          </ul>
        </article>
      : ''
    }
  </div>
);

class Me extends Component {

  componentWillMount() {
    const { params: {lang} } = this.props;
    this.props.loadMe(lang);
  }

  render() {

    const { me, isFetching, location } = this.props;

    return (
      <div>
        <div className="[ band ]">
          <div className="[ wrapper ]">
            <div className="[ container container--small ]">
              {
                !me
                  ? <Loading isFetching={isFetching} />
                  : <PageTransition location={location}>
                      <MeInfo me={me} />
                    </PageTransition>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {

  const {
    me: { isFetching },
    entities: { entities },
    lang: { lang }
  } = state;

  const { me } = entities[lang];

  let meInfo = me[Object.keys(me)[0]];

  return {
    me: meInfo,
    isFetching
  };
}

export default connect(mapStateToProps, { loadMe, switchLang })(Me);
