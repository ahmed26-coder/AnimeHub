import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Database, Users, Zap, Heart, Code, Globe, Shield, Rocket, Award, Target, Clock, Lightbulb } from "lucide-react"
import Link from "next/link"

export function Abouttop() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                        About AnimeHub
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Your ultimate destination for anime and manga discovery. We&#39;re passionate about connecting fans with their
                        next favorite series through comprehensive data, intelligent recommendations, and a vibrant community.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <Card className="border-2 border-primary/20 hover:border-primary/30 transition-colors">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-2xl">
                                <Target className="h-6 w-6 text-primary" />
                                Our Mission
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                To democratize anime and manga discovery by providing the most comprehensive, accessible, and
                                user-friendly platform for fans worldwide. We believe everyone deserves to find their perfect anime
                                match.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-secondary/20 hover:border-secondary/30 transition-colors">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-2xl">
                                <Lightbulb className="h-6 w-6 text-secondary" />
                                Our Vision
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                To become the global hub where anime culture thrives, connecting millions of fans through shared
                                passion, discovery, and meaningful interactions in the world of Japanese animation and manga.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}


export function Aboutchoose() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose AnimeHub?</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Database className="h-5 w-5 text-blue-500" />
                                    Comprehensive Database
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Access over 50,000 anime series, 100,000 manga titles, and 1 million character profiles with detailed
                                    information, ratings, and reviews.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-green-500" />
                                    Community Driven
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Built on data from MyAnimeList, the world&#39;s most active anime community, ensuring accurate and
                                    up-to-date information from real fans.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-yellow-500" />
                                    Lightning Fast
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Experience blazing-fast search and browsing with our optimized interface, advanced caching, and
                                    efficient API integration.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-purple-500" />
                                    Privacy First
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Your privacy matters. We don&#39;t track personal data and provide a clean, ad-free experience focused on
                                    content discovery.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Rocket className="h-5 w-5 text-red-500" />
                                    Always Improving
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Regular updates with new features, improved performance, and enhanced user experience based on
                                    community feedback.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Heart className="h-5 w-5 text-pink-500" />
                                    Made with Love
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Created by anime fans, for anime fans. We understand what you&#39;re looking for in an anime discovery
                                    platform.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}


export function Aboutplatform() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-2xl p-8 mb-16">
                    <h2 className="text-3xl font-bold text-center mb-8">Platform Statistics</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                            <div className="text-sm text-muted-foreground">Anime Series</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary mb-2">100K+</div>
                            <div className="text-sm text-muted-foreground">Manga Titles</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary mb-2">1M+</div>
                            <div className="text-sm text-muted-foreground">Characters</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                            <div className="text-sm text-muted-foreground">Availability</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export function Aboutmodern() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-8">Built with Modern Technology</h2>
                    <Card>
                        <CardContent className="p-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                        <Code className="h-5 w-5" />
                                        Frontend Technologies
                                    </h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span>Next.js 14</span>
                                            <Badge variant="secondary">React Framework</Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>TypeScript</span>
                                            <Badge variant="secondary">Type Safety</Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Tailwind CSS</span>
                                            <Badge variant="secondary">Styling</Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>shadcn/ui</span>
                                            <Badge variant="secondary">Components</Badge>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                        <Globe className="h-5 w-5" />
                                        Backend & APIs
                                    </h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span>Jikan API v4</span>
                                            <Badge variant="secondary">Data Source</Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>MyAnimeList</span>
                                            <Badge variant="secondary">Database</Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>REST API</span>
                                            <Badge variant="secondary">Architecture</Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Server Components</span>
                                            <Badge variant="secondary">Performance</Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}



export function Aboutvalues() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="text-center p-6">
                            <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Quality First</h3>
                            <p className="text-muted-foreground">
                                We prioritize accuracy, reliability, and user experience in everything we build.
                            </p>
                        </Card>

                        <Card className="text-center p-6">
                            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Community Focus</h3>
                            <p className="text-muted-foreground">
                                Our platform is built for the community, by the community, with continuous feedback integration.
                            </p>
                        </Card>

                        <Card className="text-center p-6">
                            <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Continuous Innovation</h3>
                            <p className="text-muted-foreground">
                                We&#39;re always exploring new ways to enhance anime discovery and fan engagement.
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}



export function Aboutcomplete() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-8">Complete Feature Set</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="text-sm py-2 px-4">
                                <Code className="h-3 w-3 mr-2" />
                                REST API Integration
                            </Badge>
                            <Badge variant="secondary" className="text-sm py-2 px-4">
                                <Globe className="h-3 w-3 mr-2" />
                                Global Database Access
                            </Badge>
                            <Badge variant="secondary" className="text-sm py-2 px-4">
                                Advanced Search & Filters
                            </Badge>
                            <Badge variant="secondary" className="text-sm py-2 px-4">
                                Character Profiles & Info
                            </Badge>
                            <Badge variant="secondary" className="text-sm py-2 px-4">
                                Intelligent Recommendations
                            </Badge>
                            <Badge variant="secondary" className="text-sm py-2 px-4">
                                Responsive Design
                            </Badge>
                            <Badge variant="secondary" className="text-sm py-2 px-4">
                                Dark/Light Mode
                            </Badge>
                            <Badge variant="secondary" className="text-sm py-2 px-4">
                                Real-time Data Updates
                            </Badge>
                            <Badge variant="secondary" className="text-sm py-2 px-4">
                                Seasonal Anime Tracking
                            </Badge>
                            <Badge variant="secondary" className="text-sm py-2 px-4">
                                Genre-based Discovery
                            </Badge>
                            <Badge variant="secondary" className="text-sm py-2 px-4">
                                Trending Content
                            </Badge>
                            <Badge variant="secondary" className="text-sm py-2 px-4">
                                Multi-language Support
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export function Aboutready() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-2xl p-12">
                    <h2 className="text-3xl font-bold mb-4">Ready to Discover Your Next Favorite Anime?</h2>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Join thousands of anime fans who trust AnimeHub for their daily dose of anime and manga discovery.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild>
                            <Link href="/anime">Explore Anime</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/manga">Browse Manga</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/contact">Get in Touch</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
