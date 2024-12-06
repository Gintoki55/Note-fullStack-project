// hooks & context
import React, { useState , useEffect} from 'react';
import { usePostContext } from './context/postContext';
import { useMessageContext } from './context/messagesContext';
/// css styles
import './styles/home.css';
/// libraries 
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
// components & tools from mui
import EmptyCard from './components/emptyCard';
import Navbar from './components/navbar';
import DraggableDialog from './components/addDiloag';
import Card from './components/cards';
import AddIcon from '@mui/icons-material/Add';
import AutorenewIcon from '@mui/icons-material/Autorenew';

function Home() {
  const { posts,setPosts, addPost, editPost, deletePost, filteredPosts } = usePostContext();
  const {status, loginMessages, signupMessages} = useMessageContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [cookies, setCookie] = useCookies(['access_token']);
  const navigate = useNavigate();
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      toast('You are back online!', {
        icon: '🌐',
        style: {
          borderRadius: '10px',
          background: 'green',
          color: '#fff',
        },
      });
    };

    const handleOffline = () => {
      setIsOffline(true);
      toast('You are offline!', {
        icon: '🌐',
        style: {
          borderRadius: '10px',
          background: 'red',
          color: '#fff',
        },
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [navigate]);


   useEffect(() => {
    if (cookies.access_token) {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      const IsSign = localStorage.getItem('IsSign');
      const user = JSON.parse(localStorage.getItem('user'));
      const userName = user.user.name || 'User';


      if (isLoggedIn) {
        const { message, icon } = loginMessages[Math.floor(Math.random() * loginMessages.length)];
        toast(message.replace('[User]', userName),{
          icon,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        localStorage.removeItem('isLoggedIn'); 
      }

      if(IsSign){
        const {message, icon} = signupMessages[Math.floor(Math.random() * signupMessages.length)];
        toast(message.replace('[User]', userName), {
          icon,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        localStorage.removeItem('IsSign');
      }

    }
    } ,[cookies.access_token, navigate,loginMessages, signupMessages]);

  // Handle opening the add dialog
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  // Handle closing the add dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle fetch  a posts 
      const fetchPosts = async () =>{
      try{
        const response = await axios.get('http://localhost:3001/my-note', {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        });
        const notes = await response.data;
        console.log('Fetched Notes:', notes);
        setPosts(notes);
      } catch(error){
        console.error('Error fetching notes:', error);
      }
    }

    useEffect(()=>{
      fetchPosts()
    },[cookies.access_token])

  // Handle adding a new card
const handleAddCard = (newCard) => {
  if (!isOffline){
    const addNotePromise = axios.post('http://localhost:3001/add-note', newCard, {
    headers: {
      Authorization: `Bearer ${cookies.access_token}`,
    },
    });

  toast.promise(addNotePromise, status[0]);

  addNotePromise
    .then((response) => {
      console.log(response);
      addPost(newCard); // Add the new post to the context
      fetchPosts()
    })
    .catch((error) => {
      console.error('Error adding note:', error);
    })
    .finally(() => {
      handleCloseDialog(); // Close the dialog
    });
  }
  
};


  // Handle editing a card
  const handleEditCard = (updatedCard) => {
   if (!isOffline){
      const updateNotePromise = axios.put(`http://localhost:3001/update-note/${updatedCard.id}`, updatedCard, {
      headers: {
        Authorization: `Bearer ${cookies.access_token}`,
      },
    })
      toast.promise(updateNotePromise, status[1]);
      updateNotePromise.then(function (response) {
      console.log('Updated Note:', response);
      editPost(updatedCard); // Update the post in the context
      fetchPosts()
    })
    .catch(function (error) {
      console.log(error);
    });
   }
  };

  // Handle deleting a card
  const handleDeleteCard = (cardToDelete) => {

    if(!isOffline){
      const deleteNotePromise = axios.delete(`http://localhost:3001/delete-note/${cardToDelete.id}`, {
      headers: {
        Authorization: `Bearer ${cookies.access_token}`,
      },
    })
     toast.promise(deleteNotePromise, status[2]);
    deleteNotePromise.then(function (response) {
       console.log('Deleted Note:', response);
      deletePost(cardToDelete.id); // Delete the post from the context
      fetchPosts()
    })
    .catch(function (error) {
      console.log(error);
    });
    }
  };

  return (
    <div className="home">
      <Navbar />
      {/* Cards Container */}
      {
        isOffline? (
          <div className='isOffline' style={{
          display: isOffline? 'flex' : 'none',
          marginTop:"200px",
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection:"column",
          color: '#333',
        }}>
          <h2 className='text_offline'>You are offline! Please check your internet connection.</h2>
          <div className='AutorenewIcon'><AutorenewIcon sx={{width:"100%", height:"auto"}}/></div>
        </div>
        ): (<div className="cards_container">
          {posts.length > 0 ?filteredPosts.map((card) => (
            <Card
              key={card._id}
              id={card._id}
              title={card.title}
              date={card.createdAt}
              content={card.content}
              tags={card.tags || []}
              onEdit={handleEditCard}
              onDelete={handleDeleteCard}
              className="card"
            />
          )) 
        : <EmptyCard />
        }
      </div>)
      }
      {/* Add Icon to open the dialog */}
      <div className="add_icon" onClick={handleClickOpen}>
        <AddIcon fontSize="large" />
      </div>

      {/* Dialog for adding a new card */}
      <DraggableDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onAddCard={handleAddCard}
      />
      <Toaster position="bottom-center" />
    </div>
  );
}

export default Home;
