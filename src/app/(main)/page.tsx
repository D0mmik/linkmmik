"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Link2, Shield, Zap } from "lucide-react";
import NewUrlInput from "~/components/NewUrlInput";

export default function LandingPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center max-w-4xl mx-auto px-4"
    >
      <motion.div variants={item} className="text-center mb-12">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-400 bg-clip-text text-transparent">
          Shorten Your Links
        </h1>
        <p className="text-xl text-default-600 mb-8 max-w-2xl mx-auto">
          Create short, memorable links in seconds. Perfect for social media,
          marketing campaigns, or sharing with friends.
        </p>
        <div className="flex gap-4 justify-center mb-8">
          <Button
            as={Link}
            href="/links"
            color="primary"
            variant="shadow"
            size="lg"
            className="font-medium"
          >
            Get Started
          </Button>
          <Button
            as={Link}
            href="https://github.com/D0mmik/linkmmik"
            color="default"
            variant="bordered"
            size="lg"
          >
            View on GitHub
          </Button>
        </div>
      </motion.div>

      <motion.div variants={item} className="w-full max-w-2xl mb-16">
        <NewUrlInput />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 rounded-xl bg-content1/50 border border-content2 backdrop-blur-sm"
          >
            <div className="mb-4 inline-block p-3 bg-primary/10 rounded-lg">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-default-600">{feature.description}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

const features = [
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    title: "Lightning Fast",
    description: "Create short links instantly with our easy-to-use interface"
  },
  {
    icon: <Link2 className="w-6 h-6 text-primary" />,
    title: "Track & Manage",
    description: "Keep track of all your shortened links in one place"
  },
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: "Secure & Reliable",
    description: "Your links are safe and always accessible when you need them"
  }
]; 