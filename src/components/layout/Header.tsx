import { Link } from 'react-router-dom';
import { Book, ShoppingCart, User, LogOut, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useStore } from '@/contexts/StoreContext';

const Header = () => {
  const { currentUser, cart, logout } = useStore();
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Book className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 text-xs">✨</span>
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            Книгарня <span className="text-gradient-gold">Світанок</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className="font-body text-muted-foreground hover:text-foreground transition-colors"
          >
            Головна
          </Link>
          <Link 
            to="/catalog" 
            className="font-body text-muted-foreground hover:text-foreground transition-colors"
          >
            Каталог
          </Link>
          <Link 
            to="/club" 
            className="font-body text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <Crown className="h-4 w-4 text-accent" />
            Книжковий клуб
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            {cartItemsCount > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground text-xs"
              >
                {cartItemsCount}
              </Badge>
            )}
          </Link>

          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <span className="text-lg">{currentUser.avatar}</span>
                  <span className="hidden sm:inline font-body">{currentUser.name}</span>
                  {currentUser.isClubMember && (
                    <Crown className="h-4 w-4 text-accent" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Профіль
                  </Link>
                </DropdownMenuItem>
                {currentUser.isClubMember && (
                  <DropdownMenuItem asChild>
                    <Link to="/club" className="flex items-center gap-2">
                      <Crown className="h-4 w-4" />
                      Книжковий клуб
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Вийти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth">
              <Button variant="burgundy" size="sm">
                Увійти
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
