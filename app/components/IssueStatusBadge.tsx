import { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';

type IssueStatusBadgeProps = {
  status: Status;
};

const statusMap: Record<
  Status,
  { label: string; color: 'red' | 'violet' | 'green' }
> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In progress', color: 'violet' },
  CLOSED: { label: 'Closed', color: 'green' },
};

const IssueStatusBadge = ({ status }: IssueStatusBadgeProps) => {
  console.log('status', status);

  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
