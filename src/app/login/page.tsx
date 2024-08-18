'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useLoginMutation } from '@/lib/quiries/auth';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  username: z.string({ required_error: 'User name cannot be empty' }),
  password: z.string({ required_error: 'Password cannot be empty' }),
});

export default function LoginPage() {
  const router = useRouter();
  const { status, data, error, isPending, isSuccess, mutateAsync } =
    useLoginMutation();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutateAsync(values);
  };

  useEffect(() => {
    if (status === 'error') {
      toast({
        title: 'Failed',
        description: error.message,
      });
    } else if (status === 'success') {
      toast({
        title: 'Success',
        description: 'Login Sucess!',
      });
      router.push('/');
    }
  }, [status]);

  return (
    <Card className='min-w-full md:min-w-[30%]'>
      <CardHeader />
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter Usernmae' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter Password'
                      {...field}
                      type='password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center justify-end'>
              <Button type='submit' disabled={isPending}>
                {isPending ? (
                  <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                ) : null}
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
