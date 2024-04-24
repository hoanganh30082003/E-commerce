import { Button, Container, Form, Col } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import  UserContext  from "./UserProvider";
const Login = () => {
    const [users,setUsers] = useState([]);
    const [visitor,setVisitor] = useState({});
    const [errorMessage,setErrorMessage] = useState(false);
    const navigate = useNavigate();
    const {user,setUser} = useContext(UserContext);
    const fetchData = async () => {
        const user = await axios.get('http://localhost:3000/account');
        setUsers(user.data);

    }
    useEffect(() => {
        fetchData();
        const remmember = JSON.parse(localStorage.getItem('remmember'));
        if (remmember) {
            setVisitor(remmember);
        }
    },[])
    const handleSumbit = (e) => {
        e.preventDefault();
        const validUser = users.some(u => u.email === visitor.email && u.password === visitor.password);
        if (!validUser) {
          setErrorMessage(true);
          return;
        }
        if (visitor.rememberMe) {
            localStorage.setItem('remmember', JSON.stringify({email:visitor.email,password:visitor.password}));
        }
        const loggedUser = users.find(u => u.email === visitor.email && u.password === visitor.password);
        localStorage.setItem('user', JSON.stringify({id: loggedUser.id, email: loggedUser.email, role: loggedUser.role}));
        setUser(loggedUser);
        if (loggedUser.role === 'admin') {
          navigate('/admin/products');
        } else {
          navigate('/');
        }
      }
    return (
        <Container className="w-50 mb-5">
            <h1 className="text-center">Sign In</h1>
            <Form className="" onSubmit={(e) => { handleSumbit(e) }}>
                <Form.Group className="mb-3 d-flex align-items-center" controlId="formBasicEmail">
                    <Form.Label className="me-3 text-end" style={{ width: "200px" }}>Email address:</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={visitor.email}  onChange={e => {setVisitor({...visitor,email:e.target.value})}}/>
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center" controlId="formBasicPassword">
                    <Form.Label className="me-3 text-end" style={{ width: "200px" }}>Password:</Form.Label>
                    <div className="text-start w-100 pt-3">
                    <Form.Control type="password" placeholder="Enter password" value={visitor.password}  onChange={e => {setVisitor({...visitor,password:e.target.value})}}/>
                    {errorMessage && <span style={{color: "red"}}>Email or password is incorrect!</span>}
                    </div>
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center" controlId="formBasicCheckbox">
                <Col md={3}></Col>
                <Col md={9}><Form.Check type="checkbox" label="Remember me" onChange={e => {setVisitor({...visitor,rememberMe:e.target.checked})}} /></Col>
                </Form.Group>
                <div className="text-center">
                <Button type="submit" variant="primary">Register</Button>
                </div>
            </Form>
        </Container>

    );
}
export default Login;