const Loading = ({isFetching, noContent = false}) => (
  <section className="loading [ layout__item ]">
    <div className="container">
      <div className="inner">
        {
          isFetching
            ? <div>
                <div className="loading__dot" />
                <div className="loading__dot" />
                <div className="loading__dot" />
              </div>
            : noContent
                ? <h2 className="loading__title">Not Found :(</h2>
                : <h2 className="loading__title">Sorry, no posts found... :(</h2>
        }
      </div>
    </div>
  </section>
);

export default Loading;
