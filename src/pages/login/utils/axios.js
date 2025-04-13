import axios from "axios";
import { BACKEND_DOMAIN } from "../../../common/constants";
import { toast } from "sonner";

export const getOTP = async (email) => {
    try {
        const response = await axios.post(BACKEND_DOMAIN+"/v1/auth/login",{
            email:email
        })
        toast.success("OTP has been sent to "+email)
        return response.data;
    } catch (error) {
        console.error(error)
    }
}

export const validateOTP = async (otp,name,email) => {
    try {
        const response = await axios.post(BACKEND_DOMAIN+"/v1/auth/2fa",{
            email:email,
            name:name,
            otp:otp
        })
        return response.data.token;
    } catch (error) {
        console.error(error)
        return "";
    }
}

