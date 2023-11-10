import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

import IssueFormSkeleton from '@/app/issues/_components/IssueFormSkeleton';

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

type EditIssuePageProps = {
  params: {
    id: string;
  };
};

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const EditIssuePage = async ({ params }: EditIssuePageProps) => {
  const issue = await getIssue(params.id);

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
