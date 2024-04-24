import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
const UserSideBar = () =>{
    const [category,setCategory] = useState([]);
    const fetchData = async () => {
        const categories = await axios.get('http://localhost:3000/category');
        setCategory(categories.data);
    }
    useEffect(() => {
        fetchData();
    }, []);
    return(
        <div>
            {category.map((c) => <Link to={`/products/category/${c.id}`} className="btn btn-danger m-2 w-75 text-start" disabled key={c.id}>{c.name}</Link>)}
        </div>
    );
}
export default UserSideBar;