import React, { useEffect, useState } from "react";
import { Table, Container, Form, Row, Col, Button, ButtonGroup, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import UserSideBar from "./UserSideBar";

export default function Product() {
  const [product, setProduct] = useState([]);
  const [message, setMessage] = useState('');
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [catId, setCatId] = useState(0);
  const { cat_id } = useParams();
  const [show, setShow] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedProductId(id);
    setShow(true);
  };

  const fetchData = async () => {
    let products = cat_id ? await axios.get(`http://localhost:3000/products/?cataID=${cat_id}`) : await axios.get('http://localhost:3000/products');
    const categories = await axios.get('http://localhost:3000/category');
    setProduct(products.data);
    setFilterProducts(products.data);
    setCategory(categories.data);
  }

  useEffect(() => {
    fetchData();
  }, [cat_id]);

  const handleSearch = (e) => {
    const keyword = e.target.value;
    let results = [];
    if (!catId) {
      results = product.filter((q) => q.name.toLowerCase().includes(keyword.toLowerCase()));
    } else {
      results = product.filter((q) => q.name.toLowerCase().includes(keyword.toLowerCase()) && q.cataID === catId);
    }
    setFilterProducts(results);
    handleMessage(results);
  }

  const handleMessage = (results) => {
    if (results.length === 0) {
      setMessage('Không có sản phẩm');
    } else {
      setMessage('');
    }
  }

  const handleFilter = (e) => {
    const id = Number.parseInt(e.target.value);
    setCatId(id);
    if (id === 0) {
      setFilterProducts(product);
      return;
    }
    const results = product.filter((q) => q.cataID === id);
    setFilterProducts(results);
    handleMessage(results);
  }

  const handleDeleteProduct = async () => {
    await axios.delete(`http://localhost:3000/products/${selectedProductId}`)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        alert(error);
      });
    setShow(false);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={2} style={{ borderRight: "1px solid black" }}>
          <UserSideBar />
        </Col>
        <Col>
          <Row>
            <Col>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control placeholder="Type to search here" onChange={(e) => { handleSearch(e) }} />
                </Form.Group>
              </Form>
            </Col>
            <Col>
              <Form.Select onChange={(e) => handleFilter(e, setCatId(e.target.value))}>
                <option value={0} >Select Catagory</option>
                {category.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </Form.Select>
            </Col>
            <Col className="text-end">
              <Link to="/admin/product/create">Create</Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table striped bordered hover >
                <thead className="text-center">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Create at</th>
                    <th>Active</th>
                    <th>Catagory</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filterProducts.map((q) => (
                    <tr key={q.id} >
                      <td>{q.id}</td>
                      <td>{q.name}</td>
                      <td>{q.price}</td>
                      <td>{q.quantity}</td>
                      <td>{q.createAt}</td>
                      <td>{q.isActive ? 'Available' : 'Unavailable'}</td>
                      <td>{category && category.find((c) => Number.parseInt(c.id) === q.cataID)?.name}</td>
                      <td>
                        <ButtonGroup>
                          <Link className="btn btn-success" to={`/products/detail/${q.id}`}>Detail</Link>
                          <Link className="btn btn-primary" to={`/admin/product/edit/${q.id}`}>Edit</Link>
                          <Button variant="danger" onClick={() => handleShow(q.id)}>Delete</Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <span className="">{message}</span>
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this product?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeleteProduct}>Understood</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
