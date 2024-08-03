import AddPostView from "./features/posts/AddPostView";
import PostsView from "./features/posts/postsView";

const App = () => {
  return (
    <main className="App">
      <AddPostView />
      <PostsView />
    </main>
  );
}

export default App;
