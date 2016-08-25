import { Component } from 'react';
import { connect } from 'react-redux';

class Me extends Component {
  render() {

    console.log(this.props);

    return (
      <section className="">

        {/* Basic Info */}
        <article className="" dangerouslySetInnerHTML={{_html: this.props.acf.basic}} />

        {/* Education */}
        {this.props.acf.education.length
          ?
            <article className="">
              <ul>
                { this.props.acf.education.map(item => <li><span>{item.date}</span>{item.content}</li>) }
              </ul>
            </article>
          : ''
        }

        {/* History */}
        {this.props.acf.history.length
          ?
            <article className="">
              <ul>
                { this.props.acf.history.map(item => <li>{item.content}</li>) }
              </ul>
            </article>
          : ''
        }
      </section>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...state,
    ...ownProps
  };
}

export default connect(mapStateToProps)(Me);
