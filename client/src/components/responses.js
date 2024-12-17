import axios from 'axios';
import React, { useEffect ,useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Nav2 from './Nav2';

const Responses = () => {
    const navigate=useNavigate()
    const { id } = useParams();
    const [ideas,setIdeas]=useState([]);
    useEffect(()=>{
        const fetchIdeas = async () => {
            try {
              const headers = {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token"),
              };
              let ideasList = await axios.get(
                `http://localhost:5000/api/idea/allideas/${id}`,
                {
                  headers: headers,
                }
              );
              if (ideasList!==null && ideasList!==undefined && ideasList.data!==null && ideasList!==undefined) {
                setIdeas(ideasList.data);
            } else {
                // Handle the case where ideasList or ideasList.data is undefined
                setIdeas([]);
            }
            } catch (err) {
              window.alert('No ideas posted for this problem ...take a look at other problems');
              navigate("/Entrepreneur_dashboard");
            }
        };fetchIdeas()
        /*we add id and navigate in dependencies as they change*/
    },[id,navigate]);
      const onClickApprove = async (e, idea) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const header = {
                'x-auth-token': token
            };
            let res = await axios.put(
                `http://localhost:5000/api/idea/updateapprove/${idea._id}`,
                null, // pass null as the request body
                {
                    headers: header
                }
            );
            // console.log(res);
            if (res.status === 200) {
                window.location.reload();
            }
        } catch (err) {
            window.alert(err.msg);
        }
    };
    
    let index=1;
    // console.log(ideas)
    const idea = ideas?.map((idea) => {
        return(
        <div className="res-tab p-3 mb-5 mt-5 px-5" key={idea._id} style={{ border: '1px solid #ccc', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' ,borderRadius:'20px'}}>
          <h3 className="text-center">Response {index++}</h3>
          <p className="sol-res" style={{ marginBottom: "0" }}>
            Description
          </p>
          <p style={{ fontSize: "18px", marginTop: "0" }}>{idea.description}</p>
          <p className="sol-res" style={{ marginBottom: "0" }}>
            Attachments
          </p>
          <ul style={{ listStyle: "none" }}>
            <li>
              <a href={`https://${idea.attachments}`} target="_blank" rel="noopener noreferrer">
                GitHub Repository
              </a>
            </li>
          </ul>
          <p className="sol-res" style={{ marginBottom: "0" }}>
            Response Received On
          </p>
          <p style={{ fontSize: "18px", marginTop: "0" }}>
            {new Date(idea.date).toDateString()}
          </p>
          <p className="sol-res" style={{ marginBottom: "0" }}>
            Posted by
          </p>
          <blockquote>
            <strong>{idea.user.name}</strong>
          </blockquote>
          <div className="d-flex justify-content-around">
            {idea.status === "pending" ? (
              <div>
                <button
                  className="btn btn-success"
                  onClick={(e) => {
                    onClickApprove(e, idea);
                  }}
                >
                  Approve
                </button>
              </div>
            ) : null}
            {idea.status === "pending" ? (
              <div>
                <button
                  className="btn btn-danger"
                  onClick=""
                >
                  Reject
                </button>
              </div>
            ) : null}
            {idea.status === "approved" ? (
              <div>
                <strong className="text-success h5">
                  You approved this idea
                </strong>
                <blockquote>
                    Connect with {idea.user.email}  on{' '}
                    <a href='https://youtube.com' target='_blank' rel="noreferrer">AkovaConnect</a>
                </blockquote>
              </div>
            ) : null}
          </div>
        </div>
        );
    });
    return (

        <div className='p-5'>
            <Nav2/>
            <div className='px-5'>
                {idea===null || idea===undefined?"":idea}
            </div>
        </div>
    );
}

export default Responses;

