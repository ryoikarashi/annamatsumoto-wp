import { Component } from 'react';
import { RouteTransition } from 'react-router-transition';
import Helmet from 'react-helmet';

import Header from '../_Common/Header';
import Footer from '../_Common/Footer';

export default class App extends Component {
  render() {
    return (
      <div>
        <Helmet title="ANNA MATSUMOTO" />
          <RouteTransition
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
            <Header />
              <main className="main">
                {this.props.children}
              </main>
            <Footer />
          </RouteTransition>
      </div>
    );
  }
}
