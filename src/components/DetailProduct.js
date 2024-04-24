import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
const DetailProduct = () => {
   const [product, setProduct] = useState({});
    const {id} = useParams();
    const [category, setCategory] = useState([]);
     const fetchData = async () => {
        const products = await axios.get(`http://localhost:3000/products/${id}`);
        const categories = await axios.get('http://localhost:3000/category');
        setProduct(products.data);
        setCategory(categories.data);
    }
    
    useEffect(() => {
        fetchData();
    },[])

    const statusText = product.isActive ? 'Available' : 'Unavailable';
  
    return (
      <div>
        <Link to="/" >home</Link>
        <h1>DetailProduct</h1>
        <p>ID: {product.id}</p>
        <p>Name: {product.name}</p>
        <p>Price: {product.price}</p>
        <p>Quantity: {product.quantity}</p>
        <p>Category: {category.find((c) => Number.parseInt(c.id) === product.cataID)?.name}</p>
        <p>Create At: {product.createAt}</p>
        <p>Status: {statusText}</p>
      </div>
    );
  };
  export default DetailProduct;
  