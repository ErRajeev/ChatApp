import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from "../context/UserContext"
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");


const Login = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { setActuser } = useUserContext();


    const setUserHandler = (e) => { setUser(e.target.value); };
    const setPasswordHandle = (e) => { setPassword(e.target.value) }
    const navigate = useNavigate();

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        const addUser = { user, password }
        if (user.trim() === "") {
            setError("Username cannot be empty.");
            return;
        }
        const response = await fetch('http://127.0.0.1:5000', {
            method: "POST",
            body: JSON.stringify(addUser),
            headers: {
                "Content-Type": "application/json",
            },
        })
        const result = await response.json()
        if (!response.ok) {
            setTimeout(() => {
                setError("")
            }, 2000);
            setError(result.error)
        } else {
            setActuser(user)
            socket.emit('newUser', user);
            setUser("");
            setPassword("");
            setSuccess(`Welcome, ${user}!`);
            setTimeout(() => {
                setSuccess("")
                navigate('/chatpage')
            }, 2000);
        }
    };

    return (
        <>
            <h2>Login</h2>
            <div className="container mt-5 p-5 m-auto">
                {success && <div className="alert alert-success text-center" role="alert">{success}</div>}
                {error && <div className="alert alert-danger text-center">{error}</div>}
                <form onSubmit={formSubmitHandler}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">User Name</label>
                        <input type="text" className="form-control" value={user} onChange={setUserHandler} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" value={password} onChange={setPasswordHandle} />
                    </div>
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div >
        </>
    );
};

export default Login;
