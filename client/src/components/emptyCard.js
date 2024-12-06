import React from 'react';
import './styles/emptycard.css';
import DescriptionIcon from '@mui/icons-material/Description';
function EmptyCard() {
  return (
    <div className="container_emptyCard">
      <DescriptionIcon  sx={{
        fontSize: 100,
        color: '#999',
        marginBottom: '10px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}/>
      <h1>No Notes</h1>
      <p>Start creating your first note! Click the 'Add' Button in the right bottom of the page.</p>
    </div>
  );
}

export default EmptyCard;
