
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
  PieChart,
  Pie,
  Cell
} from 'recharts';
import statsData from '../data/stats.json';

const COLORS = ['#0ea5e9', '#f97316'];

const Charts = () => {
  const { costComparison, productivity, roi } = statsData;

  return (
    <section className="py-20 hero-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
            Dados que Comprovam a Eficiência
          </h2>
          <p className="text-lg md:text-xl text-foreground/80">
            Números reais de economia e produtividade
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Cost Comparison Chart */}
          <Card className="glass-effect border-primary/20 animate-slide-in-left">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-center">
                Comparação de Custos Mensais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={costComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      `R$ ${value}`,
                      name === 'total' ? 'Custo Total' : name
                    ]}
                  />
                  <Bar dataKey="total" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-center text-sm text-foreground/70 mt-4">
                Economia de até <span className="text-primary font-bold">R$ 5.600/mês</span> por agente
              </p>
            </CardContent>
          </Card>

          {/* Productivity Improvement */}
          <Card className="glass-effect border-primary/20 animate-slide-in-right">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-center">
                Melhoria de Produtividade por Setor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="sector" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      `${value}%`,
                      'Melhoria'
                    ]}
                  />
                  <Bar dataKey="improvement" fill="#f97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-center text-sm text-foreground/70 mt-4">
                Média de <span className="text-sunrise-500 font-bold">87.8%</span> de melhoria
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ROI Timeline */}
        <Card className="glass-effect border-primary/20 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">
              Retorno do Investimento (ROI) - 6 Meses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={roi}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `R$ ${value}`,
                    name === 'net' ? 'Lucro Líquido' : 
                    name === 'investment' ? 'Investimento' : 'Economia'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="investment" 
                  stroke="#dc2626" 
                  strokeWidth={3}
                  name="Investimento"
                />
                <Line 
                  type="monotone" 
                  dataKey="savings" 
                  stroke="#0ea5e9" 
                  strokeWidth={3}
                  name="Economia"
                />
                <Line 
                  type="monotone" 
                  dataKey="net" 
                  stroke="#f97316" 
                  strokeWidth={3}
                  name="Lucro Líquido"
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-center text-sm text-foreground/70 mt-4">
              ROI positivo a partir do <span className="text-primary font-bold">3º mês</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Charts;
