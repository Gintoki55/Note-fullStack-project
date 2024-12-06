import React, { useState, useEffect } from 'react';
import { usePostContext } from '../context/postContext'; // Import your PostContext
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {
  const { posts, filterPosts } = usePostContext(); // Access posts and filter function from context
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(''); // Store the search query

  // Simulate fetching options for autocomplete
  useEffect(() => {
    if (!query.trim()) {
      setOptions([]);
      filterPosts(''); // Show all posts when query is empty
      return;
    }

    setLoading(true);

    const timer = setTimeout(() => {
      const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase())
      );
      setOptions(filteredPosts);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer); // Cleanup debounce
  }, [query, posts, filterPosts]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  // Trigger filtering only when an option is selected
  const handleOptionSelect = (event, selectedOption) => {
    if (selectedOption) {
      filterPosts(selectedOption.title); // Filter posts by selected option
      setQuery(selectedOption.title); // Set the query to selected option
    } else {
      filterPosts(''); // Show all posts if no option is selected
    }
    setOpen(false); // Close the dropdown
  };

  return (
    <Autocomplete
      sx={{
        width: 300,
        '& .MuiAutocomplete-popupIndicator': {
          transform: 'none !important',
        },
        '& .MuiAutocomplete-popupIndicatorOpen': {
          transform: 'none !important',
        },
      }}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      getOptionLabel={(option) => option.title || ''} // Prevent errors if title is missing
      options={options}
      loading={loading}
      onChange={handleOptionSelect} // Trigger filtering on option select
      popupIcon={<SearchIcon />}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value); // Update query without filtering immediately
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      noOptionsText="No Results Found"
    />
  );
}
