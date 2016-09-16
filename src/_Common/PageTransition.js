import { Component } from 'react';
import { RouteTransition } from 'react-router-transition';

export default class PageTransition extends Component {
  render() {
    return (
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
          {this.props.children}
        </RouteTransition>
    );
  }
}
