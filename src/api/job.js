import axios from 'axios';
const backendUrl=`https://job-listing-backend-l6re.onrender.com/api/v1/job`;
export const createJobPost=async(jobPost)=>{
    try{
        const reqUrl=`${backendUrl}/create`;
        const token=JSON.parse(localStorage.getItem("token"));
        axios.defaults.headers.common['Authorization']=token
        const response=await axios.post(reqUrl,jobPost);
        console.log(response.data);
        return response.data;
    }catch(err){
        console.log(err.response.data);
        return err.response.data;

    }
}
export const findJobDetailsById=async (id,userid)=>{
    try{
        const response=await axios.get(`${backendUrl}/search/${id}/${userid}`);
        console.log(response.data);
        return response.data;
    }catch(error){
        alert('something went wrong');
        console.log(error);
    }
}

export const UpdateJobData=async (jobPostId,UpdatedJobDetail)=>{
    try{
        const reqUrl=`${backendUrl}/update/${jobPostId}`;
        const token=JSON.parse(localStorage.getItem("token"));
        axios.defaults.headers.common['Authorization']=token
        const response=await axios.put(reqUrl,UpdatedJobDetail);
        console.log(response.data);

    }catch(err){
        alert("something went wrong")
        console.log(err);
    }
}
export const getJobData=async (title,skills)=>{
    try{
        const reqUrl=`${backendUrl}/display?searchQuery=${title || ""}&skills=${skills || ""}`;
        const response=await axios.get(reqUrl);
        return response?.data;
    }catch(err){
        alert("something went wrong")
        console.log(err);
    }
}
