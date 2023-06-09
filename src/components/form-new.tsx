'use client';

import { InputKeys } from '@/components/input-keys';
import { Button } from '@/components/ui/button';

const FormNew = () => {
  return (
    <section className="flex max-w-[700px] flex-col gap-5">
      <h1 className="text-2xl font-bold leading-tight tracking-tighter md:text-3xl lg:leading-[1.1]">
        Add a new application
      </h1>
      <div className="mt-6">
        <InputKeys />
      </div>
      <Button disabled>Add</Button>
    </section>
  );
};

export { FormNew };
