'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import dynamic from 'next/dynamic';

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { createIssueScheme } from '@/app/validationScheme';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

type IssueForm = z.infer<typeof createIssueScheme>;

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueScheme),
  });
  const router = useRouter();
  const [error, setError] = useState('');

  const onSubmit: SubmitHandler<IssueForm> = async (data) => {
    try {
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5" color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register('title')} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
