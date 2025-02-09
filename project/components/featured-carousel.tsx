"use client";

import { useState, useEffect, useCallback } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from 'embla-carousel-react';

interface Creation {
  id: number;
  title: string;
  image: string;
  category: string;
  author: string;
}

const featuredCreations: Creation[] = [
  {
    id: 1,
    title: "Lámpara de Botellas Recicladas",
    image: "https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?w=800&auto=format&fit=crop&q=60",
    category: "Decoración",
    author: "María González"
  },
  {
    id: 2,
    title: "Jardín Vertical de Pallets",
    image: "https://images.unsplash.com/photo-1459156212016-c812468e2115?w=800&auto=format&fit=crop&q=60",
    category: "Jardín",
    author: "Carlos Ruiz"
  },
  {
    id: 3,
    title: "Mesa de Centro Eco",
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800&auto=format&fit=crop&q=60",
    category: "Muebles",
    author: "Ana Martínez"
  },
  {
    id: 4,
    title: "Escultura de Materiales Reciclados",
    image: "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=800&auto=format&fit=crop&q=60",
    category: "Arte",
    author: "Pedro Sánchez"
  },
];

export default function FeaturedCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || !autoplay) return;
    
    const interval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [emblaApi, autoplay]);

  return (
    <section className="py-16 bg-green-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-800">
          Creaciones Destacadas
        </h2>
        
        <div 
          className="w-full max-w-5xl mx-auto"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {featuredCreations.map((creation) => (
                <div key={creation.id} className="flex-[0_0_100%] min-w-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="overflow-hidden mx-4">
                      <CardContent className="p-0 relative aspect-[16/9]">
                        <img
                          src={creation.image}
                          alt={creation.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <Badge className="mb-2 bg-green-600">{creation.category}</Badge>
                          <h3 className="text-2xl font-bold mb-2">{creation.title}</h3>
                          <p className="text-sm opacity-90">Por {creation.author}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-4 gap-2">
            {featuredCreations.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  selectedIndex === index ? 'bg-green-600 w-4' : 'bg-green-300'
                }`}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}