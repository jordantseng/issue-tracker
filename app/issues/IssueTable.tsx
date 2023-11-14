import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import Link from 'next/link';

import { IssueStatusBadge } from '../components';

export type IssueQuery = { status: Status; orderBy: keyof Issue; page: string };

type IssueTableProps = {
  issues: Issue[];
  searchParams: IssueQuery;
};

const IssueTable = ({ issues, searchParams }: IssueTableProps) => {
  return (
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
  );
};

const columns: { label: string; value: keyof Issue; classsName?: string }[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', classsName: 'hidden md:table-cell' },
  {
    label: 'Created',
    value: 'createdAt',
    classsName: 'hidden md:table-cell',
  },
];

export const columnValues = columns.map(({ value }) => value);

export default IssueTable;
