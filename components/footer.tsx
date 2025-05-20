import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Dota2Guide</h3>
            <p className="mb-4">
              Your ultimate resource for Dota 2 heroes, strategies, and AI-powered gameplay assistance.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-red-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/heroes" className="hover:text-red-500 transition-colors">
                  Heroes
                </Link>
              </li>
              <li>
                <Link href="/attributes" className="hover:text-red-500 transition-colors">
                  Attributes
                </Link>
              </li>
              <li>
                <Link href="/roles" className="hover:text-red-500 transition-colors">
                  Roles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Features</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/assistant" className="hover:text-red-500 transition-colors">
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-red-500 transition-colors">
                  Strategy Guides
                </Link>
              </li>
              <li>
                <Link href="/meta" className="hover:text-red-500 transition-colors">
                  Current Meta
                </Link>
              </li>
              <li>
                <Link href="/updates" className="hover:text-red-500 transition-colors">
                  Game Updates
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-red-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-red-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-red-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-red-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} Dota2Guide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
