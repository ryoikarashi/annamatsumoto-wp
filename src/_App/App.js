import { Component } from 'react';
import Helmet from 'react-helmet';
import PageTransition from '../_Common/PageTransition';
import Header from '../_Common/Header';
import Footer from '../_Common/Footer';

export default class App extends Component {
  render() {
    return (
      <div>
        <Helmet title="ANNA MATSUMOTO" />
          <PageTransition location={this.props.location}>
            <Header />
              <main className="main">
                {this.props.children}
              </main>
            <Footer />
          </PageTransition>
      </div>
    );
  }
}
