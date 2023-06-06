import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router';
import moment from "moment";

export const GetOrder = () => {
    
    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("user")===null){
            navigate("/login")            
        }
        else{
            getOrders();
        }
    },[navigate]
    )

    const getOrders = async () => {
        try{
            const config = {
                headers:{
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
                }}
            const {data} = await axios.get(`http://127.0.0.1:5000/api/assignment/v1/get-order?user_id=${JSON.parse(localStorage.getItem("user"))._id}`, config);
            if (data) {
                setOrders(data.orders)
            }
        }
        catch(err){
            alert(err.response.data.message)
        }
    }

    return (
        <>
            <div className="border d-flex mx-auto py-2 px-3 mx-3 my-2 w-50" style={{ alignItems:"center", justifyContent: "space-between"}}>
                <div><strong>Order Id</strong></div>
                <div><strong>Sub Total</strong></div>
                <div><strong>Created At</strong></div>
            </div>
            {orders && orders.length===0 && <h5 className='mx-auto w-50'>No orders as of now</h5>}
            {orders && orders.length>0 && orders.map((each,index) => (
                <div className="border d-flex mx-auto py-2 px-3 mx-3 my-2 w-50" style={{ alignItems:"center", justifyContent: "space-between"}} key={index}>
                    <div>{each._id.slice(0,9)}</div>
                    <div>{String.fromCharCode(8377) + each.sub_total}</div>
                    <div>{moment(each.createdAt).format("DD-MM-YYYY")}</div>
                </div>
            ))} 
        </>
    )
}
