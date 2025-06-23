"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, MessageSquare, Github, Twitter, CheckCircle, Loader2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export default function ContactPage() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required"
    if (!formData.email.trim()) return "Email is required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Invalid email format"
    if (!formData.subject.trim()) return "Subject is required"
    if (!formData.message.trim()) return "Message is required"
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const error = validateForm()
    if (error) {
      toast.error(error)
      return
    }

    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Message sent successfully!")
      setIsSubmitted(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setIsSubmitted(false)
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50">
        <Card className="max-w-[550px] w-full m-4">
          <CardHeader>
            <CardTitle>Message Sent!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <p className="text-muted-foreground">
              Thank you for your message! We&#39;ll get back to you soon.
            </p>
            <Button variant="outline" onClick={handleReset} className="w-full">
              Send Another Message
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground">
            Have questions, suggestions, or feedback? We&#39;d love to hear from you!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={10}
                      className="h-40"
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button className="w-full text-white " type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
            <Card className=" mt-8">
              <CardHeader>
                <CardTitle>Stay Updated</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Input placeholder="Enter your email" />
                <Button variant="default" className="w-full text-white ">Subscribe</Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Get in Touch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We&#39;re always excited to connect with fellow anime enthusiasts! Whether you have feature requests, bug
                  reports, or just want to share your thoughts about the platform, don&#39;t hesitate to reach out.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">contact@animehub.com</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Github className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">github.com/animehub</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Twitter className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">@animehub_official</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card id="faq">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Is AnimeHub free to use?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes! AnimeHub is completely free to use. We&#39;re powered by the open-source Jikan API.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">How often is the data updated?</h4>
                  <p className="text-sm text-muted-foreground">
                    Our data is sourced from MyAnimeList through the Jikan API and is updated regularly to ensure
                    accuracy.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Can I contribute to the project?</h4>
                  <p className="text-sm text-muted-foreground">
                    We welcome contributions. Check out our GitHub repository for more information.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">How can I report a bug or suggest a feature?</h4>
                  <p className="text-sm text-muted-foreground">
                    You can report bugs or suggest new features by opening an issue on our <a href="https://github.com/ahmed26-coder/AnimeHub" className=" font-bold underline">GitHub repository</a>. We appreciate your feedback!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
