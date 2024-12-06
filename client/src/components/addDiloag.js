import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Chip, Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import './styles/dialog.css';
function DraggableDialog({ open, onClose, onAddCard }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

const handleAddTag = () => {
  const formattedTag = ` #${tagInput.trim()}`; // Add a space before "#"
  if (tagInput.trim() !== '' && !tags.includes(formattedTag)) {
    setTags([...tags, formattedTag]); // Add only if it doesn't already exist
    setTagInput(''); // Clear input field after adding the tag
  }
};

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleSubmit = () => {

    if (title && content) {
      const date = new Date().toLocaleDateString('EN-EG');
      // const date = new Date().toLocaleDateString('ar-EG');
      onAddCard({ title, content, date ,tags});
      setTitle('');
      setContent('');
      setTags([]); // Clear tags after adding the car
      onClose(); // Close the dialog after adding the card
    }
  };


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className="dialog_content">
         <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <div className='title_input'>Title</div>
        <input
          type="text"
          placeholder="Enter your title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input_title"
        />
        <div className='title_content'>Content</div>
        <textarea
          rows={5}
          cols={50}
          placeholder="Enter your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="input_content"
        ></textarea>
        <Box display="flex" alignItems="center" gap={1} style={{ marginBottom: '15px' }}>
          <TextField
            label="Tag"
            variant="outlined"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            size="small"
          />
          <IconButton onClick={handleAddTag} color="primary" size="large">
            <AddIcon />
          </IconButton>
        </Box>
        <Box display="flex" flexWrap="wrap" gap={1}>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => handleDeleteTag(tag)}
              color="primary"
            />
          ))}
        </Box>
      </DialogContent>
   <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          add
        </Button>
      </DialogActions>

    </Dialog>
  );
}

export default DraggableDialog;
