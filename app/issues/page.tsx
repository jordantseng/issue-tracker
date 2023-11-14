import prisma from '@/prisma/client';
import { Status } from '@prisma/client';

import Toolbar from './Toolbar';
import Pagination from '../components/Pagination';
import IssueTable, { IssueQuery, columnValues } from './IssueTable';
import { Flex } from '@radix-ui/themes';

type IssuesPageProps = {
  searchParams: IssueQuery;
};

const IssuesPage = async ({ searchParams }: IssuesPageProps) => {
  const statues = Object.values(Status);
  const status = statues.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnValues.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 5;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where: { status } });

  return (
    <Flex direction="column" gap="3">
      <Toolbar />
      <IssueTable issues={issues} searchParams={searchParams} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export const dynamic = 'force-dynamic';

export default IssuesPage;
