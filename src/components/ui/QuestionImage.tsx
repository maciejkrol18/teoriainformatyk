import Image from "next/image"
import { useState } from "react"

interface QuestionImageProps {
  src: string
  alt: string
  loading: "eager" | "lazy"
}

export default function QuestionImage({ alt, src, loading }: QuestionImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  return (
    <div
      className={`w-full h-[200px] relative bg-secondary-500 ${
        !imageLoaded && "bg-gradient-loading animate-loading bg-size-loading"
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        loading={loading}
        className="object-contain"
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  )
}
