import { Component } from 'react';
import { connect } from 'react-redux';
import { loadMe } from './actions';
import Loading from '../_Common/Loading';
import { RouteTransition } from 'react-router-transition';

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
    this.props.loadMe();
  }

  render() {

    const { me, isFetching } = this.props;

    return (
      <div>
        <div className="[ band ]">
          <div className="[ wrapper ]">
            <div className="[ container container--small ]">
              {
                !me
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
                      <MeInfo me={me} />
                    </RouteTransition>
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
    entities: { me }
  } = state;

  let meInfo = me[Object.keys(me)[0]];

  return {
    me: meInfo,
    isFetching
  };
}

export default connect(mapStateToProps, { loadMe })(Me);
