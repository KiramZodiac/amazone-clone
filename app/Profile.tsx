'use client';

import { Button } from '@/components/ui/button';
import { supabase } from './supabase';
import { useEffect, useState } from 'react';
import SignIn from './SignIn';
import Image from 'next/image';

interface User {
  firstName: string;
  lastName: string;
  image: string;
}

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch the authenticated user details
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const { full_name, picture } = session.user.user_metadata;
        const [firstName, ...rest] = (full_name || '').split(' ');
        const lastName = rest.join(' ');

        setUser({
          firstName: firstName || '',
          lastName: lastName || '',
          image: picture || '',
        });
      }
    };

    fetchUser();

    // Listen for authentication changes
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { full_name, picture } = session.user.user_metadata;
        const [firstName, ...rest] = (full_name || '').split(' ');
        const lastName = rest.join(' ');

        setUser({
          firstName: firstName || '',
          lastName: lastName || '',
          image: picture || '',
        });
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    const subscription = data?.subscription;

    return () => subscription?.unsubscribe();
  }, []);

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error.message);
    } else {
      setUser(null);
    }
  };

  if (!user) return <SignIn />;

  return (
    <div className="flex items-center p-2 rounded-lg shadow-md space-x-4 max-sm:space-x-1">
      {user.image ? (
        <Image
        width={200}
        height={200}
          src={user.image}
          alt={`${user.firstName}'s profile`}
          className="w-16 h-16 max-sm:w-12 max-sm:h-12 rounded-full object-cover"
        />
      ) : (
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 font-bold">
          {user.firstName?.charAt(0) || '?'}
        </div>
      )}
      <div className="flex-1">
        <h2 className="text-lg max-sm:text-sm font-bold text-white">
          {user.firstName} {user.lastName}
        </h2>
      </div>
      <Button
        onClick={handleLogOut}
        className="mr-4 text-sm sm:text-base lg:text-lg px-2 py-1 sm:px-4 sm:py-2 bg-red-600 hover:bg-red-700 rounded-md"
      >
        LogOut
      </Button>
    </div>
  );
};

export default UserProfile;
