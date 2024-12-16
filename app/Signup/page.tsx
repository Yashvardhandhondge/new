"use client"
import { SignUp, useUser, useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";



export default function Signup() {
  const { isSignedIn } = useAuth();
  const { user: clerkUser } = useUser();
  const [localUser, setLocalUser] = useState({ userId: "", email: ""});
  const router = useRouter();

  

  useEffect(() => {
    if (isSignedIn === null || !clerkUser) return;

    const clerkId = clerkUser.id;
    const email = clerkUser.primaryEmailAddress?.emailAddress;

    if (isSignedIn && clerkId && email) {
      sendUserDataToBackend(clerkId, email);
      router.push("/");
    }
  }, [isSignedIn, clerkUser]);


  const sendUserDataToBackend = async (clerkId: string, email: string): Promise<void> => {
    try {
      const resp = await axios.post(`/User`, {
        email,
        clerkId,
      });

      setLocalUser({
        userId: resp.data.clerkId,
        email: resp.data.email,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response);
      } else {
        console.error(error);
      }
    }
  };

 
  useEffect(() => {
    if (isSignedIn) {
      router.push("/");
    }
  }, [isSignedIn]);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <SignUp
        signInUrl="/login"
        forceRedirectUrl="/"
        signInForceRedirectUrl="/"
      />
    </div>
  );
}
