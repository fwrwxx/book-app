import { Link } from 'react-router-dom';
import { Crown, Gift, MessageCircle, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/contexts/StoreContext';

const benefits = [
  {
    icon: Gift,
    title: '20% знижки',
    description: 'На всі книги в магазині'
  },
  {
    icon: MessageCircle,
    title: 'Обговорення',
    description: 'Ексклюзивні дискусії з іншими читачами'
  },
  {
    icon: Crown,
    title: 'Ранній доступ',
    description: 'До нових надходжень та акцій'
  },
  {
    icon: Truck,
    title: 'Безкоштовна доставка',
    description: 'При замовленні від 500₴'
  }
];

const ClubPromo = () => {
  const { currentUser } = useStore();

  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-gold rounded-full mb-6 shadow-card">
            <Crown className="h-8 w-8 text-foreground" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Книжковий клуб «Світанок»
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Приєднуйтесь до спільноти справжніх книголюбів! Отримуйте ексклюзивні 
            знижки, беріть участь в обговореннях та знаходьте однодумців.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.title}
              className="bg-background rounded-xl p-6 text-center shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-muted rounded-full mb-4">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground font-body">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          {currentUser?.isClubMember ? (
            <Link to="/club">
              <Button variant="gold" size="xl">
                <Crown className="h-5 w-5" />
                Перейти до клубу
              </Button>
            </Link>
          ) : (
            <Link to={currentUser ? "/club" : "/auth"}>
              <Button variant="gold" size="xl">
                <Crown className="h-5 w-5" />
                {currentUser ? "Приєднатися до клубу" : "Увійти та приєднатися"}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClubPromo;
