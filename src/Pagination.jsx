import React, { useEffect, useState } from "react";
import "./pagination.css";

export default function Pagination(){
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPages = 10;
    const totalPages = Math.ceil(data.length / rowsPerPages);

    const startIndex = (currentPage - 1) * rowsPerPages;
    const currentRows = data.slice(startIndex, startIndex + rowsPerPages)

    useEffect(()=>{
        const url =async()=>{
            try{
              const res = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
              if(!res.ok){
                throw new Error("fetch Data Failed")
              }
            const upiPage = await res.json()
            setData(upiPage);
            }
            catch(error){
                alert("failed to fetch data");
                console.error("Error Fetching data", error);
            } 
        }
        url();
    },[])


    return(
        <div className="tbl">
            <h1>Empolyee Data Table</h1>
            <div className="tbl1">
                <table>
                    <thead>
                        <tr>
                        <th>id</th>
                        <th >Name</th>
                        <th >Email</th>
                        <th >Role</th>
                    </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((item)=>(
                            <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                            </tr>
                        ))}
                    </tbody>    
                </table>
            </div>
           <br />
           <div className="div">
            <button className="btn" onClick={()=>setCurrentPage(prev => prev - 1)} disabled={currentPage===1}>Previous</button>
           <button className="btn">{currentPage}</button>
            <button className="btn" onClick={()=>setCurrentPage(prev => prev + 1)} disabled={currentPage===totalPages}>Next</button>
           </div>
            
        </div>
    )
}