'use client';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Skeleton } from '@/app/components';

type AssigneeSelectProps = { issue: Issue };

const AssigneeSelect = ({ issue }: AssigneeSelectProps) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axios.get('/api/users');
      return data;
    },
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return null;
  }

  const handleChange = async (userId: string) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId || null,
      });
    } catch (error) {
      toast.error('Changes could not be saved.');
    }
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ''}
        onValueChange={(userId) => handleChange(userId)}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="">Unassigned</Select.Item>
            {users?.map(({ id, name }) => (
              <Select.Item key={id} value={id}>
                {name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
