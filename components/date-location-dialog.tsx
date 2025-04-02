"use client";

import { useState } from "react";
import { Home, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { IndoorDateIdeas } from "./indoor-date-ideas";
import { OutdoorDateIdeas } from "./outdoor-date-ideas";

interface DateLocationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DateLocationDialog({ open, onOpenChange }: DateLocationDialogProps) {
  const [selectedLocation, setSelectedLocation] = useState<"indoor" | "outdoor" | null>(null);

  const locations = [
    {
      id: "indoor",
      title: "Date em Casa",
      description: "Ideias criativas para momentos especiais no conforto do lar",
      icon: Home,
      color: "bg-rose-100",
      textColor: "text-rose-600",
    },
    {
      id: "outdoor",
      title: "Date ao Ar Livre",
      description: "Sugestões para aventuras e experiências em Feira de Santana",
      icon: MapPin,
      color: "bg-blue-100",
      textColor: "text-blue-600",
    },
  ];

  const handleLocationSelect = (location: "indoor" | "outdoor") => {
    setSelectedLocation(location);
  };

  const handleClose = () => {
    setSelectedLocation(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            {selectedLocation === "indoor" ? (
              "Ideias para Date em Casa"
            ) : selectedLocation === "outdoor" ? (
              "Ideias para Date em Feira de Santana"
            ) : (
              "Onde será o Date?"
            )}
          </DialogTitle>
          <DialogDescription className="text-center">
            {!selectedLocation && "Escolha o ambiente ideal para o seu momento especial"}
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!selectedLocation ? (
            <motion.div
              key="location-selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-4 py-4"
            >
              {locations.map((location, index) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant="ghost"
                    className="w-full h-auto p-6 flex items-start gap-4 hover:bg-gray-100/50"
                    onClick={() => handleLocationSelect(location.id as "indoor" | "outdoor")}
                  >
                    <div className={`p-3 rounded-xl ${location.color}`}>
                      <location.icon className={`w-6 h-6 ${location.textColor}`} />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-lg mb-1">{location.title}</h3>
                      <p className="text-muted-foreground text-sm">{location.description}</p>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="date-ideas"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-4"
            >
              {selectedLocation === "indoor" ? <IndoorDateIdeas /> : <OutdoorDateIdeas />}
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}