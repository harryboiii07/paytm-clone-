import { Bottomwarning } from "../components/BottomWarning";
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { Inputbox } from "../components/Inputbox"
import { Subheading } from "../components/Subheading"
import  axios  from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export function Signin() {

    const [username,setusername] = useState("");
    const [password,setpassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <Subheading label={"Enter your credentials to access your account"} />
        <Inputbox onChange = {(e)=>{
          setusername(e.target.value);
        }} placeholder="harkirat@gmail.com" label={"Email"} />
        <Inputbox onChange = {(e)=>{
          setpassword(e.target.value);
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick = {async()=>{
            const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
              username,
              password,
            })
            localStorage.setItem("token",response.data.token);
            navigate("/dashboard");
          }} label={"Sign in"} />
        </div>
        <Bottomwarning label={"Don't have an account?"} linktext={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}