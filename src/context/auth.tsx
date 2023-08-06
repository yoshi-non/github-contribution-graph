import {
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth } from '@/lib/firebaseClient';

type ContextType = {
  fbUser: FirebaseUser | null | undefined; // ログインしてるか判定
  isLoading: boolean; // Firebaseでログイン処理中か判定
};

const AuthContext = createContext<ContextType>({
  fbUser: undefined,
  isLoading: true,
});

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [fbUser, setFbUser] =
    useState<FirebaseUser | null>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ログインしている場合はresultUserにデータが入る
    // ログインしていなければresultUserはnullになる
    onAuthStateChanged(auth, (resultUser) => {
      setFbUser(resultUser);
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        fbUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
