import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Nav3 from './Nav3';
import { useNavigate } from 'react-router-dom';
const InvestorProfile=()=>{
    const navigate=useNavigate();
    useEffect(()=>{
        const fetchData= async ()=>{
            try {
                let data=await axios.get(`http://localhost:5000/api/invest/investoraccepted`,{
                    headers:{
                        'x-auth-token':localStorage.getItem('token'),
                    }
                })
                console.log(data);
            } catch (err) {
                navigate('/investor_dashboard');
            }
        };fetchData()
    },[navigate]);
    return(
        <Nav3/>
    )
}
export default InvestorProfile;