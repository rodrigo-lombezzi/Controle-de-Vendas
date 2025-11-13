import { useEffect, useState } from 'react';
import { Users, Package, ShoppingCart, TrendingUp } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Stats = {
  customers: number;
  products: number;
  sales: number;
  totalRevenue: number;
};

export default function Home() {
  const [stats, setStats] = useState<Stats>({
    customers: 0,
    products: 0,
    sales: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [customersRes, productsRes, salesRes] = await Promise.all([
        supabase.from('customers').select('*', { count: 'exact', head: true }),
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('sales').select('total'),
      ]);

      const totalRevenue = salesRes.data?.reduce((sum: number, sale: { total: any; }) => sum + Number(sale.total), 0) || 0;

      setStats({
        customers: customersRes.count || 0,
        products: productsRes.count || 0,
        sales: salesRes.data?.length || 0,
        totalRevenue,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total de Clientes',
      value: stats.customers,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Total de Produtos',
      value: stats.products,
      icon: Package,
      color: 'bg-green-500',
    },
    {
      title: 'Total de Vendas',
      value: stats.sales,
      icon: ShoppingCart,
      color: 'bg-orange-500',
    },
    {
      title: 'Receita Total',
      value: `R$ ${stats.totalRevenue.toFixed(2)}`,
      icon: TrendingUp,
      color: 'bg-emerald-500',
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-0">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 rounded-md p-3 ${card.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {card.title}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {card.value}
                      </div>
                    </dd>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
