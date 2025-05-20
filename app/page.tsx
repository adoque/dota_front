import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Sword, Zap, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black/70" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-900/80 to-black/80" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-red-500">
            Dota 2 <span className="text-white">Heroes</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">Discover Your Hero and Dominate the Battlefield!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
              <Link href="/heroes">
                Explore Heroes <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-red-500 text-red-500 hover:bg-red-950">
              <Link href="/assistant">
                AI Assistant <Zap className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Welcome to the World of Dota 2</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Welcome to the thrilling world of Dota 2, where epic battles and limitless strategic possibilities
                await!
              </p>
              <p>
                Dota 2 is a multiplayer online battle arena (MOBA) where millions of players worldwide clash in teams of
                five, controlling unique heroes. Each hero possesses their own set of abilities and playstyle, making
                every battle a distinct experience.
              </p>
              <p className="font-semibold text-white">Uncover Your Ideal Hero with Our AI Assistant!</p>
              <p>
                Not sure which hero to start with? Our intelligent assistant is here to help you make the right choice!
                Simply answer a few questions about your preferred playstyle, and it will suggest heroes that perfectly
                suit you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="h-12 w-12 text-red-500" />}
              title="Hero Database"
              description="Comprehensive information about all Dota 2 heroes, their abilities, stats, and roles."
            />
            <FeatureCard
              icon={<Sword className="h-12 w-12 text-red-500" />}
              title="Strategy Guides"
              description="Detailed guides on hero matchups, item builds, and gameplay tactics for every situation."
            />
            <FeatureCard
              icon={<Zap className="h-12 w-12 text-red-500" />}
              title="AI Assistant"
              description="Get personalized advice on hero picks, counter strategies, and gameplay tips from our AI."
            />
          </div>
        </div>
      </section>

      {/* Creators Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center flex items-center justify-center">
              <Users className="h-8 w-8 mr-3 text-red-500" />
              Authors of Dota 2
            </h2>
            <div className="bg-gray-800 p-8 rounded-lg text-gray-300 space-y-4">
              <p>Dota 2 was developed and published by Valve Corporation.</p>
              <p>
                Dota 2's origins lie in the popular modification Defense of the Ancients (DotA) for Blizzard
                Entertainment's game Warcraft III: Reign of Chaos and its expansion The Frozen Throne.
              </p>
              <p className="font-semibold text-white">Key developers of the original DotA mod include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Eul: The creator of the first significant version of DotA.</li>
                <li>Guinsoo (Steve Feak): The developer of the popular Defense of the Ancients: Allstars version.</li>
                <li>
                  IceFrog (anonymous): Continued the development of DotA: Allstars and subsequently led the development
                  of Dota 2 at Valve.
                </li>
              </ul>
              <p>
                Therefore, Valve Corporation, under the leadership of IceFrog, are the primary creators of Dota 2,
                building upon the foundation laid by the early enthusiasts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Improve Your Game?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start exploring our hero database or get personalized advice from our AI assistant.
          </p>
          <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
            <Link href="/assistant">
              Try AI Assistant Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-gray-700 p-8 rounded-lg text-center hover:bg-gray-750 transition-colors">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}
