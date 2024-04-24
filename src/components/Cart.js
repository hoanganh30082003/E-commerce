import { useContext } from "react";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';
import CartContext from "./CartContext";
const Cart = () =>{
    const [card,setCart] = useState([]);
    const {setTotalCartItem, setTotalPrice} = useContext(CartContext);
    const totalPriceWithTax = card.reduce((total,product) => {
        const totalProductPrice = product.price * product.userQuantity;
        const tax = totalProductPrice * 0.08;
        return total + totalProductPrice + tax;
    },0)
    setTotalPrice(totalPriceWithTax.toFixed(2));
    const featchData = async () =>{
        const products = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(products);
    }
    useEffect(() => {
        featchData();
    },[])
    
    const clearCart = () => {
        // card.map((product) => {
        //      axios.delete(`http://localhost:9999/cart/${product.id}`);
        // })
        localStorage.removeItem('cart');
        setCart([]);
        setTotalCartItem(0);
       alert('Cart Cleared');
    };
    
    return (
        <Container>
            <h2 className="text-center">Cart</h2>
            <div className="text-end">
                <Button variant="danger" className="m-3" onClick={() => clearCart()}>Clear Cart</Button>
            </div>
            
            <Table striped bordered>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {card.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td><img src={product.image} alt={product.name} style={{width: 100}}/></td>
                            <td>{product.userQuantity}</td>
                            <td>{product.price * product.userQuantity}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <h4>Total: {totalPriceWithTax.toFixed(2)}</h4>
            <Link to={"/cart/verify"} variant="primary" className="btn btn-primary">Buy</Link>
        </Container>
    );
}
export default Cart;