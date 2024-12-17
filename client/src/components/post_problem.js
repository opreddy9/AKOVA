import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav2 from './Nav2';
const PostProblem = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        technologies: '',
        domain: '',
        description: '',
        outcome: '',
        dueDate: '',
        image: '',
        attachments: ''
    });

    const { title, technologies, domain, description, outcome, dueDate, image, attachments } = formData;

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(title && technologies && domain && description && outcome && dueDate && image && attachments){
            try {
                const posted=await axios.post('http://localhost:5000/api/postproblem',formData,{
                    headers:{
                        "x-auth-token":localStorage.getItem("token")
                    }
                })
                if(posted.status===200){
                    window.alert("Posted successfully");
                    navigate('/entrepreneur_dashboard');
                }
            } catch (err) {
                window.alert(err);
            }
        }
        else{
            if(!title || !technologies || !domain || !description || !outcome || !dueDate || !image || !attachments){
                window.alert("Fill all fields");
            }
        }
    };

    return (
        <>
        <Nav2/>
        <div className="container mt-5 mb-5 p-4">
            <div className="row justify-content-center">
                <div className="col-12 text-center">
                    <h2>Post a problem</h2>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label" >Title<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="title" placeholder="Enter Title of the problem" name="title" value={title} onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="technologies" className="form-label">Technologies<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="technologies" placeholder="Enter Technologies seperated by comma" name="technologies" value={technologies} onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="domain" className="form-label">Domain<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="domain" placeholder="Enter Domain of problem" name="domain" value={domain} onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description<span className="text-danger">*</span></label>
                    <textarea className="form-control" id="description" name="description" placeholder="Enter detailed description" rows="8" value={description} onChange={handleChange} required></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="outcome" className="form-label">Outcome<span className="text-danger">*</span></label>
                    <textarea className="form-control" id="outcome" name="outcome" rows="3" placeholder="Enter outcome"value={outcome} onChange={handleChange} required></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="dueDate" className="form-label">Due Date<span className="text-danger">*</span></label>
                    <input type="date" className="form-control" id="dueDate" name="dueDate" value={dueDate} onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image URL<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="image" name="image" placeholder="Enter Image URL" value={image} onChange={handleChange} required/>
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

export default PostProblem;
