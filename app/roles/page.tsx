import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Sword, Shield, Zap, Heart, Crosshair, Footprints } from "lucide-react"

export default function RolesPage() {
  return (
    <div className="bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-white">Hero Roles</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <RoleCard
            name="Carry"
            icon={<Sword className="h-10 w-10 text-red-500" />}
            description="Carries start weak but scale well with items and levels, becoming the primary damage dealers in the late game."
            responsibilities={[
              "Farm efficiently to acquire key items",
              "Scale into the late game with high damage output",
              "Secure objectives and win teamfights",
            ]}
            examples={["Anti-Mage", "Juggernaut", "Spectre", "Phantom Assassin"]}
          />

          <RoleCard
            name="Support"
            icon={<Heart className="h-10 w-10 text-green-500" />}
            description="Supports focus on helping their team rather than farming. They provide vision, healing, and utility throughout the game."
            responsibilities={[
              "Ward the map to provide vision",
              "Protect carries in the early game",
              "Provide healing, buffs, and utility in teamfights",
            ]}
            examples={["Crystal Maiden", "Witch Doctor", "Lion", "Dazzle"]}
          />

          <RoleCard
            name="Initiator"
            icon={<Crosshair className="h-10 w-10 text-purple-500" />}
            description="Initiators start teamfights with powerful disables or area effects, creating opportunities for their team."
            responsibilities={[
              "Start teamfights with strong disables",
              "Create space for carries to deal damage",
              "Disrupt enemy positioning",
            ]}
            examples={["Axe", "Earthshaker", "Tidehunter", "Magnus"]}
          />

          <RoleCard
            name="Nuker"
            icon={<Zap className="h-10 w-10 text-blue-500" />}
            description="Nukers deal high amounts of magical damage in short bursts, often targeting key enemy heroes."
            responsibilities={[
              "Deal burst damage to key targets",
              "Control teamfights with area spells",
              "Secure kills in the early and mid game",
            ]}
            examples={["Lina", "Zeus", "Tinker", "Lion"]}
          />

          <RoleCard
            name="Durable"
            icon={<Shield className="h-10 w-10 text-yellow-500" />}
            description="Durable heroes can absorb large amounts of damage, protecting their team and disrupting enemies."
            responsibilities={[
              "Tank damage for the team",
              "Survive in the frontline of teamfights",
              "Disrupt enemy carries and protect allies",
            ]}
            examples={["Axe", "Bristleback", "Centaur Warrunner", "Dragon Knight"]}
          />

          <RoleCard
            name="Escape"
            icon={<Footprints className="h-10 w-10 text-cyan-500" />}
            description="Escape heroes have abilities that allow them to quickly reposition or flee from dangerous situations."
            responsibilities={[
              "Split push safely",
              "Escape ganks and dangerous situations",
              "Create space by drawing attention and surviving",
            ]}
            examples={["Anti-Mage", "Weaver", "Queen of Pain", "Puck"]}
          />
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">Understanding Hero Roles</h2>
          <p className="text-gray-300 mb-4">
            In Dota 2, heroes can fulfill multiple roles depending on their abilities, attributes, and item builds.
            Understanding these roles is crucial for effective team composition and strategy.
          </p>
          <p className="text-gray-300 mb-4">
            Most heroes excel in certain roles based on their innate abilities, but can adapt to different roles
            depending on the team's needs and the specific match situation.
          </p>
          <p className="text-gray-300">
            When drafting a team, it's important to ensure a balance of roles to cover all aspects of gameplay, from
            early game support to late game damage output.
          </p>
        </div>
      </div>
    </div>
  )
}

function RoleCard({
  name,
  icon,
  description,
  responsibilities,
  examples,
}: {
  name: string
  icon: React.ReactNode
  description: string
  responsibilities: string[]
  examples: string[]
}) {
  return (
    <Card className="bg-gray-800 border border-gray-700 h-full">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          {icon}
          <h2 className="text-2xl font-bold ml-3 text-white">{name}</h2>
        </div>

        <p className="text-gray-300 mb-4">{description}</p>

        <div className="mb-4">
          <h3 className="text-white font-medium mb-2">Key Responsibilities:</h3>
          <ul className="list-disc pl-5 text-gray-300 space-y-1">
            {responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-medium mb-2">Example Heroes:</h3>
          <div className="flex flex-wrap gap-2">
            {examples.map((hero, index) => (
              <span key={index} className="px-3 py-1 bg-gray-700 rounded-full text-sm text-white">
                {hero}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
