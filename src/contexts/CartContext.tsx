'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  category: string;
  addedAt: Date;
}

export interface UserInfo {
  name: string;
  phone: string;
  email: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
}

interface CartContextType {
  cart: CartItem[];
  userInfo: UserInfo | null;
  itemCount: number;
  addToCart: (item: Omit<CartItem, 'addedAt'>) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  isInCart: (itemId: string) => boolean;
  updateUserInfo: (userInfo: Partial<UserInfo>) => void;
  clearUserInfo: () => void;
  clearAll: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    const savedUserInfo = localStorage.getItem('userInfo');
    
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Convert addedAt strings back to Date objects
        const cartWithDates = parsedCart.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }));
        setCart(cartWithDates);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        setCart([]);
      }
    }
    
    if (savedUserInfo) {
      try {
        setUserInfo(JSON.parse(savedUserInfo));
      } catch (error) {
        console.error('Error parsing userInfo from localStorage:', error);
        setUserInfo(null);
      }
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    // Save userInfo to localStorage whenever it changes
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      localStorage.removeItem('userInfo');
    }
  }, [userInfo]);

  const addToCart = (item: Omit<CartItem, 'addedAt'>) => {
    setCart((prevCart) => {
      const exists = prevCart.find((cartItem) => cartItem.id === item.id);
      if (exists) {
        return prevCart; // Don't add duplicates
      }
      return [...prevCart, {
        ...item,
        addedAt: new Date()
      }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (itemId: string) => {
    return cart.some((item) => item.id === itemId);
  };

  const updateUserInfo = (newUserInfo: Partial<UserInfo>) => {
    setUserInfo(prev => prev ? { ...prev, ...newUserInfo } : newUserInfo as UserInfo);
  };

  const clearUserInfo = () => {
    setUserInfo(null);
  };

  const clearAll = () => {
    setCart([]);
    setUserInfo(null);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      userInfo,
      itemCount: cart.length,
      addToCart, 
      removeFromCart, 
      clearCart, 
      isInCart,
      updateUserInfo,
      clearUserInfo,
      clearAll
    }}>
      {children}
    </CartContext.Provider>
  );
};