import { Leaf, Github, Twitter, Instagram } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6" />
              <span className="font-bold text-xl">GreenCraft</span>
            </div>
            <p className="text-green-100 mb-4">
              Transformando residuos en arte, construyendo un futuro más sostenible
              a través de la creatividad y la conciencia ambiental.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-green-100 hover:text-white transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-green-100 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-green-100 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-green-100 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-green-100 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-green-100 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-green-100 hover:text-white transition-colors">
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-100">
          <p>&copy; {new Date().getFullYear()} GreenCraft. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}