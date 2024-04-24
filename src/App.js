import Product from "./components/Product";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import DetailProduct from "./components/DetailProduct";
import UpdateProduct from "./components/UpdateProduct";
import Home from "./components/Home";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminRoute from "./components/AdminRoute";
import { UserProvider } from "./components/UserProvider";
import Cart from './components/Cart';
import Verify from './components/Verify';
import { CartProvider } from "./components/CartContext";
import OrderHistory from "./components/OrderHistory";
import Success from './components/Success';
import FailTransaction from "./components/FailTransaction";
function App() {
  
  return (
    <div>
      <UserProvider>
        <CartProvider>
      <BrowserRouter>
        <Header />
        <Row>
          <Col xs={12} sm={12} md={12}>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/Sign-in" element={<Login />} />
          <Route path="/auth/Sign-up" element={<Register />} />
          <Route path="/product/detail/:id" element={<DetailProduct />} />
          <Route path="/admin/products" element={<AdminRoute Component={Product} />} />
          <Route path="/admin/product/create" element={<AdminRoute Component={AddProduct} />} />
          <Route path="/admin/product/edit/:pro_id" element={<AdminRoute Component={UpdateProduct} />} />
          <Route path="/admin/products/category/:cat_id" element={<AdminRoute Component={Product} />} />
          <Route path='/cart' element = {<Cart/>}/>
          <Route path='/cart/verify' element = {<Verify/>}/>
          <Route path='/order/history' element = {<OrderHistory/>}/>
          <Route path='/success' element = {<Success/>}/>
          <Route path='/fail' element = {<FailTransaction/>}/>
        </Routes>
          </Col>
        </Row>
        <div style={{ textAlign: "center", backgroundColor: "#f5f5f5", lineHeight: "50px" }}>
          Footer
        </div>
      </BrowserRouter>
      </CartProvider>
      </UserProvider>
    </div>
  );
}

export default App;
