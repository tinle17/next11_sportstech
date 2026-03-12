import React, { createContext, useContext, useState } from 'react';

type Role = 'player' | 'scout' | null;

interface AuthContextType {
  role: Role;
  setRole: (role: Role) => void;
  user: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Defaulting to 'scout' for the purpose of this demo as requested
  const [role, setRole] = useState<Role>('scout');
  const [user, setUser] = useState({ name: 'Scout User', email: 'scout@example.com' });

  return (
    <AuthContext.Provider value={{ role, setRole, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
