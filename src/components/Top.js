import { Component } from 'react';

class Top extends Component {

  randomBgImage() {

    let path = 'http://wocker.dev/wp-content/uploads/2016/02/2013.1.1014.jpeg';
    const topBg = document.getElementById('top-bg')

    const add = () => {
      topBg.style.backgroundImage = `url(${path})`;
    };

    const remove = () => {
       topBg.style.backgroundImage = '';
    };

    return {
      add: add,
      remove: remove
    };
  }

  componentDidMount() {
    this.randomBgImage().add();
  }

  componentWillUnmount() {
    this.randomBgImage().remove();
  }

  render() {
    return (
      <div>
        <span id="top-bg"></span>
      </div>
    )
  }
}

export default Top;
