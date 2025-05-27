
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
  Radar,
  AreaChart,
  Area
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

        {/* ROI Timeline */}
        <Card className="glass-effect border-primary/20 animate-fade-in tech-card neon-glow mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center gradient-text">
              Projeção de ROI - 6 Meses
            </CardTitle>
            <p className="text-sm text-center text-foreground/60">
              Exemplo baseado em agente de R$ 1.000/mês com economia de R$ 11.200/mês
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
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center p-3 bg-red-500/10 rounded-lg">
                <p className="text-red-400 font-bold">Investimento</p>
                <p className="text-sm text-foreground/70">Desenvolvimento + Manutenção</p>
              </div>
              <div className="text-center p-3 bg-green-500/10 rounded-lg">
                <p className="text-green-400 font-bold">Economia Mensal</p>
                <p className="text-sm text-foreground/70">Substituição de custos</p>
              </div>
              <div className="text-center p-3 bg-purple-500/10 rounded-lg">
                <p className="text-purple-400 font-bold">ROI Positivo</p>
                <p className="text-sm text-foreground/70">A partir do 3º mês</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Economic Impact Chart */}
        <Card className="glass-effect border-primary/20 animate-fade-in tech-card neon-glow">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center gradient-text">
              Impacto Econômico Acumulado
            </CardTitle>
            <p className="text-sm text-center text-foreground/60">
              Economia acumulada ao longo do tempo
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={roi}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.2)" />
                <XAxis dataKey="month" tick={{ fill: 'currentColor' }} />
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
                <Area 
                  type="monotone" 
                  dataKey="net" 
                  stroke="#8B5CF6" 
                  fill="url(#areaGradient)"
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Charts;
