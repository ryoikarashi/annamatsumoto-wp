import { Component } from 'react';
import 'date-utils';
import cn from 'classnames';

export default class Footer extends Component {
  render() {

    const dt = new Date();
    const year = dt.toFormat('YYYY');

    const { location: {pathname}, params: {lang} } = this.props;

    return (
      <footer className={cn({
          top: pathname === '/' || pathname === `/${lang}` || pathname === `/${lang}/`,
          'page-micro': true,
          'footer': true
      })}>
        <small className="page-micro__copy">
          <span>{year} &copy; All Rights Reserved.</span>
        </small>
      </footer>
    );
  }
}
