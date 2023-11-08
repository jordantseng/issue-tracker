'use client';
import { Button } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import React from 'react';

const Toolbar = () => {
  const router = useRouter();

  return (
    <div className="mb-5">
      <Button onClick={() => router.push('/issues/new')}>New Issue</Button>
    </div>
  );
};

export default Toolbar;
