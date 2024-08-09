// src/app/components/SalesTable.js

export default function SalesTable({ sales, onViewInvoice }) {
    const totalRevenue = sales.reduce((acc, sale) => acc + sale.total, 0);
  
    return (
      <div className="card shadow p-4 mb-4 bg-white border-0">
        <h5 className="card-title mb-3">Daftar Penjualan</h5>
  
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>Produk</th>
                <th>Jumlah</th>
                <th>Harga per Unit (IDR)</th>
                <th>Total (IDR)</th>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        <div className="d-flex justify-content-end mt-3">
          <h5>Total Pendapatan: <span className="text-success">IDR {totalRevenue.toLocaleString()}</span></h5>
        </div>
      </div>
    );
  }
  