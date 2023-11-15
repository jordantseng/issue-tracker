import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';

type IssueSummaryProps = {
  open: number;
  inProgress: number;
  closed: number;
};

const IssueSummary = ({ open, inProgress, closed }: IssueSummaryProps) => {
  const statues: { label: string; value: number; status: Status }[] = [
    { label: 'Open Issues', value: open, status: 'OPEN' },
    { label: 'In-progress Issues', value: inProgress, status: 'IN_PROGRESS' },
    { label: 'Closed Issues', value: closed, status: 'CLOSED' },
  ];

  return (
    <Flex gap="4">
      {statues.map(({ label, status, value }) => {
        return (
          <Card key={label}>
            <Flex gap="2" direction="column" align="center">
              <Link
                className="text-sm font-medium"
                href={`/issues?status=${status}`}
              >
                {label}
              </Link>
              <Text size="5" className="font-bold">
                {value}
              </Text>
            </Flex>
          </Card>
        );
      })}
    </Flex>
  );
};

export default IssueSummary;
