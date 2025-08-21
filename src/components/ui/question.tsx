"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { ZoomIn } from "lucide-react";
import Image from "next/image";
import { forwardRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

const questionAnswerVariants = cva("py-2 px-4 rounded-md text-left", {
  variants: {
    variant: {
      default: "bg-background-bright",
      selected: "bg-primary",
      correct: "bg-correct",
      incorrect: "bg-incorrect",
      unanswered: "bg-unanswered",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface QuestionAnswerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof questionAnswerVariants> {}

interface QuestionImageProps {
  alt: string;
  bucket: "question_images" | "query_images";
  filename: string | number;
  loading: "eager" | "lazy";
  allowZoom?: boolean;
}

const QuestionMarker = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        "flex items-center bg-background-bright text-lg font-bold rounded-full p-4 max-w-fit aspect-square",
        className
      )}
      {...props}
      ref={ref}
    />
  );
});
QuestionMarker.displayName = "QuestionMarker";

const QuestionContent = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      className={cn("font-semibold text-xl leading-8", className)}
      {...props}
      ref={ref}
    />
  );
});
QuestionContent.displayName = "QuestionContent";

const QuestionAnswersContainer = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn("flex flex-col gap-4", className)}
      {...props}
      ref={ref}
    />
  );
});
QuestionAnswersContainer.displayName = "QuestionAnswersContainer";

const QuestionAnswer = forwardRef<HTMLButtonElement, QuestionAnswerProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <button
        className={cn(questionAnswerVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
QuestionAnswer.displayName = "QuestionAnswer";

const QuestionImage = ({
  alt,
  bucket,
  filename,
  loading,
  allowZoom = true,
}: QuestionImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setZoomed(false);
      }
    };
    if (allowZoom) {
      window.addEventListener("keydown", closeOnEscape);
    }
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <div
      className={`h-[200px] relative bg-background-bright w-full ${
        !imageLoaded && "bg-gradient-loading animate-loading bg-size-loading"
      }`}
    >
      {zoomed && (
        // biome-ignore lint/a11y/useKeyWithClickEvents: handled with useEffect
        <div
          className="fixed inset-0 bg-black/80 z-50 w-full h-full flex flex-col items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            setZoomed(!zoomed);
          }}
        >
          <div className="grow w-full max-w-[95vw] relative">
            <Image
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${filename}.webp`}
              alt={alt}
              fill
              className="object-contain"
            />
          </div>
          <p className="my-4 p-2 bg-background/70 backdrop-blur-sm rounded-md">
            Wciśnij klawisz 'Escape' lub kliknij w dowolnym miejscu aby zamknąć
          </p>
        </div>
      )}
      {allowZoom && (
        <button
          type="button"
          aria-label="Przybliż zdjęcie"
          onClick={(e) => {
            e.stopPropagation();
            setZoomed(!zoomed);
          }}
          className="absolute top-2 right-2 z-10 rounded-full p-1 bg-background/40 backdrop-blur-sm"
        >
          <ZoomIn />
        </button>
      )}
      <Image
        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${filename}.webp`}
        alt={alt}
        fill
        loading={loading}
        className="object-contain"
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
};

const Question = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 bg-background-light p-4 rounded-lg",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Question.displayName = "Question";

export {
  Question,
  QuestionMarker,
  QuestionContent,
  QuestionAnswersContainer,
  QuestionAnswer,
  QuestionImage,
  questionAnswerVariants,
};
