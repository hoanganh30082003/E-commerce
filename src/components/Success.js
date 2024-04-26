import { Link, useParams } from "react-router-dom";

const Success = () => {
    const orderInfo = useParams();
    return (
        <div className="text-center">
            <h1>Order Success</h1>
            {/* <p>Order Info: {orderInfo}</p> */}
            <Link to="/">Home</Link>
        </div>
    );
}

export default Success;