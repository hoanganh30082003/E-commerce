import { Link } from "react-router-dom";
import { useContext } from "react";
import  UserContext  from "./UserProvider";
import CartContext from "./CartContext";
import {Row, Col} from 'react-bootstrap';
const LogIn = () => {
    return (
        <div>
            <Link to="/auth/Sign-up">Sign Up</Link> <span> | </span> <Link to="/auth/Sign-in">Sign In</Link>
        </div>
    );
}
const Logged = ({user , setUser}) => {
   
    const handleLogOut  = () => {
        localStorage.removeItem('user');
        setUser(null);
    }
    return (
        <div>
            {user.email} <span> | </span> <Link to="/auth/Sign-in" onClick={e => handleLogOut(e)}>Sign Out</Link>
        </div>
    );
}
const Header = () => {
    const {user, setUser} = useContext(UserContext);
    const {totalCartItem} = useContext(CartContext);
    return(
        <div  style={{ lineHeight: "50px", backgroundColor: "#f5f5f5" }}>
            <Row>
            <Col lg={9}></Col>
            <Col lg={3} className="d-flex justify-content-end"> <a href='/cart' >Cart({totalCartItem})</a> <span> | </span> {user ? <Logged user={user} setUser={setUser}/>  : <LogIn/>}</Col>
            </Row>
            
            
        </div>
    );
}
export default Header;