import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import { Issue, Status } from '@prisma/client';
import Link from 'next/link';
import { ArrowUpIcon } from '@radix-ui/react-icons';

import { IssueStatusBadge } from '@/app/components';
import Toolbar from './Toolbar';
import Pagination from '../components/Pagination';

const columns: { label: string; value: keyof Issue; classsName?: string }[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', classsName: 'hidden md:table-cell' },
  {
    label: 'Created',
    value: 'createdAt',
    classsName: 'hidden md:table-cell',
  },
];

type IssuesPageProps = {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
};

const IssuesPage = async ({ searchParams }: IssuesPageProps) => {
  const statues = Object.values(Status);
  const status = statues.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const columnValues = columns.map(({ value }) => value);
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
    <div>
      <Toolbar />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map(({ label, value, classsName }) => (
              <Table.ColumnHeaderCell key={value} className={classsName}>
                <Link
                  href={{
                    query: { ...searchParams, orderBy: value },
                  }}
                >
                  {label}
                </Link>
                {value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(({ id, title, status, createdAt }) => (
            <Table.Row key={id}>
              <Table.Cell>
                <Link href={`/issues/${id}`}>{title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination itemCount={issueCount} pageSize={pageSize} currentPage={page} />
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default IssuesPage;
