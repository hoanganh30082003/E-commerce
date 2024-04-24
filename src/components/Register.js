import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import axios from 'axios';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const navigate = useNavigate();
    const [user,setUser] = useState({
        email: '',
        password: '',
        dob: '',
        gender: '',
        role: 'user'
    });
    const [errorMessage,setErrorMessage] = useState({
        email: 'Email cannot empty!',
        password: 'Password cannot empty!',
        dob: 'Date of birth cannot empty!',
        gender: 'Gender cannot empty!'
    });
    const fetchData = async () => {
        const user = await axios.get('http://localhost:3000/account');
        setUser(user.data);
    }
    useEffect(() => {
        fetchData();
    },[])
    const handleEmail = (e) => {
        const email = e.target.value;
        const newMessage = {...errorMessage};
        const isDuplicate = user.some(u => u.email === email);
        const isFormat = email.match(/^[a-zA-Z0-9]+@gmail\.com$/);
        if (!email){
            newMessage.email = 'Email cannot empty!';
        }else if (isDuplicate){
            newMessage.email = 'Email already exists!';
        } else if (!isFormat){
            newMessage.email = 'Email must be gmail.com and no special characters!';
        } else {
            delete newMessage.email;
        }
        setUser({...user,email});
        setErrorMessage(newMessage);
    }
    
    const handlePassword = (e) => {
        const password = e.target.value;
        const newMessage = {...errorMessage};
        const validLength = password.length >= 8;
        if (!password){
            newMessage.password = 'Password cannot empty!';
        }else if (!validLength){
            newMessage.password = 'Password must be greater than 8!';
        } else {
            delete newMessage.password;
        }
        setUser({...user,password});
        setErrorMessage(newMessage);
    }

    const handleDob = (e) => {
        const dob = e.target.value;
        const newMessage = {...errorMessage};
        if(!dob){
            newMessage.dob = 'Date of birth cannot empty!';
        }else {
            delete newMessage.dob;
        }
        setUser({...user,dob});
        setErrorMessage(newMessage);
    }

    const handleGender = (e) => {
        const gender = e.target.value;
        const newMessage = {...errorMessage};
        if(!gender){
            newMessage.gender = 'Gender cannot empty!';
        }else {
            delete newMessage.gender;
        }
        setUser({...user,gender});
        setErrorMessage(newMessage);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            email: user.email,
            password: user.password,
            dob: user.dob,
            gender: user.gender,
            role: 'user'
        }
        
        if(Object.entries(errorMessage).length > 0){
            e.preventDefault();
            e.stopPropagation();
            alert("Register Failed!");
        }

        try {
            axios.post('http://localhost:3000/account',newUser)
           alert("Register Success!");
           navigate("/auth/Sign-in");
       } catch (error) {
           alert("An error occur while processing...");
       }

        
        e.stopPropagation();
    }
    return (
        <Container className="w-50">
    <h1 className="text-center">Sign Up</h1>
    <Form className="text-center" onSubmit={(e) => {handleSubmit(e)}}>
        <Form.Group className="mb-3 d-flex align-items-center" controlId="formBasicEmail">
            <Form.Label className="me-3 text-end" style={{ width: "200px" }}>Email address:</Form.Label>
            <div className="text-start w-100 pt-3">
            <Form.Control  type="email" placeholder="Enter email" onChange={e => {handleEmail(e)}}/>
            <span style={{color: "red"}}>{errorMessage.email}</span>
            </div>
        </Form.Group>
        <Form.Group className="mb-3 d-flex align-items-center" controlId="formBasicPassword">
            <Form.Label className="me-3 text-end" style={{ width: "200px" }}>Password:</Form.Label>
            <div className="text-start w-100 pt-3">
            <Form.Control type="password" placeholder="Enter password" onChange={e => {handlePassword(e)}}/>
            <span style={{color: "red"}}>{errorMessage.password}</span>
            </div>
        </Form.Group>
        <Form.Group className="mb-3 d-flex align-items-center" controlId="formBasicDate">
            <Form.Label className="me-3 text-end" style={{ width: "200px" }}>Date of birth:</Form.Label>
            <div className="text-start w-100 pt-3">
            <Form.Control type="date" placeholder="Enter date of birth" onChange={e => {handleDob(e)}}/>
            <span style={{color: "red"}}>{errorMessage.dob}</span>
            </div>
        </Form.Group>
        <Form.Group className="mb-3 d-flex align-items-center" controlId="formBasicGender">
            <Form.Label className="me-3 text-end" style={{ width: "153px" }}>Gender: </Form.Label>
            <div className="text-start pt-3">
            <div>
                <Form.Check inline type="radio" label="Male" name="gender" onChange={e => {handleGender(e)}}
                       value={"male"} className="me-3"/>
                <Form.Check inline type="radio" label="Female" name="gender" onChange={e => {handleGender(e)}}
                        value={"female"} className="me-3"/>
                <Form.Check inline type="radio" label="Other" name="gender" onChange={e => {handleGender(e)}}
                        value={"other"}/>
            </div>
            <span style={{color: "red"}}>{errorMessage.gender}</span>
            </div>
        </Form.Group>
        <Button type="submit" variant="primary">Register</Button>
    </Form>
    
</Container>

    );
}
export default Register;