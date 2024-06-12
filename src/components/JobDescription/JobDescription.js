import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findJobDetailsById } from "../../api/job";
import style from "./JobDescription.module.css";
import sal from "../../assets/images/sal.png";
import dur from "../../assets/images/dur.png";

const JobDescription = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [jobDetail, setJobDetail] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [isEditable, setIsEditable] = useState(false);
  console.log(id);
  useEffect(() => {
    jobDetails();
  }, []);
  const jobDetails = async () => {
    if (!id) return;
    const userId = JSON.parse(localStorage.getItem("user_id"));
    const result = await findJobDetailsById(id, userId);
    console.log(result.jobPost);
    setJobDetail(result?.jobPost);
    setIsEditable(result?.isEditable);
  };
  const logout = () => {
    localStorage.clear();
    navigate("/login");
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
            <button className={style.login} onClick={()=>navigate("/login")}>Login</button>
            <button className={style.register} onClick={()=>navigate("/register")}>Register</button>
          </div>
        )}
      </div>
      <div className={style.container}>
        {isLoggedIn && isEditable && (
          <button
            className={style.edit}
            onClick={() => {
              navigate("/jobpost", {
                state: {
                  jobDetail: jobDetail,
                  edit: true,
                },
              });
            }}
          >
            edit
          </button>
        )}
        <div className={style.jobtype}>{jobDetail.jobType}</div>
        <h2 className={style.title}>
          {jobDetail.title} at{" "}
          <span style={{ color: "#ED5353" }}>{jobDetail.companyName}</span>
        </h2>
        <p className={style.loc}>Bangalore | India</p>
        <div className={style.sal_dur}>
          <div className={style.sal}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <img
                style={{ width: "20px", height: "20px" }}
                src={sal}
                alt="sla"
              />
              <span>Stipened</span>
            </div>
            <div>{jobDetail.salary}</div>
          </div>
          <div className={style.dur}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <img
                style={{ width: "20px", height: "20px" }}
                src={dur}
                alt="sla"
              />
              <span>duration</span>
            </div>
            <div>6 months</div>
          </div>
        </div>
        <div className={style.company}>
          <p>About company</p>
          <div>{jobDetail.description}</div>
        </div>
        <div className={style.company}>
          <p>About Job</p>
          <div>{jobDetail.description}</div>
        </div>
        <p className={style.skill}>Skill(s) required</p>
        <div className={style.skills}>
          {jobDetail?.skills?.map((ele) => {
            return <p>{ele}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
