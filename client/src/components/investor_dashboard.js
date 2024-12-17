import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Nav3 from './Nav3';
const Investor_dashboard=()=>{
    const [problems,setProblems]=useState([]);
    useEffect(()=>{
        async function fetchData(){
            try{
                const token=localStorage.getItem('token')
                const header={
                    'x-auth-token':token
                }
                const res=await axios.get('http://localhost:5000/api/invest/getallinvestments',{
                    headers:header
                })
                if (res!==null && res!==undefined && res.data!==null && res.data!==undefined) {
                    // console.log(res.data);
                    setProblems(res.data);
                }else{
                    fetchData();
                }
            }
            catch(err){
                window.alert(err.response.data.msg)
                window.location.reload();
            }
        }fetchData()
    },[]);
    return(
        <div>
            <Nav3/>
            <div className="container-fluid p-5 mt-5">
                <h3 className='p-3 text-center'>Investment Pitches</h3>
                <div className="row ">
                    {problems.map(problem => (
                    <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={problem._id}> 
                        <div className="card border-light shadow-sm rounded-lg">
                            <div className="card-body px-3 py-2 d-flex flex-column justify-content-between">
                                <div className="card-title">  
                                    {problem.title.substring(0,50)+"..."}
                                </div>
                                <div className="card-text text-muted">
                                    <span>Posted by: <strong>{problem.askedby}</strong></span>
                                    <br />
                                    <span className="text mt-5">Amount: <strong>{problem.amount}</strong></span>
                                    <br />
                                    <span className="text mt-5">Domain: <strong>{problem.domain}</strong></span>
                                </div>
                                <Link to={`/investments/${problem._id}`}>
                                    <button className="btn btn-md btn-outline-primary mt-2 w-100">View More</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Investor_dashboard;