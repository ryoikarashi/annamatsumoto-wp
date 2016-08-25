import { Component } from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router';
// import QueryFilter from './QueryFilter';
// import { loadPosts, loadCategories, loadTags } from '../actions';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1 className="header__title">
          <Link to="/">
            <span className="header__title--capital">A</span>nna<span className="name-spacer"></span><span className="header__title--capital">M</span>atsumoto
          </Link>
        </h1>
        <nav>
          <ul>
            <li><Link to="/me">me</Link></li>
            <li><Link to="/works">works</Link></li>
          </ul>
        </nav>
        {/* <QueryFilter {...this.props} /> */}
      </header>
    )
  }
}

export default Header;

// function mapStateToProps(state) {
//
//   const {
//     entities: { tags, categories }
//   } = state;
//
//   return { tags, categories };
// }
//
// export default connect(mapStateToProps, { loadPosts, loadCategories, loadTags })(Header);
