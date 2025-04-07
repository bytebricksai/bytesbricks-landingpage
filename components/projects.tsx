"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/markdown";
import { Github, ExternalLink } from "lucide-react";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface Project {
  id: string;
  date?: string;
  title: string;
  description?: string;
  views?: number;
  longDescription?: string;
  githubUrl?: string;
  demoUrl?: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "Sales Agent AI",
    description:
      "Boost your sales and customer support with an intelligent AI agent that handles interactions, orders, and payments effortlessly in multiple languages.",
    longDescription: `# Sales Agent AI Assistant

Transform your customer interactions with an AI that works 24/7. Our Sales Agent AI handles inquiries, processes orders seamlessly, and manages transactions, adapting to your customer's language automatically.

## ✨ Key Benefits & Features

*   **Reduce Sales Cycles:** Automate routine interactions and guide customers faster.
*   **Enhance Customer Experience:** Provide instant, consistent, and multilingual support.
*   **Increase Conversions:** Never miss a lead with 24/7 availability and efficient processing.
*   **Intelligent Coordination:** A main agent routes queries to specialized agents (Sales, Product Info).
*   **Seamless Transactions:** Integrated with MercadoPago for secure payment processing.
*   **Context-Aware:** Maintains conversation history for personalized interactions.
*   **Product Management:** Keeps track of product information and inventory.

## 🚀 Coming Soon - Get Notified!

We're constantly improving! Get notified when these features are ready:

*   **WhatsApp Integration:** Engage customers directly on their favorite platform.
*   **Admin Dashboard:** Monitor performance and gain insights with powerful analytics.
*   **More Payment Gateways:** Expanding options for global reach.

*Be the first to know! Enter your email below.*
`,
    githubUrl: "https://github.com/josemartinrodriguezmortaloni/salesAgent",
  },
];

const NotifyMeForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    // Simulate API call for notification sign-up
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Notify email submitted:", email);
    toast({
      title: "You're on the list! 🎉",
      description: `We'll notify you at ${email} when new features launch.`,
      className: "bg-green-50 border-green-200",
    });
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleNotifySubmit}
      className="mt-4 flex gap-2 items-center not-prose"
    >
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-grow bg-white/80 border-gray-300 text-black placeholder:text-gray-500"
        disabled={isSubmitting}
      />
      <Button type="submit" size="sm" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Notify Me"}
      </Button>
    </form>
  );
};

// Define animation variants (optimized)
const containerVariants = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export default function Projects() {
  const { toast } = useToast();
  const [isRequestingAccess, setIsRequestingAccess] = useState(false);
  const [requestedProject, setRequestedProject] = useState<string | null>(null);

  // Calculate grid layout for bento-style grid
  const getProjectCardClass = (index: number, totalProjects: number) => {
    // First project is always larger
    if (index === 0) {
      return "md:col-span-2 md:row-span-2";
    }

    // For 3 or fewer projects
    if (totalProjects <= 3) {
      return "md:col-span-1 md:row-span-1";
    }

    // For more projects, create interesting bento layout patterns
    if (index === 3) {
      return "md:col-span-2 md:row-span-1";
    }
    if (index % 5 === 0) {
      return "md:col-span-1 md:row-span-2";
    }
    if (index % 7 === 0) {
      return "md:col-span-2 md:row-span-1";
    }

    // Default card size
    return "md:col-span-1 md:row-span-1";
  };

  const handleRequestAccess = async (projectTitle: string) => {
    setIsRequestingAccess(true);
    setRequestedProject(projectTitle);
    try {
      const response = await fetch("/api/request-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectTitle }),
      });

      if (response.ok) {
        toast({
          title: "Access Request Sent!",
          description: `We've received your request for ${projectTitle}. We'll be in touch soon!`,
          className: "bg-blue-50 border-blue-200",
        });
      } else {
        throw new Error("Failed to send access request");
      }
    } catch (error) {
      console.error("Error requesting access:", error);
      toast({
        title: "Error Requesting Access",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsRequestingAccess(false);
      setRequestedProject(null);
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <div id="projects" className="w-full bg-transparent">
        <div className="justify-center text-left text-wrap pt-16 md:pt-20 px-4 md:px-6 lg:px-8 rounded-lg bg-transparent">
          <motion.section
            variants={containerVariants}
            initial="visible"
            animate="visible"
            className="mx-auto w-full max-w-7xl"
          >
            <motion.h1
              className="text-2xl md:text-4xl font-bold mb-2"
              variants={itemVariants}
            >
              Our Solutions
            </motion.h1>
            <motion.div
              className="h-1 w-20 bg-primary mb-6"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto"
              variants={itemVariants}
            >
              {projects.map((project, index) => (
                <Dialog key={project.id}>
                  <DialogTrigger asChild>
                    <motion.div
                      className={`${getProjectCardClass(
                        index,
                        projects.length
                      )} group cursor-pointer rounded-lg p-4 md:p-6 hover:border-primary transition-colors shadow-sm flex flex-col justify-between backdrop-blur-sm bg-white/10 border border-white/20`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <h2 className="text-xl md:text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                            {project.title}
                          </h2>
                          {project.views !== undefined && (
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <ExternalLink className="w-4 h-4" />
                              {project.views.toLocaleString()}
                            </span>
                          )}
                        </div>

                        {project.description && (
                          <p className="text-sm md:text-base text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                            {project.description}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center text-sm text-primary mt-auto font-medium">
                        Explore Functionality →
                      </div>
                    </motion.div>
                  </DialogTrigger>

                  <DialogContent className="w-[90vw] max-w-3xl overflow-y-auto max-h-[90vh] bg-white/80 rounded-lg">
                    <DialogHeader>
                      <DialogTitle className="text-2xl md:text-3xl font-bold text-gray-900">
                        {project.title}
                      </DialogTitle>
                    </DialogHeader>

                    <div className="mt-4 space-y-6 text-gray-800">
                      {project.longDescription && (
                        <>
                          <div className="prose prose-sm md:prose-base max-w-none prose-headings:text-primary prose-strong:text-gray-900">
                            <Markdown>{project.longDescription}</Markdown>
                          </div>
                          {project.longDescription.includes(
                            "Get Notified!"
                          ) && <NotifyMeForm />}
                        </>
                      )}

                      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
                        <Button
                          size="lg"
                          onClick={() => handleRequestAccess(project.title)}
                          disabled={
                            isRequestingAccess &&
                            requestedProject === project.title
                          }
                          className="flex-1"
                        >
                          {isRequestingAccess &&
                          requestedProject === project.title
                            ? "Sending Request..."
                            : "Request Access"}
                        </Button>
                        {project.githubUrl && (
                          <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="flex-1 border-gray-400 text-gray-700 hover:bg-gray-100"
                          >
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2"
                            >
                              <Github className="w-5 h-5" />
                              View on GitHub
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </LazyMotion>
  );
}
