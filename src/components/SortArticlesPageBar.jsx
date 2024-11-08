export default function SortArticlesPageBar(props) {
  const { setSearchParams } = props;

  function handleSortFormSubmit(event) {
    event.preventDefault();
    const sortBy = document.getElementById("sort_by").value;
    const order = document.getElementById("order").value;
    setSearchParams(`sort=${sortBy}&order=${order}`);
  }

  return (
    <div>
      <form onSubmit={handleSortFormSubmit}>
        <label htmlFor="sort_by">Sort by</label>
        <select id="sort_by">
          <option value="created_at">Date</option>
          <option value="comment_count">Comments</option>
          <option value="votes">Votes</option>
        </select>
        <label htmlFor="order">Order</label>
        <select id="order">
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
        <button type="submit">Sort</button>
      </form>
    </div>
  );
}
