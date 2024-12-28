import axios from 'axios'
import { API_URL,InsertCreditData,UpdateCredit,GetCreditData,GetCreditDatabyid,DeleteCreditDatabyid,GetCreditDatabydate,
    InsertDebitData,GetDebitData,GetDebitDataById,UpdateDebit,DeleteDebitDatabyid,GetDebitDatabydate,
    InsertRollData,GetRollData,GetRollDataById,UpdateRoll,DeleteRollDatabyid,GetRollDatabydate,RollData,GetRollsinfoDatabydate,
    ConnectDatabase
    
 } from './NwConfig'
export const Insertdata=async(form)=>{
    try{
        let url=API_URL+InsertCreditData
        
            const request=await axios.post(url,form)
            const response=await request.data;
           
            return response
        }
        catch(error){
            console.log('error occured : ',error.message)
            return error.message
        }
}

export const updateCreditdata=async(form)=>{
    try{
        let url=API_URL+UpdateCredit
            const request=await axios.put(url,form)
            const response=await request.data;
           
            return response
        }
        catch(error){
            console.log('error occured : ',error.message)
            return error.message
        }
}

export const Get_Credit_data=async()=>{
    try{
        let url=API_URL+GetCreditData
        
            const request=await axios.get(url)
            const response=await request.data;
            
            return response
        }
        catch(error){
            console.log('error occured : ',error.message)
            return error.message
        }


}

export const Get_Credit_data_By_Id=async(id)=>{
    try{
        let url=API_URL+GetCreditDatabyid+id
        
            const request=await axios.get(url)
            const response=await request.data;
            
            return response
        }
        catch(error){
            console.log('error occured : ',error.message)
            return error.message
        }


}

export const Get_Credit_data_By_Date=async(date)=>{
    try{
        let url=API_URL+GetCreditDatabydate+date
        
            const request=await axios.get(url)
            const response=await request.data;
            
            return response
        }
        catch(error){
            console.log('error occured : ',error.message)
            return error.message
        }


}

export const Delete_Credit_data_By_Id=async(id)=>{
    try{
        let url=API_URL+DeleteCreditDatabyid+id
        
            const request=await axios.delete(url)
            const response=await request.data;
            
            return response
        }
        catch(error){
            console.log('error occured : ',error.message)
            return error.message
        }


}

export const Debitdata=async(form)=>{
    try{
        let url=API_URL+InsertDebitData
        
            const request=await axios.post(url,form)
            const response=await request.data;
           
            return response
        }
        catch(error){
            console.log('error occured : ',error.message)
            return error.message
        }


}

export const Get_Debit_data=async()=>{
    try{
        let url=API_URL+GetDebitData
        
            const request=await axios.get(url)
            const response=await request.data;
           
            return response
        }
        catch(error){
            console.log('error occured : ',error.message)
            return error.message
        }
}

export const Get_Debit_data_By_Id=async(id)=>{
    try{
        let url=API_URL+GetDebitDataById+id
        
            const request=await axios.get(url)
            const response=await request.data;
            
            return response
        }
        catch(error){
            console.log('error occured : ',error.message)
            return error.message
        }


}

export const Get_Debit_data_By_Date=async(date)=>{
    try{
        let url=API_URL+GetDebitDatabydate+date
        
            const request=await axios.get(url)
            const response=await request.data;
            
            return response
        }
        catch(error){
            console.log('error occured : ',error.message)
            return error.message
        }


}

export const updateDebitdata=async(form)=>{
    try{
        let url=API_URL+UpdateDebit
            const request=await axios.put(url,form)
            const response=await request.data;
           
            return response
        }
        catch(error){
            console.log('error occured : ',error.message)
            return error.message
        }
}

export const Delete_Debit_data_By_Id=async(id)=>{
    try{
        let url=API_URL+DeleteDebitDatabyid+id
        
            const request=await axios.delete(url)
            const response=await request.data;
            
            return response
        }
        catch(error){
            console.log('error occured : ',error.message)
            return error.message
        }


}

export const Rolldata=async(form)=>{
    try{
        let url=API_URL+InsertRollData
        
            const request=await axios.post(url,form)
            const response=await request.data;
            
            return response
        }
        catch(error){
            console.log('error occured : ',error.message)
            return error.message
        }


}

export const Get_Roll_data=async()=>{
    try{
        let url=API_URL+GetRollData
        
            const request=await axios.get(url)
            const response=await request.data;
            
            return response
        }
        catch(error){
            console.log('error occured : ',error.message)
            return error.message
        }
}

export const Get_Roll_data_By_Id=async(id)=>{
    try{
        let url=API_URL+GetRollDataById+id
        
            const request=await axios.get(url)
            const response=await request.data;
            
            return response
        }
        catch(error){
            console.log('error occured : ',error.message)
            return error.message
        }


}

export const Get_Roll_data_By_Date=async(date)=>{
    try{
        let url=API_URL+GetRollDatabydate+date
        
            const request=await axios.get(url)
            const response=await request.data;
            
            return response
        }
        catch(error){
            console.log('error occured : ',error.message)
            return error.message
        }


}

export const updateRolldata=async(form)=>{
    try{
        let url=API_URL+UpdateRoll
            const request=await axios.put(url,form)
            const response=await request.data;
           
            return response
        }
        catch(error){
            console.log('error occured : ',error.message)
            return error.message
        }
}

export const Delete_Roll_data_By_Id=async(id)=>{
    try{
        let url=API_URL+DeleteRollDatabyid+id
        
            const request=await axios.delete(url)
            const response=await request.data;
            
            return response
        }
        catch(error){
            console.log('error occured : ',error.message)
            return error.message
        }
}

export const Get_ROll_Info=async()=>{
    try{
        let url=API_URL+RollData
        
            const request=await axios.get(url)
            const response=await request.data;
            
            return response
        }
        catch(error){
            console.log('error occured : ',error.message)
            return error.message
        }


}

export const Get_ROll_InfoByDateAndPrice=async(date)=>{
    try{
        let url=API_URL+GetRollsinfoDatabydate+date
            const request=await axios.get(url)
            const response=await request.data;
            
            return response
        }
        catch(error){
            console.log('error occured : ',error.message)
            return error.message
        }


}

export const EstablishConnection=async(form)=>{
    try{
        let url=API_URL+ConnectDatabase
        
            const request=await axios.get(url)
            const response=await request.data;
           
            return response
        }
        catch(error){
            console.log('error occured : ',error.message)
            return error.message
        }
}