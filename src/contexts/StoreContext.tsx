import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import database from '@/data/database.json';

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  discountPrice: number;
  category: string;
  cover: string;
  description: string;
  year: number;
  pages: number;
  rating: number;
  inStock: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  isClubMember: boolean;
  memberSince: string | null;
  avatar: string;
}

export interface Discussion {
  id: string;
  bookId: string;
  title: string;
  authorId: string;
  createdAt: string;
  content: string;
  replies: Reply[];
}

export interface Reply {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

interface StoreContextType {
  books: Book[];
  categories: Category[];
  users: User[];
  discussions: Discussion[];
  currentUser: User | null;
  cart: CartItem[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, password: string) => boolean;
  joinClub: () => void;
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  addDiscussion: (bookId: string, title: string, content: string) => void;
  addReply: (discussionId: string, content: string) => void;
  getBookById: (id: string) => Book | undefined;
  getUserById: (id: string) => User | undefined;
  getDiscussionsByBookId: (bookId: string) => Discussion[];
  cartTotal: number;
  cartTotalWithDiscount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books] = useState<Book[]>(database.books);
  const [categories] = useState<Category[]>(database.categories);
  const [users, setUsers] = useState<User[]>(database.users);
  const [discussions, setDiscussions] = useState<Discussion[]>(database.discussions);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const login = (email: string, password: string): boolean => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const register = (name: string, email: string, password: string): boolean => {
    if (users.find(u => u.email === email)) {
      return false;
    }
    const newUser: User = {
      id: String(users.length + 1),
      name,
      email,
      password,
      isClubMember: false,
      memberSince: null,
      avatar: '👤'
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  };

  const joinClub = () => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        isClubMember: true,
        memberSince: new Date().toISOString().split('T')[0]
      };
      setCurrentUser(updatedUser);
      setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  const addToCart = (book: Book) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.book.id === book.id);
      if (existing) {
        return prevCart.map(item =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId: string) => {
    setCart(prevCart => prevCart.filter(item => item.book.id !== bookId));
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.book.id === bookId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addDiscussion = (bookId: string, title: string, content: string) => {
    if (!currentUser) return;
    const newDiscussion: Discussion = {
      id: String(discussions.length + 1),
      bookId,
      title,
      authorId: currentUser.id,
      createdAt: new Date().toISOString(),
      content,
      replies: []
    };
    setDiscussions([...discussions, newDiscussion]);
  };

  const addReply = (discussionId: string, content: string) => {
    if (!currentUser) return;
    const newReply: Reply = {
      id: `r${Date.now()}`,
      authorId: currentUser.id,
      content,
      createdAt: new Date().toISOString()
    };
    setDiscussions(discussions.map(d =>
      d.id === discussionId
        ? { ...d, replies: [...d.replies, newReply] }
        : d
    ));
  };

  const getBookById = (id: string) => books.find(b => b.id === id);
  const getUserById = (id: string) => users.find(u => u.id === id);
  const getDiscussionsByBookId = (bookId: string) => discussions.filter(d => d.bookId === bookId);

  const cartTotal = cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  const cartTotalWithDiscount = cart.reduce((sum, item) => {
    const price = currentUser?.isClubMember ? item.book.discountPrice : item.book.price;
    return sum + price * item.quantity;
  }, 0);

  return (
    <StoreContext.Provider value={{
      books,
      categories,
      users,
      discussions,
      currentUser,
      cart,
      login,
      logout,
      register,
      joinClub,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      addDiscussion,
      addReply,
      getBookById,
      getUserById,
      getDiscussionsByBookId,
      cartTotal,
      cartTotalWithDiscount
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
