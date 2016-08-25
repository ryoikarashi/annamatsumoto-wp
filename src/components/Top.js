import { Component } from 'react';

class Top extends Component {

  randomBgImage() {

    let path = 'http://wocker.dev/wp-content/uploads/2016/02/2013.1.1014.jpeg';

    const add = () => {
      document.body.style.backgroundImage = `url(${path})`;
    };

    const remove = () => {
       document.body.style.backgroundImage = '';
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
      <div></div>
    )
  }
}

export default Top;
