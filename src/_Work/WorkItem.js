import { Component } from 'react';
import { Link } from 'react-router';
import Radium from 'radium';
import classnames from 'classnames';

class MemoList extends Component {
  constructor(props) {
    super(props);
    this.getItemBg = this.getItemBg.bind(this);
  }

  getItemBg() {
    const { item } = this.props;
    let thumbnailUrl = item.better_featured_image ? item.better_featured_image.source_url : '';

    const getFeaturedImage = (thumbnailUrl) => {
      const image = new Image();
      image.onload = () => {
        this.refs.post.classList.add('loaded');
      }
      image.src = thumbnailUrl;
      return `url(${thumbnailUrl})`
    };

    const getRandomGradientBg = () => {
      const opacity = .5;
      const color1  = `rgba(${(Math.floor(Math.random() * 256))}, ${(Math.floor(Math.random() * 256))}, ${(Math.floor(Math.random() * 256))}, ${opacity})`;
      const color2  = `rgba(${(Math.floor(Math.random() * 256))}, ${(Math.floor(Math.random() * 256))}, ${(Math.floor(Math.random() * 256))}, ${opacity})`;

      return `linear-gradient(to left, ${color1}, ${color2})`;
    }

    return {
      gradient: getRandomGradientBg(),
      image: getFeaturedImage(thumbnailUrl)
    };
  }

  hasThumbnail() {
    const { item } = this.props;
    let thumbnailUrl = item.better_featured_image;

    if (thumbnailUrl) return true;
    return false;
  }

  render() {
    const { lang, item } = this.props;
    const langPath = lang === 'ja' ? '/works' : `/${lang}/works`;

    return (
      <div className="[ layout__item ] [ desk-one-quarter lap-and-up-one-third--square palm-one-half mobile-one-whole ]">
        <Link to={`${langPath}/${item.slug}`}>
          <article className={classnames({'post': true, 'loaded': !this.hasThumbnail()})} ref="post" style={{backgroundImage: this.hasThumbnail() ? this.getItemBg().image : this.getItemBg().gradient}}>
            <h1 className="post__title">{item.title.rendered}</h1>
            <span className="post__overlay" style={{":hover": { background: this.getItemBg().gradient }}}
            />
          </article>
        </Link>
      </div>
    )
  }
}

export default Radium(MemoList);
