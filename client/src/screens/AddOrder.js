import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router'

export const AddOrder = () => {

    const [sub, setSub] = useState(0)
    const [pno, setPno] = useState(JSON.parse(localStorage.getItem("user")).phone_number)

    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem("user")===null){
            navigate("/login")            
        }
    },[navigate])

    const addOrder = async(e) => {
        e.preventDefault()
        if(sub===0) alert("sub total cannot be 0!")
        else{

            try{
                const config = {
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
                    }
                }
                const { data } = await axios.post("http://127.0.0.1:5000/api/assignment/v1/add-order",{phone_number:pno, sub_total:sub},config)
                if(data){
                    alert(data.message)
                    navigate("/orders")
                }
            }
            catch(err){
                alert(err.response.data.message)
            }
        }
    }

    return (
        <form className='card p-3 m-5 mx-auto w-50'>
            <h4>Add Order</h4>
            <br/>
            <label>Phone Number</label>
            <input type="text" value={pno} onChange={e => setPno(e.target.value)} maxLength="10" minLength="10" required />
            <br/>
            <label>Sub Total</label>
            <input type="number" required value={sub} onChange={e => setSub(e.target.value)} />
            <br/>
            <input type="submit" value={"Add Order"} onClick={addOrder}/>
        </form>
    )
}
