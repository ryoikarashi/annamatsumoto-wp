import { Component } from 'react';
import { connect } from 'react-redux';
import WorkItem from './WorkItem';
import Loading from '../_Common/Loading';
import { loadWorks } from './actions';
import Pagination from '../_Paginate/Paginate';
import WorkFilter from './WorkFilter';
// import { loadCategories, loadTags } from '../taxonomy/actions';
import PageTransition from '../_Common/PageTransition';

class MemoList extends Component {

  loadWorks() {
    const { filter, loadWorks, params, tags } = this.props;
    const { lang } = params;
    const newParams = Object.assign({}, params, {tag: tags[params.tag] ? tags[params.tag].id : params.tag ? -1 : '' });
    loadWorks(filter, newParams, lang);
  }

  componentWillMount() {
    this.loadWorks();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filter !== this.props.filter) {
      this.props.loadWorks(nextProps.filter, nextProps.params, nextProps.params.lang);
    }
  }

  render() {
    const {
      location,
      allWorks,
      nextPageUrl,
      worksPagination: { isFetching },
      lang
    } = this.props;

    return (
      <div>
        <WorkFilter {...this.props} />
        {
          allWorks.length
            ?
              <div>
                <div className="[ band--small ]">
                  <div className="[ wrapper ]">
                    {
                      !allWorks.length
                        ? <Loading isFetching={isFetching} />
                        : <PageTransition location={location}>
                            <div className="[ layout layout--tiny ]">
                              { allWorks.map(item => <WorkItem key={item.id} item={item} lang={lang} />) }
                            </div>
                          </PageTransition>
                    }
                  </div>
                </div>
                {nextPageUrl
                  ? <div className="[ band ]">
                      <div className="wrapper">
                        <Pagination {...this.props} />
                      </div>
                    </div>
                  : ''
                }
              </div>
            :
              <Loading isFetching={isFetching} />
        }
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...state,
    ...ownProps
  }
}

export default connect(mapStateToProps, { loadWorks })(MemoList);
