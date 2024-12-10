import axios from "axios"
import DateObject from "react-date-object";
import { toast, ToastContainer } from 'react-toastify';
import { useState,useEffect } from "react";
import { Get_Credit_data_By_Date,Get_Debit_data_By_Date,Get_Roll_data_By_Date } from "../utils/Helper";
function Home(){
  var d=0
  var date = new DateObject();
    const tdate=date.format('YYYY-MM-DD')
    console.log(tdate)
    const [total,setTotal]=useState(0)
  const [sdata,setData]=useState([])
  useEffect(()=>{
     const dataFetcher=async()=>{
      
      const cdata=await Get_Credit_data_By_Date(tdate)
      const ddata=await Get_Debit_data_By_Date(tdate)
      const rdata=await Get_Roll_data_By_Date(tdate)
      
      const log=[...cdata,...rdata,...ddata]
      setData( log);
    }
    dataFetcher()
    
  },[])
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };
    const calc=(item)=>{
      // var d=0;
      if(item==undefined){
        return 0
      }
      else{
 if('debit' in item){
          d-=item.amount
        }
        else{
          d+=item.amount
        }
      }
       
        console.log(d)
        return d
        // setAmount(d)
      
    }
    
    return(
        <div className="p-1 md:p-10">
          <ToastContainer/>
                <h1 className="text-center font-semibold text-2xl mt-5">{date.format("dddd DD MMMM YYYY")}</h1>
                <div className="mt-10">
                <table className="w-full ">
            <thead className="bg-[#3F5D97] text-white">
              <th className="p-1 md:p-5">Title</th>
              <th className="p-1 md:p-5">Quantity</th>
              <th className="p-1 md:p-5">Amount</th>
              <th className="p-1 md:p-5">Time</th>
              <th className="p-1 md:p-5">Total-Amount</th>
            </thead>
            <tbody>
              {
                sdata.map((item,index)=>{
                  return (
              <tr key={index}>
                <td className="p-1 md:p-5 text-center md:text-2xl text-sm border-b-4 capitalize border-slate-600">{item.title}</td>
                <td className="p-1 md:p-5 text-center md:text-2xl text-sm border-b-4 border-slate-600">{item.quantity}</td>
                {item.debit=='debit'?
                <>
                <td className="p-1 md:p-5 text-center md:text-2xl text-sm border-b-4 text-red-500 font-bold border-slate-600">₹ {item.amount}</td>
                <td className="p-1 md:p-5 text-center md:text-2xl text-sm border-b-4 border-slate-600">{formatDate(item.createdAt)}</td>
                <td className="p-1 md:p-5 text-center md:text-2xl text-sm border-b-4 border-slate-600 text-red-500 font-bold">₹ {calc(item)}</td>
                </>
                :
                <>
                <td className="p-1 md:p-5 text-center md:text-2xl text-sm border-b-4 text-green-500 font-bold border-slate-600">₹ {item.amount}</td>
                <td className="p-1 md:p-5 text-center md:text-2xl text-sm border-b-4 border-slate-600">{formatDate(item.createdAt)}</td>
                <td className="p-1 md:p-5 text-center md:text-2xl text-sm border-b-4 border-slate-600 text-green-500 font-bold">₹ {calc(item)}</td>
                </>
                }
                
                
                
                </tr>
                  )
                })
              }
              
            </tbody>
          </table>

                </div>
        </div>
    )
}
export default Home