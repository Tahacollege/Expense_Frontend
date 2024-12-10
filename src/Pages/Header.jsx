import logo from "../assets/burhani_logo.jpg"
function redirect(id){
    if(id==0){
        window.location.href="/"
    }
    else if(id==1){
        window.location.href="/credit"
    }
    else if(id==2){
        window.location.href="/debit"
    }
    else if(id==3){
        window.location.href="/roll"
    }
    else if(id==4){
        window.location.href="/previous"
    }
}
function Header(){
    return (
        <div className="bg-slate-200 w-full h-24 flex ">
            <img 
            onClick={()=>redirect(0)}
            className="mx-auto w-28 h-full mix-blend-multiply cursor-pointer"
            src={logo}
            />
            <button className="font-bold text-sm md:text-2xl mx-auto hover:underline" onClick={()=>redirect(1)}>Credit</button>
            <button className="font-bold text-sm md:text-2xl mx-auto hover:underline" onClick={()=>redirect(2)}>Debit</button>
            <button className="font-bold text-sm md:text-2xl mx-auto hover:underline" onClick={()=>redirect(3)}>Roll</button>
            <button className="font-bold text-sm md:text-2xl mx-auto hover:underline" onClick={()=>redirect(4)}>Previous-Transactions</button>
        </div>
    )
}
export default Header