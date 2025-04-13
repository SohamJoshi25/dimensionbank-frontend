import React, { forwardRef, useEffect, useState } from 'react'

//Context
import { useUserContext } from '../../common/contexts/UserProvider'

//Hooks
import useClickOutside from '../../common/hooks/useOutsideclick'

//Pages
import AddAccount from './components/addaccount/AddAccount'
import DeleteAccount from './components/deleteaccount/DeleteAccount'
import MoneyTransfer from './components/moneytransfer/MoneyTransfer'
import UserDetail from './components/userdetail/UserDetail'

import { useNavigate } from 'react-router-dom'
import { getUserData } from './utils/axios'

const Dashboard = () => {
    const user = useUserContext()
    const [option,setOption] = useState(0);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if(user.token){
            getUserData(user.token,setLoading,user.setAccounts,user.setUser)  
        }
    },[user.token])

    const newRef = useClickOutside(() => {
        setOption(0);
      });
    
      const logout = () => {
        localStorage.removeItem("token")
        user.setToken('');
        user.setUserId(null);
        user.setName('');
        user.setEmail('');
        user.setCreatedAt(null);
        user.setAccounts([]); 
        navigate("/login")
      }

  return !loading ? (
    <div className='h-screen relative'>
        {option === 1 && <AddAccount ref={newRef} />}
        {option === 4 && <DeleteAccount ref={newRef} />}
        {option === 3 && <MoneyTransfer ref={newRef} />}
        {option === 2 && <UserDetail ref={newRef} />}

        <div className='bg-[#24517E] h-[22%] text-white p-8 px-16'>
            <div className='flex justify-between'>
                <span className='text-3xl font-mono '>Hi,{user.name}</span>
                <span className='text-3xl font-mono '>Dimension Bank</span>
            </div>
            <div className='flex gap-x-10 mt-12 text-gray-300 w-full'>
                <button className='hover:text-white hover:shadow-2xl' onClick={()=>{setOption(1)}} >Add Account</button>
                <button className='hover:text-white hover:shadow-2xl' onClick={()=>{setOption(2)}} >User Details</button>
                <button className='hover:text-white hover:shadow-2xl' onClick={()=>{setOption(3)}} >Money Transfer</button>
                <button className='hover:text-white hover:shadow-2xl' onClick={()=>{setOption(4)}} >Delete Account</button>
                <button className='hover:text-white hover:shadow-2xl ml-auto mr-2' onClick={logout} >Logout</button>
            </div>
        </div>
        <div className='bg-[#E5E6ED] h-[78%] flex flex-row gap-x-20 items-top pt-10 pl-20'>
            <div className='w-[500px] bg-white h-[90%] rounded-md font-mono p-4 shadow-lg'>
                <div className='text-2xl w-full text-left mb-2'>Account Logs</div>
                <hr />
                <div className='p-2 flex flex-col '>
                    {user && user.accounts && user.accounts.map((account,idxacc)=>{
                        return account.logs.map((log,idxlog)=>{
                            return   (<li key={idxlog+""+idxacc} className='text-lg w-full text-left'> {log}</li>)
                        })
                        
                    })}
                </div>
            </div>
            
            <div className='w-[500px] bg-white h-fit rounded-md font-mono p-4 shadow-lg'>
                <div className='text-2xl w-full text-left mb-2'>Your Accounts</div>
                <hr />
                <div className='p-2 flex flex-col text-center text-lg'> 
                    <table >
                        <thead>
                            <tr>
                                <th>Sr.</th>
                                <th>Id</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                        
                            {user && user.accounts && user.accounts.map((account,index)=>{
                                return   (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{account.id}</td>
                                        <td>{account.balance}</td>
                                    </tr>
                                )
                            })}

                       </tbody>
                    </table>
                    
                </div>
            </div>
        </div>
    </div>
  ) : <div className='flex justify-center items-center text-3xl font-mono h-screen'>loading . . . </div>
}

export default Dashboard