"use client"

import Spline from "@splinetool/react-spline"

interface SplineViewerProps {
  url: string
}

export default function SplineViewer({ url }: SplineViewerProps) {
  return <Spline scene={url} className="pointer-events-none" />
}
