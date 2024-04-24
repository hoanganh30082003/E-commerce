import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
const AddProduct = () => {
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [id, setId] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [date, setDate] = useState('');
    const [name, setName] = useState('');
    const [cataID, setCataID] = useState(1);
    const [status, setStatus] = useState(false);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState({
    });
    const fetchData = async () => {
        const products = await axios.get('http://localhost:3000/products');
        const categories = await axios.get('http://localhost:3000/category');
        setProduct(products.data);
        setCategory(categories.data);

    }
    useEffect(() => {
        fetchData();
    }, [])
    const validateForm = () => {
        const errors = {};
        //handle for ID
        if (!id) {
            errors.id = 'ID cannot be empty.';
        } else {
            const isNotDuplicate = !product.some(product => product.id === id);
            const regex = /^P\d{3}$/;
            if (!regex.test(id)) {
                errors.id = 'Invalid product ID. Ex: P123';
            } else if (!isNotDuplicate) {
                errors.id = 'ID already exists.';
            }
        }
        //handle for name
        if (!name) {
            errors.name = 'Name cannot be empty.';
        }

        //handle for number
        const handleNumber = (field, value) => {
            if (!value) {
                errors[field] = 'Your ' + field + ' value cannot be empty.'
            } else if (value <= 0) {
                errors[field] = 'Your ' + field + ' value is invalid.';
            }
        };

        handleNumber('price', price);
        handleNumber('quantity', quantity);

        //handle for date
        if (!date) {
            errors.date = 'Date cannot be empty.';
        } else {
            const DateInput = new Date(date);
            const currentDate = Date.now();
            if (DateInput < currentDate) {
                errors.date = 'Date must be greater than today.';
            }
        }

        return errors;
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const error = validateForm();
        setErrorMessage(error);
        if (Object.keys(error).length > 0) {
            event.preventDefault();
            event.stopPropagation();
            alert(Object.entries(errorMessage).map(([key, value]) => value).join('\n'));
        } else {
            const newProduct = {
                id: id,
                name: name,
                price: Number.parseInt(price),
                quantity: Number.parseInt(quantity),
                cataID: Number.parseInt(cataID),
                createAt: date,
                isActive: status
            }
            const AddNewProduct = async () => {
                await axios.post('http://localhost:3000/products', newProduct)
                    .then(() => {
                        alert('Order added successfully!');
                        navigate('/admin/products');
                    })
                    .catch((error) => {
                        alert(error);
                    })
            }
            AddNewProduct();
        }
    };
    return (
        <Container className="mb-3">
            <Row>
                <Col lg="10"><h1 className="text-center">Create Product</h1></Col>
                <Col lg="2" className="text-end " ><Link to="/">Home</Link></Col>
            </Row>
            <Form onSubmit={event => handleSubmit(event)}>
                <Form.Group md="12">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your ID"
                        onChange={e => { setId(e.target.value) }}
                        name="id"
                        isInvalid={!!errorMessage.id}
                    />
                    <Form.Control.Feedback type="invalid" className="text-danger">{errorMessage.id}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group md="12">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Your Name"
                        name="name"
                        onChange={e => { setName(e.target.value) }}
                        isInvalid={!!errorMessage.name}
                    />
                    <Form.Control.Feedback type="invalid" className="text-danger">{errorMessage.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group md="12">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter your price"
                        name="price"
                        onChange={e => setPrice(e.target.value)}
                        isInvalid={!!errorMessage.price}
                    />
                     <Form.Control.Feedback type="invalid" className="text-danger">{errorMessage.price}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="12">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter your quantity."
                        name="quantity"
                        onChange={e => setQuantity(e.target.value)}
                        isInvalid={!!errorMessage.quantity}
                    />
                    <Form.Control.Feedback type="invalid" className="text-danger">{errorMessage.quantity}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="12">
                    <Form.Label>Create at</Form.Label>
                    <Form.Control type="date"
                        placeholder="Enter your date."
                        name="date"
                        onChange={e => { setDate(e.target.value) }}
                        isInvalid={!!errorMessage.date}
                    />
                    <Form.Control.Feedback type="invalid" className="text-danger">{errorMessage.date}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="12">
                    <Form.Label>Catagory</Form.Label>
                    <Form.Select aria-label="Default select example"
                        name="category"
                        onChange={e => { setCataID(e.target.value) }}
                    >
                        {category.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check
                        label="Status"
                        onChange={e => { setStatus(e.target.checked) }}
                    />
                </Form.Group>

                <Button type="submit" className="btn btn-success">Submit form</Button>
            </Form>
        </Container>
    );
}
export default AddProduct;