'use client';

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataTablePagination } from './pagination';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { SearchIcon } from 'lucide-react';
import { PaginationResponseModel } from '@/lib/types/model/common/response';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  search?: {
    searchVal: string | undefined;
    setSearchVal: (val: string | undefined) => void;
  };
  loading: boolean;
  meta?: PaginationResponseModel<TData>['meta'];
  setCurrentPage?: (value: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  search,
  meta,
  setCurrentPage,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState({
    pageIndex: meta ? meta.currentPage - 1 : 0, //initial page index
    pageSize: meta ? meta.itemsPerPage : 10, //default page size
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination,
    },
    manualFiltering: true,
    manualPagination: true,
    onPaginationChange: setPagination,
    rowCount: meta?.totalItems,
  });

  useEffect(() => {
    if (setCurrentPage) setCurrentPage(pagination.pageIndex + 1);
  }, [pagination]);

  return (
    <div>
      {search ? (
        <div className='flex items-center py-4'>
          <Input
            placeholder='Filter emails...'
            value={search.searchVal}
            onChange={(event) =>
              search.setSearchVal(
                event.target.value === '' ? undefined : event.target.value
              )
            }
            className='max-w-sm'
          />
          <Button>
            <SearchIcon className='mr-2 h-4 w-4' /> Search
          </Button>
        </div>
      ) : null}

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {meta ? <DataTablePagination table={table} /> : null}
      </div>
    </div>
  );
}
