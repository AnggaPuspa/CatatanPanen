// src/app/components/SalesTable.js

import { useState } from 'react';
import TotalInvoice from './TotalInvoice';
import '../style/sales.css'

export default function SalesTable({ sales, onViewInvoice, onEditSale, onDeleteSale }) {
  const [showTotalInvoice, setShowTotalInvoice] = useState(false);

  const totalRevenue = sales.reduce((acc, sale) => acc + sale.total, 0);

  return (
    <div className="card shadow p-4 mb-4 bg-white border-0">
      <h5 className="card-title mb-3 text-center">Daftar Penjualan</h5>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>Produk</th>
              <th>Jumlah</th>
              <th>Harga</th>
              <th>Total</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, index) => (
              <tr key={index}>
                <td>{sale.product}</td>
                <td>{sale.quantity}</td>
                <td>{sale.price.toLocaleString()}</td>
                <td>{sale.total.toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-link p-0"
                    onClick={() => onViewInvoice(sale)}
                  >
                    Lihat Invoice
                  </button>
                  <button
                    className="btn btn-warning btn-sm ms-2"
                    onClick={() => onEditSale(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => onDeleteSale(index)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-end mt-3">
        <h5>Total Pendapatan: <span className="text-success">IDR {totalRevenue.toLocaleString()}</span></h5>
      </div>

      <button
        className="btn btn-primary w-100 mt-3"
        onClick={() => setShowTotalInvoice(!showTotalInvoice)}
      >
        {showTotalInvoice ? 'Sembunyikan Total Invoice' : 'Tampilkan Total Invoice'}
      </button>

      {showTotalInvoice && <TotalInvoice sales={sales} />}
    </div>
  );
}
