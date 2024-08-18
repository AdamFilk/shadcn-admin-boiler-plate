'use client';

import { DataTable } from '@/components/datatable/datatable';
import { userListTableColumns } from './columns';
import { useGetUsersQuery } from '@/lib/quiries/users';
import { useState } from 'react';

export default function UserList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isLoading } = useGetUsersQuery({ page: currentPage });

  return (
    <div className='container mx-auto py-10'>
      <DataTable
        columns={userListTableColumns}
        data={data ? data.data : []}
        loading={isLoading}
        meta={data?.meta}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
