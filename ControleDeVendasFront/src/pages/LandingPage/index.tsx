import React from 'react';
import LandingImg from '../../assets/landing-image.png';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

export default function LandingPage() {
  return (
    <main className="bg-background min-h-[calc(100vh-120px)] flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Texto */}
        <section className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-textPrimary leading-tight">
              Sistema completo para <span className="text-secondary">sua empresa</span>
            </h1>
            <p className="text-lg text-textSecondary max-w-xl">
              Transforme a gestão da sua empresa com nossa plataforma: controle financeiro, gestão de equipes
              e relatórios inteligentes em um só lugar.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card compact className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                <span className="text-secondary">📊</span>
              </div>
              <div>
                <div className="text-sm font-medium text-textPrimary">Relatórios Avançados</div>
                <div className="text-xs text-textSecondary">Relatórios claros e exportáveis</div>
              </div>
            </Card>

            <Card compact className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                <span className="text-secondary">🔒</span>
              </div>
              <div>
                <div className="text-sm font-medium text-textPrimary">Segurança Total</div>
                <div className="text-xs text-textSecondary">Dados protegidos e backups</div>
              </div>
            </Card>

            <Card compact className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                <span className="text-secondary">⚡</span>
              </div>
              <div>
                <div className="text-sm font-medium text-textPrimary">Setup Rápido</div>
                <div className="text-xs text-textSecondary">Integração em minutos</div>
              </div>
            </Card>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" onClick={() => (window.location.href = '/clientes')}>
              Começar Gratuitamente
            </Button>
            <Button variant="outline" onClick={() => (window.location.href = '/dashboard')}>
              Ver Dashboard
            </Button>
          </div>
        </section>

        {/* Imagem */}
        <aside className="flex justify-center lg:justify-end">
          <div className="relative p-4 rounded-3xl bg-gradient-to-br from-white/3 to-white/1 shadow-lg">
            <img src={LandingImg} alt="Tela do sistema" className="w-full h-auto max-w-lg rounded-xl" />
          </div>
        </aside>
      </div>
    </main>
  );
}
