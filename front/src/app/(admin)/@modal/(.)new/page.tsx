import { FC } from 'react';

import Modal from '@/components/modal';
import { FormAddKey } from '@/components/form-add-key';

const page: FC = () => {
  return (
    <Modal>
      <section className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold leading-tight tracking-tighter md:text-3xl lg:leading-[1.1]">
          Add a new application
        </h1>
        <div className="mt-6">
          <FormAddKey />
        </div>
      </section>
    </Modal>
  );
};

export default page;
