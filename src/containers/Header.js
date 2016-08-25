import { Component } from 'react';
import { connect } from 'react-redux';
import QueryFilter from './QueryFilter';
import { loadPosts, loadCategories, loadTags } from '../actions';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <QueryFilter {...this.props} />
      </header>
    )
  }
}

function mapStateToProps(state) {

  const {
    entities: { tags, categories }
  } = state;

  return { tags, categories };
}

export default connect(mapStateToProps, { loadPosts, loadCategories, loadTags })(Header);
