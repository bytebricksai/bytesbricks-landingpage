'use client'

import { useEffect, useState, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cpu, Zap, BarChart, LineChart, Shield, Mail } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ContactModal } from '@/components/ContactModal'
import Image from 'next/image'

// Dynamically import SplineSphere with no SSR to prevent Server Component issues
const SplineSphere = dynamic(() => import('@/components/SplineSphere'), { ssr: false })

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="p-6 border-b fixed w-full bg-background/80 backdrop-blur-sm z-10">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">BytesBrick</h1>
          <ContactModal>
            <Button variant="ghost">Contacto</Button>
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
              <p className="text-5xl font-bold text-primary">Construyendo el Futuro con IA</p>
              <p className="text-xl text-black-200 mx-auto">
                Soluciones innovadoras que mejoran la vida cotidiana y potencian la eficiencia empresarial.
              </p>
              <div className="flex justify-center space-x-4">
                <Button size="lg">Descubre Nuestras Soluciones</Button>
                <ContactModal>
                  <Button size="lg" variant="outline">
                    <Mail className="mr-2 h-4 w-4" /> Contáctanos
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
                <h3 className="text-3xl font-bold mb-4">Nuestra Misión</h3>
                <p className="text-lg text-muted-foreground">
                  En BytesBrick, nos dedicamos a transformar la vida cotidiana y los procesos empresariales a través de soluciones de Inteligencia Artificial innovadoras y accesibles. Nuestro compromiso es hacer que la tecnología avanzada sea comprensible y útil para todos.
                </p>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-4">Nuestra Visión</h3>
                <p className="text-lg text-muted-foreground">
                  Aspiramos a ser líderes globales en la democratización de la IA, creando un futuro donde la tecnología inteligente mejore cada aspecto de nuestras vidas y trabajo. Visualizamos un mundo donde la IA sea una herramienta cotidiana, impulsando la innovación y el progreso en todas las industrias.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold mb-8 text-center">Nuestros Proyectos</h3>
            <Carousel className="w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg">
              <CarouselContent>
                {[
                  { title: "IA para Diagnóstico Médico", description: "Sistema de IA para asistir en diagnósticos médicos precisos." },
                  { title: "Optimización de Cadena de Suministro", description: "IA para mejorar la eficiencia en la gestión de inventarios y logística." },
                  { title: "Asistente Virtual Empresarial", description: "Chatbot avanzado para atención al cliente y soporte interno." },
                  { title: "Análisis Predictivo de Mercado", description: "Herramienta de IA para predecir tendencias de mercado y comportamiento del consumidor." }
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
            <h3 className="text-3xl font-bold mb-8 text-center">Lo que nos Caracteriza</h3>
            <Carousel className="w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg">
              <CarouselContent>
                {[
                  { icon: Cpu, title: "IA Avanzada", description: "Algoritmos de última generación para resolver problemas complejos." },
                  { icon: Zap, title: "Eficiencia Mejorada", description: "Optimización de procesos para aumentar la productividad empresarial." },
                  { icon: BarChart, title: "Análisis Predictivo", description: "Insights valiosos para tomar decisiones informadas y estratégicas." },
                  { icon: LineChart, title: "Innovación Constante", description: "Siempre a la vanguardia de la tecnología IA." },
                  { icon: Shield, title: "Ética y Transparencia", description: "Comprometidos con el uso responsable de la IA." }
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
            <h3 className="text-3xl font-bold">Nuestro Enfoque</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              En BytesBrick, nos guiamos por los principios de diseño de Dieter Rams: simplicidad, funcionalidad y sostenibilidad.
              Creamos soluciones que son intuitivas, eficientes y duraderas.
            </p>
          </section>

          <section className="bg-muted p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">¿Listo para Transformar tu Negocio?</h3>
            <ContactModal>
              <Button size="lg">Contáctanos Hoy</Button>
            </ContactModal>
          </section>
        </section>
      </main>

      <footer className="bg-muted mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2023 BytesBrick. Todos los derechos reservados.</p>
          <div className="mt-4">
            <ContactModal>
              <Button variant="link" className="text-muted-foreground hover:text-foreground">
                Contacto
              </Button>
            </ContactModal>
          </div>
        </div>
      </footer>
    </div>
  )
}
