import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ItemDetail from "./pages/ItemDetail";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item/:itemname" element={<ItemDetail />} />
        </Routes>
      </main>
    </div>
  );
}
