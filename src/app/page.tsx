"use client";

import { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
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
import Image from "next/image";

// Dynamically import SplineSphere with no SSR to prevent Server Component issues
const SplineSphere = dynamic(() => import("@/components/SplineSphere"), {
  ssr: false,
});

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="p-6 border-b fixed w-full bg-background/80 backdrop-blur-sm z-10">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">BytesBrick</h1>
          <ContactModal>
            <Button variant="ghost">Contact</Button>
          </ContactModal>
        </nav>
      </header>

      <main className="relative">
        <div className="h-[calc(100vh-5rem)] relative overflow-hidden">
          <Image
            src="/background.svg"
            alt="Fondo futurista"
            fill
            priority // Ensures the image is preloaded
            className="absolute object-cover -z-10"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
          <div className="container mx-auto px-4 h-full flex items-center justify-between relative">
            <div className="text-center space-y-4 z-10 max-w-xl">
              <p className="text-5xl font-bold text-primary">
                Building the Future with AI
              </p>
              <p className="text-xl text-black-200 mx-auto">
                Innovative solutions that improve everyday life and boost
                business efficiency.
              </p>
              <div className="flex justify-center space-x-4">
                <Button size="lg">Discover Our Solutions</Button>
                <ContactModal>
                  <Button size="lg" variant="outline">
                    <Mail className="mr-2 h-4 w-4" /> Contact us
                  </Button>
                </ContactModal>
              </div>
            </div>
            <div className="w-full h-full hidden lg:block relative">
              <Suspense fallback={<div>Loading...</div>}>
                <SplineSphere />
              </Suspense>
            </div>
          </div>
        </div>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">Our Mision</h3>
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

        <section className="py-16">
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

        <section className="py-16 bg-muted">
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

        <section className="container mx-auto px-4 py-16 space-y-16">
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
