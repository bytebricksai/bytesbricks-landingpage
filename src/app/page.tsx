"use client";

import { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu, Zap, BarChart, LineChart, Shield, Mail } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ContactModal } from "@/components/ContactModal";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

// Dynamically import SplineSphere with no SSR to prevent Server Component issues
const SplineSphere = dynamic(() => import("@/components/SplineSphere"), {
  ssr: false,
});

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // Ajusta este valor según la altura de tu encabezado
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const NavItems = () => (
    <>
      <Button variant="ghost" onClick={() => scrollToSection('mision-vision')}>Mission and Vision</Button>
      <Button variant="ghost" onClick={() => scrollToSection('proyectos')}>Projects</Button>
      <Button variant="ghost" onClick={() => scrollToSection('caracteristicas')}>Characteristics</Button>
      <Button variant="ghost" onClick={() => scrollToSection('enfoque')}>Focus</Button>
      <ContactModal>
        <Button variant="ghost">Contact</Button>
      </ContactModal>
    </>
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="p-6 border-b fixed w-full bg-background/80 backdrop-blur-sm z-10">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/logo.jpg" alt="BytesBrick Logo" width={42} height={42} className="mr-2" />
            <h1 className="text-2xl font-bold">BytesBrick</h1>
          </div>
          <div className="hidden md:flex space-x-4">
            <NavItems />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4">
                <NavItems />
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </header>

      <main className="pt-20">
        <div className="min-h-[calc(100vh-5rem)] relative overflow-hidden flex items-center">
          <Image
            src="/background.svg"
            alt="Fondo futurista"
            fill
            priority
            className="absolute object-cover -z-10"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
          <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row items-center justify-between relative">
            <div className="text-center lg:text-left space-y-6 z-10 max-w-xl mx-auto lg:mx-0">
              <h2 className="text-4xl sm:text-5xl font-bold text-primary">
                Building the Future with AI
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground">
                Innovative solutions that improve everyday life and boost
                business efficiency.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" onClick={() => scrollToSection('proyectos')}>
                  Discover Our Solutions
                </Button>
                <ContactModal>
                  <Button size="lg" variant="outline">
                    <Mail className="mr-2 h-4 w-4" /> Contact us
                  </Button>
                </ContactModal>
              </div>
            </div>
            <div className="w-full max-w-[670px] aspect-square mt-12 lg:mt-0 relative rounded-full overflow-hidden">
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center rounded-full bg-muted">Loading...</div>}>
                <SplineSphere />
              </Suspense>
            </div>
          </div>
        </div>

        <section id="mision-vision" className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg text-muted-foreground">
                  At BytesBrick, we are dedicated to transforming everyday life
                  and business processes through innovative and accessible
                  Artificial Intelligence solutions. We are committed to making
                  advanced technology understandable and useful for everyone.
                </p>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
                <p className="text-lg text-muted-foreground">
                  We aspire to be a global leader in democratising AI, creating
                  a future where intelligent technology improves every aspect of
                  our lives and work. We envision a world where AI is an
                  everyday tool, driving innovation and progress across all
                  industries.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="proyectos" className="py-16">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold mb-8 text-center">
              Our Projects
            </h3>
            <Carousel className="w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg">
              <CarouselContent>
                {[
                  {
                    title: "AI for Medical Diagnosis",
                    description:
                      "AI system to assist in accurate medical diagnoses.",
                  },
                  {
                    title: "Supply Chain Optimization",
                    description:
                      "AI to improve efficiency in inventory management and logistics.",
                  },
                  {
                    title: "Enterprise Virtual Assistant",
                    description:
                      "Advanced chatbot for customer service and internal support.",
                  },
                  {
                    title: "Predictive Market Analysis",
                    description:
                      "AI tool to predict market trends and consumer behavior.",
                  },
                ].map((project, index) => (
                  <CarouselItem key={index}>
                    <Card>
                      <CardHeader>
                        <CardTitle>{project.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{project.description}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        <section id="caracteristicas" className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold mb-8 text-center">
              What characterizes us
            </h3>
            <Carousel className="w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg">
              <CarouselContent>
                {[
                  {
                    icon: Cpu,
                    title: "Advanced AI",
                    description:
                      "State-of-the-art algorithms for solving complex problems.",
                  },
                  {
                    icon: Zap,
                    title: "Improved efficiency",
                    description:
                      "Process optimization to increase business productivity.",
                  },
                  {
                    icon: BarChart,
                    title: "Predictive Analysis",
                    description:
                      "Valuable insights to make informed and strategic decisions.",
                  },
                  {
                    icon: LineChart,
                    title: "Constant Innovation",
                    description: "Always at the forefront of AI technology.",
                  },
                  {
                    icon: Shield,
                    title: "Ethics and Transparency",
                    description: "Committed to the responsible use of AI.",
                  },
                ].map((feature, index) => (
                  <CarouselItem key={index}>
                    <Card>
                      <CardHeader>
                        <feature.icon className="w-10 h-10 mb-2" />
                        <CardTitle>{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{feature.description}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        <section id="enfoque" className="container mx-auto px-4 py-16 space-y-16">
          <section className="text-center space-y-4">
            <h3 className="text-3xl font-bold">Our Approach</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              At BytesBrick, we develop our applications following these three
              objectives: simplicity, functionality and sustainability. We
              create solutions that are intuitive, efficient and long-lasting,
              adapted to the needs of your company.
            </p>
          </section>

          <section className="bg-muted p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Business?
            </h3>
            <ContactModal>
              <Button size="lg">Contact Us </Button>
            </ContactModal>
          </section>
        </section>
      </main>

      <footer className="bg-muted mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2023 BytesBrick. All rights reserved.</p>
          <div className="mt-4">
            <ContactModal>
              <Button
                variant="link"
                className="text-muted-foreground hover:text-foreground"
              >
                Contact
              </Button>
            </ContactModal>
          </div>
        </div>
      </footer>
    </div>
  );
}
