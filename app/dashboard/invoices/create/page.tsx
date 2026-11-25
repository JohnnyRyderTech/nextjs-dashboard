import { Suspense } from 'react';
import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Invoice',
};

export default function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      {/* The customer list comes from the database, so it streams in (PPR). */}
      <Suspense fallback={<FormSkeleton />}>
        <CreateInvoiceForm />
      </Suspense>
    </main>
  );
}

async function CreateInvoiceForm() {
  const customers = await fetchCustomers();
  return <Form customers={customers} />;
}

function FormSkeleton() {
  return <div className="h-[420px] animate-pulse rounded-md bg-gray-100" />;
}
