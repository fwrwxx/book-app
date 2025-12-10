import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStore, Book } from '@/contexts/StoreContext';
import { toast } from 'sonner';

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const { currentUser, addToCart, categories } = useStore();
  const category = categories.find(c => c.id === book.category);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(book);
    toast.success(`"${book.title}" додано до кошика`);
  };

  const displayPrice = currentUser?.isClubMember ? book.discountPrice : book.price;
  const showDiscount = currentUser?.isClubMember;

  return (
    <Link to={`/book/${book.id}`} className="group">
      <article className="bg-card rounded-lg overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
        <div className="relative aspect-[3/4] bg-cream-dark overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-32 bg-gradient-burgundy rounded shadow-book transform group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
              <span className="text-primary-foreground font-display text-xs text-center px-2 leading-tight">
                {book.title.split(' ').slice(0, 2).join(' ')}
              </span>
            </div>
          </div>
          
          {showDiscount && (
            <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground gap-1">
              <Crown className="h-3 w-3" />
              -20%
            </Badge>
          )}
          
          {category && (
            <Badge variant="secondary" className="absolute top-2 right-2">
              {category.icon} {category.name}
            </Badge>
          )}
        </div>

        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-display font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {book.title}
            </h3>
            <p className="text-sm text-muted-foreground font-body">{book.author}</p>
          </div>

          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-body text-foreground">{book.rating}</span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-lg text-foreground">
                {displayPrice}₴
              </span>
              {showDiscount && (
                <span className="text-sm text-muted-foreground line-through">
                  {book.price}₴
                </span>
              )}
            </div>
            
            <Button 
              variant="gold" 
              size="sm" 
              onClick={handleAddToCart}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BookCard;
