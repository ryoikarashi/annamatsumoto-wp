import { Component } from 'react';
import Helmet from 'react-helmet';
import PageTransition from '../_Common/PageTransition';
import Header from '../_Common/Header';
import Footer from '../_Common/Footer';
import { titles } from '../data';

export default class App extends Component {

  handlePageTitle(pathname, lang) {
    switch(pathname) {
      case '/':
      case `/${lang}/`:
        return titles.top;
      case '/me':
      case '/me/':
      case `/${lang}/me/`:
        return titles.me;
      case '/works':
      case '/works/':
      case `/${lang}/works/`:
        return titles.works;
      default:
        return titles.notFound;
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
