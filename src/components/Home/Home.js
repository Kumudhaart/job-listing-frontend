import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Home.module.css";
import { default_skills } from "../../utils/constant";
import { IoSearch } from "react-icons/io5";
import logo from "../../assets/images/logo.png";
import { IoMdPeople } from "react-icons/io";
import flag from "../../assets/images/flag.png";
import { getJobData } from "../../api/job";
const Home = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [title, setTitle] = useState();
  const [jobs, setJobs] = useState();
  const [isLoggedIn] = useState(!!localStorage.getItem("token"));
  const userId = JSON.parse(localStorage.getItem("user_id"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  useEffect(() => {
    getAllJobs();
  }, []);
  const addSkill = (event) => {
    const skill_arr=[...skills];
    const skill=event.target.value;
    if(!skill_arr.includes(skill)){
      skill_arr.push(skill);
    }
    setSkills(skill_arr);
    console.log(skill_arr);
    console.log(skills);
  };
  const getAllJobs = async (title,skills) => {
    console.log(title);
    console.log(skills);
    const result = await getJobData(title, skills);
    setJobs(result?.data);
  };
  const handleJobs = () => {
    console.log("clicked");
    getAllJobs(title,skills);
  };
  const handleClear = () => {
    setSkills([]);
    setTitle("");
    getAllJobs(title,skills);
    console.log("clear");
  };
  return (
    <div className={style.body}>
      <div className={style.header}>
        <div className={style.heading}>Jobfinder</div>
        {isLoggedIn ? (
          <div className={style.btn}>
            <button className={style.login} onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <div className={style.btn}>
            <button className={style.login} onClick={() => navigate("/login")}>
              Login
            </button>
            <button
              className={style.register}
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        )}
      </div>
      <div className={style.filter}>
        <div className={style.search}>
          <IoSearch
            style={{
              color: "#9C9C9C",
              position: "absolute",
              top: "23%",
              left: "5px",
              fontSize: "25px",
            }}
          />
          <input
            placeholder="Type any job title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className={style.skill}>
          <select className={style.select} onChange={addSkill}>
            <option value="">Select Skill</option>
            {default_skills.map((ele) => {
              return <option value={ele}>{ele}</option>;
            })}
          </select>
          <div>
          {skills?.map((ele) => {
            return (
              <p>
                {ele}
                <button>X</button>
              </p>
            );
          })}
          </div>
          <div className={style.btn}>
            <button
              style={{
                color: "white",
                backgroundColor: "#ed5353",
                outline: "none",
                border: " 2px solid #ed5353",
                height: "2rem",
                fontSize: "18px",
                textAlign: "center",
              }}
              onClick={handleJobs}
            >
              Apply filter
            </button>
            <button
              style={{
                color: "#ed5353",
                backgroundColor: "white",
                outline: "none",
                border: " 2px solid whitesmoke",
                height: "2rem",
                fontSize: "18px",
                textAlign: "center",
              }}
              onClick={handleClear}
            >
              clear
            </button>
            {isLoggedIn && (
              <button
                style={{
                  color: "white",
                  backgroundColor: "#ed5353",
                  outline: "none",
                  border: " 2px solid #ed5353",
                  height: "2rem",
                  fontSize: "18px",
                  textAlign: "center",
                }}
                onClick={()=>{navigate('/jobpost')}}
              >
                +Add job
              </button>
            )}
          </div>
        </div>
      </div>
      {jobs?.map((ele) => {
        return (
          <div className={style.jobpost}>
            <div className={style.logo}>
              <img src={logo} alt="logo" />
            </div>
            <div className={style.jobdetail}>
              <p className={style.title}>{ele.title}</p>
              <div className={style.metadetail}>
                <div className={style.team}>
                  <IoMdPeople style={{ fontSize: "20px", color: "#919191" }} />{" "}
                  <span>11-20</span>
                </div>
                <div style={{ fontSize: "20px", color: "#919191" }}>
                  {ele.salary}
                </div>
                <div className={style.flag}>
                  <img src={flag} alt="flag" />
                  <span>{ele.location}</span>
                </div>
              </div>
              <div className={style.metaadetail}>
                <p>{ele.locationType}</p>
                <p>{ele.jobType}</p>
              </div>
            </div>
            <div className={style.end}>
              <div className={style.skills}>
                {ele.skills.map((ele) => {
                  return <p>{ele}</p>;
                })}
              </div>
             
              <div className={style.btngroup}>
                {console.log(userId === ele.refUserId)}
                {userId === ele.refUserId && (
                  <button
                    style={{
                      background: "#ED5353",
                      color: "white",
                      border: "1px solid #ED5353 ",
                    }}
                    onClick={() => {
                      navigate("/jobpost", {
                        state: {
                          jobDetail: ele,
                          edit: true,
                        },
                      });
                    }}
                  >
                    Edit job
                  </button>
                )}
                <button
                  style={{
                    background: "white",
                    color: "#ED5353",
                    border: "1px solid #9C9C9C",
                  }}
                  onClick={() => {
                    navigate(`/jobpost/${ele._id}`);
                  }}
                >
                  View details
                </button>
              </div>
              </div>
          </div>
        );
      })}
</div>
  );
};

export default Home;
