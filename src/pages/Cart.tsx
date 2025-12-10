import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, Crown, ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useStore } from '@/contexts/StoreContext';
import { toast } from 'sonner';

const Cart = () => {
  const { cart, currentUser, updateQuantity, removeFromCart, clearCart, cartTotal, cartTotalWithDiscount } = useStore();

  const handleCheckout = () => {
    toast.success('Замовлення оформлено! Дякуємо за покупку.');
    clearCart();
  };

  const savings = cartTotal - cartTotalWithDiscount;

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
            Продовжити покупки
          </Link>

          <h1 className="font-display text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
            <ShoppingCart className="h-8 w-8 text-primary" />
            Кошик
          </h1>

          {cart.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-xl shadow-card">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                Ваш кошик порожній
              </h2>
              <p className="text-muted-foreground font-body mb-6">
                Додайте книги для оформлення замовлення
              </p>
              <Link to="/catalog">
                <Button variant="burgundy">Переглянути каталог</Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cart.map(item => {
                  const price = currentUser?.isClubMember ? item.book.discountPrice : item.book.price;
                  return (
                    <div 
                      key={item.book.id}
                      className="bg-card rounded-xl p-6 shadow-card flex flex-col sm:flex-row gap-4"
                    >
                      <div className="w-20 h-28 bg-gradient-burgundy rounded flex-shrink-0 flex items-center justify-center">
                        <span className="text-primary-foreground font-display text-xs text-center px-1">
                          {item.book.title.split(' ')[0]}
                        </span>
                      </div>

                      <div className="flex-1">
                        <h3 className="font-display font-semibold text-foreground">
                          {item.book.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-body mb-4">
                          {item.book.author}
                        </p>

                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-body font-semibold text-foreground">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-display font-bold text-foreground">
                                {price * item.quantity}₴
                              </p>
                              {currentUser?.isClubMember && (
                                <p className="text-xs text-muted-foreground line-through">
                                  {item.book.price * item.quantity}₴
                                </p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive/80"
                              onClick={() => removeFromCart(item.book.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-card rounded-xl p-6 shadow-card sticky top-24">
                  <h2 className="font-display text-xl font-bold text-foreground mb-6">
                    Підсумок
                  </h2>

                  <div className="space-y-3 pb-4 border-b border-border">
                    <div className="flex justify-between font-body">
                      <span className="text-muted-foreground">Товари ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                      <span className="text-foreground">{cartTotal}₴</span>
                    </div>
                    {currentUser?.isClubMember && savings > 0 && (
                      <div className="flex justify-between font-body text-accent">
                        <span className="flex items-center gap-1">
                          <Crown className="h-4 w-4" />
                          Знижка клубу
                        </span>
                        <span>-{savings}₴</span>
                      </div>
                    )}
                    <div className="flex justify-between font-body">
                      <span className="text-muted-foreground">Доставка</span>
                      <span className="text-foreground">
                        {currentUser?.isClubMember && cartTotalWithDiscount >= 500 
                          ? 'Безкоштовно' 
                          : '50₴'}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between py-4 border-b border-border">
                    <span className="font-display font-bold text-lg text-foreground">Всього</span>
                    <span className="font-display font-bold text-lg text-foreground">
                      {cartTotalWithDiscount + (currentUser?.isClubMember && cartTotalWithDiscount >= 500 ? 0 : 50)}₴
                    </span>
                  </div>

                  <Button 
                    variant="burgundy" 
                    size="xl" 
                    className="w-full mt-6"
                    onClick={handleCheckout}
                  >
                    Оформити замовлення
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
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
