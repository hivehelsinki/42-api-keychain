import { FC } from 'react';
import { FormAddKey } from '@/components/form-add-key';

const page: FC = () => {
  return (
    <main className="container mt-4">
      <section className="flex max-w-[700px] flex-col gap-5">
        <h1 className="text-2xl font-bold leading-tight tracking-tighter md:text-3xl lg:leading-[1.1]">
          Add a new application
        </h1>
        <div className="mt-6">
          <FormAddKey />
        </div>
      </section>
    </main>
  );
};

export default page;
