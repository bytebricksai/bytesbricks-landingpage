"use client";

import { motion, LazyMotion, domAnimation } from "framer-motion";

// Define animation variants with reduced delays
const containerVariants = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function About() {
  return (
    <LazyMotion features={domAnimation}>
      <div id="about" className="w-full">
        {/* Updated Hero Section Content */}
        <div className="justify-center text-wrap rounded-lg px-4 py-16 md:py-32 lg:py-40 w-full text-center">
          <motion.div
            variants={containerVariants}
            initial="visible"
            animate="visible"
            className="mx-auto w-full max-w-4xl space-y-6 md:space-y-8"
          >
            {/* Heading and Subtitle */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground">
                BytesBricksAI
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Automate your business effortlessly with Artificial
                Intelligence.
              </p>
            </motion.div>

            {/* Primary CTA Button */}
            <motion.div variants={itemVariants}>
              <button
                onClick={() => {
                  const projectsSection = document.getElementById("projects");
                  if (projectsSection) {
                    window.scrollTo({
                      top: projectsSection.offsetTop - 80, // Adjust offset as needed
                      behavior: "smooth",
                    });
                  }
                }}
                className="mt-6 inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary rounded-full hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-lg"
              >
                Discover Our Solutions
              </button>
            </motion.div>

            {/* Separator */}
            <motion.div
              className="h-1 w-24 bg-primary mx-auto mt-8"
              initial={{ scaleX: 1 }} // Changed from 0 to 1
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3 }} // Reduced delay and duration
            />

            {/* Updated backdrop blur for better visibility with dot pattern */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 text-left"
            >
              <div className="p-6 rounded-lg backdrop-blur-sm bg-white/10">
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-primary">
                  Our Vision
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                  We aspire to be global leaders in democratizing AI, creating a
                  future where intelligent technology enhances every aspect of
                  our lives and work. We envision a world where AI is an
                  everyday tool, driving innovation and progress across all
                  industries.
                </p>
              </div>

              <div className="p-6 rounded-lg backdrop-blur-sm bg-white/10">
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-primary">
                  Our Mission
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                  At BytesBrick, we are dedicated to transforming everyday life
                  and business processes through innovative and accessible
                  Artificial Intelligence solutions. We are committed to making
                  advanced technology understandable and useful for everyone.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </LazyMotion>
  );
}
