import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMessages from "./pages/AdminMessages";
import AdminProjects from "./pages/AdminProjects";
import AdminServices from "./pages/AdminServices";
import AdminSettings from "./pages/AdminSettings";
import AdminLayout from "./components/AdminLayout";

function App() {
  const [whatsappNumber, setWhatsappNumber] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => setWhatsappNumber(data.whatsapp_number || ""));
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Home />
              </main>
              <Footer />
              <WhatsAppButton number={whatsappNumber} />
            </>
          } />
          <Route path="/services" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Services />
              </main>
              <Footer />
              <WhatsAppButton number={whatsappNumber} />
            </>
          } />
          <Route path="/portfolio" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Portfolio />
              </main>
              <Footer />
              <WhatsAppButton number={whatsappNumber} />
            </>
          } />
          <Route path="/portfolio/:id" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <ProjectDetail />
              </main>
              <Footer />
              <WhatsAppButton number={whatsappNumber} />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Contact />
              </main>
              <Footer />
              <WhatsAppButton number={whatsappNumber} />
            </>
          } />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
