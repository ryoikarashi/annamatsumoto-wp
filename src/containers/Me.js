import { Component } from 'react';
import { connect } from 'react-redux';
import { loadMe } from '../actions';
import Loading from '../components/Loading';

const MeInfo = ({ me }) => (
  <div>
    {/* Basic Info */}
    <article className="[ layout__item ]" dangerouslySetInnerHTML={{__html: me.acf.basic}} />

    {/* Education */}
    {me.acf.education.length
      ?
        <article className="[ layout__item ]">
          <ul>
            { me.acf.education.map((item, index) => <li key={`${item.date}-${index}`}><span>{item.date}</span>{item.content}</li>) }
          </ul>
        </article>
      : ''
    }

    {/* History */}
    {me.acf.history.length
      ?
        <article className="[ layout__item ]">
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

    console.log(this.props);

    const { me, isFetching } = this.props;

    return (
      <div>
        <div className="[ band ]">
          <div className="wrapper">
            <div className="layout">
              {
                !me
                  ? <Loading isFetching={isFetching} />
                  : <MeInfo me={me} />
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
