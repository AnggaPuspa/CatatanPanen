// src/app/components/TotalInvoice.js

import { useRef } from 'react';
import html2canvas from 'html2canvas';

export default function TotalInvoice({ sales }) {
  const invoiceRef = useRef(null);

  const generateTotalInvoice = () => {
    if (invoiceRef.current) {
      html2canvas(invoiceRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'total-invoice.png';
        link.click();
      });
    }
  };

  const totalRevenue = sales.reduce((acc, sale) => acc + sale.total, 0);

  return (
    <div>
      <div ref={invoiceRef} className="card shadow p-4 bg-white border-0">
        <h5 className="card-title mb-3 text-center">Invoice Total Penjualan</h5>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Produk</th>
              <th>Jumlah</th>
              <th>Harga</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, index) => (
              <tr key={index}>
                <td>{sale.product}</td>
                <td>{sale.quantity}</td>
                <td>{sale.price.toLocaleString()}</td>
                <td>{sale.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3">
          <h5>Total Pendapatan Keseluruhan: <span className="text-success">IDR {totalRevenue.toLocaleString()}</span></h5>
        </div>
      </div>
      <button onClick={generateTotalInvoice} className="btn btn-success w-100 mt-3">
        Unduh Total Invoice
      </button>
    </div>
  );
}
