import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

export const Layout = () => {
  return (
    <div className="app-container">
      <Header />
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
