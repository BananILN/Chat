import { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { sendMessage,fetchMessages } from "../store/ChatSlice";


const Chat = () => {
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const { messages, status } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.user);
  
    useEffect(() => {
      dispatch(fetchMessages());
    }, [dispatch]);
  
    const handleSendMessage = (e) => {
      e.preventDefault();
      if (message.trim()) {
        dispatch(sendMessage(message));
        setMessage('');
      }
    };
  
    return (
      <div>
        <h2>Global Chat</h2>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.username}: </strong>
              <span>{msg.body}</span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  };
  
  export default Chat;