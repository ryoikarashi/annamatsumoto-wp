import { Component } from 'react';
import { findDOMNode } from 'react-dom';
import ReactTransitionGroup from 'react-addons-transition-group';
import { TweenMax } from 'gsap';
import uuid from 'node-uuid';

export default class PageTransition extends Component {

  constructor(props) {
    super(props);
    this.state = {mounted: false}
    this.transitionEnter  = true;
    this.transitionLeave  = true;
    this.transitionAppear = true;
  }

  componentDidMount() {
      this.setState({ mounted: true });
  }

  render() {

    let children;

    if (!this.props.transitionAppear){
      children = this.props.children;
    } else{
      if(this.state.mounted){
        children = this.props.children;
      }
    }

    return (
      <ReactTransitionGroup>
        <PageTransitionAnimation key={uuid.v4()} children={children} />
      </ReactTransitionGroup>
    );
  }
}

class PageTransitionAnimation extends Component {

  componentWillEnter (callback) {
    const el = findDOMNode(this);
    TweenMax.fromTo(el, 1, {x: 100, opacity: 0}, {x: 0, opacity: 1, onComplete: callback});
  }

  componentWillLeave (callback) {
    const el = findDOMNode(this);
    TweenMax.fromTo(el, 1, {x: 0, opacity: 1}, {x: -100, opacity: 0, onComplete: callback});
  }

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    )
  }
}
