import { Suspense } from 'react';
import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';

type Params = Promise<{ id: string }>;

export default function Page(props: { params: Params }) {
  return (
    <main>
      {/* The invoice id comes from the URL, so the content streams in (PPR). */}
      <Suspense fallback={<FormSkeleton />}>
        <EditInvoice params={props.params} />
      </Suspense>
    </main>
  );
}

async function EditInvoice({ params }: { params: Params }) {
  const { id } = await params;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  // No invoice with this id: show not-found.tsx instead of a broken form.
  if (!invoice) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </>
  );
}

function FormSkeleton() {
  return <div className="h-[480px] animate-pulse rounded-md bg-gray-100" />;
}
