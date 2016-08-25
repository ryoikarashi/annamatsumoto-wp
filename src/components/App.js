import { Component } from 'react';
import Helmet from 'react-helmet';
import Header from '../containers/Header';
import Footer from './Footer';

export default class App extends Component {
  render() {
    return (
      <div>
        <Helmet title="Garbage" />
        <Header />
          <main className="main">
            {this.props.children}
          </main>
        <Footer />
      </div>
    );
  }
}
