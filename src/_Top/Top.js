import { Component } from 'react';
import { connect } from 'react-redux';
import { loadTop } from './actions';
import Loading from '../_Common/Loading';
import PageTransition from '../_Common/PageTransition';

class Top extends Component {

  randomBgImage() {

    let path = '/wp-content/uploads/2016/02/2013.1.1014.jpg';
    const topBg = document.getElementById('top-bg')

    const add = () => {
      topBg.style.backgroundImage = `url(${path})`;
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
    if(isFetching)
      this.randomBgImage().add();
  }

  componentWillUnmount() {
    this.randomBgImage().remove();
  }

  componentDidUpdate() {
    const { isFetching } = this.props;
    if(isFetching)
      this.randomBgImage().add();
  }

  render() {

    const { top, isFetching, location } = this.props;

    return (
      <div>
        {
          !top
            ? <Loading isFetching={isFetching} />
            : <PageTransition location={location}>
                <span id="top-bg"></span>
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
