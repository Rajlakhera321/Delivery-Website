import React, {useState} from "react";
import { Link } from "react-router-dom";

export default function Signup() {

  const [credentials, setCredentials] = useState({name:"",email:"",password:"",geolocation:""})

  const handleSubmit= async(e) => {
    e.preventDefault();
    console.log("response here please")
    const response = await fetch("https://congenial-system-7jv4666vw6j3rg6w-3001.app.github.dev/api/v1/newUser",{
      method: 'POST',
      headers: {'Content-Type': "application/json"},
      body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation}),
    })
    const json = await response.json()


    if(!json.success){
      alert("Enter valid credentails");
    }else alert("Registered successfully");
  }

  const onChange=(event)=> {
    setCredentials({...credentials,[event.target.name]: event.target.value})
  }

  return (
  <>
  <div className="container">
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
        <div id="passwordHelp" className="form-text">Password must contain uppercase, losercase, number and symbol.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">Address</label>
        <input type="text" className="form-control" name="geolocation" value={credentials.geolocation} onChange={onChange} />
      </div>
      <button type="submit" className="m-3 btn btn-primary">Submit</button>
      <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
    </form>
    </div>
  </>
  );
}