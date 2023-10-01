import { useAuth } from '@/context/auth';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

const AuthenticatedLayout: React.FC<Props> = ({
  children,
}) => {
  const { fbUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !fbUser) {
      router.push('/');
    }
  }, [fbUser, isLoading, router]);

  if (!fbUser || isLoading) {
    return null;
  }

  return <>{children}</>;
};

export default AuthenticatedLayout;
