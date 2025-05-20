"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-red-500">Dota2</span>
            <span className="text-2xl font-bold text-white">Guide</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink href="/heroes">Heroes</NavLink>
            <NavLink href="/attributes">Attributes</NavLink>
            <NavLink href="/roles">Roles</NavLink>
            <NavLink href="/assistant">AI Assistant</NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <MobileNavLink href="/heroes" onClick={toggleMenu}>
              Heroes
            </MobileNavLink>
            <MobileNavLink href="/attributes" onClick={toggleMenu}>
              Attributes
            </MobileNavLink>
            <MobileNavLink href="/roles" onClick={toggleMenu}>
              Roles
            </MobileNavLink>
            <MobileNavLink href="/assistant" onClick={toggleMenu}>
              AI Assistant
            </MobileNavLink>
          </div>
        </div>
      )}
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-300 hover:text-white transition-colors">
      {children}
    </Link>
  )
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Link href={href} className="text-gray-300 hover:text-white transition-colors py-2 block" onClick={onClick}>
      {children}
    </Link>
  )
}
