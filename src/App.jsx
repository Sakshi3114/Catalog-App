// App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ItemDetail from "./pages/ItemDetail";

export default function App() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <Navbar />
      {/* ↓ Remove the padding here — let each page handle its own top spacing */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item/:itemname" element={<ItemDetail />} />
        </Routes>
      </main>
    </div>
  );
}
