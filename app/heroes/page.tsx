"use client"

import { useState, useEffect, MouseEvent } from "react"
import Link from "next/link"
import axios from "axios"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Define Hero interface to fix TypeScript errors
interface Hero {
  id?: string | number;
  localized_name?: string;
  name?: string;
  roles?: string[];
  primary_attr?: string;
  attack_type?: string;
}

// Helper to map attribute short names to full names
const getAttributeFullName = (attr: string | undefined | null): string => {
  if (!attr) return "Unknown";
  
  switch (attr) {
    case "str": return "Strength";
    case "agi": return "Agility";
    case "int": return "Intelligence";
    case "all": return "Universal";
    default: return attr;
  }
}

// Common roles in Dota 2
const allPossibleRoles: string[] = [
  "Carry", "Support", "Nuker", "Disabler", "Initiator", 
  "Durable", "Escape", "Pusher", "Jungler"
].sort();

export default function HeroesPage() {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [heroes, setHeroes] = useState<Hero[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await axios.get<Hero[]>("https://dota2backend-production.up.railway.app/api/heroes")
        setHeroes(response.data || [])
      } catch (err) {
        console.error("Failed to fetch heroes:", err)
        setError('Failed to load heroes. Please try again later.')
        setHeroes([])
      } finally {
        setLoading(false)
      }
    }

    fetchHeroes()
  }, [])

  // Filter heroes based on search query (name or role)
  const filteredHeroes = heroes.filter((hero: Hero) => {
    if (!hero) return false;
    
    const query = searchQuery.toLowerCase();
    const heroName = hero.localized_name || hero.name || "";
    const heroRoles = hero.roles || [];
    
    return (
      heroName.toLowerCase().includes(query) ||
      heroRoles.some((role) => role.toLowerCase().includes(query))
    )
  });

  // Helper to get hero initials safely
  const getHeroInitials = (name?: string): string => {
    if (!name) return "??";
    
    const initials = name.match(/\b(\w)/g);
    if (initials && initials.length > 0) {
      return initials.join('').substring(0, 2).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen py-12 flex justify-center items-center">
        <p className="text-white text-2xl">Loading heroes...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gray-900 min-h-screen py-12 flex justify-center items-center">
        <p className="text-red-500 text-2xl">{error}</p>
      </div>
    )
  }

  const handleRoleClick = (role: string) => {
    setSearchQuery(role);
  };

  return (
    <div className="bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-white">Dota 2 Heroes</h1>

        <div className="mb-8">
          <Input
            placeholder="Search heroes by name or role (e.g., 'Carry', 'Support', 'Nuker')"
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <div className="mt-2 text-gray-400">
              Showing {filteredHeroes.length} heroes matching "{searchQuery}"
            </div>
          )}
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          <span className="text-gray-400 mr-2">Popular roles:</span>
          {allPossibleRoles.map((role) => (
            <Badge
              key={role}
              variant="secondary"
              className="bg-gray-700 hover:bg-gray-600 text-gray-200 cursor-pointer"
              onClick={() => handleRoleClick(role)}
            >
              {role}
            </Badge>
          ))}
        </div>

        <Tabs defaultValue="grid" className="mb-8">
          <TabsList className="bg-gray-800">
            <TabsTrigger value="grid" className="text-gray-400 data-[state=active]:bg-gray-700 data-[state=active]:text-white">Grid View</TabsTrigger>
            <TabsTrigger value="list" className="text-gray-400 data-[state=active]:bg-gray-700 data-[state=active]:text-white">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="grid" className="mt-6">
            {filteredHeroes.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filteredHeroes.map((hero: Hero) => (
                  <Link href={`/heroes/${hero.id}`} key={hero.id?.toString() || Math.random().toString()}>
                    <Card className="bg-gray-800 border-gray-700 hover:border-red-500 transition-colors cursor-pointer h-full">
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <div className="w-full aspect-video bg-gray-700 rounded-md mb-3 overflow-hidden flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">
                            {getHeroInitials(hero.localized_name)}
                          </span>
                        </div>
                        <h3 className="text-white font-medium">{hero.localized_name || "Unknown Hero"}</h3>
                        <div className="flex flex-wrap justify-center gap-1 mt-1">
                          {(hero.roles || []).map((role, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                              {role}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center mt-8">No heroes found matching your criteria.</p>
            )}
          </TabsContent>

          <TabsContent value="list" className="mt-6">
             {filteredHeroes.length > 0 ? (
                <div className="space-y-4">
                  {filteredHeroes.map((hero: Hero) => (
                    <Link href={`/heroes/${hero.id}`} key={hero.id?.toString() || Math.random().toString()}>
                      <Card className="bg-gray-800 border-gray-700 hover:border-red-500 transition-colors cursor-pointer">
                        <CardContent className="p-4 flex items-center">
                          <div className="w-16 h-16 bg-gray-700 rounded-md overflow-hidden mr-4 flex items-center justify-center shrink-0">
                            <span className="text-xl font-bold text-white">
                              {getHeroInitials(hero.localized_name)}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-white font-medium">{hero.localized_name || "Unknown Hero"}</h3>
                            <p className="text-sm text-gray-400">
                              {getAttributeFullName(hero.primary_attr)} • {hero.attack_type || "Unknown"}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {(hero.roles || []).map((role, index) => (
                                <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                                  {role}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
             ) : (
                <p className="text-gray-400 text-center mt-8">No heroes found matching your criteria.</p>
             )}
          </TabsContent>
        </Tabs>

        {heroes.length > 0 && filteredHeroes.length === 0 && searchQuery && (
             <div className="text-center text-gray-400 mt-8">
                No heroes found matching "{searchQuery}". Try a different search.
             </div>
        )}

      </div>
    </div>
  )
}