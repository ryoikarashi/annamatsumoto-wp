import { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {
  render() {

    const { location: {pathname}, params: {lang} } = this.props;
    let purePathname = lang ? pathname.replace(`/${lang}`, '') : pathname;

    return (
      <div>        <header className="header">
          <Link className="header__title" to="/">
            <h1 className="header__title__text header__title__text--en"><span>Anna Matsumoto</span></h1>
            <h2 className="header__title__text header__title__text--ja"><span>松本 杏菜</span></h2>
          </Link>
          <nav className="header__nav">
            <ul>
              <li className="header__nav__item"><Link to="/me" activeClassName="active">ME</Link></li>
              <li className="header__nav__item"><Link to="/works" activeClassName="active">WORKS</Link></li>
                <div>
                  <ul>
                    <li><Link to={purePathname}  activeClassName="active">JP</Link></li>
                    <li>/</li>
                    <li><Link to={`/en/${purePathname}`} activeClassName="active">EN</Link></li>
                  </ul>
                </div>
            </ul>
          </nav>
        </header>
      </div>
    )
  }
}

export default Header;
