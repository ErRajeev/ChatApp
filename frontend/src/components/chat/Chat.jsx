import React from 'react'
import "./Chat.css"

function Chat(props) {
    const { chat = [], mychat = [], actuser } = props
    console.log(mychat);
    console.log(chat);
    return (
        <>
            <div className="message-right">
                {mychat?.map((msg, index) => (
                    <div key={index}>
                        <h6>{actuser}</h6>
                        <p>{msg}</p>
                    </div>
                ))}
            </div>
            <div className="message-left">
                {chat?.map((msg, index) => (
                    <div key={index}>
                        <h6>{actuser}</h6>
                        <p>{msg}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Chat