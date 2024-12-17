import React,{useEffect,useState} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Nav1 from "./Nav1";
const StudentDashboard=()=>{
    const [problems,setProblems]=useState([])
    useEffect(()=>{
        async function fetchData(){
        try{
            const token=localStorage.getItem('token')
            const header={
                'x-auth-token':token
            }
            const res=await axios.get( `http://localhost:5000/api/postproblem/studentdashboard`,{
                headers:header
            })
            if(res && res.data ){
                setProblems(res.data);
            }
        }
        catch(err){
            window.alert(err.response.data.msg)
        }
    }fetchData()
    },[]);
    // console.log(problems.length)
    /*we need unique key id for everychild item in list thats why we need key as
problem._id aas it is unique*/
    const problem = problems?.map((problem) => (
        <div className="container-fluid EHmain px-5 mb-5" key={problem._id} >
            <div className="d-flex flex-column ">
                <div className="row proj-tab mt-1">
                    <div className="col-sm-6">
                        <div className=" px-4 ">
                            <h2 className="h2 text-center mt-2">{problem.title}</h2>
                            <strong><p className="mt-4 mb-1 des">Description </p></strong>
                            <p className="prj-des ml-2 ">{problem.description}</p>
                            <strong><p className="des mb-1">Domain</p></strong>
                            <p className="prb-sta ml-2">{problem.domain}</p>
                            <strong><p className="des mb-2">Due date</p></strong>
                            <p className="prb-sta ml-2">{new Date(problem.dueDate).toLocaleDateString('en-IN')}</p>
                            <div className="d-flex justify-content-between  mt-5 mb-1" >
                                <Link to={`/viewproblemstudent/${problem._id}`}>
                                    <button className="btn btn-primary">View Project</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div
                        className="col-sm-6"
                        style={{
                            textAlign: "right",
                            paddingRight: "0",
                            paddingLeft: "0",
                        }}
                    >
                        <img
                            src={problem.image}
                            alt="project_image"
                            className="img-responsive EHimg"
                        />
                    </div>
                </div>
            </div>
        </div>
    ));
    
    return (
        <div className="return">
            <div><Nav1 /></div>
            <div >
                <div className='mt-5 pt-5'>
                    <h1 className="text-center">Problems</h1>
                </div>
                <div >{problems === null ? "" : problem}</div>
            </div>
        </div>
    );
}
export default StudentDashboard;