import { useState } from "react";
import { Product } from '../models/product';
import { SelectedProduct } from '../models/selectedProduct';

export default function Products()
{
    let [searchKey, setSearchKey] = useState("");
    let [products, setProducts] = useState<Product[]>([{id: 1, name: 'Product 1', price : 23.44}, {id: 2, name: 'Product 2', price : 23}, {id: 3, name: 'Product 3', price : 29}, , {id: 3, name: 'Product 3', price : 29}, {id: 3, name: 'Product 3', price : 29}, {id: 3, name: 'Product 3', price : 29}, {id: 3, name: 'Product 3', price : 29}, {id: 3, name: 'Product 3', price : 29}, {id: 3, name: 'Product 3', price : 29}, {id: 3, name: 'Product 3', price : 29}, {id: 3, name: 'Product 3', price : 29}, {id: 3, name: 'Product 3', price : 29}, {id: 3, name: 'Product 3', price : 29}, {id: 3, name: 'Product 3', price : 29}, {id: 3, name: 'Product 3', price : 29}, {id: 3, name: 'Product 3', price : 29}, {id: 3, name: 'Product 3', price : 29}, {id: 3, name: 'Product 3', price : 29}, {id: 3, name: 'Product 3', price : 29}, {id: 3, name: 'Product 3', price : 29}, , {id: 3, name: 'Product 3', price : 29}, , {id: 3, name: 'Product 3', price : 29}]);
    let [selectedProducts, SetSelectedProducts] = useState<SelectedProduct[]>([{id: 1, quantity: 1}, {id: 3, quantity: 3}]);

    return (
        <>
            <div className="p-5">
                <input type="text" className="w-full  p-2 border-2 border-gray-900 rounded-2xl" placeholder="search" onChange={($event) => setSearchKey(event.target.value)} />
            </div>
            <div style={{maxHeight: '70vh'}} className="overflow-auto">
                {
                    products.map((product, index) => <div className="flex justify-between items-center px-5 py-1 bg-gray-900 text-white border-b" key={index}>
                                                            <div>
                                                                <h1>{product.name}</h1>
                                                                <h3>Rs. {product.price}</h3>
                                                            </div>
                                                            <div>
                                                                <button className="px-5 py-1 border rounded-2xl bg-white text-black">Add</button>
                                                            </div>
                                                  </div>)
                }
            </div>
            <AddedProductsInfo ></AddedProductsInfo>
        </>
    );

    function AddedProductsInfo()
    {
        if(selectedProducts.length == 0)
            return;

        return <div className="fixed inset-x-0 bottom-0 w-full flex justify-between p-2 bg-white border border-gray-900 items-center rounded-2xl">
                    <div>
                        <h1>{selectedProducts.length} items | Rs. {selectedProducts.reduce((acc, curr) => acc + (products.find(_ => _.id == curr.id)?.price ?? 0) * curr.quantity, 0)}</h1>
                    </div>
                    <div>
                        <button className="px-7 py-3 m-2 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">generate bill</button>
                    </div>
               </div>
    }
}