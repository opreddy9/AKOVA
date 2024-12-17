import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Nav2 from './Nav2';
import { useNavigate } from 'react-router-dom';
const Entrepreneurprofile=()=>{
    const navigate=useNavigate()
    const [profile,setprofile]=useState([]);
    useEffect(()=>{
        const fetchIdeas = async () => {
            try {
              const headers = {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token"),
              };
              let ideasList = await axios.get(
                `http://localhost:5000/api/idea/Entrepreneurprofile`,
                {
                  headers: headers,
                }
              );
              if (ideasList!==null && ideasList!==undefined && ideasList.data!==null && ideasList!==undefined) {
                setprofile(ideasList.data);
            } else {
                // Handle the case where ideasList or ideasList.data is undefined
                setprofile([]);
            }
            } catch (err) {
              navigate("/Entrepreneur_dashboard");
            }
        };fetchIdeas()
    },[navigate]);
    return(
        <>
            <Nav2/>
            <div class="container mt-5 p-5 d-flex flex-column align-items-center justify-content-center">
                <h2 class="text-center display-4 mb-4">Investment Profile Summary</h2>
                <div class="card card-in rounded-lg shadow border-0">
                    <div class="card-body row g-4">
                        <div class="col-md-4 text-center">
                            <p class="card-text  display-4 fw-bold mb-1">{profile.TotalInvestmentsAsked}</p>
                            <p class="card-text text-muted">Total Investments Asked</p>
                        </div>
                        <div class="col-md-4 text-center">
                            <p class="card-text display-4 fw-bold mb-1">{profile.TotalInvestmentsAccepted}</p>
                            <p class="card-text text-muted">Total Investments Accepted</p>
                        </div>
                        <div class="col-md-4 text-center">
                            <p class="card-text display-4 fw-bold mb-1">{profile.TotalInvestmentsInDueDiligence}</p>
                            <p class="card-text text-muted">Total Investments In Due Diligence</p>
                        </div>
                        <div class="col-md-4 text-center">
                            <p class="card-text display-4 fw-bold mb-1">&#8377; {profile.TotalInvestmentAmount}</p>
                            <p class="card-text text-muted">Total Investment Amount</p>
                        </div>
                        <div class="col-md-4 text-center">
                            <p class="card-text display-4 fw-bold mb-1">&#8377; {profile.TotalInvestmentAmountReceived}</p>
                            <p class="card-text text-muted">Total Investment Amount Received</p>
                        </div>
                        <div class="col-md-4 text-center">
                            <p class="card-text display-4 fw-bold mb-1">{profile.TotalInvestmentsPending}</p>
                            <p class="card-text text-muted">Total Investments Pending</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Entrepreneurprofile;