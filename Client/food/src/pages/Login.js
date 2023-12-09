import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://congenial-system-7jv4666vw6j3rg6w-3001.app.github.dev/api/v1/login", {
      method: 'POST',
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    })
    const json = await response.json()

    if (json.message === "login success") {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.token);
      alert("login successs");
      navigate("/");
    } 
    else alert("Enter valid credentails");
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
          </div>
          <button type="submit" className="m-3 btn btn-primary">Submit</button>
          <Link to="/createUser" className="m-3 btn btn-danger">Don't have an account</Link>
        </form>
      </div>
    </>
  );
}