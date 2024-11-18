import { useState } from 'react';
import './App.css'
import { fetchData } from '../utils/fetchData';

function App() {
  const [data,setData] = useState(null);
  const [requestURL,setRequestURL] = useState("");
  const [method,setMethod] = useState("GET");
  const methods = ["GET", "HEAD", "OPTIONS", "POST", "PUT", "DELETE", "PATCH"];
  const [body,setBody] = useState({});
  const [isLoading,setIsLoading] = useState(false)
  const [fieldsCount,setFieldsCount] = useState(1);
  async function handleSubmit(e){
    e.preventDefault();
    try {
      const response = await fetchData(requestURL,method,body,setIsLoading);
      if(response){
        setData(response);
      }
    } catch (error) {
      console.log(error);
    }
  } 
  return (
    <main className='w-100 min-vh-100 d-flex flex-column justify-content-start align-items-center gap-2'>
      <form onSubmit={handleSubmit} className='w-75 h-auto d-flex flex-column justify-content-center align-items-center gap-2' action="">
        <div className='w-100 h-auto d-flex flex-row justify-content-center align-items-center gap-2'>
          <div className="dropdown open">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="triggerId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {method}
            </button>
            <div className="dropdown-menu" aria-labelledby="triggerId">
              {
                methods.map((item,index)=>{
                  return (
                    <button key={index} className="dropdown-item" onClick={()=>setMethod(item)}>{item}</button>
                  )
                })
              }
            </div>
          </div>
          <input type="url" className='form-control' value={requestURL} onChange={(e)=>setRequestURL(e.target.value)}/>
          <button className='btn btn-primary'>send</button>
        </div>
        <div className='w-100 d-flex flex-column justify-content-center align-items-center gap-2 flex-wrap'>
          {Array.from({length:fieldsCount}).map((_,index)=>{
            return (
              <div key={index} className='w-100 d-flex flex-row justify-content-center align-items-center gap-2'>
                <input 
                  type="text" 
                  className='form-control w-50' 
                  placeholder='key'
                />
                <input 
                  type="text" 
                  className='form-control w-50' 
                  placeholder='value'
                />
                <button 
                  className='btn btn-danger btn-close' 
                  onClick={()=>{
                    setFieldsCount(fieldsCount-1);
                    Object.keys(body).filter((item,index)=>index);
                  }}
                ></button>
              </div>
            )
          })}
        </div>
      </form>
    </main>
  )
}

export default App
