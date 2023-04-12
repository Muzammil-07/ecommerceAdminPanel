import React from 'react'
import {auth} from "../Services/Firebase";
import {signInWithEmailAndPassword} from 'firebase/auth'
import {useState} from "react"
import { useRouter } from 'next/router';


function SignUp() {
  const router = useRouter();
const [email,setEmail]=useState('');
const [password,setPassword]=useState('')
const submit=()=>{
   
    signInWithEmailAndPassword(auth,email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      alert("LogedIn")
      router.replace('/Components/Home')
      console.log(user)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      // ..
    });
}
   
  return (
<div className='row ' style={{marginTop:50,height:"350px" ,alignItems:"center"}}>
    <div className='col-4'>

    </div>
    <div className='col-4  ' >

  <div className="col-md-12">
    <label htmlFor="inputEmail4" className="form-label">Email</label>
    <input type="email" className="form-control" id="inputEmail4" onChange={(e)=>{setEmail(e.target.value)}}/>
  </div>
  <div className="col-md-12">
    <label htmlFor="inputPassword4" className="form-label">Password</label>
    <input type="password" className="form-control" id="inputPassword4"onChange={(e)=>{setPassword(e.target.value)}}/>
  </div>

<button className='btn btn-primary' onClick={submit}>LogIn</button>

</div>
<div className='col-4'></div>
</div>
  )
}

export default SignUp