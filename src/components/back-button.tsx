"use client"

import { Undo2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function BackButton() {
  const router = useRouter()
  return (
    <button onClick={() => router.back()}>
      <Undo2 size={32} />
    </button>
  )
}
