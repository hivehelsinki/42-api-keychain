import SlackConfig from '@/components/slack-config';
import { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <section className="mt-10">
      <SlackConfig />
    </section>
  );
};

export default page;
