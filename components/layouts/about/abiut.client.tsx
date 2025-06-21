"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { timelineSteps } from "@/constent";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface TimelineCardProps {
  step: typeof timelineSteps[number];
  index: number;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ step, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: index % 2 === 0 ? -60 : 60,
      scale: 0.7,
      rotate: index % 2 === 0 ? -5 : 5,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.6 - index * 0.05,
        delay: index * 0.1,
      },
    },
  };

  return (
    <div
      className={`flex mb-8 sm:mb-12 relative pl-2 md:pl-0 ${
        index % 2 === 0 ? "lg:justify-start" : "lg:justify-end"
      } justify-start`}
      ref={ref}
    >
      <motion.div
        className={`w-full lg:w-1/2 ${
          index % 2 === 0 ? "lg:pr-8" : "lg:pl-8"
        } transition-transform duration-300 hover:scale-105 max-w-md mx-8 lg:mx-0 ${
          index % 2 === 0 ? "lg:ml-auto" : "lg:mr-auto"
        }`}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variants}
      >
        <Card
          className={`bg-gradient-to-b from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 border-2 border-primary/20 hover:border-primary/30 transition-colors`}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              {step.icon}
              {step.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              {step.description}
            </p>
          </CardContent>
        </Card>
      </motion.div>
      <div
        className={`absolute top-6 w-5 h-5 bg-primary rounded-full border-4 border-background z-10 lg:left-1/2 lg:transform lg:-translate-x-1/2 left-4`}
      />
    </div>
  );
};

export default function TimelineSection() {
  return (
    <section className="py-12 sm:py-20 lg:px-4 bg-background">
      <div className="container mx-auto max-w-5xl lg:px-7 xl:px-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 sm:mb-16 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          Our Journey
        </h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary rounded-full hidden lg:block" />
          <div className="absolute left-4 w-1 h-full bg-gradient-to-b from-primary to-secondary rounded-full lg:hidden" />

          {timelineSteps.map((step, index) => (
            <TimelineCard key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}