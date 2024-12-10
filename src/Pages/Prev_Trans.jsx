import axios from "axios"
import { useState,useEffect } from "react";
import DateObject from "react-date-object";
import { Get_Credit_data_By_Date,Get_Debit_data_By_Date,Get_Roll_data_By_Date } from "../utils/Helper";

function Prev_Trans(){
  var d=0
  const [dates,setDate]=useState([])
  const [sdata,setData]=useState([])

  function getDatesOfCurrentMonth() {
    const dates = [];
    const now = new Date();
    
    const year = now.getFullYear();
    const month = now.getMonth();
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
        dates.push(new Date(year, month, day).toISOString().split('T')[0]); 
    }
    setDate(dates)
    return dates;
}
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
useEffect(()=>{
  getDatesOfCurrentMonth()
},[])

  const handelSubmit=async(e)=>{
    e.preventDefault()
    var setdate=e.target.value
    console.log(setdate)
    const cdata=await Get_Credit_data_By_Date(setdate)
      const ddata=await Get_Debit_data_By_Date(setdate)
      const rdata=await Get_Roll_data_By_Date(setdate)
      
      const log=[...cdata,...rdata,...ddata,]
      setData(log);
  }
  var date = new DateObject();
    const tdate=date.format('YYYY-MM-DD')
    const data=[
        {
        1:'BK12345',
        2:'2023-07-10',
        3:'2023-07-15',
        4:'Deluxe',
        5:'$500',
      },
      {
        1:'BK12067',
        2:'2022-12-20',
        3:'2022-12-25',
        4:'Suite',
        5:'$750',
      },
      {
        1:'BK11523',
        2:'2022-05-15',
        3:'2022-05-20',
        4:'Standard',
        5:'$400',
      },
    ]
    return(
        <div className="p-1 md:p-10">
                <h1 className="text-center font-semibold text-2xl mt-5">{date.format("dddd DD MMMM YYYY")}</h1>
                <h1 className="text-center font-semibold text-2xl mt-5">Previous Transactions</h1>
                <form className="mt-10" >
                  <select className="border-2 w-full h-10 md:h-20 text-center text-3xl" name="crdate" onChange={handelSubmit}>
                    {dates.map((item,index)=>{
                      return (
                        <option  value={item}>{item}</option>
                      )
                    })}
                  </select>
                  <table className="w-full mt-5">
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


                </form>

                
        </div>
    )
}
export default Prev_Trans