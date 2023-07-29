import FormSettings from '@/components/form-settings';
import { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <section className="mt-10">
      <FormSettings />
    </section>
  );
};

export default page;
