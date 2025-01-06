import axios from "axios"
import { useState,useEffect } from "react";
import DateObject from "react-date-object";
import { Get_Credit_data_By_Date,Get_Debit_data_By_Date,Get_Roll_data_By_Date } from "../utils/Helper";
import { toast, ToastContainer } from 'react-toastify';
function Prev_Trans(){
  var d=0
  const [dates,setDate]=useState([])
  const [sdata,setData]=useState([])
  const [showspin,setShowSpin]=useState(false)
  function getMonthsOfYear() {
    const months = [];
    const now = new Date(); // Get the current date
    const year = now.getFullYear(); // Optional: For reference, though not needed here

    for (let month = 0; month < 12; month++) {
        // Get the full name of the month using `toLocaleString`
        const monthName = new Date(year, month, 1).toLocaleString('default', { month: 'long' });
        months.push(monthName); // Add month name to the array
    }

    return months;
}
const months = getMonthsOfYear();

const selectedMonth=async(e)=>{
  e.preventDefault()
  var setMonth=e.target.value
  var setYear=window.localStorage.getItem('selectedYear')
  try {
    const selectedMonth = setMonth; 
    const dates = getDatesForMonth(selectedMonth,setYear);
    setDate(dates)
    console.log(`Dates for ${selectedMonth}:`, dates);
} catch (error) {
    console.error(error.message);
}

}
const selectedYear=async(e)=>{
  e.preventDefault()
  var setYear=e.target.value
  window.localStorage.setItem('selectedYear',setYear)

}
function getYearForDates(){
  const currentYear = new Date().getFullYear();
  const year=[]
        for (let i = currentYear - 1; i <= currentYear + 10; i++) {
          year.push(i) 
        }
        return year
}
const years=getYearForDates()
function getDatesForMonth(selectedMonth,selectedYear) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const monthIndex = months.indexOf(selectedMonth); // Find the index of the selected month

if (monthIndex === -1) {
    throw new Error("Invalid month name. Please provide a valid month.");
}

const dates = [];
const daysInMonth = new Date(selectedYear, monthIndex + 1, 0).getDate(); // Number of days in the month

for (let day = 1; day <= daysInMonth; day++) {
    dates.push(new Date(selectedYear, monthIndex, day).toISOString().split('T')[0]); // Format as YYYY-MM-DD
}

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
  


  const handelSubmit=async(e)=>{
    setShowSpin(true)
    e.preventDefault()
    var setdate=e.target.value
    console.log(setdate)
    const cdata=await Get_Credit_data_By_Date(setdate)
      const ddata=await Get_Debit_data_By_Date(setdate)
      const rdata=await Get_Roll_data_By_Date(setdate)
      
      const log=[...cdata,...rdata,...ddata,]
      console.log(log.length)
      if(log.length==0 ){
        toast.error(`No Record Found`, {
          position: "top-center"
        });
        setShowSpin(false)
      }
      else{
        setShowSpin(false)
      }
      setData(log);
  }
  var date = new DateObject();
    const tdate=date.format('YYYY-MM-DD')

    
    return(
        <div className="p-1 md:p-10">
          <ToastContainer/>

                <h1 className="text-center font-semibold text-2xl mt-5">{date.format("dddd DD MMMM YYYY")}</h1>
                <h1 className="text-center font-semibold text-2xl mt-5">Previous Transactions</h1>
                <form className="mt-10" >
                  <div className="flex w-full gap-5">
                  <select className="border-2 w-1/2 h-10 md:h-20 text-center text-xl md:text-3xl" name="crdate" onChange={selectedYear}>
                    {years.map((item,index)=>{
                      return (
                        <option  value={item}>{item}</option>
                      )
                    })}
                  </select>

                  <select className="border-2 w-1/2 h-10 md:h-20 text-center text-xl md:text-3xl" name="crdate" onChange={selectedMonth}>
                    {months.map((item,index)=>{
                      return (
                        <option  value={item}>{item}</option>
                      )
                    })}
                  </select>

                  <select className="border-2 w-1/2 h-10 md:h-20 text-center text-xl md:text-3xl" name="crdate" onChange={handelSubmit}>
                    {dates.map((item,index)=>{
                      return (
                        <option  value={item}>{item}</option>
                      )
                    })}
                  </select>
                  </div>
                  {showspin ?<div className="flex items-center justify-center  ">
      <div className="w-16 h-16 border-4 mt-10  border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>:<></>}
                  <table className="w-full mt-10">
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