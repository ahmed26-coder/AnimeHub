"use client"

import { useEffect, useState } from "react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

export default function WelcomeDialog() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedAnimeHub")

    if (!hasVisited) {
      setTimeout(() => {
        setOpen(true)
      }, 300)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("hasVisitedAnimeHub", "true")
    setOpen(false)
  }

  const handleReject = () => {
    window.location.href = "https://www.google.com"
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="bg-[#0f0f0f] border border-[#222] text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Important notice before entering the site
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground text-sm mt-2">
            This website was created for educational purposes only and does not aim to promote any content that is contrary to our Islamic religion.
            <br />
            We remind you that watching anime that contains forbidden or inappropriate content is not permissible according to Islamic law, and we ask God to guide us all to what He loves and approves of.
            <br />
            If you agree to enter for the sole purpose of viewing my practical and educational skills, you may proceed. Otherwise, please leave the site.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={handleReject}
            className="bg-zinc-800 text-white hover:bg-zinc-700 border-0"
          >
            leaving
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleAccept}
            className="bg-pink-600 text-white hover:bg-pink-700"
          >
            I agree and enter
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
