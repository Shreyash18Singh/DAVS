'use client'
import { useState } from "react";
import { Navbar } from "./components/Navbar";
import Hero from "./components/Hero";
import AITutorChat from "./components/AITutorChat";
import KnowledgeDashboard from "./components/KnowledgeDashboard";
import Footer from "./components/Footer";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="relative min-h-screen">
      <Navbar onSearch={handleSearch} />
      <main className="pt-20">
        <Hero />
        <AITutorChat />
        <KnowledgeDashboard />
        <Footer />
      </main>
    </div>
  );
}

