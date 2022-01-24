import logo from './logo.svg';
import './App.css';
import { useState, useRef, useEffect } from 'react';
import validator from 'validator';

function App() {

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const birthRef = useRef(null);
  const agreeRef = useRef(null);
  const formRef = useRef(null);

  const [postId, setPostId] = useState(null);

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
    } else {

    }

    

  }

  function handleClear() {
    formRef.current.reset();
  }

  useEffect(() => {
    const apiRequest = {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Intake Form HTTP POST Request'})
    };
    fetch('https://my-json-server.typicode.com/JustUtahCoders/interview-users-api/users', apiRequest)
      .then(res => res.json())
      .then(data => setPostId(data.id));
  },
  []
  );

  return (
    <form className="intake-box" ref={formRef}>
      <h2 className="contact">Contact Us</h2>
      <label className="label" >Name</label>
      <input type="text" ref={nameRef} required/>
      <label className="label" >Email</label>
      <input type="email" ref={emailRef} required/>
      <label className="label" >Birth Date</label>
      <input type="date" ref={birthRef} onChange={(e) => validateDate(e.target.value)} />
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
