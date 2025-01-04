
import { supabase } from "./supabase";

import React from 'react'
import { Button } from "@/components/ui/button";

function SignIn() {
    
    const SignIn = async ()=>{
        
        const {error} = await supabase.auth.signInWithOAuth({
            provider:'google',
        })
    
        if(error){
            console.log('failed to sign in ',error.message);
            
        }
    }
  return (
    <div>
      <Button onClick={SignIn}>Sign in with google</Button>

    </div>
  )
}

export default SignIn



