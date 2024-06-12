import axios from 'axios';

export const registerUser=async ({name,email,mobile,password})=>{
    try{
        const reqUrl=`https://job-listing-backend-l6re.onrender.com/api/v1/auth/register`;
        const response=axios.post(reqUrl,{
            name,
            email,
            mobile,
            password
        })
        console.log(response);
        return;
    }catch(err){
        console.log(err);
    }
}
export const loginUser=async ({email,password})=>{
    try{
        const reqUrl=`https://job-listing-backend-l6re.onrender.com/api/v1/auth/login`;
        const response=await axios.post(reqUrl,{
            email,
            password
        })
        console.log(response?.data);
        if(response?.data?.token){
            localStorage.setItem('token',JSON.stringify(response?.data?.token));
            localStorage.setItem('user_id',JSON.stringify(response?.data?.userId));
        }
        return true;
    }catch(err){
        alert("something")
        console.log(err);
    }
}

