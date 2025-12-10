import { Link, useNavigate } from 'react-router-dom';
import { User, Crown, Mail, Calendar, ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/contexts/StoreContext';

const Profile = () => {
  const { currentUser, logout } = useStore();
  const navigate = useNavigate();

  if (!currentUser) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 font-body"
          >
            <ArrowLeft className="h-4 w-4" />
            На головну
          </Link>

          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-2xl shadow-card p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center text-4xl">
                  {currentUser.avatar}
                </div>
                <div>
                  <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
                    {currentUser.name}
                    {currentUser.isClubMember && (
                      <Badge className="bg-gradient-gold text-foreground">
                        <Crown className="h-3 w-3 mr-1" />
                        Член клубу
                      </Badge>
                    )}
                  </h1>
                  <p className="text-muted-foreground font-body">{currentUser.email}</p>
                </div>
              </div>

              <div className="space-y-4 pb-6 border-b border-border">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="h-5 w-5" />
                  <span className="font-body">{currentUser.email}</span>
                </div>
                {currentUser.isClubMember && currentUser.memberSince && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="h-5 w-5" />
                    <span className="font-body">Член клубу з {currentUser.memberSince}</span>
                  </div>
                )}
              </div>

              <div className="pt-6 space-y-4">
                {!currentUser.isClubMember && (
                  <Link to="/club" className="block">
                    <Button variant="gold" className="w-full" size="lg">
                      <Crown className="h-5 w-5" />
                      Приєднатися до книжкового клубу
                    </Button>
                  </Link>
                )}

                {currentUser.isClubMember && (
                  <Link to="/club" className="block">
                    <Button variant="outline" className="w-full" size="lg">
                      <Crown className="h-5 w-5" />
                      Перейти до клубу
                    </Button>
                  </Link>
                )}

                <Button 
                  variant="destructive" 
                  className="w-full" 
                  size="lg"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                >
                  Вийти з акаунту
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
