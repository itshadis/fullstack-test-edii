import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode, JwtPayload } from 'jwt-decode';

// Definisikan tipe data untuk user
interface User {
  id: string;
  id_biodata: string;
  email: string;
  nama: string;
  role: string;
}

// Definisikan tipe data untuk context
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

// Buat context
const AuthContext = createContext<AuthContextType | null>(null);

// Hook untuk menggunakan context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Definisikan tipe untuk payload JWT kustom
interface CustomJwtPayload extends JwtPayload {
  dataValues: {
    id: string;
    id_biodata: string;
    email: string;
    nama: string;
    role: string;
  }
}

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Fungsi untuk mendeserialisasi token JWT
  const decodeToken = (token: string): User | null => {
    try {
      const { dataValues } = jwtDecode<CustomJwtPayload>(token);
      return dataValues
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  };

  // Fungsi untuk login
  const login = (token: string) => {
    const decodedUser = decodeToken(token);
    if (decodedUser) {
      setUser(decodedUser);
      setToken(token);
      localStorage.setItem('token', token); // Simpan token ke localStorage
    } else {
      console.error('Invalid token');
    }
  };

  // Fungsi untuk logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token'); // Hapus token dari localStorage
  };

  // Cek token di localStorage saat komponen pertama kali di-render
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decodedUser = decodeToken(storedToken);
      if (decodedUser) {
        setUser(decodedUser);
        setToken(storedToken);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};