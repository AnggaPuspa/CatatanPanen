// src/app/components/Invoice.js

import { useRef } from 'react';
import html2canvas from 'html2canvas';

export default function Invoice({ sale }) {
  const invoiceRef = useRef(null);

  const generateInvoice = () => {
    if (invoiceRef.current) {
      html2canvas(invoiceRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = `invoice-${sale.date}.png`;
        link.click();
      });
    }
  };

  return (
    <div>
      <div ref={invoiceRef} className="card shadow p-4 bg-white border-0">
        <h5 className="card-title mb-3">Invoice Penjualan</h5>
        <p><strong>Tanggal Pembuatan:</strong> {sale.date}</p>
        <p><strong>Jenis Produk:</strong> {sale.product}</p>
        <p><strong>Jumlah (Kg):</strong> {sale.quantity}</p>
        <p><strong>Harga per Unit (IDR):</strong> {sale.price.toLocaleString()}</p>
        <p><strong>Total Pendapatan (IDR):</strong> {sale.total.toLocaleString()}</p>
      </div>
      <button onClick={generateInvoice} className="btn btn-success w-100 mt-3">
        Unduh Invoice
      </button>
    </div>
  );
}
