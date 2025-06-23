"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src="/bgpageerror.webp"
          priority
          alt="Error Illustration"
          width={350}
          height={350}
          className="mx-auto mb-6"
        />

        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-4">
          Oops! Something went wrong
        </h1>

        <p className="text-muted-foreground max-w-md mx-auto mb-6">
          It seems like something broke on our end. Don&#39;t worry — our team of anime heroes are on it!
        </p>

        <Button asChild type="submit" className="text-white">
          <Link href="/">Return Home</Link>
        </Button>
      </motion.div>
    </div>
  );
}
