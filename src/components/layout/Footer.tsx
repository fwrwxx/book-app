import { Link } from 'react-router-dom';
import { Book, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Book className="h-6 w-6 text-primary" />
              <span className="font-display text-lg font-bold">
                Книгарня <span className="text-gradient-gold">Світанок</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground font-body">
              Найкраща українська книгарня з великим вибором класики та сучасної літератури.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Навігація</h4>
            <ul className="space-y-2 font-body text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Головна
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Каталог
                </Link>
              </li>
              <li>
                <Link to="/club" className="text-muted-foreground hover:text-foreground transition-colors">
                  Книжковий клуб
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Книжковий клуб</h4>
            <ul className="space-y-2 font-body text-sm text-muted-foreground">
              <li>✨ 20% знижки на всі книги</li>
              <li>💬 Ексклюзивні обговорення</li>
              <li>🎁 Ранній доступ до новинок</li>
              <li>🚚 Безкоштовна доставка</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Контакти</h4>
            <ul className="space-y-3 font-body text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                м. Київ, вул. Книжкова, 1
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                +380 44 123 45 67
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                info@svitanok.ua
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground font-body">
            © 2024 Книгарня Світанок. Всі права захищено.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
