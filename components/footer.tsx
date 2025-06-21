"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Github, Twitter, Heart, Instagram, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { toast } from "sonner";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const footerLinks = {
    explore: [
      { label: "Anime", href: "/anime" },
      { label: "Manga", href: "/manga" },
      { label: "Characters", href: "/characters" },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
    connect: [
      { label: "GitHub", href: "#", icon: <Github className="h-5 w-5" /> },
      { label: "Twitter", href: "#", icon: <Twitter className="h-5 w-5" /> },
      { label: "Instagram", href: "#", icon: <Instagram className="h-5 w-5" /> },
    ],
  };

    const handleSubscribe = () => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    toast.success(`Thanks for subscribing, ${email}!`);
    setEmail("");
  };
  

  return (
    <footer className="border-t bg-gradient-to-b from-background to-primary/5 dark:to-primary/10">
      <div className="container max-w-7xl mx-auto px-4 pt-6 pb-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">AH</span>
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AnimeHub
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discover your next favorite anime and manga with AnimeHub, powered by the Jikan API and built for fans worldwide.
            </p>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">Stay Updated</p>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background border-primary/20"
                />
                <Button onClick={handleSubscribe} className="text-white" size="sm">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">Explore</h3>
            <ul className="space-y-3 text-sm">
              {footerLinks.explore.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5, color: "hsl(var(--primary))" }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={link.href} className="text-muted-foreground hover:text-primary">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">Company</h3>
            <ul className="space-y-3 text-sm">
              {footerLinks.company.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5, color: "hsl(var(--primary))" }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={link.href} className="text-muted-foreground hover:text-primary">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">Connect</h3>
            <div className="flex space-x-4">
              <TooltipProvider>
                {footerLinks.connect.map((link, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link href={link.href} className="text-muted-foreground hover:text-primary">
                          {link.icon}
                        </Link>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{link.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          </div>
        </div>
        <div className="border-t mt-12 pt-3 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {currentYear} AnimeHub. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Made with <Heart className="h-4 w-4 text-red-500 animate-pulse" /> for anime fans
          </p>
        </div>
      </div>
    </footer>
  );
}