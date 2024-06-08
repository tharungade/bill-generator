import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Product } from '../models/product';
import { SelectedProduct } from '../models/selectedProduct';
import { getRoundedValue } from '../utils/index';



export default function Products()
{
    let [prodList, setprodList] = useState<Product[]>([]);;
    let [isLoading, setLoading] = useState<boolean>(true);
    let [products, setProducts] = useState<Product[]>([]);
    let [selectedProducts, SetSelectedProducts] = useState<SelectedProduct[]>([]);

    useEffect(() => {
        const scriptUrl = 'https://script.google.com/macros/s/AKfycbyeGwklZpNVaVu9CZuFo9L-1CFrjOJ3D_HDDAM93Fy-P6mZp8wq0XQZb22FTG4Y7lst/exec';
        fetch(scriptUrl)
        .then(response => response.json())
        .then(data => {
            if(data)
            {
                setprodList(data);
                setProducts(data);
                setLoading(false);
            }
        });
    }, []);

    function searchForProduct(searchKey: string) {
        if(searchKey)
        {
            setProducts(prodList.filter(_ => _.name.toLowerCase().includes(searchKey.toLowerCase())));
        }
        else
        {
            setProducts(prodList);
        }
    }

    if(isLoading)
    {
        return (
            <>
                <h1 className="text-center">Loading products...</h1>
            </>
        );
    }

    return (
        <>
            { selectedProducts.length > 0 && <div className="w-full flex justify-between p-2 bg-white border border-gray-900 items-center rounded-2xl">
                <div>
                    <h1>{selectedProducts.length} items | Rs. {getRoundedValue(selectedProducts.reduce((acc, curr) => acc + (products.find(_ => _.id == curr.id)?.price ?? 0) * curr.quantity, 0), 2)}</h1>
                </div>
                <div>
                <Link to="/generatebill" state={{ selectedProducts : selectedProducts }}>
                    <button className="px-7 py-3 m-2 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">generate bill</button>
                </Link>
                </div>
            </div> }
            <div className="p-5">
                <input type="text" className="w-full  p-2 border-2 border-gray-900 rounded-2xl" placeholder="search" onChange={($event) => searchForProduct($event.target.value)} />
            </div>
            <div>
                {
                    products.map((product, index) => 
                    <div className="flex justify-between items-center px-5 py-1 bg-gray-900 text-white border-b" key={index}>
                        <div>
                            <h1>{product.name}</h1>
                            <h3>Rs. {getRoundedValue(product.price, 2)}</h3>
                        </div>
                        <div>
                            {
                            selectedProducts.find(_ => _.id == product.id)  && 
                                <div className="flex items-center">
                                    <button className="px-2 border rounded mx-1 bg-white text-black" onClick={() => removeProduct(product.id)}>-</button><p>{selectedProducts.find(_ => _.id == product.id)?.quantity} products</p><button className="px-2 border rounded mx-1 bg-white text-black" onClick={() => addProduct(product.id)}>+</button>
                                </div>
                            }
                            {
                                !selectedProducts.find(_ => _.id == product.id) &&
                                <button className="px-5 py-1 border rounded-2xl bg-white text-black" onClick={() => addProduct(product.id)}>Add</button>
                            }
                        </div>
                    </div>)
                }
            </div>
        </>
    );

    function addProduct(productId: number): void {
        if(selectedProducts.find(product => product.id == productId)) {
            SetSelectedProducts(selectedProducts.map(product => {
                if(product.id == productId)
                {
                    product.quantity++;
                }

                return product;
            }));
        }
        else {
            let selectedProduct = products.find(_ => _.id == productId);
            SetSelectedProducts([...selectedProducts, {id: productId, name: selectedProduct?.name ?? "", price: selectedProduct?.price ?? 0, quantity: 1}]);
        }
    }

    function removeProduct(productId: number): void {
        if(selectedProducts.find(product => product.id == productId)) {
            SetSelectedProducts(selectedProducts.map(product => {
                if(product.id == productId)
                {
                    product.quantity--;
                }

                return product;
            }).filter(product => product.quantity > 0));
        }
    }
}