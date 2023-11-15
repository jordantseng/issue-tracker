import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';

import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
import authOptions from '@/app/auth/authOption';
import AssigneeSelect from './AssigneeSelect';
import { cache } from 'react';

type IssueDetailPageProps = {
  params: { id: string };
};

const getIssue = cache(async (id: string) => {
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
});

const IssueDetailPage = async ({ params }: IssueDetailPageProps) => {
  const session = await getServerSession(authOptions);

  const issue = await getIssue(params.id);

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Flex direction="column" gap="4">
          <AssigneeSelect issue={issue} />
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: IssueDetailPageProps) {
  const issue = await getIssue(params.id);

  return {
    title: issue?.title,
    describe: `$Details of issue ${issue?.id}`,
  };
}

export default IssueDetailPage;
