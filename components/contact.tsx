"use client";
import Link from "next/link";
import { Twitter, Github, Mail, ArrowRight } from "lucide-react";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

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

interface ContactPageProps {
  isModalOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function ContactPage({
  isModalOpen,
  onOpenChange,
}: ContactPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        toast({
          title: "Message sent successfully! 🎉",
          description:
            "Thank you for contacting us. We will get back to you soon.",
          className: "bg-green-50 border-green-200 text-base",
        });
        setName("");
        setEmail("");
        setMessage("");
        onOpenChange(false);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error sending message",
        description: "Failed to send the message. Please try again.",
        variant: "destructive",
        className: "text-base",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <div
        id="contact"
        className="justify-center text-left text-wrap rounded-lg pt-28 md:pt-32 pb-20 bg-transparent"
      >
        <div className="justify-center bg-transparent">
          <motion.div
            variants={containerVariants}
            initial="visible"
            animate="visible"
            className="z-10 p-6 rounded-lg shadow-sm max-w-md w-full mx-auto transition-all duration-300 hover:border-primary backdrop-blur-sm bg-white/10 border border-white/20"
          >
            <motion.h1
              className="text-3xl font-bold mb-8 text-center"
              variants={itemVariants}
            >
              Connect With Us
            </motion.h1>
            <motion.div className="space-y-6" variants={itemVariants}>
              <Dialog open={isModalOpen} onOpenChange={onOpenChange}>
                <div
                  onClick={() => onOpenChange(true)}
                  className="flex items-center justify-between p-4 text-base rounded-lg hover:text-zinc-600 transition duration-300 cursor-pointer border border-white/20 hover:border-primary group backdrop-blur-sm bg-white/10"
                >
                  <div className="flex items-center space-x-3">
                    <Mail className="w-6 h-6 text-black group-hover:text-primary transition-colors" />
                    <span>Send us a message</span>
                  </div>
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                </div>
                <DialogContent className="sm:max-w-[425px] bg-white">
                  <DialogHeader>
                    <DialogTitle>Contact Us</DialogTitle>
                    <DialogDescription>
                      Send us a message, and we will respond as soon as
                      possible.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="message" className="text-right">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="col-span-3 min-h-[100px]"
                        required
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center px-6 py-2 text-base font-medium text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>

              <Link
                href="https://x.com/JoseMartinAI"
                className="flex items-center justify-between p-4 text-base rounded-lg hover:text-zinc-600 transition duration-300 border border-white/20 hover:border-primary group backdrop-blur-sm bg-white/10"
              >
                <div className="flex items-center space-x-3">
                  <Twitter className="w-6 h-6 text-black group-hover:text-primary transition-colors" />
                  <span>Follow us on X (Twitter)</span>
                </div>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
              </Link>

              <Link
                href="https://github.com/smartblocks-ai"
                className="flex items-center justify-between p-4 text-base rounded-lg hover:text-zinc-600 transition duration-300 border border-white/20 hover:border-primary group backdrop-blur-sm bg-white/10"
              >
                <div className="flex items-center space-x-3">
                  <Github className="w-6 h-6 text-black group-hover:text-primary transition-colors" />
                  <span>Check our GitHub</span>
                </div>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </LazyMotion>
  );
}
