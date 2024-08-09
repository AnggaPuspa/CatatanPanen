import { useRef } from 'react';
import html2canvas from 'html2canvas';
import '../style/invoice.css'
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
    <div className="invoice-container">
      <div ref={invoiceRef} className="invoice card shadow p-4 bg-white border-0">
        <div className="invoice-header mb-4">
          <h5 className="text-center mb-3">Invoice Penjualan</h5>
        </div>
        <div className="invoice-body">
          <div className="invoice-item d-flex justify-content-between mb-3">
            <span><strong>Tanggal:</strong></span>
            <span>{sale.date}</span>
          </div>
          <div className="invoice-item d-flex justify-content-between mb-3">
            <span><strong>Jenis Produk:</strong></span>
            <span>{sale.product}</span>
          </div>
          <div className="invoice-item d-flex justify-content-between mb-3">
            <span><strong>Jumlah (Kg):</strong></span>
            <span>{sale.quantity}</span>
          </div>
          <div className="invoice-item d-flex justify-content-between mb-3">
            <span><strong>Harga:</strong></span>
            <span>{sale.price.toLocaleString()}</span>
          </div>
          <div className="invoice-item d-flex justify-content-between mb-3">
            <span><strong>Total Pendapatan (IDR):</strong></span>
            <span>{sale.total.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <button onClick={generateInvoice} className="btn btn-success w-100 mt-3">
        Unduh Invoice
      </button>
    </div>
  );
}
