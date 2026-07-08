import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import { motion, AnimatePresence } from "motion/react";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-bg">
          <Navbar />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={
                  <PageTransition><Home /></PageTransition>
                } />
                <Route path="/services" element={
                  <PageTransition><Services /></PageTransition>
                } />
                <Route path="/pricing" element={
                  <PageTransition><Pricing /></PageTransition>
                } />
                <Route path="/portfolio" element={
                  <PageTransition><Portfolio /></PageTransition>
                } />
                <Route path="/portfolio/:id" element={
                  <PageTransition><ProjectDetail /></PageTransition>
                } />
                <Route path="/contact" element={
                  <PageTransition><Contact /></PageTransition>
                } />
                <Route path="*" element={
                  <PageTransition><NotFound /></PageTransition>
                } />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      </Router>
    </HelmetProvider>
  );
}

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
);

export default App;
