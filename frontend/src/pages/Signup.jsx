import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Signup = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const API_URL = "https://todolist-pluralcode-backend.onrender.com/api/user/signup";
    const navigate = useNavigate()
    

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(API_URL, {email, password})
        .then(result => {
            console.log(result)
            navigate("/ProtectedRoute")
        })
        .catch(err => console.log(err))
    }

    return(
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-35">
                <h2>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" 
                            className="form-control" 
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" 
                            className="form-control" 
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Submit</button>
                </form>
                <p>Already Have an Account</p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0">
                    Login
                </Link>
                <p></p>
                <Link to="/" className="btn btn-default border w-100 bg-light rounded-0">
                    Back to HomePage
                </Link>
            </div>
        </div>
    )
}


export default Signup;