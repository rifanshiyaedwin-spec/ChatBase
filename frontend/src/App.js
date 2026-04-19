import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");

  const userId = "demoUser"; // replace with login userId later!

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:5000/api/posts");
    setPosts(res.data);
  };

  const createPost = async () => {
    await axios.post("http://localhost:5000/api/posts", {
      userId,
      image,
      caption
    });
    fetchPosts();
  };

  const likePost = async (id) => {
    await axios.put(`http://localhost:5000/api/posts/like/${id}`, { userId });
    fetchPosts();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>ChatBase 📸</h1>

      <input
        placeholder="Image URL"
        onChange={(e) => setImage(e.target.value)}
      />
      <input
        placeholder="Caption"
        onChange={(e) => setCaption(e.target.value)}
      />
      <button onClick={createPost}>Post</button>

      {posts.map(post => (
        <div key={post._id} style={{ border: "1px solid #ccc", margin: 10 }}>
          <img src={post.image} alt="" width="300" />
          <p>{post.caption}</p>
          <button onClick={() => likePost(post._id)}>
            ❤️ {post.likes.length}
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;