
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import statsData from '../data/stats.json';

const Charts = () => {
  const { costComparison, roi, capabilities } = statsData;

  // Custom tooltip formatter
  const formatTooltip = (value: any, name: string, props: any) => {
    if (name === 'investment') return [`R$ ${Math.abs(value).toLocaleString()}`, 'Investimento'];
    if (name === 'savings') return [`R$ ${value.toLocaleString()}`, 'Economia Mensal'];
    if (name === 'net') return [`R$ ${value.toLocaleString()}`, 'Lucro Líquido Acumulado'];
    if (name === 'total') return [`R$ ${value.toLocaleString()}`, 'Custo Total'];
    return [`${value}`, name];
  };

  return (
    <section className="py-20 hero-gradient relative overflow-hidden">
      {/* Tech background effects */}
      <div className="absolute inset-0 bg-neon-grid opacity-20"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-tech-purple/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-tech-pink/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
            Dados que Comprovam a Eficiência
          </h2>
          <p className="text-lg md:text-xl text-foreground/80">
            Comparativos reais de economia e performance
          </p>
          <div className="mt-4 p-4 glass-effect rounded-lg inline-block">
            <p className="text-sm text-foreground/70">
              ⚠️ <strong>Valores são exemplificativos</strong> - Custos reais são discutidos na consultoria
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Cost Comparison Chart */}
          <Card className="glass-effect border-primary/20 animate-slide-in-left tech-card neon-glow">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-center gradient-text">
                Comparativo de Custos Mensais
              </CardTitle>
              <p className="text-sm text-center text-foreground/60">
                Exemplo: Agente de R$ 1.000/mês vs 2-3 Funcionários
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={costComparison}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.2)" />
                  <XAxis 
                    dataKey="category" 
                    tick={{ fill: 'currentColor', fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fill: 'currentColor' }} />
                  <Tooltip 
                    formatter={formatTooltip}
                    contentStyle={{
                      backgroundColor: 'rgba(15, 16, 26, 0.95)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Bar 
                    dataKey="total" 
                    fill="url(#techGradient)" 
                    radius={[8, 8, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="techGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#EC4899" stopOpacity={0.7}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
              <p className="text-center text-sm text-foreground/70 mt-4">
                Economia potencial de <span className="text-tech-purple font-bold">R$ 11.200/mês</span>
              </p>
            </CardContent>
          </Card>

          {/* AI Capabilities Radar */}
          <Card className="glass-effect border-primary/20 animate-slide-in-right tech-card neon-glow">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-center gradient-text">
                Capacidades: IA vs Humano
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={capabilities}>
                  <PolarGrid stroke="rgba(139, 92, 246, 0.3)" />
                  <PolarAngleAxis 
                    dataKey="category" 
                    tick={{ fill: 'currentColor', fontSize: 11 }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]}
                    tick={{ fill: 'currentColor', fontSize: 10 }}
                  />
                  <Radar
                    name="Humano"
                    dataKey="human"
                    stroke="#F97316"
                    fill="#F97316"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Radar
                    name="IA"
                    dataKey="ai"
                    stroke="#8B5CF6"
                    fill="#8B5CF6"
                    fillOpacity={0.3}
                    strokeWidth={3}
                  />
                  <Tooltip 
                    formatter={formatTooltip}
                    contentStyle={{
                      backgroundColor: 'rgba(15, 16, 26, 0.95)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* ROI Timeline with detailed explanation */}
        <Card className="glass-effect border-primary/20 animate-fade-in tech-card neon-glow mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center gradient-text">
              Projeção de ROI - 6 Meses
            </CardTitle>
            <p className="text-sm text-center text-foreground/60">
              Baseado em agente de R$ 1.000/mês com economia de R$ 11.200/mês
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={roi}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.2)" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: 'currentColor' }}
                />
                <YAxis 
                  tick={{ fill: 'currentColor' }}
                  tickFormatter={(value) => `R$ ${(value/1000).toFixed(0)}k`}
                />
                <Tooltip 
                  formatter={formatTooltip}
                  contentStyle={{
                    backgroundColor: 'rgba(15, 16, 26, 0.95)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="investment" 
                  stroke="#dc2626" 
                  strokeWidth={3}
                  name="investment"
                  strokeDasharray="5 5"
                />
                <Line 
                  type="monotone" 
                  dataKey="savings" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  name="savings"
                />
                <Line 
                  type="monotone" 
                  dataKey="net" 
                  stroke="#8B5CF6" 
                  strokeWidth={4}
                  name="net"
                />
              </LineChart>
            </ResponsiveContainer>
            
            {/* Detailed ROI Logic Explanation */}
            <div className="mt-8 space-y-6">
              <h4 className="text-xl font-bold gradient-text text-center mb-6">
                📊 Metodologia de Cálculo do ROI
              </h4>
              
              {/* Formula */}
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-lg border border-purple-500/20">
                <h5 className="text-lg font-semibold gradient-text mb-4 text-center">💡 Fórmula Utilizada</h5>
                <div className="text-center font-mono text-lg bg-black/20 p-4 rounded-lg mb-4">
                  ROI = ((Economia Total - Investimento Total) / Investimento Total) × 100
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-green-400">Economia Total</div>
                    <div className="text-foreground/70">Soma das economias mensais acumuladas</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-red-400">Investimento Total</div>
                    <div className="text-foreground/70">Desenvolvimento + Manutenção mensal</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-purple-400">ROI Final</div>
                    <div className="text-foreground/70">Retorno percentual sobre investimento</div>
                  </div>
                </div>
              </div>

              {/* Step by step calculation */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h5 className="text-lg font-semibold gradient-text">🔢 Componentes do Cálculo</h5>
                  
                  <div className="space-y-3">
                    <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <div className="font-semibold text-blue-400 mb-2">1. Custo CLT (Mensal)</div>
                      <ul className="text-sm space-y-1 text-foreground/70">
                        <li>• Salários: R$ 7.000 (2-3 funcionários)</li>
                        <li>• Benefícios (40%): R$ 2.800</li>
                        <li>• Encargos (80%): R$ 5.600</li>
                        <li><strong>Total: R$ 15.400</strong></li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="font-semibold text-green-400 mb-2">2. Custo IA (Mensal)</div>
                      <ul className="text-sm space-y-1 text-foreground/70">
                        <li>• Desenvolvimento: R$ 5.000 (primeiro mês)</li>
                        <li>• Manutenção: R$ 1.000/mês</li>
                        <li>• Hosting e APIs: Inclusos</li>
                        <li><strong>Economia: R$ 14.400/mês</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="text-lg font-semibold gradient-text">📈 Projeção Progressiva</h5>
                  
                  <div className="space-y-3">
                    <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <div className="font-semibold text-yellow-400 mb-2">Meses 1-2: Implementação</div>
                      <div className="text-sm text-foreground/70">
                        Economia gradual conforme sistema é ajustado e otimizado
                      </div>
                    </div>
                    
                    <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <div className="font-semibold text-purple-400 mb-2">Meses 3-6: Operação Plena</div>
                      <div className="text-sm text-foreground/70">
                        Economia máxima atingida. Sistema operando 24/7 com eficiência total
                      </div>
                    </div>
                    
                    <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                      <div className="font-semibold text-cyan-400 mb-2">ROI no 6º Mês</div>
                      <div className="text-sm text-foreground/70">
                        <strong>320% de retorno</strong> = R$ 32.000 ganho para R$ 10.000 investidos
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional benefits */}
              <div className="bg-gradient-to-r from-slate-500/10 to-gray-500/10 p-6 rounded-lg border border-slate-500/20">
                <h5 className="text-lg font-semibold gradient-text mb-4 text-center">🎯 Benefícios Não Quantificados</h5>
                <div className="grid md:grid-cols-4 gap-4 text-center text-sm">
                  <div>
                    <div className="font-semibold text-blue-400">Disponibilidade</div>
                    <div className="text-foreground/70">24/7 vs 8h/dia</div>
                  </div>
                  <div>
                    <div className="font-semibold text-green-400">Escalabilidade</div>
                    <div className="text-foreground/70">Crescimento instantâneo</div>
                  </div>
                  <div>
                    <div className="font-semibold text-purple-400">Consistência</div>
                    <div className="text-foreground/70">0% variação humana</div>
                  </div>
                  <div>
                    <div className="font-semibold text-orange-400">Eficiência</div>
                    <div className="text-foreground/70">Melhoria contínua</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Charts;
