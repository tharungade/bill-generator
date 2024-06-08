import { useLocation } from 'react-router-dom'
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import { getRoundedValue } from '../utils/index';

export default function GenerateBill() {
    const location = useLocation()
    let selectedProducts = location.state?.selectedProducts

    if(!selectedProducts || !selectedProducts.length)
    {
        return (
            <>
                <p>no items to generate bill.</p>
            </>
        )
    }

    return (
        <>
            <div>
                <table id="mytable" className="w-full text-sm text-left rtl:text-right">
                    <thead className="text-xs uppercase">
                        <tr>
                            <th className="px-6 py-3">s.no</th>
                            <th className="px-6 py-3">product name</th>
                            <th className="px-6 py-3">unit price</th>
                            <th className="px-6 py-3">quantity</th>
                            <th className="px-6 py-3">total price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                             selectedProducts.map((product, index) => 
                             (
                                <tr key={index} className="border-b dark:border-gray-700">
                                    <td className="px-6 py-4">
                                        {index + 1}
                                    </td>
                                    <th className="px-6 py-4 font-medium whitespace-nowrap">
                                    {product.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {getRoundedValue(product.price, 2)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.quantity}
                                    </td>
                                    <td className="px-6 py-4">
                                        {getRoundedValue(product.price * product.quantity, 2)}
                                    </td>
                                </tr>
                             )
                             )
                        }
                        <tr className="border-b dark:border-gray-700">
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4"></td>
                            <th className="px-6 py-4 font-medium whitespace-nowrap">
                                Total Price
                            </th>
                            <th className="px-6 py-4 font-medium whitespace-nowrap">
                                {getRoundedValue(selectedProducts.reduce((result, product) => result + product.price * product.quantity, 0), 2)}
                            </th>
                        </tr>
                    </tbody>
                </table>
                <div className="text-center">
                    <button className="px-7 py-3 m-2 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-large rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" type="button" onClick={generatePDF}>Download Bill</button>
                </div>
            </div>
        </>
    )
}   

function generatePDF()
{
    const table = document.getElementById('mytable');
    html2canvas(table)
    .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        // TODO: implement pdf generation also
        // const pdf = new jsPDF();
        // pdf.addImage(imgData, 'PNG', 0, 0);
        // pdf.save("download.pdf");  
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'bill.png';
        link.click();
    });
}

