import React, { useState } from "react";
import style from "./Register.module.css";
import entry from "../../assets/images/entry_image.png";
import { registerUser } from "../../api/auth";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [isChecked,setIsChecked]=useState(false);
  const handleCheckBox=(e)=>{
    setIsChecked(e.target.checked);
    console.log(isChecked)
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    if(
      !formData.name ||
      !formData.email ||
      !formData.mobile ||
      !formData.password
    ){
      alert("Enter all fields");
      return;
    }
    if(!isChecked){
      alert("Accept terms and conditions");
      return;
    }
    await registerUser(formData);
  }
  return (
    <>
      <div className={style.container}>
        <div className={style.form_elements}>
          <div className={style.header}>
            <h2>Create an account</h2>
            <p>Your personal job finder is here</p>
          </div>
          <form  onSubmit={handleSubmit} className={style.form}>
            <label htmlFor="name">
              <input
                id="name"
                placeholder="Name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </label>
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
            <label htmlFor="mobile">
              <input
                id="mobile"
                placeholder="Mobile"
                type="text"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
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
            <label className={style.checkbox} onChange={handleCheckBox}>
              <input type="checkbox" /> By creating an account, I agree to our
              terms of use and privacy policy
            </label>
            <button
              type="submit"
              
            >
              create account
            </button>
          </form>
          <p className={style.para}>
            Already have an account?<span>sign in</span>
          </p>
        </div>
        <div>
          <img className={style.img} src={entry} alt="" />
        </div>
      </div>
    </>
  );
};

export default Register;
