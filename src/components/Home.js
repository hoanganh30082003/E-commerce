import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { Button, Card, CardBody, Col, Row, Image } from "react-bootstrap";
import UserSideBar from "./UserSideBar";
import { Link } from "react-router-dom";
import CartContext from "./CartContext";

const Home = () =>{
    const [product, setProduct] = useState([]);
    const {setTotalCartItem} = useContext(CartContext);
    const fetchData = async () => {
        const products = await axios.get('http://localhost:3000/products');
        setProduct(products.data);
    } 
    useEffect(() => {
        fetchData();
    }, []);

    const handleAddToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        const oldItem = cart.findIndex((item) => item.id === product.id);
        if (oldItem !== -1) {
            cart[oldItem].userQuantity++; 
        } else {
            const newProduct = {...product, userQuantity: 1 };
            cart.push(newProduct);
            setTotalCartItem(cart.length);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    return (
        <div>
           <Row>
                <Col xs={12} sm={2} md={2} style={{ borderRight: "1px solid black"}}>
                    <UserSideBar/>
                </Col>
                <Col xs={12} sm={6} md={10}>
                <Row>
                {product.map(p => (
                <Col xs={12} sm={6} md={3} key={p.id}>
                         <Card  className="mb-2">
                            <CardBody className="text-center">
                                <Image src={p.image} style={{width: "200px", height: "200px" }} />
                                <p>{p.price}$</p>
                                <Link to={`/product/detail/${p.id}`} className="btn btn-primary">Detail</Link>
                                <Button onClick={() => handleAddToCart(p)}> Add To Cart</Button>
                            </CardBody>
                        </Card>
                </Col>
                ))}
                </Row>
                </Col>
            </Row>
        </div>
    );
}
export default Home;