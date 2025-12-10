import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Crown, Gift, MessageCircle, Truck, Plus, Users } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DiscussionCard from '@/components/club/DiscussionCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useStore } from '@/contexts/StoreContext';
import { toast } from 'sonner';

const benefits = [
  { icon: Gift, title: '20% знижки', description: 'На всі книги в магазині' },
  { icon: MessageCircle, title: 'Обговорення', description: 'Ексклюзивні дискусії' },
  { icon: Crown, title: 'Ранній доступ', description: 'До нових надходжень' },
  { icon: Truck, title: 'Безкоштовна доставка', description: 'Від 500₴' },
];

const Club = () => {
  const { currentUser, discussions, books, joinClub, addDiscussion, users } = useStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({
    bookId: '',
    title: '',
    content: ''
  });

  const clubMembers = users.filter(u => u.isClubMember);

  const handleJoinClub = () => {
    joinClub();
    toast.success('Вітаємо! Ви тепер член книжкового клубу!');
  };

  const handleCreateDiscussion = () => {
    if (newDiscussion.bookId && newDiscussion.title && newDiscussion.content) {
      addDiscussion(newDiscussion.bookId, newDiscussion.title, newDiscussion.content);
      setNewDiscussion({ bookId: '', title: '', content: '' });
      setIsDialogOpen(false);
      toast.success('Обговорення створено!');
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md px-4">
            <Crown className="h-16 w-16 text-accent mx-auto mb-6" />
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Книжковий клуб
            </h1>
            <p className="text-muted-foreground font-body mb-6">
              Увійдіть або зареєструйтесь, щоб приєднатися до спільноти книголюбів
            </p>
            <Link to="/auth">
              <Button variant="burgundy" size="lg">
                Увійти
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!currentUser.isClubMember) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          <section className="py-16 md:py-24 bg-gradient-hero">
            <div className="container mx-auto px-4 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-gold rounded-full mb-8 shadow-card">
                <Crown className="h-10 w-10 text-foreground" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                Приєднуйтесь до клубу
              </h1>
              <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto mb-8">
                Станьте частиною спільноти справжніх книголюбів та отримуйте ексклюзивні переваги!
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
                {benefits.map((benefit, index) => (
                  <div 
                    key={benefit.title}
                    className="bg-card rounded-xl p-6 text-center shadow-card animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <benefit.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-display font-semibold text-foreground mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-body">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>

              <Button variant="gold" size="xl" onClick={handleJoinClub}>
                <Crown className="h-5 w-5" />
                Приєднатися безкоштовно
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-hero py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center shadow-card">
                <Crown className="h-8 w-8 text-foreground" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold text-foreground">
                  Книжковий клуб
                </h1>
                <p className="text-muted-foreground font-body">
                  Вітаємо, {currentUser.name}! Ви член клубу з {currentUser.memberSince}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
                    <MessageCircle className="h-6 w-6 text-primary" />
                    Обговорення
                  </h2>
                  
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="burgundy">
                        <Plus className="h-4 w-4" />
                        Нове обговорення
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="font-display">Створити обговорення</DialogTitle>
                        <DialogDescription className="font-body">
                          Поділіться своїми думками про прочитану книгу
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="font-body">Книга</Label>
                          <Select
                            value={newDiscussion.bookId}
                            onValueChange={(value) => setNewDiscussion({ ...newDiscussion, bookId: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Оберіть книгу" />
                            </SelectTrigger>
                            <SelectContent>
                              {books.map(book => (
                                <SelectItem key={book.id} value={book.id}>
                                  {book.title} — {book.author}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="font-body">Тема</Label>
                          <Input
                            placeholder="Введіть тему обговорення"
                            value={newDiscussion.title}
                            onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="font-body">Текст</Label>
                          <Textarea
                            placeholder="Поділіться своїми думками..."
                            value={newDiscussion.content}
                            onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
                            rows={4}
                          />
                        </div>
                        <Button variant="burgundy" className="w-full" onClick={handleCreateDiscussion}>
                          Створити
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-y-4">
                  {discussions.map(discussion => (
                    <DiscussionCard key={discussion.id} discussion={discussion} />
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Gift className="h-5 w-5 text-accent" />
                    Ваші переваги
                  </h3>
                  <ul className="space-y-3 font-body text-sm">
                    {benefits.map(benefit => (
                      <li key={benefit.title} className="flex items-start gap-3">
                        <benefit.icon className="h-4 w-4 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">{benefit.title}</p>
                          <p className="text-muted-foreground">{benefit.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Члени клубу ({clubMembers.length})
                  </h3>
                  <div className="space-y-3">
                    {clubMembers.map(member => (
                      <div key={member.id} className="flex items-center gap-3">
                        <span className="text-2xl">{member.avatar}</span>
                        <div>
                          <p className="font-body font-medium text-foreground text-sm">
                            {member.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            З {member.memberSince}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Club;
