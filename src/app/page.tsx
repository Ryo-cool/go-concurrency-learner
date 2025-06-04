'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the lessons page
    router.push('/lessons');
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-gray-500">レッスン一覧へ移動中...</div>
    </div>
  );
}