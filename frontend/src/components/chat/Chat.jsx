import React from 'react'
import "./Chat.css"

function Chat(props) {
    const { chat = [], actuser } = props
    console.log(actuser);
    return (
        <>
            <div className="message-right">
                {chat.map((msg, index) => (
                    <div key={index}>
                        <h6>{actuser}</h6>
                        <p>{msg}</p>
                    </div>
                ))}
            </div>
            <div className="message-left">
                {chat.map((msg, index) => (
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