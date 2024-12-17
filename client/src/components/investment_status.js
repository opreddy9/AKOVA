import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav2 from './Nav2';
const Investment_status=()=>{
    const navigate=useNavigate();
    const [investments,setInvestments]=useState([]);
    useEffect(()=>{
        const fetchIdeas = async () => {
            try {
              const headers = {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token"),
              };
              let ideasList = await axios.get(
                `http://localhost:5000/api/invest/getallinvestments/entrepreneur`,
                {
                  headers: headers,
                }
              );
              if (ideasList!==null && ideasList!==undefined && ideasList.data!==null && ideasList!==undefined) {
                // console.log(ideasList);
                setInvestments(ideasList.data);
            } else {
                // Handle the case where ideasList or ideasList.data is undefined
                setInvestments([]);
            }
            } catch (err) {
              navigate("/Entrepreneur_dashboard");
            }
        };fetchIdeas()
    })
    const getStatusBadge = (status) => {
        const badgeColors = {
          0: 'warning',
          1: 'success',
        };
        return (
          <span className={`badge bg-${badgeColors[status]}`}>
            {status === 0 ? 'Pending' : 'Accepted'}
          </span>
        );
      };
      
      const idea = (investments) => (
        <div className="investment-container row row-cols-1 row-cols-md-2 g-4 ">
          {investments.map((investment) => (
            <div key={investment.id} className="col investment-card mt-3">
              <div className="card h-100 shadow-sm rounded-3">
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">{investment.title}</h5>
                  <p className="card-text mb-3">
                    <strong>Technologies:</strong> {investment.technologies}<br />
                    <strong>Amount:</strong> {investment.amount}
                  </p>
                  <div className="d-flex align-items-center">
                    <span className="badge-lg rounded-pill ">{getStatusBadge(investment.status)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
        return (
            <div className='p-5'>
                <Nav2 />
                <div className='row m-5'>
                    {investments.length > 0 ? idea(investments) : <p>Loading investments...</p>}
                </div>
            </div>
        );
}
export default Investment_status;