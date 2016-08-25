import { Component } from 'react';

export default class NotFound extends Component {
  render() {
    return (
      <section className="not-found">
        <div className="container">
          <div className="inner">
            <div className="not-found__desc">
              <p>Sorry... The page you requested is not found :(</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
