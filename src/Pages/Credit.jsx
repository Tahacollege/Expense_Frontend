import axios from "axios"
import { useState,useEffect } from "react";
import DateObject from "react-date-object";
import { RiPencilFill } from "react-icons/ri";
import { Insertdata,Get_Credit_data_By_Id,updateCreditdata,Delete_Credit_data_By_Id,Get_Credit_data_By_Date } from "../utils/Helper";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
function Credit(){
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
  const [creditdata,setCRdata]=useState([])
  useEffect(()=>{
    const fetchData = async () => {
      const crdata = await Get_Credit_data_By_Date(tdate);
      setCRdata(crdata)
      console.log(crdata); // Log the data after fetching
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
      creditdialog.close()
    }
    const insert=(e)=>{
      setForm({
        ...form,
        [e.target.name]:e.target.value
      })
    }
    const handelSubmit=async(e)=>{
      e.preventDefault()
      if(form._id){
        console.log('update')
        const res=await updateCreditdata(form)
        if(res=='Successfully Updated'){
            window.localStorage.setItem('dataStored','true')
            navigate("/")
          }
          else{
            toast.error(`Error occurred try again`, {
              position: "top-center"
            });
          }
      }
      else{
        console.log('insert')
        const res=await Insertdata(form)
      if(res=='Successfully inserted'){
        window.localStorage.setItem('dataStored','true')
        navigate("/")
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
      const del=await Delete_Credit_data_By_Id(id)
      navigate("/")
    }
    async function editobj(id){
      const data=await Get_Credit_data_By_Id(id)
      setForm(data)
      creditdialog.showModal()
    }
   
    return(
        <div className="p-0 md:p-10">
        <ToastContainer/>
        <dialog id="creditdialog" className=" w-[700px] bg-slate-400 rounded-lg" >
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
                <h1 className="text-center font-semibold text-lg md:text-2xl mt-5">{date.format("dddd DD MMMM YYYY")}</h1>
                <h1 className="text-center font-semibold text-lg md:text-2xl mt-5">Credit Transactions</h1>
                
                <div className="mt-10">
                <table className="w-full">
            <thead className="bg-[#3F5D97] text-white">
              <th className="p-1 md:p-5">Credit</th>
              <th className="p-1 md:p-5">Qunatity</th>
              <th className="p-1 md:p-5">Credit Amount</th>
              <th className="p-1 md:p-5">Time</th>
              <th className="p-1 md:p-5">Actions</th>
            </thead>
            <tbody>
              {
                creditdata.map((item,index)=>{
                  return (
              <tr key={index} className="text-xl">
                <td className="p-1 md:p-5 text-wrap text-center border-b-4 capitalize border-slate-600">{item.title}</td>
                <td className="p-1 md:p-5 text-center border-b-4 border-slate-600">{item.quantity}</td>
                <td className="p-1 md:p-5 text-center text-nowrap border-b-4 border-slate-600 text-green-500 font-bold">₹ {item.amount}</td>
                
                <td className="p-1 text-lg  md:p-5 text-center border-b-4 border-slate-600">{formatDate(item.createdAt)}</td>
                <td className="border-b-4 border-slate-600">
                  <div className="block md:flex items-center space-y-2 p-0.5 justify-center gap-3">
                  <button  onClick={()=>editobj(item._id)}>
                    <FaPencil className="bg-green-500 p-2 w-10 h-10 font-semibold text-white rounded-lg"/>
                  </button>
                  <button  onClick={()=>deleteobj(item._id)}>
                    <MdDelete className="bg-red-500 p-2 w-10 h-10 font-semibold text-white rounded-lg"/>
                  </button>
                  </div>
                </td>
                </tr>
                  )
                })
              }
              
            </tbody>
          </table>

                </div>
                <div className="w-full h-24 flex mt-10 p-5" onClick={()=>creditdialog.showModal()}>
                <button className="font-bold text-sm md:text-2xl ml-auto text-white hover:underline bg-sky-600 p-0 md:p-5 flex items-center rounded-lg" >
                
              <RiPencilFill className="mr-3 w-5 h-5 ml-3"/>
              <span className="mr-5" >New</span>
              </button>
                </div>
        </div>
    )
}
export default Credit