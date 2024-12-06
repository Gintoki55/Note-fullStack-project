import { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const PostContext = createContext();

// Custom hook to use the PostContext
export const usePostContext = () => useContext(PostContext);

// Provider component
export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Add a post
  const addPost = (newPost) => {
    setPosts([...posts, { ...newPost, id: posts.length + 1 }]);
  };

  // Edit a post
  const editPost = (updatedPost) => {
    setPosts(posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
  };

  // Delete a post
   const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id)); // Ensure you're filtering by id
  };

    // Filter posts
  const filterPosts = (query) => {
    setFilteredPosts(() =>
      query
        ? posts.filter((post) =>
            post.title.toLowerCase().includes(query.toLowerCase())
          )
        : posts
    );
  };

  // Sync filtered posts with all posts
  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);


  return (
    <PostContext.Provider value={{ posts,setPosts, addPost, editPost, deletePost,filteredPosts,filterPosts }}>
      {children}
    </PostContext.Provider>
  );
};
