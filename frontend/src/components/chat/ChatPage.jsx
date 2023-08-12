import React, { useState, useEffect } from 'react';
import "./ChatPage.css";
import io from "socket.io-client";
import { useUserContext } from '../context/UserContext';
import Chat from "./Chat"

const socket = io.connect("http://localhost:5000");

const ChatPage = () => {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const { actuser } = useUserContext();

    const onMessageChange = (e) => setMessage(e.target.value);

    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit('chat', message);
        setMessage("");
    };

    const handleIncomingMessage = (message) => {
        setChat(prevChat => [...prevChat, message]);
    };

    useEffect(() => {
        socket.on("chat", handleIncomingMessage);
        return () => {
            socket.off("chat", handleIncomingMessage);
        };
    }, []);


    return (
        <>
            <div className="main">
                <form action="" onSubmit={sendMessage}>
                    <div className="chat__main">
                        <div className="chat__container">
                            <div className="chat__messages">
                                <Chat chat={chat} actuser={actuser} />
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
