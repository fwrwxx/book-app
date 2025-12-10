import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Crown, Book, Calendar, FileText, MessageCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DiscussionCard from '@/components/club/DiscussionCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/contexts/StoreContext';
import { toast } from 'sonner';

const BookDetails = () => {
  const { id } = useParams();
  const { getBookById, addToCart, currentUser, categories, getDiscussionsByBookId } = useStore();
  
  const book = getBookById(id || '');
  const category = book ? categories.find(c => c.id === book.category) : null;
  const discussions = book ? getDiscussionsByBookId(book.id) : [];

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-foreground mb-4">
              Книгу не знайдено
            </h1>
            <Link to="/catalog">
              <Button variant="burgundy">Повернутися до каталогу</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const displayPrice = currentUser?.isClubMember ? book.discountPrice : book.price;
  const showDiscount = currentUser?.isClubMember;

  const handleAddToCart = () => {
    addToCart(book);
    toast.success(`"${book.title}" додано до кошика`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Link 
            to="/catalog" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 font-body"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад до каталогу
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-96 bg-gradient-burgundy rounded-lg shadow-book flex items-center justify-center book-spine">
                  <div className="text-center px-4">
                    <Book className="h-16 w-16 text-primary-foreground mx-auto mb-4" />
                    <h2 className="font-display text-primary-foreground font-bold text-lg leading-tight">
                      {book.title}
                    </h2>
                    <p className="text-primary-foreground/80 text-sm mt-2 font-body">
                      {book.author}
                    </p>
                  </div>
                </div>
                {showDiscount && (
                  <Badge className="absolute -top-3 -right-3 bg-accent text-accent-foreground gap-1 text-sm px-3 py-1">
                    <Crown className="h-4 w-4" />
                    -20%
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                {category && (
                  <Badge variant="secondary" className="mb-3">
                    {category.icon} {category.name}
                  </Badge>
                )}
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {book.title}
                </h1>
                <p className="text-xl text-muted-foreground font-body">{book.author}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  <span className="font-body font-semibold text-foreground">{book.rating}</span>
                </div>
                <span className="text-muted-foreground">|</span>
                <div className="flex items-center gap-1 text-muted-foreground font-body">
                  <Calendar className="h-4 w-4" />
                  {book.year}
                </div>
                <span className="text-muted-foreground">|</span>
                <div className="flex items-center gap-1 text-muted-foreground font-body">
                  <FileText className="h-4 w-4" />
                  {book.pages} стор.
                </div>
              </div>

              <p className="text-muted-foreground font-body text-lg leading-relaxed">
                {book.description}
              </p>

              <div className="bg-card rounded-xl p-6 shadow-card">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-display text-4xl font-bold text-foreground">
                    {displayPrice}₴
                  </span>
                  {showDiscount && (
                    <span className="text-xl text-muted-foreground line-through">
                      {book.price}₴
                    </span>
                  )}
                </div>

                {showDiscount && (
                  <p className="text-sm text-accent font-body mb-4 flex items-center gap-1">
                    <Crown className="h-4 w-4" />
                    Ви економите {book.price - book.discountPrice}₴ як член клубу!
                  </p>
                )}

                <Button 
                  variant="burgundy" 
                  size="xl" 
                  className="w-full"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Додати до кошика
                </Button>

                {!currentUser?.isClubMember && (
                  <p className="text-center text-sm text-muted-foreground mt-4 font-body">
                    <Link to="/club" className="text-primary hover:underline">
                      Приєднайтесь до клубу
                    </Link>
                    {' '}та отримайте знижку 20%
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Discussions section */}
          {discussions.length > 0 && (
            <section className="mt-16">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-primary" />
                Обговорення ({discussions.length})
              </h2>
              <div className="space-y-4">
                {discussions.map(discussion => (
                  <DiscussionCard key={discussion.id} discussion={discussion} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookDetails;
