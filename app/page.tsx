"use client";

import { Coffee, Plane, Heart, ArrowRight, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { DateLocationDialog } from "@/components/date-location-dialog";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { TravelIdeas } from "@/components/travel-ideas";
import { IntimateMoments } from "@/components/intimate-moments";
import Link from "next/link";

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [showDateDialog, setShowDateDialog] = useState(false);
  const [showTravelDialog, setShowTravelDialog] = useState(false);
  const [showIntimateDialog, setShowIntimateDialog] = useState(false);

  const cards = [
    {
      icon: Coffee,
      title: "Ideias para Dates",
      description: "Encontre ideias criativas para tornar seus momentos juntos ainda mais especiais.",
      color: "pink",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000",
      onClick: () => setShowDateDialog(true)
    },
    {
      icon: Plane,
      title: "Ideias para Viagens",
      description: "Descubra destinos incríveis para suas próximas aventuras românticas.",
      color: "purple",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1000",
      onClick: () => setShowTravelDialog(true)
    },
    {
      icon: Heart,
      title: "Momentos Íntimos",
      description: "Explore sugestões para momentos românticos e especiais a dois.",
      color: "red",
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1000",
      onClick: () => setShowIntimateDialog(true)
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute top-4 right-4">
          <Link href="/admin">
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="inline-block text-pink-500 mb-6"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-16 h-16"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4 tracking-tight">
            Escolha o Tipo de Experiência
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubra experiências únicas e memoráveis para compartilhar com quem você ama
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <Card 
                className="group relative overflow-hidden h-[400px] cursor-pointer"
                onClick={card.onClick}
              >
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10" />
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                <div className="relative z-20 h-full flex flex-col justify-end p-6 text-white">
                  <div className={`mb-6 p-4 rounded-full bg-${card.color}-500/20 w-fit`}>
                    <card.icon className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">
                    {card.title}
                  </h2>
                  <p className="text-gray-200 mb-6">
                    {card.description}
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white"
                  >
                    Explorar <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <DateLocationDialog 
        open={showDateDialog} 
        onOpenChange={setShowDateDialog}
      />

      <Dialog open={showTravelDialog} onOpenChange={setShowTravelDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogTitle className="text-2xl text-center">
            Ideias para Viagens
          </DialogTitle>
          <TravelIdeas />
        </DialogContent>
      </Dialog>

      <Dialog open={showIntimateDialog} onOpenChange={setShowIntimateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogTitle className="text-2xl text-center">
            Momentos Íntimos
          </DialogTitle>
          <IntimateMoments />
        </DialogContent>
      </Dialog>
    </main>
  );
}