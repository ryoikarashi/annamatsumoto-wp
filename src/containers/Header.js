import { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <Link className="header__title" to="/">
          <h1 className="header__title--en"><span>Anna Matsumoto</span></h1>
          <h2 className="header__title--ja"><span>松本 杏菜</span></h2>
        </Link>
        <nav className="header__nav">
          <ul>
            <li className="header__nav__item"><Link to="/me" activeClassName="active">ME</Link></li>
            <li className="header__nav__item"><Link to="/works" activeClassName="active">WORKS</Link></li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header;
