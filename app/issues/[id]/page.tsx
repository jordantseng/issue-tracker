import prisma from '@/prisma/client';
import { Box, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';

import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';

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
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
