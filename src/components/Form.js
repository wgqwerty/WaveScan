import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import "./Form.css"
import companyLogo from '../img/wavescan-logo.png';

  
// to generate form
function Form() {
    // set value
    const [form, setForm] = useState({
        scannerName: "",
        scanningMode: "GANTRY",
        scanDimensionsX: "",
        scanDimensionsY: "",
        scannerFrequency: ""
      });
    
      const onUpdateField = e => {
        const nextFormState = {
          ...form,
          [e.target.name]: e.target.value,
        };
        setForm(nextFormState);
    };

    const onSubmitForm = e => {
        let validSubmission = true;
        const projectName = document.getElementsByName("projectName")[0].value
        const scanDimensionsX = document.getElementsByName("scanDimensionsX")[0].value;
        const scanDimensionsY = document.getElementsByName("scanDimensionsY")[0].value;
        const scannerFrequency = document.getElementsByName("scannerFrequency")[0].value;

        if( projectName.length <3){
            document.getElementById("projectName").innerText = "minimum of 3 characters" ;
            validSubmission = false;
        }else{
            document.getElementById("projectName").innerText=null;
        }

        if( scanDimensionsY <1 || scanDimensionsX <1){
            document.getElementById("scanDimensions").innerText = "minimum dimension of 1" ;
            validSubmission = false;
        }else if(scanDimensionsY >=1 && scanDimensionsX >=1){
            document.getElementById("scanDimensions").innerText=null;
        }

        if( scannerFrequency <1){
            document.getElementById("scannerFrequency").innerText = "minimum frequency of value 1" ;
            validSubmission = false;
        }else{
            document.getElementById("scannerFrequency").innerText=null;
        }

        // validate submission, prevents submission if invalid
        if(!validSubmission){
            e.preventDefault();
        }else{
            axios.post('https://wavescan-internship.saurabhmudgal.repl.co/submitForm', {
                projectName: form.projectName,
                scanningMode: form.scanningMode,
                scanDimensionsX: parseInt(form.scanDimensionsX),
                scanDimensionsY: parseInt(form.scanDimensionsY),
                scannerFrequency: parseFloat(form.scannerFrequency)
            })
              .then(function (response) {
                console.log(response.status);
                if(response.status === 200){
                    e.preventDefault();

                }
              })
              .catch(function (error) {
                console.log(error);
              });

        }
      };

    return(
        <>

        <div className='top'>
            <img src={companyLogo}></img>
        </div>

        <div className='bottom'>

            <form className='w-70'>

                <div>
                    <label htmlFor="projectName" className='block poppins'>Project Name:</label>
                    <input
                    type="text"
                    name="projectName"
                    className="input-box block"
                    value={form.projectName}
                    onChange={onUpdateField}
                    placeholder=""
                    />
                    <span id='projectName' className='error'></span>
                </div>


                    <label>Scanning Mode</label>
                <div className='no-top-margin'>
                    <select name="scanningMode" onChange={onUpdateField}>
                        <option value="GANTRY">Gantry</option>
                        <option value="CRAWLER">Crawler</option>
                        <option value="AUTO">Auto</option>
                        <option value="MANUAL">Manual</option>
                        <option value="ARM">Arm</option>
                    </select>
                </div>

                <label className='poppins'>Scan Dimensions (cm)</label>
                <div className='no-top-margin'>
                    <div className='inline nowrap'>
                        <label className='poppins inline-block'>X: </label>
                        <input
                        type="number"
                        name="scanDimensionsX"
                        className="input-box-small inline-block"
                        value={form.scanDimensionsX}
                        onChange={onUpdateField}
                        placeholder="Scan Dimension"
                        />
                    </div>

                    <div className='inline nowrap'>
                        <label className='poppins inline-block'>Y: </label>
                        <input
                        type="number"
                        name="scanDimensionsY"
                        className="input-box-small inline-block"
                        value={form.scanDimensionsY}
                        onChange={onUpdateField}
                        placeholder="Scan Dimension"
                        ></input>
                    </div>
                        <p id='scanDimensions' className='error'></p>
                </div>

                <label className='poppins'>Scaner Frequency (GHz)</label>
                <div className='no-top-margin'>
                    <input
                    type="number"
                    step="0.1"
                    name="scannerFrequency"
                    className="input-box"
                    value={form.scannerFrequency}
                    onChange={onUpdateField}
                    placeholder="Scanner Frequency"
                    />
                    <span id='scannerFrequency' className='error'></span>
                </div>
                <Link to="/Scanner">
                    <button type="submit" onClick={onSubmitForm}>Search</button>
                </Link>
            </form>
      </div>
      </>
    )
  }

  export default Form;