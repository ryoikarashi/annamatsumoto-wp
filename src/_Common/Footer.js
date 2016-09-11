import { Component } from 'react';
import 'date-utils';

export default class Footer extends Component {
  render() {

    const dt = new Date();
    const year = dt.toFormat('YYYY');

    return (
      <footer className="[ page-micro ] footer">
        <small className="page-micro__copy">
          <span>{year} &copy; All Rights Reserved.</span>
        </small>
      </footer>
    );
  }
}
