"use client";

import { useState } from "react";
import Nav from "@/components/navabar";
import About from "@/components/about";
import Projects from "@/components/projects";
import ContactPage from "@/components/contact";

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <main>
      <div>
        <Nav onOpenContactModal={() => setIsContactModalOpen(true)} />
      </div>

      <div className="items-center justify-items-center min-h-screen sm:p-20 font-[family-name:var(--font-geist-sans)] relative overflow-hidden">
        <About />
        <Projects />
        <ContactPage
          isModalOpen={isContactModalOpen}
          onOpenChange={setIsContactModalOpen}
        />
      </div>
    </main>
  );
}
