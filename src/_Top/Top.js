/* eslint-disable no-extra-boolean-cast */
import { Component } from 'react';
import { connect } from 'react-redux';
import { loadTop } from './actions';
import { Preload } from 'react-preload';
import Loading from '../_Common/Loading';
import PageTransition from '../_Common/PageTransition';

class Top extends Component {

  componentWillMount() {
    const { params: {lang} } = this.props;
    this.props.loadTop(lang);
  }

  render() {

    const { isFetching, location, top } = this.props;

    return (
      <div>
        {
          !top
            ? <Loading isFetching={isFetching} />
            : <Preload
                loadingIndicator={<Loading isFetching={true} />}
                images={this.props.top.acf.top_bg_images}
                onSuccess={this.randomBgImage}
                resolveOnError={true}
                mountChildren={true}
                >
                  <PageTransition location={location}>
                    <span id="top-bg" style={{backgroundImage: `url(${this.props.top.acf.top_bg_images[Math.floor(Math.random() * this.props.top.acf.top_bg_images.length)].image})`}} />
                  </PageTransition>
              </Preload>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {

  const {
    top: { isFetching },
    entities: { entities },
    lang: { lang }
  } = state;

  const { top } = entities[lang];

  let topInfo = top[Object.keys(top)[0]];

  return {
    top: topInfo,
    isFetching
  };
}

export default connect(mapStateToProps, { loadTop })(Top);
