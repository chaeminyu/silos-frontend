'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

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

// Helper functions for user-specific storage
const getUserCartKey = (userId: string) => `cart_${userId}`;
const getUserInfoKey = (userId: string) => `userInfo_${userId}`;
const getGuestCartKey = () => 'cart_guest';
const getGuestUserInfoKey = () => 'userInfo_guest';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // Load user-specific cart data when user changes
  useEffect(() => {
    let cartKey: string;
    let userInfoKey: string;

    if (isAuthenticated && user) {
      console.log('Loading cart data for authenticated user:', user.userId);
      // When user logs in, check if we need to migrate guest cart data
      const guestCart = localStorage.getItem(getGuestCartKey());
      const guestUserInfo = localStorage.getItem(getGuestUserInfoKey());
      const userCartKey = getUserCartKey(user.userId);
      const userUserInfoKey = getUserInfoKey(user.userId);
      
      // Clean up legacy cart data from old system
      const legacyCart = localStorage.getItem('cart');
      const legacyUserInfo = localStorage.getItem('userInfo');
      if (legacyCart && !localStorage.getItem(userCartKey)) {
        localStorage.setItem(userCartKey, legacyCart);
        localStorage.removeItem('cart');
        console.log('Migrated legacy cart to user cart');
      }
      if (legacyUserInfo && !localStorage.getItem(userUserInfoKey)) {
        localStorage.setItem(userUserInfoKey, legacyUserInfo);
        localStorage.removeItem('userInfo');
        console.log('Migrated legacy userInfo to user userInfo');
      }
      
      // Migrate guest cart to user cart if guest has items and user doesn't have existing cart
      if (guestCart && !localStorage.getItem(userCartKey)) {
        localStorage.setItem(userCartKey, guestCart);
        localStorage.removeItem(getGuestCartKey());
        console.log('Migrated guest cart to user cart');
      }
      
      // Migrate guest userInfo to user userInfo if guest has info and user doesn't have existing userInfo
      if (guestUserInfo && !localStorage.getItem(userUserInfoKey)) {
        localStorage.setItem(userUserInfoKey, guestUserInfo);
        localStorage.removeItem(getGuestUserInfoKey());
        console.log('Migrated guest userInfo to user userInfo');
      }

      // Load authenticated user's cart and userInfo
      cartKey = userCartKey;
      userInfoKey = userUserInfoKey;
    } else {
      // Load guest user's cart and userInfo
      cartKey = getGuestCartKey();
      userInfoKey = getGuestUserInfoKey();
    }

    // Load cart data
    const savedCart = localStorage.getItem(cartKey);
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
    } else {
      setCart([]);
    }

    // Load userInfo data
    const savedUserInfo = localStorage.getItem(userInfoKey);
    if (savedUserInfo) {
      try {
        setUserInfo(JSON.parse(savedUserInfo));
      } catch (error) {
        console.error('Error parsing userInfo from localStorage:', error);
        setUserInfo(null);
      }
    } else {
      // If no saved userInfo but user is authenticated, create userInfo from user data
      if (isAuthenticated && user) {
        const defaultUserInfo: UserInfo = {
          name: user.username || user.name || '',
          phone: user.phone || '',
          email: user.email || ''
        };
        setUserInfo(defaultUserInfo);
        console.log('Created default userInfo from authenticated user:', defaultUserInfo);
      } else {
        setUserInfo(null);
      }
    }
  }, [isAuthenticated, user?.userId]);

  // Save cart data when cart changes
  useEffect(() => {
    if (user && isAuthenticated) {
      const cartKey = getUserCartKey(user.userId);
      localStorage.setItem(cartKey, JSON.stringify(cart));
    } else {
      const cartKey = getGuestCartKey();
      localStorage.setItem(cartKey, JSON.stringify(cart));
    }
  }, [cart, isAuthenticated, user?.userId]);

  // Save userInfo data when userInfo changes
  useEffect(() => {
    const saveUserInfo = () => {
      if (user && isAuthenticated) {
        const userInfoKey = getUserInfoKey(user.userId);
        if (userInfo) {
          localStorage.setItem(userInfoKey, JSON.stringify(userInfo));
        } else {
          localStorage.removeItem(userInfoKey);
        }
      } else {
        const userInfoKey = getGuestUserInfoKey();
        if (userInfo) {
          localStorage.setItem(userInfoKey, JSON.stringify(userInfo));
        } else {
          localStorage.removeItem(userInfoKey);
        }
      }
    };

    saveUserInfo();
  }, [userInfo, isAuthenticated, user?.userId]);

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