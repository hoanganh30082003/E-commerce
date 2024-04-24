import { useContext, useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from 'axios';
import CartContext from "./CartContext";
import moment from 'moment';
const Verify = () => {
    const [user, setUser] = useState({});
    const { totalPrice } = useContext(CartContext);
    useEffect(() => {
        if (localStorage.getItem('verifiedUser')) {
            setUser(JSON.parse(localStorage.getItem('verifiedUser')));
        } else if (localStorage.getItem('user')) {
            setUser(JSON.parse(localStorage.getItem('user')));
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const verifiedUser = {
            id: user.id,
            name: user.name,
            address: user.address,
            email: user.email,
            phone: user.phone,
            role: user.role
        }
        localStorage.setItem('verifiedUser', JSON.stringify(verifiedUser));
        const sendRequest = async () => {
            try {
                const customerInfo = {
                    cusId: user.id || '',
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    address: user.address
                };
                const products = JSON.parse(localStorage.getItem('cart'));
                const date = moment().format('YYYY-MM-DD');
                const orderDetail = {
                    orderDate: date,
                    customer: customerInfo,
                    products: products
                }
                console.log(orderDetail);
                const response = await axios.post(`http://localhost:5000/api/create_payment_url`, {
                    amount: totalPrice,
                    bankCode: "",
                    language: "vn",
                    customer: customerInfo,
                    products: products
                });

                window.location.href = `${response.data.redirectUrl}` ;
            } catch (error) {
                alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
            }
        }
        sendRequest();

    }
    return (
        <Container>
            <h1 className="text-center">Verify</h1>
            <Form onSubmit={(e) => { handleSubmit(e) }}>
                <Form.Group>
                    <Form.Label>ID</Form.Label>
                    <Form.Control type="text" value={user.id} onChange={e => { setUser({ ...user, id: e.target.value }) }} readOnly />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={user.name} onChange={e => { setUser({ ...user, name: e.target.value }) }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" value={user.address || ''} onChange={e => { setUser({ ...user, address: e.target.value }) }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" value={user.email || ''} onChange={e => { setUser({ ...user, email: e.target.value }) }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="number" value={user.phone || ''} onChange={e => { setUser({ ...user, phone: e.target.value }) }} />
                </Form.Group>
                <Button type="submit" className="btn btn-primary m-3">Verify</Button>
            </Form>
        </Container>
    );
}
export default Verify;