import './App.css';
import { useState, useRef } from 'react';
import validator from 'validator';

function App() {

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const birthRef = useRef(null);
  const agreeRef = useRef(null);
  const formRef = useRef(null);

  const [errorMessage, setErrorMessage] = useState('');
  
  const validateDate = (value) => {
    if (validator.isDate(value)) {
      setErrorMessage('Birth date is a valid date') 
    } else {
      setErrorMessage('Please enter a valid date.')
    }
    }
  
  function handleSubmit(e) {
    e.preventDefault();
    const validName = nameRef.current?.value?.length > 0;
    const validEmail = emailRef.current?.value?.length > 0;
    const validBirthDate = true;
    const validAgree = agreeRef.current.checked;
    const allValid = validName && validEmail && validBirthDate && validAgree;

    if (allValid) {
      console.log(allValid)
      console.log(agreeRef.current.checked)

        const apiRequest = {
          method: 'POST',
          headers: {'Content-Type': 'application/json' },
          body: JSON.stringify([
            {
              "id": 1,
              "name": nameRef.current?.value,
              "email": emailRef.current?.value,
              "birthDate": birthRef.current?.value,
              "emailConsent": agreeRef.current?.checked,
            }
          ])
        };
        fetch('https://my-json-server.typicode.com/JustUtahCoders/interview-users-api/users', apiRequest)
          .then(res => res.json())
          .then(handleClear)
          .then(showSuccess)
          .catch(error => console.log(error));

    }
  }

  function handleClear() {
    formRef.current.reset();
  }

  function showSuccess() {
    alert("You're form was submitted successfully")
  }

  return (
    <form className="intake-box" ref={formRef}>
      <h2 className="contact">Contact Us</h2>
      <label className="label" >Name</label>
      <input type="text" ref={nameRef} required/>
      <label className="label" >Email</label>
      <input type="email" ref={emailRef} required/>
      <label className="label" >Birth Date</label>
      <input className="date" type="date" max="2022-01-23" ref={birthRef} onChange={(e) => validateDate(e.target.value)} />
      <span className="date-format">{errorMessage}</span>
      <span><input type="checkbox" ref={agreeRef} />I agree to be contacted by email.</span>
      <div className="buttons">
        <button className="clear" onClick={handleClear}>Clear</button>
        <input className="submit" type="submit" value="Submit" onClick={handleSubmit} />  
      </div>
    </form>
  );
  }

export default App;
