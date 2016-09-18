import { Component } from 'react';
import Helmet from 'react-helmet';
import PageTransition from '../_Common/PageTransition';
import Header from '../_Common/Header';
import Footer from '../_Common/Footer';
import { titles } from '../data';

export default class App extends Component {

  handlePageTitle(pathname) {
    switch(pathname) {
      case '/':
        return titles.top;
      case '/me':
      case '/me/':
        return titles.me;
      case '/works':
      case '/works/':
        return titles.works;
      default:
        return titles.notFound;
    }
  }

  render() {

    const { pathname } = this.props.location;

    return (
      <div>
        <Helmet title={this.handlePageTitle(pathname)} />
          <Header />
            <PageTransition location={this.props.location}>
              <main className="main">
                {this.props.children}
              </main>
            </PageTransition>
          <Footer />
      </div>
    );
  }
}
