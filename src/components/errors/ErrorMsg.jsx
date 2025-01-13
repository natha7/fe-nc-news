export default function ErrorMsg(props) {
  const { errorToDisplay, isPageNotFound } = props;

  if (errorToDisplay) {
    if (
      errorToDisplay.code === "ERR_NETWORK" ||
      errorToDisplay.code === "ECONNABORTED"
    ) {
      return (
        <div className="flex flex-col m-auto w-fit items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="36"
            width="36"
            viewBox="0 0 512 512"
          >
            <path
              fill="#ff9b3d"
              d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
            />
          </svg>
          <h2>
            503 -{" "}
            {errorToDisplay.message[0].toUpperCase() +
              errorToDisplay.message.slice(1)}
          </h2>
          <p>
            The service is currently not responsive. Please try again later.
          </p>
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="36"
        width="36"
        viewBox="0 0 512 512"
      >
        <path
          fill="#ff9b3d"
          d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
        />
      </svg>
      {isPageNotFound ? (
        <>
          <h2>404 - Page not found</h2>
        </>
      ) : (
        <>
          <h2>
            {errorToDisplay.status} - {errorToDisplay.response.data.msg}
          </h2>
        </>
      )}
      <p>
        Please check the URL or use the navigation bar to relocate to articles
      </p>
    </div>
  );
}
