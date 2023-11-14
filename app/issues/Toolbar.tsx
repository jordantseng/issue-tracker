import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import IssueStatusFilter from './IssueStatusFilter';

const Toolbar = () => {
  return (
    <Flex mb="5" justify="between">
      <Link href="/issues/new">
        <Button>New Issue</Button>
      </Link>
      <IssueStatusFilter />
    </Flex>
  );
};

export default Toolbar;
