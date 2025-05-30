
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, TrendingUp, Users, Clock, Sparkles } from 'lucide-react';

const EconomySimulator = () => {
  const [employees, setEmployees] = useState(2);
  const [avgSalary, setAvgSalary] = useState(3500);
  const [workingHours, setWorkingHours] = useState(8);
  const [results, setResults] = useState(null);

  const calculateEconomy = () => {
    // Custos CLT detalhados por funcionário
    const monthlySalaries = employees * avgSalary;
    
    // Encargos trabalhistas (baseado na tabela fornecida)
    const inssPatronal = monthlySalaries * 0.20;          // 20%
    const rat = monthlySalaries * 0.02;                   // 2% (média entre 1-3%)
    const sistemaS = monthlySalaries * 0.058;             // 5,8%
    const fgts = monthlySalaries * 0.08;                  // 8%
    const provisao13 = monthlySalaries * 0.0833;          // 8,33%
    const provisaoFerias = monthlySalaries * 0.1111;      // 11,11%
    
    const totalEncargos = inssPatronal + rat + sistemaS + fgts + provisao13 + provisaoFerias;
    
    // Benefícios por funcionário (baseado na tabela fornecida)
    const valeAlimentacao = employees * 600;
    const valeTransporte = employees * 300;
    const outrosBeneficios = employees * 300;
    
    const totalBeneficios = valeAlimentacao + valeTransporte + outrosBeneficios;
    
    // Custo total CLT
    const totalEmployeeCost = monthlySalaries + totalEncargos + totalBeneficios;

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
      breakEvenMonths: aiAgentCost / monthlySavings,
      breakdown: {
        salaries: monthlySalaries,
        encargos: totalEncargos,
        beneficios: totalBeneficios
      }
    });
  };

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-amber-500 dark:text-amber-400" />
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold gradient-text">
              Simulador de Economia
            </h2>
            <Sparkles className="w-6 h-6 text-amber-500 dark:text-amber-400" />
          </div>
          <p className="text-base md:text-lg lg:text-xl text-foreground/80 max-w-3xl mx-auto">
            Descubra quanto sua empresa pode economizar implementando soluções de IA
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {/* Simulador */}
          <Card className="glass-effect tech-card border-2 border-amber-200/50 dark:border-amber-500/30">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20">
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Calculator className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                Configure sua Situação Atual
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6 p-6">
              <div>
                <Label htmlFor="employees" className="text-sm md:text-base font-medium">Número de Funcionários a Substituir</Label>
                <Input
                  id="employees"
                  type="number"
                  min="1"
                  max="10"
                  value={employees}
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  className="mt-2 text-base border-amber-200 dark:border-amber-700 focus:ring-amber-500"
                />
              </div>

              <div>
                <Label htmlFor="salary" className="text-sm md:text-base font-medium">Salário Médio Mensal (R$)</Label>
                <Input
                  id="salary"
                  type="number"
                  min="1000"
                  max="15000"
                  value={avgSalary}
                  onChange={(e) => setAvgSalary(Number(e.target.value))}
                  className="mt-2 text-base border-amber-200 dark:border-amber-700 focus:ring-amber-500"
                />
              </div>

              <div>
                <Label htmlFor="hours" className="text-sm md:text-base font-medium">Horas de Trabalho por Dia</Label>
                <Input
                  id="hours"
                  type="number"
                  min="4"
                  max="12"
                  value={workingHours}
                  onChange={(e) => setWorkingHours(Number(e.target.value))}
                  className="mt-2 text-base border-amber-200 dark:border-amber-700 focus:ring-amber-500"
                />
              </div>

              <Button 
                onClick={calculateEconomy}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 dark:from-amber-600 dark:to-yellow-600 dark:hover:from-amber-700 dark:hover:to-yellow-700 text-white text-base md:text-lg py-2 md:py-3 font-semibold shadow-lg"
              >
                Calcular Economia
              </Button>
            </CardContent>
          </Card>

          {/* Resultados */}
          {results && (
            <Card className="glass-effect tech-card neon-glow border-2 border-emerald-200/50 dark:border-emerald-500/30">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="gradient-text">Resultados da Simulação</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="text-center p-3 md:p-4 bg-red-500/10 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700">
                    <div className="text-xs md:text-sm text-foreground/70 mb-1">Custo Atual (CLT)</div>
                    <div className="text-lg md:text-xl font-bold text-red-500 dark:text-red-400">
                      R$ {results.totalEmployeeCost.toLocaleString()}
                    </div>
                    <div className="text-xs text-foreground/60 mt-1">
                      Salários + Encargos + Benefícios
                    </div>
                  </div>
                  
                  <div className="text-center p-3 md:p-4 bg-green-500/10 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                    <div className="text-xs md:text-sm text-foreground/70 mb-1">Custo com IA</div>
                    <div className="text-lg md:text-xl font-bold text-green-500 dark:text-green-400">
                      R$ {results.aiAgentCost.toLocaleString()}
                    </div>
                    <div className="text-xs text-foreground/60 mt-1">
                      Valor fixo mensal
                    </div>
                  </div>
                </div>

                <div className="text-center p-4 md:p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg border-2 border-purple-200/50 dark:border-purple-500/30">
                  <div className="text-xs md:text-sm text-foreground/70 mb-2">💰 Economia Mensal</div>
                  <div className="text-2xl md:text-3xl font-bold gradient-text">
                    R$ {results.monthlySavings.toLocaleString()}
                  </div>
                  <div className="text-xs md:text-sm text-foreground/60 mt-2">
                    Economia anual: R$ {results.yearlySavings.toLocaleString()}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="w-3 h-3 md:w-4 md:h-4 mr-1 text-blue-600 dark:text-blue-400" />
                      <span className="text-xs md:text-sm text-foreground/70">ROI Anual</span>
                    </div>
                    <div className="text-base md:text-lg font-bold text-blue-600 dark:text-blue-400">
                      {results.roi.toFixed(1)}%
                    </div>
                  </div>
                  
                  <div className="text-center p-3 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1 text-amber-600 dark:text-amber-400" />
                      <span className="text-xs md:text-sm text-foreground/70">Break-even</span>
                    </div>
                    <div className="text-base md:text-lg font-bold text-amber-600 dark:text-amber-400">
                      {results.breakEvenMonths.toFixed(1)} meses
                    </div>
                  </div>
                </div>

                <div className="text-center pt-4 border-t border-foreground/10">
                  <div className="text-xs md:text-sm text-foreground/70 mb-1">⚡ Aumento de Disponibilidade</div>
                  <div className="text-base md:text-lg font-bold text-cyan-500 dark:text-cyan-400">
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

        {/* Fórmula ROI */}
        <div className="mt-8 md:mt-12 max-w-4xl mx-auto">
          <Card className="glass-effect border-2 border-indigo-200/50 dark:border-indigo-500/30">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
              <CardTitle className="text-center text-lg md:text-xl">
                📊 Como Calculamos o ROI em 6 Meses
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="text-sm md:text-base space-y-3">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-700">
                  <strong>Custo CLT = </strong>Salários + Encargos (48,42%) + Benefícios (R$ 1.200/funcionário)
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-700">
                  <strong>Economia Mensal = </strong>Custo CLT - R$ 1.000 (IA)
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-700">
                  <strong>ROI 6 meses = </strong>((Economia × 6) / (R$ 1.000 × 6)) × 100
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 md:mt-12 text-center px-4">
          <p className="text-xs md:text-sm text-foreground/60 mb-4">
            * Cálculo baseado em encargos CLT brasileiros (INSS, RAT, Sistema S, FGTS, 13º, férias) + benefícios padrão.
          </p>
          <Button
            onClick={() => window.open('https://wa.me/5548992111496?text=Olá! Vi o simulador no site e gostaria de uma análise personalizada.', '_blank')}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm md:text-base px-4 md:px-6 py-2 md:py-3 font-semibold shadow-lg"
          >
            📱 Solicitar Análise Personalizada
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EconomySimulator;
