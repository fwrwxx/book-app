import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BookCard from '@/components/books/BookCard';
import { useStore } from '@/contexts/StoreContext';

const FeaturedBooks = () => {
  const { books } = useStore();
  const featuredBooks = books.slice(0, 4);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Популярні книги
            </h2>
            <p className="text-muted-foreground font-body">
              Найкращі твори української літератури
            </p>
          </div>
          <Link to="/catalog">
            <Button variant="outline" className="group">
              Всі книги
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book, index) => (
            <div 
              key={book.id} 
              className="animate-fade-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
