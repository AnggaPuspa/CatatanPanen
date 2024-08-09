// src/app/components/SaleForm.js

import { useState, useEffect } from 'react';

export default function SaleForm({ onAddSale, saleToEdit, onSaveEdit }) {
  const [product, setProduct] = useState('Cengkeh');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(1000);

  useEffect(() => {
    if (saleToEdit) {
      setProduct(saleToEdit.product);
      setQuantity(saleToEdit.quantity);
      setPrice(saleToEdit.price);
    }
  }, [saleToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSale = {
      product,
      quantity: parseFloat(quantity),
      price: parseFloat(price),
      total: parseFloat(quantity) * parseFloat(price),
      date: new Date().toLocaleDateString('id-ID'),
    };

    if (saleToEdit) {
      onSaveEdit(newSale);
    } else {
      onAddSale(newSale);
    }

    setProduct('Cengkeh');
    setQuantity(0);
    setPrice(1000);
  };

  return (
    <form onSubmit={handleSubmit} className="card shadow p-4 mb-4 bg-white border-0">
      <h5 className="card-title mb-3">{saleToEdit ? 'Edit Penjualan' : 'Tambah Penjualan'}</h5>

      <div className="mb-3">
        <label htmlFor="product" className="form-label">
          Jenis Produk
        </label>
        <select
          id="product"
          className="form-select"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        >
          <option value="Cengkeh">Cengkeh</option>
          <option value="Kopi">Kopi</option>
          <option value="Coklat">Coklat</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="quantity" className="form-label">
          Jumlah yang Dijual (Kg)
        </label>
        <input
          type="number"
          className="form-control"
          id="quantity"
          min="1"
          step="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Masukkan jumlah dalam Kg"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Harga per Unit (IDR)
        </label>
        <input
          type="number"
          className="form-control"
          id="price"
          min="1000"
          max="150000"
          step="1000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Pilih harga per unit"
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        {saleToEdit ? 'Simpan Perubahan' : 'Tambah Penjualan'}
      </button>
    </form>
  );
}
