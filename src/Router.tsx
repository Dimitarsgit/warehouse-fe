import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TransactionPage } from './pages/transaction';
import { ItemPage } from './pages/item';
import { WarehousePage } from './pages/warehouse';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TransactionPage />} />
        <Route path="/item" element={<ItemPage />} />
        <Route path="/warehouse" element={<WarehousePage />} />
        <Route path="*" element={<>404 Not Found</>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
