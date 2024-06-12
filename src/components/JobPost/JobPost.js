import React, { useState } from "react";
import style from "./JobPost.module.css";
import img from "../../assets/images/jobpost.png";
import { default_skills } from "../../utils/constant";
import {createJobPost,UpdateJobData} from '../../api/job'
import { useLocation, useNavigate } from "react-router-dom";

const JobPost = () => {
  const navigate=useNavigate()
  const {state}=useLocation();
  const [stateData]=useState(state?.jobDetail);
 
  const [formData, setFormData] = useState({
    companyName: ""||stateData?.companyName,
    logoUrl: "" || stateData?.logoUrl,
    title: "" || stateData?.title,
    description: "" || stateData?.description,
    salary: "" || stateData?.salary,
    location: "" || stateData?.location,
    locationType: "" || stateData?.locationType,
    skills: stateData?.skills ||[],
    information: "" || stateData?.information,
    jobType: ""|| stateData?.jobType,
    about: "" || stateData?.about,
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.companyName ||
      !formData.logoUrl ||
      !formData.title ||
      !formData.salary ||
      !formData.jobType ||
      !formData.location ||
      !formData.description ||
      !formData.skills ||
      !formData.information ||
      !formData.locationType
    ) {
      alert("Please fill in all fields.");
      return;
    }
    if(state?.edit){
      await UpdateJobData(stateData?._id,formData);
      return
    }
    const response= await createJobPost(formData);
    console.log(response);
    if(response.isTokenInValid){
      localStorage.clear();
      navigate('/login')
    }
    navigate("/");
  };
  const addSkill = (event) => {
    let skill_arr = formData.skills;
    const skill = event.target.value;
    if (!skill_arr.includes(skill)) {
      skill_arr.push(skill);
    }
    setFormData({ ...formData, skills: skill_arr });
  };
  const removeSkill = (skill) => {
    const originalSkills=formData.skills;
    const filterSkills=originalSkills.filter(
      (ele)=>ele!==skill
    )
    setFormData({...formData,skills:filterSkills})
  };
  return (
    <>
      <div className={style.container}>
        <div className={style.form_elements}>
          <div className={style.header}>
            <h2>Add job description</h2>
          </div>
          <form onSubmit={handleSubmit} className={style.form}>
            <label className={style.label} htmlFor="companyname">
              <p>Company Name</p>
              <input
                id="companyname"
                placeholder="Enter your company name here"
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
              />
            </label>
            <label className={style.label} htmlFor="AddlogoURL">
              <p>Add logo URL</p>
              <input
                id="AddlogoURL"
                placeholder="Enter the link"
                type="text"
                name="logoUrl"
                value={formData.logoUrl}
                onChange={handleChange}
              />
            </label>
            <label className={style.label} htmlFor="Jobposition">
              <p>Job position</p>
              <input
                id="Jobposition"
                placeholder="Enter job position"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </label>
            <label className={style.label} htmlFor="Monthlysalary">
              <p>Monthly salary</p>
              <input
                id="Monthlysalary"
                placeholder="Enter Amount in rupees"
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
              />
            </label>
            <label className={style.label} htmlFor="Location">
              <p>Location</p>
              <input
                id="Location"
                placeholder="Enter Location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </label>
            <div className={style.selectGroup}>
              <label className={style.label} htmlFor="jobType">
                <p>Job Type:</p>
              </label>
              <select
                className={style.select}
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
              >
                <option value="">Select job type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>

            <div className={style.selectGroup}>
              <label className={style.label} htmlFor="locationType">
                <p>Location Type:</p>
              </label>
              <select
                className={style.select}
                name="locationType"
                value={formData.locationType}
                onChange={handleChange}
              > 
                <option value="">select location type</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
                <option value="Office">Office</option>
              </select>
            </div>
            <label className={style.label} htmlFor="description">
              <p>Description:</p>
              <textarea
                className={style.input}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter job description"
              />
            </label>
            <label className={style.label} htmlFor="about">
              <p>About:</p>
              <textarea
                cols="50"
                className={style.input}
                name="about"
                value={formData.about}
                onChange={handleChange}
                placeholder="Enter company description"
              />
            </label>
            <label className={style.label} htmlFor="Information">
              <p>Information</p>
              <input
                id="Information"
                placeholder="Enter Location"
                type="text"
                name="information"
                value={formData.information}
                onChange={handleChange}
              />
            </label>
            <div className={style.selectGroup}>
              <label className={style.label}>
                <p>skills</p>
                <select
                  className={style.select}
                  name="skills"
                  onChange={addSkill}
                >
                  <option value="">select skill</option>
                  {default_skills.map((element) => {
                    return <option value={element}>{element}</option>;
                  })}
                </select>
              </label>
            </div>
            <div className={style.removeSkill}>
              {formData.skills.map((ele) => {
                return (
                  <div>
                    <p>
                      {ele}
                    </p>
                    <span onClick={()=>removeSkill(ele)}>X</span>
                  </div>
                );
              })}
            </div>
            <div className={style.but}>
              <button type="submit" >{state?.edit ?"Edit job":"+ Add Job"}</button>
              <button>cancel</button>
            </div>
          </form>
        </div>
        <div>
          <img className={style.img} src={img} alt="" width="700px" />
        </div>
      </div>
    </>
  );
};

export default JobPost;
