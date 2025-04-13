import axios from "axios";
import { BACKEND_DOMAIN } from "../../../common/constants";
import { toast } from "sonner";


export const getUserData = async (token,setLoading,setAccounts,setUser) => {
    try {
        const response = await axios.get(BACKEND_DOMAIN+"/v1/account",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        setUser(response.data.user)
        setAccounts(response.data.accounts);
        setLoading(false)
    } catch (error) {
        console.error(error)
        toast.error('Some Error Occured')
    }
}

export const createAccount = async (token,balance) => {
    try {
        const response = await axios.post(BACKEND_DOMAIN+"/v1/account/create",{
            initial_balance:balance
        },{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        toast.success("Account Added")
        window.location.reload();
    } catch (error) {
        console.error(error)
        toast.error('Some Error Occured')
        return [];
    }
}

export const deleteAccount = async (token,id) => {
    try {
        const response = await axios.delete(BACKEND_DOMAIN+"/v1/account/"+id,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        toast.success("Account Deleted")
        window.location.reload();
    } catch (error) {
        console.error(error)
        toast.error('Some Error Occured')
        return [];
    }
}

export const moneyTransfer = async (token,balance,id) => {
    try {
        const response = await axios.patch(BACKEND_DOMAIN+`/v1/account/${id}/updateMoney`,{
            balance:balance
        },{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        toast.success("Account Updated")
        window.location.reload();
    } catch (error) {
        console.error(error)
        toast.error('Some Error Occured')
        return [];
    }
}
