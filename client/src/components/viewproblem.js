import axios from 'axios';
import React, { useEffect ,useState} from 'react';
import { useParams } from 'react-router-dom';
import Nav2 from './Nav2';
const Viewproblem=()=>{
    const { id } = useParams();
    const [problem,setProblem]=useState([])
    useEffect(()=>{
        const fetchIdeas = async () => {
            try {
              const headers = {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token"),
              };
              let problem = await axios.get(
                `http://localhost:5000/api/idea/getpost/${id}`,
                {
                  headers: headers,
                }
              );
              if (problem!==null && problem!==undefined && problem.data!==null) {
                setProblem(problem.data);
            } else {
                // Handle the case where problem or problem.data is undefined
                setProblem([]);
            }
            } catch (err) {
                console.log(err);
            }
        };fetchIdeas()
    },[id])
    return (
        <>
            <Nav2 />
            <div className="container mt-5">
                {problem ? (
                    <div className="row justify-content-center ">
                        <div className="col-md-8">
                            <div className="card shadow mt-5">
                                <img
                                    src={problem.image}
                                    className="card-img-top"
                                    alt="Project"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{problem.title}</h5>
                                    <p className="card-text">{problem.description}</p>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item"><strong>Domain:</strong> {problem.domain}</li>
                                        <li className="list-group-item"><strong>Technologies:</strong> {problem.technologies}</li>
                                        <li className="list-group-item"><strong>Outcome:</strong> {problem.outcome}</li>
                                        <li className="list-group-item"><strong>Contributor:</strong> {problem.contributer}</li>
                                        <li className="list-group-item"><strong>Posted on:</strong> {new Date(problem.date).toLocaleDateString()}</li>
                                        <li className="list-group-item"><strong>Due Date:</strong> {new Date(problem.dueDate).toLocaleDateString()}</li>
                                    </ul>
                                    <a href={`https://${problem.attachments}`} className="btn btn-primary mt-3" target="_blank" rel="noreferrer" >View on GitHub</a>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
}
export default Viewproblem;