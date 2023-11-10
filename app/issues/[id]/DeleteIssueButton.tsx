import { Button } from '@radix-ui/themes';
import Link from 'next/link';

type DeleteIssueButtonProps = {
  issueId: number;
};

const DeleteIssueButton = ({ issueId }: DeleteIssueButtonProps) => {
  return (
    <Link href={`/issues/${issueId}/edit`}>
      <Button className="w-full" color="red">
        Delete Issue
      </Button>
    </Link>
  );
};

export default DeleteIssueButton;
