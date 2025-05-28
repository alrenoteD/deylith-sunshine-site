
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, TrendingUp, Users, Clock } from 'lucide-react';

const EconomySimulator = () => {
  const [employees, setEmployees] = useState(2);
  const [avgSalary, setAvgSalary] = useState(3500);
  const [workingHours, setWorkingHours] = useState(8);
  const [results, setResults] = useState(null);

  const calculateEconomy = () => {
    // Custos mensais de funcionários CLT
    const monthlySalaries = employees * avgSalary;
    const benefits = monthlySalaries * 0.4; // 40% de benefícios
    const taxes = monthlySalaries * 0.8; // 80% de encargos trabalhistas
    const totalEmployeeCost = monthlySalaries + benefits + taxes;

    // Custo do agente IA fixo em R$ 1.000
    const aiAgentCost = 1000;

    // Cálculos de economia
    const monthlySavings = totalEmployeeCost - aiAgentCost;
    const yearlySavings = monthlySavings * 12;
    const roi = ((monthlySavings * 12) / (aiAgentCost * 12)) * 100;

    // Disponibilidade
    const humanHours = employees * workingHours * 22; // 22 dias úteis
    const aiHours = 24 * 30; // 24h por 30 dias
    const availabilityIncrease = ((aiHours - humanHours) / humanHours) * 100;

    setResults({
      totalEmployeeCost,
      aiAgentCost,
      monthlySavings,
      yearlySavings,
      roi,
      humanHours,
      aiHours,
      availabilityIncrease,
      breakEvenMonths: aiAgentCost / monthlySavings
    });
  };

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 md:mb-6 gradient-text">
            Simulador de Economia
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-foreground/80 max-w-3xl mx-auto">
            Descubra quanto sua empresa pode economizar implementando soluções de IA
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {/* Simulador */}
          <Card className="glass-effect tech-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Calculator className="w-5 h-5" />
                Configure sua Situação Atual
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6">
              <div>
                <Label htmlFor="employees" className="text-sm md:text-base">Número de Funcionários a Substituir</Label>
                <Input
                  id="employees"
                  type="number"
                  min="1"
                  max="10"
                  value={employees}
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  className="mt-2 text-base"
                />
              </div>

              <div>
                <Label htmlFor="salary" className="text-sm md:text-base">Salário Médio Mensal (R$)</Label>
                <Input
                  id="salary"
                  type="number"
                  min="1000"
                  max="15000"
                  value={avgSalary}
                  onChange={(e) => setAvgSalary(Number(e.target.value))}
                  className="mt-2 text-base"
                />
              </div>

              <div>
                <Label htmlFor="hours" className="text-sm md:text-base">Horas de Trabalho por Dia</Label>
                <Input
                  id="hours"
                  type="number"
                  min="4"
                  max="12"
                  value={workingHours}
                  onChange={(e) => setWorkingHours(Number(e.target.value))}
                  className="mt-2 text-base"
                />
              </div>

              <Button 
                onClick={calculateEconomy}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-base md:text-lg py-2 md:py-3"
              >
                Calcular Economia
              </Button>
            </CardContent>
          </Card>

          {/* Resultados */}
          {results && (
            <Card className="glass-effect tech-card neon-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 gradient-text text-lg md:text-xl">
                  <TrendingUp className="w-5 h-5" />
                  Resultados da Simulação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="text-center p-3 md:p-4 bg-red-500/10 rounded-lg">
                    <div className="text-xs md:text-sm text-foreground/70">Custo Atual (CLT)</div>
                    <div className="text-lg md:text-xl font-bold text-red-400">
                      R$ {results.totalEmployeeCost.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="text-center p-3 md:p-4 bg-green-500/10 rounded-lg">
                    <div className="text-xs md:text-sm text-foreground/70">Custo com IA</div>
                    <div className="text-lg md:text-xl font-bold text-green-400">
                      R$ {results.aiAgentCost.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="text-center p-4 md:p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                  <div className="text-xs md:text-sm text-foreground/70 mb-2">Economia Mensal</div>
                  <div className="text-2xl md:text-3xl font-bold gradient-text">
                    R$ {results.monthlySavings.toLocaleString()}
                  </div>
                  <div className="text-xs md:text-sm text-foreground/60 mt-2">
                    Economia anual: R$ {results.yearlySavings.toLocaleString()}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                      <span className="text-xs md:text-sm text-foreground/70">ROI Anual</span>
                    </div>
                    <div className="text-base md:text-lg font-bold text-purple-400">
                      {results.roi.toFixed(1)}%
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                      <span className="text-xs md:text-sm text-foreground/70">Break-even</span>
                    </div>
                    <div className="text-base md:text-lg font-bold text-blue-400">
                      {results.breakEvenMonths.toFixed(1)} meses
                    </div>
                  </div>
                </div>

                <div className="text-center pt-4 border-t border-foreground/10">
                  <div className="text-xs md:text-sm text-foreground/70 mb-1">Aumento de Disponibilidade</div>
                  <div className="text-base md:text-lg font-bold text-cyan-400">
                    +{results.availabilityIncrease.toFixed(0)}%
                  </div>
                  <div className="text-xs text-foreground/60">
                    De {results.humanHours}h para {results.aiHours}h mensais
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="mt-8 md:mt-12 text-center px-4">
          <p className="text-xs md:text-sm text-foreground/60 mb-4">
            * Valores são estimativas baseadas em médias do mercado. Consulte nossos especialistas para uma análise personalizada.
          </p>
          <Button
            onClick={() => window.open('https://wa.me/5548992111496?text=Olá! Vi o simulador no site e gostaria de uma análise personalizada.', '_blank')}
            className="bg-green-600 hover:bg-green-700 text-white text-sm md:text-base px-4 md:px-6 py-2 md:py-3"
          >
            Solicitar Análise Personalizada
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EconomySimulator;
