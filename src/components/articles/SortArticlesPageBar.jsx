export default function SortArticlesPageBar(props) {
  const { setSearchParams } = props;

  function handleSortFormSubmit(event) {
    event.preventDefault();
    const sortBy = document.getElementById("sort_by").value;
    const order = document.getElementById("order").value;
    setSearchParams(`sort=${sortBy}&order=${order}`);
  }

  return (
    <form onSubmit={handleSortFormSubmit}>
      <div className="flex flex-row justify-between [&>*]:m-2 [&>*]: text-md p-1 m-1">
        <div className="flex flex-col">
          <label htmlFor="sort_by" className="mr-1 text-sm">
            Sort by
          </label>
          <select
            id="sort_by"
            className="appearance-auto rounded-md bg-gray-100"
          >
            <option value="created_at">Date</option>
            <option value="comment_count">Comments</option>
            <option value="votes">Votes</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="order" className="mr-1 text-sm">
            Order
          </label>
          <select id="order" className="appearance-auto rounded-md bg-gray-100">
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-emerald-800 text-white rounded-md px-4 h-7 self-end font-medium"
        >
          Sort
        </button>
      </div>
    </form>
  );
}
