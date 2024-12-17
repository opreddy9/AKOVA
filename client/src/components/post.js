import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Nav1 from './Nav1';
const PostIdea = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        description: '',
        attachments: ''
    });

    const {description, attachments } = formData;

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(description && attachments){
            try {
                const posted=await axios.post(`http://localhost:5000/api/idea/${id}`,formData,{
                    headers:{
                        "x-auth-token":localStorage.getItem("token")
                    }
                })
                if(posted.status===200){
                    window.alert("Posted successfully");
                    navigate('/yourIdeas');
                }
            } catch (err) {
                window.alert(err);
            }
        }
        else{
            if(!description || !attachments){
                window.alert("Fill all fields");
            }
        }
    };

    return (
        <>
        <Nav1/>
        <div className="container mt-5 mb-5 p-4">
            <div className="row justify-content-center">
                <div className="col-12 text-center">
                    <h2>Post an Idea</h2>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description<span className="text-danger">*</span></label>
                    <textarea className="form-control" id="description" name="description" placeholder="Enter detailed description" rows="8" value={description} onChange={handleChange} required></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="attachments" className="form-label">Attachments URL<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="attachments" name="attachments" placeholder="ex: github links"value={attachments} onChange={handleChange} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </>
    );
};
export default PostIdea;