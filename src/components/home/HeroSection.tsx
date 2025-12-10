import { Link } from 'react-router-dom';
import { ArrowRight, Crown, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-hero py-20 md:py-32 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur rounded-full px-4 py-2 text-sm font-body text-muted-foreground shadow-card">
              <Crown className="h-4 w-4 text-accent" />
              <span>Книжковий клуб — 20% знижки для членів</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Відкрийте світ{' '}
              <span className="text-gradient-gold">української</span>{' '}
              літератури
            </h1>

            <p className="text-lg text-muted-foreground font-body max-w-lg">
              Найкраща колекція класики та сучасної прози. Приєднуйтесь до 
              книжкового клубу та отримуйте ексклюзивні знижки.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/catalog">
                <Button variant="burgundy" size="xl" className="group">
                  Переглянути каталог
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/club">
                <Button variant="gold" size="xl">
                  <Crown className="h-5 w-5" />
                  Приєднатися до клубу
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <p className="font-display text-3xl font-bold text-foreground">500+</p>
                <p className="text-sm text-muted-foreground font-body">Книг</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <p className="font-display text-3xl font-bold text-foreground">1000+</p>
                <p className="text-sm text-muted-foreground font-body">Читачів</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <p className="font-display text-3xl font-bold text-foreground">20%</p>
                <p className="text-sm text-muted-foreground font-body">Знижка клубу</p>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              {/* Book stack illustration */}
              <div className="relative animate-float">
                <div className="absolute -left-4 top-8 w-32 h-44 bg-forest rounded-r shadow-book transform -rotate-6" />
                <div className="absolute left-2 top-4 w-32 h-44 bg-accent rounded-r shadow-book transform -rotate-3" />
                <div className="relative w-32 h-44 bg-gradient-burgundy rounded-r shadow-book flex items-center justify-center">
                  <Book className="h-12 w-12 text-primary-foreground" />
                </div>
              </div>
              
              {/* Floating badges */}
              <div className="absolute -top-4 -right-8 bg-card rounded-lg px-3 py-2 shadow-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <span className="text-2xl">📚</span>
              </div>
              <div className="absolute -bottom-4 -left-12 bg-card rounded-lg px-3 py-2 shadow-card animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <span className="text-2xl">✨</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
