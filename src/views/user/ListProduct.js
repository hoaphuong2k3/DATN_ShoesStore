import React, { useState, useEffect } from "react";
// import Table from 'react-bootstrap/Table';
import { Container } from "reactstrap";
import { FormTextProps } from "reactstrap";
function Shop() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://datnshoes-default-rtdb.firebaseio.com/shoesdetails.json")
            .then((response) => response.json())
            .then((data) => {
                const productsArray = Object.values(data);
                setProducts(productsArray);
                console.log(productsArray);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-danger">Shop</h1>
            {products.map((product) => (
                <div key={product.code}>
                    <img src={product.anh} alt={product.ten} />
                    <h3>{product.ten}</h3>
                    <p>Code: {product.code}</p>
                    <p>Price: {product.gia}</p>
                </div>
            ))}
        </div>
    );
}

export default Shop;