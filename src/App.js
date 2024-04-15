import "./style.css";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";

function App() {
  // This is the list of teams used to filter posts and also tag a post to a specifoc team
  const teams = [
    "Arsenal",
    "Liverpool",
    "Manchester United",
    "Manchester City",
    "Shelbourne",
    "Leeds",
    "Celtic",
    "Bohemians",
    "Other",
  ];

  // Used to show remaining character count for a post
  const [remainingCharacterCount, setRemainingCharacterCount] = useState(200);
  // This is used to build the filters for posts by team
  const [selectedTeams, setSelectedTeams] = useState({});
  // This variable is used to display all the posts that have been loaded from the database
  const [posts, setPosts] = useState([]);
  // This variable is used to create a new post
  const [newPost, setNewPost] = useState({ title: "", source: "", team: "" });
  // Extrating fields from new post for ease of use
  const { title, source, team } = newPost;

  // This function will be called when the page loads and this is when posts are fetched from the database
  // This is also triggered when a user clicks a team filter so that we can filter by team
  useEffect(() => {
    fetchPosts();
  }, [selectedTeams]);

  // Method used to fetch posts that are in the database
  async function fetchPosts() {
    // Getting teams to filter by
    const selectedTeamsToFilter = Object.keys(selectedTeams).filter((team) => {
      return selectedTeams[team] === true;
    });

    // If there is any teams to filter by we add to the query going to the database, otherwise we fetch all
    const { data, errors } =
      selectedTeamsToFilter.length > 0
        ? await supabase
            .from("posts")
            .select("*")
            .in("team", selectedTeamsToFilter)
        : await supabase.from("posts").select("*");
    console.log("posts", data);
    // Here we are setting the posts variable with the data that is retrieved from the database
    setPosts(data);
  }

  // This method will be called when a user clicks "Post" button which submits form
  // It is asynchronous as it is making a database call
  async function createPost() {
    console.log("newPost", newPost);
  // Here we are calling the insert method to create a new record in our database in supabase and are using the values from the newPost object
    const { data } = await supabase
      .from("posts")
      .insert([{ title: title, source: source, num_likes: 0, team: team }])
      .single();
  }
  
  return (
    <>
      <header className="header">
        <div className="logo">
          <img src="logo.png" height="90" width="180" alt="GaelGoal Logo" />
        </div>
      </header>

    {/*This component renders the form to create a new post.   */}
      <NewPostForm
        // This is the method to be called when a user hits submit. This will result in a call being made to the database
        onPost={createPost}
        // This method is used to update the new post object in this react component. The new post object will be updated everytime a user types in the title or source input field. Once a user submits their post, the new post object gets set back to its initial empty state 
        setNewPost={setNewPost}
        // This is the object representing the new post to be created 
        post={newPost}
        // This is a list of teams that are used to categorise the posts 
        teams={teams}
        // The below are used to calculate the remaining character count available for posts 
        remainingCharacterCount={remainingCharacterCount}
        setRemainingCharacterCount={setRemainingCharacterCount}
      />

      <main class="main">
        {/* This component renders the list of teams to be filter posts by */}
        <TeamsFilter 
          // Below is the list of teams to filter by
          teams={teams} 
          // Below is the list of currently selected teams and the method to update the selected teams for filtering
          selectedTeams={selectedTeams} 
          setSelectedTeams={setSelectedTeams} />

        {/* This component renders the list of posts retrieved from the database */}
        <PostList 
        // Below is the list of posts to render 
        posts={posts} />
      </main>
    </>
  );
}


function NewPostForm({
  onPost,
  setNewPost,
  post,
  teams,
  remainingCharacterCount,
  setRemainingCharacterCount,
}) {
  console.log("Post", post);
  return (
    <form className="fact-form" onSubmit={onPost}>
      <input
        type="text"
        placeholder="What is your update?"
        value={post.title}
        // The onChange method is triggered whenever a user types in the input form for the title 
        onChange={(e) => {
          // We are setting the value of the post title to the latest value from the onChange event 
          setNewPost({ ...post, title: e.target.value });
          // We are also updating the remaining character count by subtracting the new length of the title from 200 
          setRemainingCharacterCount(200 - e.target.value.length);
        }}
      />
      <span>{remainingCharacterCount}</span>
      <input
        type="text"
        placeholder="Fact source URL"
        // The onChange method is triggered whenever a user types in the input form for the source
        // We are setting the value of the post source (URL) to the latest value from the onChange event 
        onChange={(e) => setNewPost({ ...post, source: e.target.value })}
      />
      <select
        value={post.team}
        // The onChange method is triggered whenever a user selects a team from the dropdown 
        // We are setting the value of the post team to the latest value from the onChange event 
        onChange={(e) => setNewPost({ ...post, team: e.target.value })}
      >
        {/* For each team in the list passed to this component we create a option in the dropdown list for the user to select */}
        {teams.map((team) => (
          <option value={team}>{team}</option>
        ))}
      </select>

      <button
        className="post"
        type={"submit"}
        // We disable the post button if the user has an empty title or source, or has not selected a team 
        disabled={post.title === "" || post.source === "" || post.team === ""}
      >
        Post
      </button>
    </form>
  );
}

function TeamsFilter({teams, selectedTeams, setSelectedTeams}) {
  return <aside>
    {
      teams.map(
        team =>
                <TeamFilter 
                teamName={team}
                // This variable represents whether or not a team is currently selected for filtering. We will highlight the team if this is the case so the user is aware of what is selected. 
                isSelected={selectedTeams[team] === true}
                selectedTeams={selectedTeams}
                setSelectedTeams={setSelectedTeams}
                />
      )
    }
    </aside>
}

function TeamFilter({teamName, isSelected, selectedTeams, setSelectedTeams}){
  return (
    <li className="team">
    <button 
      className="btn"
      // Here only if the team is selected we add a border around the team filter button to signify that it is already selected
      style={{backgroundColor: '#ffffff', border: isSelected ? '3px solid green': ''}}
      onClick={() => setSelectedTeams({...selectedTeams, [teamName]: !isSelected})}
      >
      {teamName}
      </button>
    </li>
  )
}

function PostList({ posts }) {
  return <section>
      <ul>
        {posts.map(post => <Post title={post.title} source={post.source} numLikes={post.numLikes} team={post.team} /> )}
      </ul>
    </section>;
}

function Post({ title, source, numLikes, team }) {
  return (
    <li className="update">
      <p>
        {title}
        <a className="source" href={source} target="_blank">
          (Source)
        </a>
      </p>
      <span className="tag" style={{ backgroundColor: "#ddad6f" }}>
        {team}
      </span>
      <div className="vote-buttons">
        <button>👍</button>
      </div>
    </li>
  );
}

export default App;
