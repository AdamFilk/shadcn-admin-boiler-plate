'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { UserModel } from '@/lib/types/model/users/users';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

export const userListTableColumns: ColumnDef<UserModel>[] = [
  {
    accessorKey: 'ref',
    header: 'Ref',
  },
  {
    accessorKey: 'username',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          {/* <ArrowUpDown className='ml-2 h-4 w-4' /> */}
        </Button>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Joined At',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      return <div className='font-medium'>{date.toLocaleDateString()}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
