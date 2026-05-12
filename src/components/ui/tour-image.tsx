"use client"

import { useState } from "react"

interface TourImageProps {
  src: string
  alt: string
  className?: string
}

export function TourImage({ src, alt, className }: TourImageProps) {
  const [imageError, setImageError] = useState(false)

  const fallbackSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='500'%3E%3Crect fill='%23d1d5db' width='1200' height='500'/%3E%3C/svg%3E"

  return (
    <img
      src={imageError ? fallbackSrc : src}
      alt={alt}
      className={className}
      onError={() => setImageError(true)}
    />
  )
}