import axios from 'axios';
import React, { useEffect ,useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Nav3 from './Nav3';
const Investments=()=>{
    const [idea,setIdea]=useState([]);
    const navigate=useNavigate()
    const { id } = useParams();
    useEffect(()=>{
        const fetchIdeas= async ()=>{
            try {
                const idea=await axios.get(`http://localhost:5000/api/invest/investment/${id}`,{
                    headers:{
                        'x-auth-token':localStorage.getItem('token'),
                    }
                })
                if(idea!==null && idea!==undefined && idea.data!==null && idea.data!==undefined){
                    setIdea(idea.data);
                }
            } catch (err) {
                console.log(err);
                window.localStorage.reload();
            }
        };fetchIdeas();
    },[id,navigate]);
    const onclick= async (e,investment)=>{
        try{
            e.preventDefault();
            try {
                const token = localStorage.getItem('token');
                const header = {
                    'x-auth-token': token
                };
                let x = await axios.put(
                    `http://localhost:5000/api/invest/accept/${investment._id}`,
                    null, // pass null as the request body
                    {
                        headers: header
                    }
                );
                let res = await axios.post(
                    `http://localhost:5000/api/invest/investmentaccepted/${investment._id}`,
                    null, // pass null as the request body
                    {
                        headers: header
                    }
                );
                console.log(res);
                if (res.status === 200) {
                    window.location.reload();
                }
            } catch (err) {
                window.alert(err.msg);
            }
        }catch(err){
            window.location.reload();
        }
    }
    const InvestmentDetails = ({ investment }) => {
        return (
            <div className="investment-details m-5 p-4 border border-rounded">
                <h2>{investment.title}</h2>
                <div className="investment-details-info">
                    <p>
                        <i className="fas fa-money-bill-alt"></i> <strong>Amount:</strong> {investment.amount}
                    </p>
                    <p>
                        <i className="fas fa-calendar-alt"></i> <strong>Posted by:</strong> {investment.askedby}
                    </p>
                </div>
                <div className="investment-details-technical">
                    <h3>Technical Details</h3>
                    <p>
                        <i className="fas fa-globe"></i> <strong>Domain:</strong> {investment.domain}
                    </p>
                    <p>
                        <i className="fas fa-code"></i> <strong>Technologies:</strong> {investment.technologies}
                    </p>
                </div>
                <p>
                    <strong>Description:</strong> {investment.description}
                </p>
                {investment.attachments && (
                    <p>
                        <strong>Attachments:</strong> <a href={`https://${investment.attachments}`} target="_blank" rel="noreferrer">
                        {investment.attachments.split('/').pop()} <i className="fas fa-paperclip"></i>
                        </a>
                    </p>
                )}
                <div className="d-flex justify-content-center">
                    {investment.status === 0 ? (
                    <div>
                        <button
                        className="btn btn-success"
                        onClick={(e) => {
                            onclick(e, investment);
                        }}
                        >
                        Approve
                        </button>
                    </div>
                    ) : null}
                    {investment.status === 1 ? (
                    <div>
                        <strong className="text-success h5">
                            You approved this idea
                        </strong>
                    </div>
                    ) : null}
                </div>
            </div>
        );
    };
    return(
        <div>
            <Nav3 />
            <div>
                {idea!==null && idea!==undefined ? <InvestmentDetails investment={idea} /> : ""}
            </div>
        </div>
    )
}
export default Investments;