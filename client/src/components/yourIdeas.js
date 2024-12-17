import React, { useState ,useEffect} from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import Nav1 from './Nav1';
const YourIdeas=()=>{
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
              if (ideasList!==null && ideasList!==undefined && ideasList.data!==null && ideasList!==undefined) {
                // console.log(ideasList);
                setIdeas(ideasList.data);
            } else {
                // Handle the case where ideasList or ideasList.data is undefined
                setIdeas([]);
            }
            } catch (err) {
              navigate("/student_dashboard");
            }
        };fetchIdeas()
    })
    const getStatusBadge = (status) => {
        const badgeColors = {
          'pending': 'warning',
          'approved': 'success',
        };
        return (
          <span className={`badge bg-${badgeColors[status]}`}>
            {status === 'pending' ? 'pending' : 'approved'}
          </span>
        );
      };  
      const idea = (ideas) => (
        <div className='row'>
        <div className='col-lg-6'>
        <div className="investment-container ">
          {ideas.map((idea) => (
            <div key={idea.id} className="col investment-card mt-3">
              <div className="card h-100 shadow-sm rounded-3">
                <div className="card-body ">
                  <h5 className="card-title">{idea.description}</h5>
                  <p  className="card-text mb-3">
                    <div className="d-flex justify-content-around  mt-1 mb-1" >
                        <a href={`https://${idea.attachments}`} className="btn btn-primary " target="_blank" rel="noreferrer" >View on GitHub</a>
                        <Link to={`/justviewidea/${idea.problem._id}`}>
                            <button className="btn btn-success">View Project</button>
                        </Link>
                    </div>
                  </p>
                  <div className="d-flex justify-content-center">
                    <span className="badge-lg rounded-pill "><strong>Status:{' '}</strong>{getStatusBadge(idea.status)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
        </div>
      );
        return (
            <div className='p-5'>
                <Nav1 />
                <div className='row m-5'>
                    {ideas.length > 0 ? idea(ideas) : <p>Loading investments...</p>}
                </div>
            </div>
        );
}
export default YourIdeas;