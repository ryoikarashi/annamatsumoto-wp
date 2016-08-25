const Loading = ({isFetching}) => (
  <section className="loading [ layout__item ]">
    <div className="container">
      <div className="inner">
        {
          isFetching
            ? <h2 className="loading__title">Loading...</h2>
            : <h2 className="loading__title">Sorry, no posts found... :(</h2>
        }
      </div>
    </div>
  </section>
);

export default Loading;
