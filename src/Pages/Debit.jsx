import axios from "axios"
import DateObject from "react-date-object";
import { useState,useEffect } from "react";
import { RiPencilFill } from "react-icons/ri";
import { Debitdata,Get_Debit_data_By_Id,updateDebitdata,Delete_Debit_data_By_Id,Get_Debit_data_By_Date } from "../utils/Helper";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
function Debit(){
  const navigate=useNavigate()
  var date = new DateObject();
    const tdate=date.format('YYYY-MM-DD')
    console.log(tdate)
  const datastoreddd=window.localStorage.getItem('dataStored')
  console.log(datastoreddd)
  if(datastoreddd=="true"){
    toast.success(`Data Stored`, {
      position: "top-center"
    });
    window.localStorage.setItem('dataStored','false')
  }
  const [DebitdataS,setDBdata]=useState([])
  useEffect(()=>{
    const fetchData = async () => {
      const dbdata = await Get_Debit_data_By_Date(tdate);
      setDBdata(dbdata)
      console.log(dbdata); // Log the data after fetching
    };
  
    fetchData();
  
  },[])
    
    const [form,setForm]=useState({})
    const inistialState={
      title:'',
      quantity:'',
      amount:'',
      
    }
    const closedialog=()=>{
      setForm(inistialState)
      debitdialog.close()
    }
    const insert=(e)=>{
      setForm({
        ...form,
        [e.target.name]:e.target.value,
        debit:"debit"
      })
    }
    const handelSubmit=async(e)=>{
      e.preventDefault()
      if(form._id){
        console.log('update')
        const res=await updateDebitdata(form)
        if(res=='Successfully Updated'){
            window.localStorage.setItem('dataStored','true')
            navigate(0)
          }
          else{
            toast.error(`Error occurred try again`, {
              position: "top-center"
            });
          }
      }
      else{
        console.log('insert')
        const res=await Debitdata(form)
      if(res=='Successfully inserted'){
        window.localStorage.setItem('dataStored','true')
        navigate(0)
      }
      else{
        toast.error(`Error occurred try again`, {
          position: "top-center"
        });
      }
      }
      console.log(form)
      
    }
    const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    };
    async function deleteobj(id){
      const del=await Delete_Debit_data_By_Id(id)
      navigate(0)
    }
    async function editobj(id){
      const data=await Get_Debit_data_By_Id(id)
      setForm(data)
      debitdialog.showModal()
    }
    return(
        <div className="p-2 md:p-10">
          <ToastContainer />
          <dialog id="debitdialog" className=" w-[700px] bg-slate-400 rounded-lg" >
          <div className="flex">
        <button className=" w-10 ml-auto bg-white m-5 text-xl rounded-full h-10" onClick={()=>closedialog()}>X</button>
        </div>
        <form onSubmit={handelSubmit} method="post">
                        <div className="w-full h-64  grid grid-cols-2 grid-rows-3 gap-5 p-5">
                          
                            <div className="w-full h-full col-span-2">
                              <input className="w-full h-full rounded-2xl p-5" value={form.title} name="title" onChange={insert} placeholder="Title" />
                            </div>
                            <div className="w-full h-full ">
                              <input className="w-full h-full rounded-2xl p-5" value={form.amount} name="amount" onChange={insert} placeholder="Total Amount "/>
                            </div>
                            <div className="w-full h-full row-start-2 ">
                              <input className="w-full h-full rounded-2xl p-5" value={form.quantity} name="quantity" onChange={insert} placeholder="Quantity" />
                              </div>
                            <div className="w-full h-full col-span-2 ">
                              <button className="w-full h-full bg-sky-600 rounded-2xl">Submit</button>
                            </div>
                           
                        </div>
                        </form>
                                </dialog>
                <h1 className="text-center font-semibold text-2xl mt-5">{date.format("dddd DD MMMM YYYY")}</h1>
                <h1 className="text-center font-semibold text-2xl mt-5">Debit Transactions</h1>
                <div className="mt-10">
                <table className="w-full ">
            <thead className="bg-[#3F5D97] text-white">
            <th className="p-1 md:p-5">Debit</th>
              <th className="p-1 md:p-5">Qunatity</th>
              <th className="p-1 md:p-5">Debit Amount</th>
              <th className="p-1 md:p-5">Time</th>
              <th className="p-1 md:p-5">Action</th>

            </thead>
            <tbody>
            {
                DebitdataS.map((item,index)=>{
                  return (
              <tr key={index} className="text-xl">
                <td className="p-1 md:p-5 text-center capitalize border-b-4 border-slate-600">{item.title}</td>
                <td className="p-1 md:p-5 text-center border-b-4 border-slate-600">{item.quantity}</td>
                <td className="p-1 md:p-5 text-center border-b-4 border-slate-600 text-red-500 font-bold">₹ {item.amount}</td>
                
                <td className="p-1 md:p-5 text-center border-b-4 border-slate-600">{formatDate(item.createdAt)}</td>
                <td className="border-b-4 border-slate-600">
                  <div className="flex items-center  justify-center gap-3">
                  <button className="bg-green-500 p-2 min-w-20 font-semibold text-white rounded-lg" onClick={()=>editobj(item._id)}>Edit</button>
                  <button className="bg-red-500 p-2 min-w-20 font-semibold text-white rounded-lg" onClick={()=>deleteobj(item._id)}>Delete</button>
                  </div>
                </td>
                </tr>
                  )
                })
              }
              
            </tbody>
          </table>

                </div>

                <div className="w-full h-24 flex mt-10 p-5">
                <button className="font-bold text-sm md:text-2xl ml-auto text-white hover:underline bg-sky-600 p-0 md:p-5 flex items-center rounded-lg" >
                
              <RiPencilFill className="mr-3 w-5 h-5 ml-3"/>
              <span className="mr-5" onClick={()=>debitdialog.showModal()}>New</span>
              </button>
                </div>
        </div>
    )
}
export default Debit