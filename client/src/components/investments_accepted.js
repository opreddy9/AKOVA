import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Nav3 from './Nav3';
const InvestmentsAccepted=()=>{
    const [investments,setInvestments]=useState([]);
    useEffect(()=>{
        const fetchinvestments=async ()=>{
            try {
                const headers = {
                    "Content-Type": "application/json",
                    "x-auth-token": localStorage.getItem("token"),
                };
                let investments=await axios.get(`http://localhost:5000/api/invest/investoraccepted`,{
                    headers:headers,
                });
                if(investments!==null && investments!==undefined && investments.data!==null && investments.data!==undefined){
                    setInvestments(investments.data);
                }
            } catch (err) {
                window.location.reload();
            }
        };fetchinvestments();
    },[])
    const idea = (investments) => (
        <div className="investment-container row row-cols-1 row-cols-md-2 g-4 ">
          {investments.map((investment) => (
            <div key={investment.id} className="col investment-card mt-1 p-5">
              <div className="card h-100 shadow-lg rounded-5">
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">{investment.investment.title}</h5>
                  <p className="card-text mb-3">
                    <strong>Technologies:</strong> {investment.investment.technologies}<br />
                    <strong>Amount:</strong> {investment.amount}
                    <br />
                    <strong>Domain:</strong> {investment.investment.domain}
                  </p>
                  <div className='d-flex justify-content-center'>
                    <Link to={`/investments/${investment.investment._id}`}>
                        <button className='btn btn-primary'>View Pitch</button>
                    </Link>
                  </div>
                  <div className='d-flex mt-2 justify-content-center'>
                <blockquote>
                    Connect with {investment.askedby.email}  on{' '}
                    <a href='https://youtube.com' target='_blank' rel="noreferrer">AkovaConnect</a>
                </blockquote>
              </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    return(
        <div>
            <Nav3/>
            <div className=' d-flex mt-5 p-3 justify-content-center'>
                <h3>Your Investments</h3>
            </div>
            <div className='p-3 ml-5 mr-5 mt-1'>
                {idea!==null || idea!==undefined ?idea(investments):""}
            </div>
        </div>

    )
}
export default InvestmentsAccepted;