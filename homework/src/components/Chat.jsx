import { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { sendMessage,fetchMessages } from "../store/ChatSlice";
import { useNavigate } from "react-router";
import { logout } from "../store/UserSlice";

const Chat = () => {
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Используем useNavigate для перенаправления
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
  
    const handleLogout = () => {
      dispatch(logout()); // Вызываем действие logout
      navigate('/login'); // Перенаправляем на страницу входа
      console.log('User logged out successfully'); // Логируем успешный выход
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
        <button onClick={handleLogout} style={{ marginTop: '10px' }}>
          Logout
        </button>
      </div>
    );
  };
  
  export default Chat;