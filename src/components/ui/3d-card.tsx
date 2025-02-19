"use client";

import { cn } from "@/lib/utils";
import { createContext, useContext, useEffect, useState } from "react";
import type { ElementType } from "react";

const MouseEnterContext = createContext<{
  mouseX: number;
  mouseY: number;
}>({
  mouseX: 0,
  mouseY: 0,
});

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const newX = event.clientX - rect.left;
    const newY = event.clientY - rect.top;
    setMouseX(newX);
    setMouseY(newY);
  };

  const handleMouseLeave = () => {
    setMouseX(0);
    setMouseY(0);
  };

  return (
    <div
      className={cn("relative", containerClassName)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <MouseEnterContext.Provider value={{ mouseX, mouseY }}>
        <div className={cn("", className)}>{children}</div>
      </MouseEnterContext.Provider>
    </div>
  );
};

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const CardItem = ({
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  as: Component = "div",
}: {
  children: React.ReactNode;
  className?: string;
  translateX?: number;
  translateY?: number;
  translateZ?: number | string;
  as?: ElementType;
}) => {
  const { mouseX, mouseY } = useContext(MouseEnterContext);
  const [transform, setTransform] = useState("");

  const handleAnimations = () => {
    if (mouseX === 0 && mouseY === 0) {
      setTransform("translate(0px, 0px)");
      return;
    }

    const zValue = typeof translateZ === "number" ? translateZ : parseInt(translateZ);
    const xValue = translateX + (mouseX - 150) / 10;
    const yValue = translateY + (mouseY - 150) / 10;

    setTransform(
      `translate3d(${xValue}px, ${yValue}px, ${zValue}px)`
    );
  };

  useEffect(() => {
    handleAnimations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouseX, mouseY]); // handleAnimations is stable, so we can exclude it

  return (
    <Component
      className={cn("transition-transform", className)}
      style={{
        transform,
        willChange: "transform",
      }}
    >
      {children}
    </Component>
  );
};
