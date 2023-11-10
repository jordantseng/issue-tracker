import prisma from '@/prisma/client';
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

import { IssueStatusBadge } from '@/app/components';
import Link from 'next/link';

type IssueDetailPageProps = {
  params: { id: string };
};

const getIssue = async (id: string) => {
  if (Number.isNaN(parseInt(id))) {
    notFound();
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) {
    notFound();
  }

  return issue;
};

const IssueDetailPage = async ({ params }: IssueDetailPageProps) => {
  const issue = await getIssue(params.id);

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex gap="3" my="2">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.updatedAt.toDateString()}</Text>
        </Flex>
        <Card className="prose" mt="4">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Link href={`/issues/${issue.id}/edit`}>
          <Button>
            <Pencil2Icon />
            Edit Issue{' '}
          </Button>
        </Link>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
