import axios from "axios"
import { useState } from "react";
export function Balance(){

    const [balance,setbalance] = useState(0);
    const token = "Bearer " + localStorage.getItem("token"); 
    axios.get("http://localhost:3000/api/v1/account/balance",{
        headers : {
            "Authorization" : token,
        }
    }).then((response)=>{
        setbalance(response.data.balance);
    })

    return <div className="flex">
      <div className="font-bold text-lg">
          Your balance
      </div>
      <div className="font-semibold ml-4 text-lg">
          Rs {balance}
      </div>
  </div>
}