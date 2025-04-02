"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Lock, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface SavedIdea {
  category: string;
  idea: string;
  savedAt: string;
}

interface SavedData {
  dates: SavedIdea[];
  travel: SavedIdea[];
  intimate: SavedIdea[];
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [savedData, setSavedData] = useState<SavedData>({
    dates: [],
    travel: [],
    intimate: []
  });
  
  const router = useRouter();

  useEffect(() => {
    const dates = localStorage.getItem('savedDateIdeas');
    const travel = localStorage.getItem('savedTravelIdeas');
    const intimate = localStorage.getItem('savedIntimateMoments');

    setSavedData({
      dates: dates ? JSON.parse(dates) : [],
      travel: travel ? JSON.parse(travel) : [],
      intimate: intimate ? JSON.parse(intimate) : []
    });
  }, []);

  const handleLogin = () => {
    if (password === "12345") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Senha incorreta");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    router.push("/");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="p-6">
            <div className="flex items-center justify-center mb-6">
              <Lock className="w-12 h-12 text-gray-600" />
            </div>
            <h1 className="text-2xl font-bold text-center mb-6">
              Painel Administrativo
            </h1>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Digite a senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              />
              {error && (
                <p className="text-red-500 text-sm text-center">
                  {error}
                </p>
              )}
              <Button
                className="w-full bg-gray-900 hover:bg-gray-800"
                onClick={handleLogin}
              >
                Entrar
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Painel Administrativo
          </h1>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>

        <Tabs defaultValue="dates" className="space-y-4">
          <TabsList className="grid grid-cols-3 gap-4 bg-transparent">
            <TabsTrigger
              value="dates"
              className="data-[state=active]:bg-white data-[state=active]:shadow-md"
            >
              Dates ({savedData.dates.length})
            </TabsTrigger>
            <TabsTrigger
              value="travel"
              className="data-[state=active]:bg-white data-[state=active]:shadow-md"
            >
              Viagens ({savedData.travel.length})
            </TabsTrigger>
            <TabsTrigger
              value="intimate"
              className="data-[state=active]:bg-white data-[state=active]:shadow-md"
            >
              Momentos Íntimos ({savedData.intimate.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dates" className="space-y-4">
            {savedData.dates.length === 0 ? (
              <Card className="p-6 text-center text-gray-500">
                Nenhuma ideia de date salva ainda
              </Card>
            ) : (
              savedData.dates.map((idea, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-lg font-semibold text-pink-600 mb-2">
                    {idea.category}
                  </h3>
                  <p className="text-gray-800 mb-2">{idea.idea}</p>
                  <p className="text-sm text-gray-500">
                    Salvo em: {new Date(idea.savedAt).toLocaleDateString('pt-BR')}
                  </p>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="travel" className="space-y-4">
            {savedData.travel.length === 0 ? (
              <Card className="p-6 text-center text-gray-500">
                Nenhuma ideia de viagem salva ainda
              </Card>
            ) : (
              savedData.travel.map((idea, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-lg font-semibold text-purple-600 mb-2">
                    {idea.category}
                  </h3>
                  <p className="text-gray-800 mb-2">{idea.idea.name || idea.idea}</p>
                  {idea.idea.description && (
                    <p className="text-gray-600 mb-2">{idea.idea.description}</p>
                  )}
                  {idea.idea.distance && (
                    <p className="text-gray-600 mb-2">{idea.idea.distance}</p>
                  )}
                  <p className="text-sm text-gray-500">
                    Salvo em: {new Date(idea.savedAt).toLocaleDateString('pt-BR')}
                  </p>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="intimate" className="space-y-4">
            {savedData.intimate.length === 0 ? (
              <Card className="p-6 text-center text-gray-500">
                Nenhum momento íntimo salvo ainda
              </Card>
            ) : (
              savedData.intimate.map((idea, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-lg font-semibold text-red-600 mb-2">
                    {idea.category}
                  </h3>
                  <p className="text-gray-800 mb-2">{idea.idea}</p>
                  <p className="text-sm text-gray-500">
                    Salvo em: {new Date(idea.savedAt).toLocaleDateString('pt-BR')}
                  </p>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}