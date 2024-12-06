import React from 'react';
import './styles/emptycard.css';
import DescriptionIcon from '@mui/icons-material/Description';
function EmptyCard() {
  return (
    <div className="container_emptyCard">
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="empty_card_icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 9.75h4.5m-4.5 3h4.5m-8.25 7.5h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
        />
      </svg> */}
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
