import { Suspense } from 'react';
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { fetchInvoicesPages } from '@/app/lib/data';

type SearchParams = Promise<{ query?: string; page?: string }>;

// The page itself is a static shell (prerendered with PPR).
// Everything that depends on the URL (search term, page number) is
// rendered inside <Suspense> and streamed in at request time.
export default function Page(props: { searchParams: SearchParams }) {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Suspense fallback={<SearchFallback />}>
          <Search placeholder="Search invoices..." />
        </Suspense>
        <CreateInvoice />
      </div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <InvoicesResults searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}

async function InvoicesResults({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = params?.query || '';
  const currentPage = Number(params?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  return (
    <>
      <Table query={query} currentPage={currentPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}

function SearchFallback() {
  return (
    <div className="h-[38px] flex-1 rounded-md border border-gray-200 bg-gray-50" />
  );
}
