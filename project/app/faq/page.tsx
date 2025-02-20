"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Mide la altura del contenido cada vez que se abre o cambia la respuesta
  useLayoutEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, answer]);

  return (
    <div className="mb-4 border border-green-600 rounded">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-4 py-3 bg-green-600 text-white font-semibold flex justify-between items-center transition-colors duration-300 hover:bg-green-500"
      >
        <span>{question}</span>
        <span>{isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: contentHeight, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
            className="bg-white text-gray-800"
          >
            <div ref={contentRef} className="px-4 py-3">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQPage() {
  const faqs = [
    {
      question: "¿Qué es GreenCraft y cuál es su misión?",
      answer:
        "GreenCraft es una plataforma para compartir y descubrir creaciones hechas con materiales reciclados. Nuestra misión es transformar residuos en arte y fomentar la sostenibilidad a través de la creatividad.",
    },
    {
      question: "¿Cómo me registro en la plataforma?",
      answer:
        "Puedes registrarte haciendo clic en 'Registrarse' en la página de autenticación o utilizando opciones de autenticación social como Google o Facebook.",
    },
    {
      question: "¿Cómo puedo publicar una creación?",
      answer:
        "En la página de creación encontrarás un formulario para subir imágenes, ingresar el título, descripción y materiales. Una vez completado, podrás publicar tu creación para compartirla con la comunidad.",
    },
    {
      question: "¿Qué tipo de materiales puedo utilizar en mis proyectos?",
      answer:
        "Promovemos el uso de materiales reciclados. Puedes utilizar desde botellas y papel hasta otros materiales reutilizables, siempre y cuando contribuyan a la sostenibilidad.",
    },
    {
      question: "¿Puedo editar o eliminar una publicación?",
      answer:
        "Sí, puedes editar o eliminar una creación desde tu perfil, siempre y cuando seas el autor de la misma.",
    },
    {
      question: "¿Cómo funciona el sistema de 'me gusta' y 'guardados'?",
      answer:
        "El sistema de 'me gusta' permite que los usuarios expresen su aprobación por una creación, mientras que 'guardados' te permite marcar tus publicaciones favoritas para verlas después.",
    },
    {
      question: "¿Qué hago si olvido mi contraseña?",
      answer:
        "Si olvidas tu contraseña, utiliza la opción 'Recuperar Contraseña' en la página de autenticación para recibir instrucciones a través de tu correo electrónico.",
    },
    {
      question: "¿Cómo protege GreenCraft mis datos personales?",
      answer:
        "Implementamos medidas de seguridad avanzadas para proteger tus datos personales y asegurarnos de que solo se utilicen para mejorar tu experiencia en la plataforma.",
    },
    {
      question: "¿Cómo puedo contactar con el soporte?",
      answer:
        "Si necesitas ayuda, puedes contactar a nuestro equipo de soporte a través de la sección 'Contacto' o enviarnos un correo a soporte@greencraft.com.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold mb-8">Preguntas Frecuentes (FAQ)</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}
