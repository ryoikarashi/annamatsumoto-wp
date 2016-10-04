import { Component } from 'react';
import { Link } from 'react-router';
import cn from 'classnames';

class Header extends Component {
  render() {

    const { location: {pathname}, params: {lang} } = this.props;
    let langRoute = lang ? `/${lang}` : '';

    return (
      <header className="header">
        <Link className="header__title" to={langRoute}>
          <h1 className="header__title__text header__title__text--en"><span>Anna Matsumoto</span></h1>
          <h2 className="header__title__text header__title__text--ja"><span>松本 杏菜</span></h2>
        </Link>
        <nav className="header__nav">
          <ul>
            <li className="header__nav__item"><Link to={`${langRoute}/me`} activeClassName="active">ME</Link></li>
            <li className="header__nav__item"><Link to={`${langRoute}/works`} activeClassName="active">WORKS</Link></li>
            <li className="header__nav__item"><Link to={`${langRoute}/notes`} activeClassName="active">NOTES</Link></li>
          </ul>
        </nav>
        <div className="header__lang">
          <ul>
            <li className="header__lang__item"><Link to={pathname.replace(langRoute, '')} className={cn({active: typeof lang === 'undefined'})}>JP</Link></li>
            <li className="header__lang__item"><Link to={pathname.replace(langRoute, '/en')} className={cn({active: lang === 'en'})}>EN</Link></li>
          </ul>
        </div>
      </header>
    )
  }
}

export default Header;
