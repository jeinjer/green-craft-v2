"use client";

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Search, Sparkles, Leaf, Recycle, TreePine } from 'lucide-react';
import FeaturedCarousel from '@/components/featured-carousel';

export default function Home() {
  const [text, setText] = useState('');
  const fullText = '¡Transforma residuos en arte y ayuda al planeta!';
  const { scrollY } = useScroll();
  
  // Parallax effects for illustrations
  const leaf1Y = useTransform(scrollY, [0, 500], ['0%', '100%']);
  const leaf2Y = useTransform(scrollY, [0, 500], ['0%', '80%']);
  const recycleY = useTransform(scrollY, [0, 500], ['0%', '120%']);
  const treeY = useTransform(scrollY, [0, 500], ['0%', '60%']);
  const contentY = useTransform(scrollY, [0, 500], ['0%', '30%']);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center bg-gradient-to-b from-green-50 to-white overflow-hidden">
        {/* Floating Illustrations */}
        <motion.div
          style={{ y: leaf1Y }}
          className="absolute left-[10%] top-[20%] text-green-600 opacity-20"
        >
          <Leaf size={100} />
        </motion.div>
        <motion.div
          style={{ y: leaf2Y }}
          className="absolute right-[15%] top-[30%] text-green-500 opacity-15"
        >
          <Leaf size={80} />
        </motion.div>
        <motion.div
          style={{ y: recycleY }}
          className="absolute left-[20%] bottom-[20%] text-green-700 opacity-20"
        >
          <Recycle size={120} />
        </motion.div>
        <motion.div
          style={{ y: treeY }}
          className="absolute right-[20%] bottom-[30%] text-green-600 opacity-15"
        >
          <TreePine size={90} />
        </motion.div>

        {/* Content with Parallax */}
        <motion.div
          style={{ y: contentY }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-4 min-h-[80px]">
              {text}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
              Únete a nuestra comunidad de creadores comprometidos con el medio ambiente
              y descubre increíbles proyectos reciclables.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white hover:scale-105 transition-transform"
              >
                <Search className="mr-2 h-5 w-5" /> Buscar Creaciones
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50 hover:scale-105 transition-transform"
              >
                <Sparkles className="mr-2 h-5 w-5" /> Sugerencias Personalizadas
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Carousel */}
      <FeaturedCarousel />
    </>
  );
}