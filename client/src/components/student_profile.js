import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav1 from './Nav1';
const StudentProfile=()=>{
    const navigate=useNavigate();
    const [ideas,setIdeas]=useState([]);
    useEffect(()=>{
        const fetchIdeas = async () => {
            try {
              const headers = {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token"),
              };
              let ideasList = await axios.get(
                `http://localhost:5000/api/idea/allideas`,
                {
                  headers: headers,
                }
              );
              if (ideasList && ideasList.data) {
                // console.log(ideasList.data);
                setIdeas(ideasList.data);
            } else {
                // Handle the case where ideasList or ideasList.data is undefined
                setIdeas([]);
            }
            } catch (err) {
              navigate("/student_dashboard");
            }
        };fetchIdeas()
    },[navigate]);
    const object={
        TotalAsked:0,
        TotalAccepted:0,
        TotalPending:0,
    } 
    const calculateCounts = (ideas) => {
        const counts = ideas.reduce(
          (acc, curr) => {
            acc.TotalAsked++;
            if (curr.status === 'pending') {
              acc.TotalPending++;
            } else if (curr.status === 'approved') {
              acc.TotalAccepted++;
            }
            return acc;
          },
          { ...object }
        );
        return counts;
      };
    
      const counts = calculateCounts(ideas);
      return (
        <div className='p-5'>
          <Nav1 />
          <div class="container mt-5 p-5 d-flex flex-column align-items-center justify-content-center">
                <h2 class="text-center display-4 mb-4">Student Profile Summary</h2>
                <div class="card card-in rounded-lg shadow border-0">
                    <div class="card-body row g-4">
                        <div class="col-md-4 text-center">
                            <p class="card-text  display-4 fw-bold mb-1">{counts.TotalAsked}</p>
                            <p class="card-text text-muted">Total Ideas Submitted</p>
                        </div>
                        <div class="col-md-4 text-center">
                            <p class="card-text display-4 fw-bold mb-1">{counts.TotalAccepted}</p>
                            <p class="card-text text-muted">Total Ideas Accepted</p>
                        </div>
                        <div class="col-md-4 text-center">
                            <p class="card-text display-4 fw-bold mb-1">{counts.TotalPending}</p>
                            <p class="card-text text-muted">Total Ideas In Pending</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
      );
}
export default StudentProfile;