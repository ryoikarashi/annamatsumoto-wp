import { Component } from 'react';
import { Link } from 'react-router';

export default class MemoList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item } = this.props;
    return (
      <div className="[ layout__item ] [ desk-one-fifth--square lap-and-up-one-third--square palm-one-half mobile-one-whole ]">
        <Link to={`/posts/${item.slug}`}>
          <article className="post">
            <h1 className="post__title">{item.title.rendered}</h1>
          </article>
        </Link>
      </div>
    )
  }
}
