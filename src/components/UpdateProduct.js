import { useEffect } from "react";
import { useState } from "react";
import { useParams,Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Col, Row, Form, Button } from 'react-bootstrap';
const UpdateProduct = () => {
    const [product, setProduct] = useState({});
    const { pro_id } = useParams();
    const [category, setCatagory] = useState([]);
    const navigate = useNavigate();
    const fetchData = async () => {
        const products = await axios.get(`http://localhost:3000/products/${pro_id}`);
        const categories = await axios.get('http://localhost:3000/category');
        setProduct(products.data);
        setCatagory(categories.data);
    }
    
    useEffect(() => {
        fetchData();
    }, [])

    const handleUpdate = (event) => {   
        event.preventDefault();
        const updateProduct = {
            id: product.id,
            name: product.name,
            price: Number.parseInt(product.price),
            quantity: Number.parseInt(product.quantity),
            cataID: Number.parseInt(product.cataID),
            createAt: product.createAt,
            isActive : product.isActive
        }
        try {
         axios.put(`http://localhost:3000/products/${pro_id}`, updateProduct);
         alert('Update successfully!');
         navigate('/');
        } catch (error) {
            alert('Update failed!');
        }
    }

    return (
        <div>            
                <Row>
                <Col lg="10"><h1 className="text-center">UpdateProduct</h1></Col>
                <Col lg="2" className="text-end " ><Link to="/">Home</Link></Col>
            </Row>
            <Form onSubmit={e => {handleUpdate(e)}}>
                <Form.Group md="12">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                        type="text"
                        value={product.id}
                        name="id"
                        readOnly
                    />
                </Form.Group>
                <Form.Group md="12" controlId="validationCustom02">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={product.name}
                        name="name"
                        onChange={e => {setProduct({...product, name: e.target.value})}}
                    />

                </Form.Group>
                <Form.Group md="12">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        value={product.price}
                        name="price"
                        onChange={e => {setProduct({...product, price: e.target.value})}}
                    />
                </Form.Group>

                <Form.Group as={Col} md="12">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        value={product.quantity}
                        name="quantity"
                        onChange={e => {setProduct({...product, quantity: e.target.value})}}
                    />
                </Form.Group>
                <Form.Group as={Col} md="12">
                    <Form.Label>Create at</Form.Label>
                    <Form.Control type="date"
                        value={product.createAt}
                        name="date"
                        onChange={e => {setProduct({...product, createAt: e.target.value})}}
                    />
                </Form.Group>
                <Form.Group as={Col} md="12">
                    <Form.Label>Catagory</Form.Label>
                    <Form.Select aria-label="Default select example"
                        name="category"
                        value={product.cataID}
                        onChange={e => {setProduct({...product, cataID: e.target.value})}}
                    >
                        {category.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check
                        label="Status"
                        value={product.isActive}
                        name="status"
                        onChange={e => {setProduct({...product, isActive: e.target.value})}}
                    />
                </Form.Group>

                <Button type="submit" className="btn btn-success">Update Product</Button>
            </Form>
       
        </div>
    );
};
export default UpdateProduct;