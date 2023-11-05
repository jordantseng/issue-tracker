'use client';
import React from 'react';
import { Button } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

const IssuesPage = () => {
  const router = useRouter();

  return (
    <div>
      <Button onClick={() => router.push('/issues/new')}>New Issue</Button>
    </div>
  );
};

export default IssuesPage;
