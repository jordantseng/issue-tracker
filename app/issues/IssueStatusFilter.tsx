'use client';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

const statues: { label: string; value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

const IssueStatusFilter = () => {
  const router = useRouter();

  const handleChange = (status: Status) => {
    const query = status ? `?status=${status}` : '';
    router.push(`/issues${query}`);
  };

  return (
    <Select.Root onValueChange={handleChange}>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statues.map(({ label, value }) => (
          <Select.Item key={value} value={value || ''}>
            {label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
