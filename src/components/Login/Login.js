import React, { useState } from "react";
import style from "./Login.module.css";
import entry from "../../assets/images/entry_image.png";
import {loginUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const handleSubmit=async (e)=>{
    e.preventDefault();
    if(
      !formData.email ||
      !formData.password
    ){
      alert("Enter all fields");
      return;
    }
    const res=await loginUser(formData);
    if(res){
      navigate("/")
    }
  }
  return (
    <>
      <div className={style.container}>
        <div className={style.form_elements}>
          <div className={style.header}>
            <h2>Already have an account?</h2>
            <p>Your personal job finder is here</p>
          </div>
          <form  onSubmit={handleSubmit} className={style.form}>
            <label htmlFor="email">
              <input
                id="email"
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </label>
            <label htmlFor="password">
              <input
                id="pasword"
                placeholder="Password"
                type="text"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </label>
            <button
              type="submit"  
                
            >
              Sign in
            </button>
          </form>
          <p className={style.para}>
          Don’t have an account?<span onClick={()=>{navigate('/register')}}>sign up</span>
          </p>
        </div>
        <div>
          <img className={style.img} src={entry} alt="" />
        </div>
      </div>
    </>
  );
};

export default Login;
