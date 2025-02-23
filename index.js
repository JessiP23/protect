'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { Lock } from 'lucide-react';



const ProtectedContent = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();


  useEffect(() => {
    const checkSubscription = async () => {
      const userId = 'current-user-id';
      const q = query(collection(db, 'subscriptions'), where('userId', '==', userId), where('status', '==', 'active'));
      const querySnapshot = await getDocs(q);


      setIsSubscribed(!querySnapshot.empty);

      setIsLoading(false);
    };


    checkSubscription();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isSubscribed) {
    return (
      <div className="min-h-screen bg-purple-600 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
          <Lock className="mx-auto mb-4 text-purple-600" size={48} />
          <h1 className="text-2xl font-bold mb-4 text-purple-600">Subscription Required</h1>
          <p className="mb-6">You need to subscribe to access this content.</p>
          <button
            onClick={() => router.push('/subscribe')}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Subscribe Now
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-purple-600 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-purple-600">Protected Content</h1>
        <p>This is the protected content that only subscribers can see.</p>
      </div>
    </div>
  );
};

export default ProtectedContent;