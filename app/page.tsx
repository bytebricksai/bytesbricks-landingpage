"use client";

import Nav from "@/components/navabar";
import About from "@/components/about";
import Projects from "@/components/projects";
import ContactPage from "@/components/contact";

export default function Home() {
  return (
    <main>
      <div>
        <Nav />
      </div>

      <div className="items-center justify-items-center min-h-screen sm:p-20 font-[family-name:var(--font-geist-sans)] relative overflow-hidden">
        <About />
        <Projects />
        <ContactPage />
      </div>
    </main>
  );
}
