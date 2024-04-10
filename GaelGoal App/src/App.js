import "./style.css";

function App() {
  return (
    <>
      <header className="header">
        <div className="logo">
          <img src="logo.png" height="90" width="180" alt="GaelGoal Logo" />
        </div>
      </header>

      <NewPostForm />

      <main class="main">
        <TeamFilter />
        <PostList />
      </main>
    </>
  );
}

function NewPostForm() {
  return <form>Post Form</form>;
}

function TeamFilter() {
  return (
    <aside>
      <ul>
        <li className="team">
          <button
            className="btn btn-team"
            style={{ backgroundColor: "#ffffff" }}
          >
            Arsenal
          </button>
        </li>
        <li className="team">
          <button
            className="btn btn-team"
            style={{ backgroundColor: "#ffffff" }}
          >
            Shelbourne
          </button>
        </li>
        <li className="team">
          <button
            className="btn btn-team"
            style={{ backgroundColor: "#ffffff" }}
          >
            Leeds
          </button>
        </li>
        <li className="team">
          <button
            className="btn btn-team"
            style={{ backgroundColor: "#ffffff" }}
          >
            Manchester United
          </button>
        </li>
        <li className="team">
          <button
            className="btn btn-team"
            style={{ backgroundColor: "#ffffff" }}
          >
            Celtic
          </button>
        </li>
        <li className="team">
          <button
            className="btn btn-team"
            style={{ backgroundColor: "#ffffff" }}
          >
            Liverpool
          </button>
        </li>
        <li className="team">
          <button
            className="btn btn-team"
            style={{ backgroundColor: "#ffffff" }}
          >
            Bohemians
          </button>
        </li>
      </ul>
    </aside>
  );
}

function PostList() {
  return <section>Post List</section>;
}

export default App;
