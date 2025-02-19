"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import { motion } from "framer-motion";

import { useTheme } from "next-themes";
import { Button } from "../components/ui/button";
import { Moon, Sun } from "lucide-react";


export default function Home() {
  // Add state to handle client-side rendering
  const [isMounted, setIsMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return null or a loading state while client-side rendering is happening
  if (!isMounted) {
    return null; // Or return a loading spinner/skeleton
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
       <Button
        variant="outline"
        size="icon"
        className="fixed top-4 right-4"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        )}
      </Button>
 
      {/* Hero Section with 3D Card */}
      <div className="max-w-6xl mx-auto text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8">
          Make your websites look{" "}
          <span className="text-blue-600 dark:text-blue-400">10x better</span>
        </h1>
        
        <p className="text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
          Copy paste the most trending components and use them in your websites 
          without having to worry about styling and animations.
        </p>

        <CardContainer className="inter-var">
          <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-white"
            >
              Make things float in air
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              Hover over this card to unleash the power of CSS perspective
            </CardItem>
            <CardItem
              translateZ="100"
              className="w-full mt-4"
            >
              <Image
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                height={1000}
                width={1000}
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
            <div className="flex justify-between items-center mt-20">
              <CardItem
                translateZ={20}
                as="button"
                className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
              >
                Try now →
              </CardItem>
              <CardItem
                translateZ={20}
                as="button"
                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
              >
                Sign up
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto dark:text-white dark:bg-slate-800">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-xl"
          >
            <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
              {feature.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      <Card className="mt-8">
          <CardHeader>
            <CardTitle>Ready to Use</CardTitle>
            <CardDescription>
              Use this repo as a starting point
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-muted px-6 py-4 rounded-md font-mono text-sm">
            <pre>
              npx degit https://github.com/b-rucel/shadcnui new-project<br /><br />

              cd new-project<br />
              npm install<br />
              npm run dev
            </pre>
          </CardContent>
          <CardFooter className="text-muted-foreground text-sm mt-4">
            Simple installation process, extensive component library included
          </CardFooter>
        </Card>

    </main>
  );
}

const features = [
  {
    title: "Modern Components",
    description: "Built with the latest web technologies for better performance and user experience."
  },
  {
    title: "Responsive Design",
    description: "Fully responsive components that work seamlessly across all devices and screen sizes."
  },
  {
    title: "Easy Integration",
    description: "Simple copy and paste implementation with clear documentation and examples."
  }
];
