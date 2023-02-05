import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from "react";

import LocalStorageService from "services/local-storage";
import { onVerifyAccessToken } from "api/auth";
import { User } from "types/user";

interface AuthContextType {
  me: User | null;
  setMe: (value: User | null) => void;
  showAuthModal: boolean;
  toggleAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType>({
  me: null,
  setMe: () => undefined,
  showAuthModal: false,
  toggleAuthModal: () => undefined,
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [me, setMe] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [showAuthModal, setAuthModal] = useState(false);

  useEffect(() => {
    const token = LocalStorageService.get("accessToken");
    if (me || !token) return;

    const handleCheckToken = async (token: string) => {
      setLoading(true);

      try {
        const user = await onVerifyAccessToken(token);
        setMe(user);
        setAuthModal(false);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    handleCheckToken(token);
  }, [me]);

  const toggleAuthModal = useCallback(() => {
    if (!me) {
      setAuthModal((prev) => !prev);
    }
  }, [me]);

  const memorizedValues = useMemo(() => {
    return { me, setMe, showAuthModal, toggleAuthModal };
  }, [me, showAuthModal, toggleAuthModal]);

  if (isLoading) {
    return <h1> AUTHORIZATION Loading...</h1>;
  }

  return (
    <AuthContext.Provider value={memorizedValues}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
