'use client';

import EmptyState from '../../components/EmptyState';
import { signOut } from 'next-auth/react';

const Users = () => {
  return (
    <div className="hidden lg:block lg:pl-80 h-full">
      <EmptyState />
      <button onClick={() => signOut()}>Log out</button>
    </div>
  );
};

export default Users;
