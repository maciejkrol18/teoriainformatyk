"use client"

import { Application } from "@splinetool/runtime"
import { useEffect, useRef } from "react"

interface SplineViewerProps {
  url: string
}

export default function SplineViewer({ url }: SplineViewerProps) {
  const canvasRef = useRef<null | HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const app = new Application(canvasRef.current)
      app.load(url)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none" />
}
