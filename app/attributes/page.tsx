import type React from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Activity, Brain } from "lucide-react"

export default function AttributesPage() {
  return (
    <div className="bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-white">Hero Attributes</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <AttributeCard
            name="Strength"
            color="red"
            icon={<Heart className="h-12 w-12" />}
            description="Strength heroes typically have high health pools and are durable in combat. Each point of Strength provides +20 max health and +0.1 health regeneration."
            benefits={["Increased maximum health", "Improved health regeneration", "Higher physical resistance"]}
            playstyle="Strength heroes often serve as tanks, initiators, or durable carries. They excel at absorbing damage and disrupting enemy formations."
            heroes={["Axe", "Pudge", "Earthshaker", "Tiny", "Dragon Knight"]}
          />

          <AttributeCard
            name="Agility"
            color="green"
            icon={<Activity className="h-12 w-12" />}
            description="Agility heroes typically have high attack speed and armor. Each point of Agility provides +1 attack speed and +0.16 armor."
            benefits={["Increased attack speed", "Improved armor", "Higher physical damage"]}
            playstyle="Agility heroes often serve as primary damage dealers or carries. They excel at dealing sustained physical damage and scaling into the late game."
            heroes={["Anti-Mage", "Drow Ranger", "Juggernaut", "Sniper", "Shadow Fiend"]}
          />

          <AttributeCard
            name="Intelligence"
            color="blue"
            icon={<Brain className="h-12 w-12" />}
            description="Intelligence heroes typically have large mana pools and powerful spells. Each point of Intelligence provides +12 max mana and +0.05 mana regeneration."
            benefits={["Increased maximum mana", "Improved mana regeneration", "Higher spell damage"]}
            playstyle="Intelligence heroes often serve as spellcasters, supports, or nukers. They excel at providing utility, control, and magical damage."
            heroes={["Invoker", "Crystal Maiden", "Lina", "Zeus", "Shadow Shaman"]}
          />
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">Understanding Attributes</h2>
          <p className="text-gray-300 mb-4">
            In Dota 2, each hero has three primary attributes: Strength, Agility, and Intelligence. One of these
            attributes is designated as the hero's primary attribute, which provides additional benefits when increased.
          </p>
          <p className="text-gray-300 mb-4">
            When a hero's primary attribute increases, they gain additional attack damage. This makes items that boost a
            hero's primary attribute particularly valuable for that hero.
          </p>
          <p className="text-gray-300">
            Heroes can gain attributes through leveling up and by purchasing items. Understanding the role of attributes
            is crucial for effective item builds and hero development.
          </p>
        </div>
      </div>
    </div>
  )
}

function AttributeCard({
  name,
  color,
  icon,
  description,
  benefits,
  playstyle,
  heroes,
}: {
  name: string
  color: "red" | "green" | "blue"
  icon: React.ReactNode
  description: string
  benefits: string[]
  playstyle: string
  heroes: string[]
}) {
  const bgColor = {
    red: "bg-red-900",
    green: "bg-green-900",
    blue: "bg-blue-900",
  }[color]

  const textColor = {
    red: "text-red-500",
    green: "text-green-500",
    blue: "text-blue-500",
  }[color]

  const borderColor = {
    red: "border-red-800",
    green: "border-green-800",
    blue: "border-blue-800",
  }[color]

  return (
    <Card className={`bg-gray-800 border ${borderColor}`}>
      <CardContent className="p-6">
        <div className={`flex items-center mb-4 ${textColor}`}>
          {icon}
          <h2 className="text-2xl font-bold ml-3">{name}</h2>
        </div>

        <p className="text-gray-300 mb-4">{description}</p>

        <div className="mb-4">
          <h3 className="text-white font-medium mb-2">Benefits:</h3>
          <ul className="list-disc pl-5 text-gray-300 space-y-1">
            {benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-white font-medium mb-2">Playstyle:</h3>
          <p className="text-gray-300">{playstyle}</p>
        </div>

        <div>
          <h3 className="text-white font-medium mb-2">Example Heroes:</h3>
          <div className="flex flex-wrap gap-2">
            {heroes.map((hero, index) => (
              <Link
                key={index}
                href={`/heroes?attribute=${name.toLowerCase()}`}
                className={`px-3 py-1 ${bgColor} rounded-full text-sm text-white hover:opacity-90 transition-opacity`}
              >
                {hero}
              </Link>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
