// src/app/page.js

'use client';

import { useState, useEffect } from 'react';
import SaleForm from './components/SaleForm';
import SalesTable from './components/SalesTable';
import Invoice from './components/Invoice';

export default function Home() {
  const [sales, setSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  // Memuat data penjualan dari Local Storage saat halaman dimuat
  useEffect(() => {
    const savedSales = JSON.parse(localStorage.getItem('sales')) || [];
    setSales(savedSales);
  }, []);

  // Menyimpan data penjualan ke Local Storage setiap kali data penjualan berubah
  useEffect(() => {
    if (sales.length > 0) {
      localStorage.setItem('sales', JSON.stringify(sales));
    }
  }, [sales]);

  const handleAddSale = (newSale) => {
    setSales([...sales, newSale]);
  };

  const handleEditSale = (index) => {
    setEditIndex(index);
  };

  const handleSaveEdit = (updatedSale) => {
    const updatedSales = [...sales];
    updatedSales[editIndex] = updatedSale;
    setSales(updatedSales);
    setEditIndex(null);
  };

  const handleDeleteSale = (index) => {
    const updatedSales = sales.filter((_, i) => i !== index);
    setSales(updatedSales);
  };
  

  const handleViewInvoice = (sale) => {
    setSelectedSale(sale);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Catatan Penjualan</h1>
      <div className="row">
        <div className="col-md-4">
          <SaleForm
            onAddSale={handleAddSale}
            saleToEdit={editIndex !== null ? sales[editIndex] : null}
            onSaveEdit={handleSaveEdit}
          />
        </div>
        <div className="col-md-8">
          <SalesTable
            sales={sales}
            onViewInvoice={handleViewInvoice}
            onEditSale={handleEditSale}
            onDeleteSale={handleDeleteSale}
          />
        </div>
        {selectedSale && (
          <div className="col-12 mt-4">
            <Invoice sale={selectedSale} />
          </div>
        )}
      </div>
    </div>
  );
}
