import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import "./ChatPage.css";
import { useUserContext } from '../context/UserContext';
import Chat from "./Chat"
import Navbar from '../navbar/Navbar';

import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");

const ChatPage = () => {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [mychat, setMychat] = useState([])
    const { actuser } = useUserContext();
    const navigate = useNavigate();

    const onMessageChange = (e) => setMessage(e.target.value);

    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit('mychat', message);
        setMychat(prevMychat => [...prevMychat, message]); // Append the new message to the existing array
        setMessage("");
    };

    const reciveMessage = () => {
        socket.on("mychat", (message) => {
            setChat(prevChat => [...prevChat, message]);
        });
    }



    const exitUser = () => {
        socket.emit("exitUser", actuser)
        setTimeout(() => {
            navigate("/")
        }, 1000);
    }

    useEffect(() => {
        reciveMessage()
        return () => {
            socket.off("mychat");
        };
    }, []);

    return (
        <>
            <div className="main">
                {/* <Navbar /> */}
                <button className='btn btn-dark' onClick={exitUser}>Exit</button>
                <form onSubmit={sendMessage}>
                    <div className="chat__main">
                        <div className="chat__container">
                            <div className="chat__messages">
                                <Chat chat={chat} actuser={actuser} mychat={mychat} />
                            </div>
                            <div className="input__container container">
                                <input type="text" className="input__field" placeholder="Type your message..."
                                    value={message}
                                    onChange={onMessageChange}
                                />
                                <button className="send__button">Send</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ChatPage;
