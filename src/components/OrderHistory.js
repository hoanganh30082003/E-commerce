import { Container, Table } from "react-bootstrap";
import axios from 'axios';
import { useEffect, useState } from "react";
const OrderHistory = () =>{
    const [orders, setOrders] = useState([]);
    const fetchData = async () => {
        const response = await axios.get('http://localhost:3000/DetailOrders');
        setOrders(response.data);
    }
    useEffect(() => {
        fetchData();
    },[])
    return (
        <Container>
         <Table striped bordered hover>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Order Date</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                </tr>   
            </thead>
            <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.OrderDate}</td>
                        <td>{order.customer.name}</td>
                        <td>{order.total}</td>
                        <td>{order.status}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </Container>
    );
}
export default OrderHistory;