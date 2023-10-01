import { useAuth } from '@/context/auth';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

const UnauthenticatedLayout: React.FC<Props> = ({
  children,
}) => {
  const { fbUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (fbUser) {
      router.push('/project-list');
    }
  }, [fbUser, isLoading, router]);

  if (fbUser || isLoading) {
    return null;
  }

  return <div>{children}</div>;
};

export default UnauthenticatedLayout;
