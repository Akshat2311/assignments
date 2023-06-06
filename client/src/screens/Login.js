import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router'

export const Login = () => {

    const [pno, setPno] = useState("")
    const [pass, setPass] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem("user")!==null){
            navigate("/orders")            
        }
    },[navigate])

    const login = async(e) => {
        e.preventDefault()
        try{
            const config = {
                headers:{
                    "Content-Type": "application/json"
                }
            }
            const { data } = await axios.post("http://127.0.0.1:5000/api/assignment/v1/login-user",{phone_number:pno, password:pass},config)
            if(data){
                localStorage.setItem("user",JSON.stringify(data))
                navigate("/orders")
            }
        }
        catch(err){
            alert(err.response.data.message)
        }
    }

    return (
        <form className='card p-3 m-5 mx-auto w-50'>
            <h4>Login</h4>
            <br/>
            <label>Phone Number</label>
            <input type="text" value={pno} onChange={e => setPno(e.target.value)} maxLength="10" minLength="10" required />
            <br/>
            <label>Password</label>
            <input type="password" required value={pass} onChange={e => setPass(e.target.value)} />
            <br/>
            <a href="/register"><small>If new, register here.</small></a>
            <br/>
            <input type="submit" value="Login" onClick={login}/>
        </form>
    )
}
