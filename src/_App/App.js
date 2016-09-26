import { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import PageTransition from '../_Common/PageTransition';
import Header from '../_Common/Header';
import Footer from '../_Common/Footer';
import { titles } from '../data';
import { switchLang } from '../i18n/actions';

class App extends Component {

  handlePageTitle(pathname, lang) {
    switch(pathname) {
      case '/':
      case `/${lang}`:
      case `/${lang}/`:
        return titles.top;
      case '/me':
      case '/me/':
      case `/${lang}/me`:
      case `/${lang}/me/`:
        return titles.me;
      case '/works':
      case '/works/':
      case `/${lang}/works`:
      case `/${lang}/works/`:
        return titles.works;
      default:
        return titles.notFound;
    }
  }

  componentWillMount() {
    const { params: {lang}, switchLang } = this.props;
    switchLang(lang || 'ja');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.lang !== this.props.params.lang) {
      const { switchLang } = nextProps;
      switchLang(nextProps.params.lang || 'ja');
    }
  }

  render() {

    const { location: {pathname}, params: {lang} } = this.props;

    return (
      <div>
        <Helmet title={this.handlePageTitle(pathname, lang)} />
          <PageTransition location={this.props.location}>
            <Header {...this.props} />
              <main className="main">
                {this.props.children}
              </main>
            <Footer />
          </PageTransition>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    lang: state.lang.lang,
    ...ownProps
  };
}

export default connect(mapStateToProps, {switchLang})(App);
