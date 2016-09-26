import { Component } from 'react';
import { titles } from '../data';
import {
  ShareButtons,
  generateShareIcon
} from 'react-share';

const {
  FacebookShareButton,
  TwitterShareButton
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon  = generateShareIcon('twitter');

export default class Share extends Component {
  render() {

    const { pathname, title } = this.props;
    console.log(pathname)
    // const shareUrl = `${location.origin}${pathname}`;
    const shareUrl = 'http://annamatsumoto.com' + pathname;
    const shareTitle = title + titles.appender;

    return (
      <div className="share__container">
        <div className="share__item">
          <FacebookShareButton
            url={shareUrl}
            title={shareTitle}
            className="share__item__button">
            <FacebookIcon
              size={32}
              round />
          </FacebookShareButton>
        </div>

        <div className="share__item">
          <TwitterShareButton
            url={shareUrl}
            title={shareTitle}
            className="share__item__button">
            <TwitterIcon
              size={32}
              round />
          </TwitterShareButton>

        </div>
      </div>
    );
  }
}
