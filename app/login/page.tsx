'use client';

import { supabase } from "../supabase";

import { Button } from "@/components/ui/button";

const SignIn = () => {
  

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`, 
      },
    });

    if (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Button onClick={handleSignIn}>Sign in with Google </Button>
    </div>
  );
};

export default SignIn;
