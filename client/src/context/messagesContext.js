import { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const messagesContext = createContext();

// Custom hook to use the messagesContext
export const useMessageContext = () => useContext(messagesContext);

export const MessagesProvider = ({ children }) => {
    const [status, setStatus] = useState([
        {
        loading: 'Adding your note...',
        success: 'Note added successfully!',
        error: 'Failed to add note!',
        },
        {
        loading: 'Editing your note...',
        success: 'Note edited successfully!',
        error: 'Failed to edit note!',
        }, 
        {
        loading: 'Deleting your note...',
        success: 'Note deleted successfully!',
        error: 'Failed to delete note!',
        }
    ]);
    const [loginMessages, setLoginMessages] = useState([
        { message: "Welcome back, [User]! Ready to capture your thoughts?", icon: '📝' },
        { message: "Good to see you, [User]! Let's jot down some ideas.", icon: '💡' },
        { message: "Hello again, [User]! What’s on your mind today?", icon: '✨' },
        { message: "Back at it, [User]? Your notes await!", icon: '🗒️' },
        { message: "Glad to have you, [User]! Start where you left off.", icon: '🚀' },
        {message: "welcome, [User]!", icon: '😁' },
    ]);

    const [signupMessages, setSignupMessages] = useState([
        { message: "Welcome aboard, [User]! Let's start your note-taking journey!", icon: '🌟' },
        { message: "Hello, [User]! Ready to create your first note?", icon: '✍️' },
        { message: "You're in, [User]! Capture your thoughts and make them shine.", icon: '💡' },
        { message: "Excited to have you, [User]! Begin organizing your ideas today.", icon: '🚀' },
        { message: "Welcome, [User]! Your creative journey starts now.", icon: '🎉' },
        { message: "hello, [User]!", icon: '😉' },
    ]);


    return (
    <messagesContext.Provider value={{status, loginMessages, signupMessages}}>
      {children}
    </messagesContext.Provider>
  );
}