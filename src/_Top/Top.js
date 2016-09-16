import { Component } from 'react';
import { connect } from 'react-redux';
import { loadTop } from './actions';
import Loading from '../_Common/Loading';
import PageTransition from '../_Common/PageTransition';

class Top extends Component {

  randomBgImage() {

    const { protocol } = window.location;
    let { hostname } = window.location;
    hostname = hostname === 'localhost' ? 'wocker.dev' : hostname;
    const imgPath = `${protocol}//${hostname}/wp-content/uploads/2016/02/2013.1.1014.jpg`;
    const topBg = this.refs.topBg;

    const add = () => {
      topBg.style.backgroundImage = `url(${imgPath})`;
    };

    const remove = () => {
       topBg.style.backgroundImage = '';
    };

    return {
      add: add,
      remove: remove
    };
  }

  componentWillMount() {
    this.props.loadTop();
  }

  componentDidMount() {
    const { isFetching } = this.props;
    if(!isFetching)
      this.randomBgImage().add();
  }

  componentWillUnmount() {
    this.randomBgImage().remove();
  }

  componentDidUpdate() {
    const { isFetching } = this.props;
    if(!isFetching)
      this.randomBgImage().add();
  }

  render() {

    const { isFetching, location } = this.props;

    return (
      <div>
        {
          isFetching
            ? <Loading isFetching={isFetching} />
            : <PageTransition location={location}>
                <span id="top-bg" ref="topBg"></span>
              </PageTransition>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {

  const {
    top: { isFetching },
    entities: { top }
  } = state;

  let topInfo = top[Object.keys(top)[0]];

  return {
    top: topInfo,
    isFetching
  };
}

export default connect(mapStateToProps, { loadTop })(Top);
