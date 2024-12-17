import React ,{Fragment,useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Register=()=>{
    const navigate=useNavigate()
    /*Hooks are functions which can be used to manage states and life cycle features
    most common hooks are useState,useEffect,useContext.
    if we have to manage the states in react traditionals we use class components where we have varaible and
    we change and manage its state with functions and this.state.count+1 means we get current state and then
    add to it our class component extends Component(parent) and we change states through props.
    but using hooks we can manage all this using without writing class components by writing functional
    components .REMEMBER op hooks cannot be written in class components.and hooks are always should we written on
    top of components.
    useState [statevariable,function] it returns two things current variable and function to update it.
    useEffect is used for side effects whenever component is loaded it gets called and it takes 
    function as an argument which is called when component is loaded and it also takes array of dependencies which
    are variables when they are changed function is called again.It is highly useful for dom manipulations
    when state is changed it automatically calls function and which can be used to change DOM.
    */
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:'',
        password2:'',
        profession:''
    });
    const {name,email,password,password2,profession}=formData;
    // const navigate=useNavigate()
    const onChange=e=>setFormData({
        ...formData,[e.target.name]:e.target.value
    });
    const onSubmit= async e=>{
        e.preventDefault();
        if(name && email && profession && password && password2 && password===password2){
            try{
                const res=await axios.post('http://localhost:5000/api/users',formData);
                // console.log(res)
                localStorage.setItem("token", res.data.token);
                // localStorage.setItem("profession", res.user.id);
                const role_response=await axios.get('http://localhost:5000/api/auth',{
                    headers:{
                        "x-auth-token":res.data.token
                    }
                });
                localStorage.setItem("profession",role_response.data.profession );
                if(role_response.data.profession==='student'){
                    navigate('/student_dashboard')
                }
                if(role_response.data.profession==='entrepreneur'){
                    navigate('/entrepreneur_dashboard')
                }
                if(role_response.data.profession==='investor'){
                    navigate('/investor_dashboard')
                }
            }
            catch(err){
                for(let i=0;i<err.response.data.error.length ;i++){
                    window.alert(err.response.data.error[i].msg);
                }
            }
        }
        else{
            if(!name || !email || !profession || !password || !password2){
                window.alert('Fill all fields')
            }
            else if(password!==password2){
                window.alert('Passwords do not match')
            }
        }
    }
    return(
        <Fragment>
                <>
                <section className="vh-100" style={{ backgroundColor: "#eee" }}>
                    <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ borderRadius: 25 }}>
                            <div className="card-body p-md-5">
                            <div className="row justify-content-center">
                                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                    Sign up
                                </p>
                                <form className="mx-1 mx-md-4" onSubmit={e=>onSubmit(e)}>
                                    <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-user fa-lg me-3 fa-fw" />
                                    <div className="form-outline flex-fill mb-0">
                                        <input
                                        type="text"
                                        id="form3Example1c"
                                        className="form-control"
                                        placeholder="Your Name"
                                        name="name"
                                        value={name}
                                        onChange={(e) => {
                                            onChange(e);
                                        }}
                                        />
                                    </div>
                                    </div>
                                    <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                                    <div className="form-outline flex-fill mb-0">
                                        <input
                                        type="email"
                                        id="form3Example3c"
                                        className="form-control"
                                        placeholder="Your Email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => {
                                            onChange(e);
                                        }}
                                        />
                                    </div>
                                    </div>
                                    <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                                    <div className="form-outline flex-fill mb-0">
                                        <select
                                        name="profession"
                                        onChange={(e) => {
                                            onChange(e);
                                        }}
                                        value={profession}
                                        className="registration-input custom-select"
                                        >
                                            <option>Your Profession</option>
                                        <option value="student">Student</option>
                                        <option value="entrepreneur">Entrepreneur</option>
                                        <option value="investor">Investor</option>
                                        </select>
                                    </div>
                                    </div>
                                    <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-lock fa-lg me-3 fa-fw" />
                                    <div className="form-outline flex-fill mb-0">
                                        <input
                                        type="password"
                                        id="form3Example4c"
                                        className="form-control"
                                        placeholder="Password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => {
                                            onChange(e);
                                        }}
                                        />
                                    </div>
                                    </div>
                                    <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-lock fa-lg me-3 fa-fw" />
                                    <div className="form-outline flex-fill mb-0">
                                        <input
                                        type="password"
                                        id="form3Example4d"
                                        className="form-control"
                                        placeholder="Reenter-Password"
                                        name="password2"
                                        value={password2}
                                        onChange={(e) => {
                                            onChange(e);
                                        }}
                                        />
                                        
                                    </div>
                                    </div>
                                    <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-key fa-lg me-3 fa-fw" />
                                    </div>
                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg"
                                        value="Register"
                                    >
                                        Register
                                    </button>
                                    </div>
                                </form>
                                </div>
                                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                    className="img-fluid"
                                    alt="Sample imageen"
                                />
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </section>
                </>
        </Fragment>
    )
}
export default Register