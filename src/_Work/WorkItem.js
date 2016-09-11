import { Component } from 'react';
import { Link } from 'react-router';

export default class MemoList extends Component {
  constructor(props) {
    super(props);
  }

  getItemBg() {
    const { item } = this.props;
    let thumbnailUrl = item.better_featured_image;

    const getFeaturedImage = thumbnailUrl => `url(${thumbnailUrl})`;

    const getRandomGradientBg = () => {
      const opacity = .5;
      const color1  = `rgba(${(Math.floor(Math.random() * 256))}, ${(Math.floor(Math.random() * 256))}, ${(Math.floor(Math.random() * 256))}, ${opacity})`;
      const color2  = `rgba(${(Math.floor(Math.random() * 256))}, ${(Math.floor(Math.random() * 256))}, ${(Math.floor(Math.random() * 256))}, ${opacity})`;

      return `linear-gradient(to left, ${color1}, ${color2})`;
    }

    if (thumbnailUrl) {
      if (thumbnailUrl.media_details.sizes.medium_large !== undefined) {
        thumbnailUrl = thumbnailUrl.media_details.sizes.medium_large.source_url;
      } else {
        thumbnailUrl = thumbnailUrl.source_url;
      }
      return getFeaturedImage(thumbnailUrl);
    } else {
      return getRandomGradientBg();
    }
  }

  render() {
    const { item } = this.props;

    return (
      <div className="[ layout__item ] [ lap-and-up-one-third--square palm-one-half mobile-one-whole ]">
        <Link to={`/works/${item.slug}`}>
          <article className="post" style={{backgroundImage: this.getItemBg()}}>
            <h1 className="post__title">{item.title.rendered}</h1>
            <span className="post__overlay"></span>
          </article>
        </Link>
      </div>
    )
  }
}
