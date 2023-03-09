import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Scanner.css";
import back from '../img/back.png';
import Loader from "./Loader";
import Empty from "./Empty";



function Scanner() {
    const [data, setData] = useState(null);
  
    useEffect(() => {
      axios.get('https://wavescan-internship.saurabhmudgal.repl.co/success')
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
  
    if (!data) {
      return <Loader />;
    }
    
    if(data.length === 0){
        return <Empty />;
    }

    return (
      <div>
        <Link to="..">
          
          <div className='back'>back <img src={back} className="fit"></img></div>
        </Link>
        <table id="scanners">
            <thead>
                <tr>
                    <th>Scanner Name</th>
                    <th>ipAddress</th>
                    <th>Speed</th>
                    <th>Availablility</th>
                </tr>
            </thead>
            <tbody>
                    {data.map((item, index) => 
                <tr key={`item-${index}`}>
                        <td>{item.scannerName}</td>
                        <td>{item.ipAddress}</td>
                        <td>{item.scannerSpeed} m/s</td>
                        {item.isAvailable === "true"? <td className="available">Yes</td> : <td className="unavailable">No</td>}
                </tr>
                        )
                    }
            </tbody>
        </table>
      </div>
    
      
    );
  }
  
  

  export default Scanner;