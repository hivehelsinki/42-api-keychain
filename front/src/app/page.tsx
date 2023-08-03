import Link from 'next/link';
import Image from 'next/image';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { LoginButton } from '@/components/auth/login-button';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <main className="container mt-10">
      <section className="px-4 pt-8 md:pt-12">
        <div className="mx-auto max-w-screen-xl gap-8 px-4 py-8 sm:py-16 md:grid md:grid-cols-3 lg:px-6">
          <div className="col-span-2 ">
            <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
              Manage smoothly your 42 API applications.
            </h1>
            <div className="text-lg text-muted-foreground sm:text-xl">
              Experience seamless management of your 42 API Keys with Hive
              Keychain - the ultimate solution designed for hassle-free control.
            </div>
            <div className="flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10">
              <LoginButton>Get started</LoginButton>
              <Button variant="outline">
                <Link
                  href="https://github.com/hivehelsinki/42-api-keychain"
                  target="_blank"
                  className="inline-flex items-center"
                >
                  <Icons.gitHub className="h-4 pr-2" /> Github
                </Link>
              </Button>
            </div>
          </div>
          <div>
            <Image
              src="/key_1.png"
              alt=""
              width={230}
              height={230}
              className="mx-auto hidden -translate-y-10 rotate-45 hover:animate-pulse md:block"
            />
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl items-center gap-8 px-4 py-8 sm:py-16 md:grid md:grid-cols-3 lg:px-6">
          <Image
            src="/notif_3.png"
            alt=""
            width={200}
            height={200}
            className="mx-auto"
          />
          <div className="col-span-2 mt-4 md:mt-0	">
            <h2 className="mb-4 text-center text-3xl font-bold leading-tight tracking-tighter md:text-left md:text-4xl lg:leading-[1.1]">
              Notification
            </h2>
            <p className="mb-6 text-center font-light text-muted-foreground sm:text-xl md:text-left md:text-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut id
              dolores officia eius eos et error vitae nihil hic, dolorum
              explicabo sapiente harum eligendi ipsum perspiciatis nulla
              praesentium, exercitationem porro.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl gap-8 px-4 py-8 sm:py-16 md:grid md:grid-cols-3 lg:px-6">
          <Image
            src="/alarm_2.png"
            alt=""
            width={230}
            height={230}
            className="col-start-3 row-start-1 mx-auto "
          />
          <div className="col-span-2 col-start-1  row-start-1 mt-4 md:mt-0	">
            <h2 className="mb-4 text-center text-3xl font-bold leading-tight tracking-tighter md:text-left md:text-4xl lg:leading-[1.1]">
              Report
            </h2>
            <p className="mb-6 text-center font-light text-gray-500 dark:text-gray-400 md:text-left md:text-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut id
              dolores officia eius eos et error vitae nihil hic, dolorum
              explicabo sapiente harum eligendi ipsum perspiciatis nulla
              praesentium, exercitationem porro.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl items-center gap-8 px-4 py-8 sm:py-16 md:grid md:grid-cols-3 lg:px-6">
          <Image
            src="/server_1.png"
            alt=""
            width={200}
            height={200}
            className="mx-auto"
          />
          <div className="col-span-2 mt-4 md:mt-0	">
            <h2 className="mb-4 text-center text-3xl font-bold leading-tight tracking-tighter md:text-left md:text-4xl lg:leading-[1.1]">
              Self-hosted
            </h2>
            <p className="mb-6 text-center font-light text-gray-500 dark:text-gray-400 md:text-left md:text-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut id
              dolores officia eius eos et error vitae nihil hic, dolorum
              explicabo sapiente harum eligendi ipsum perspiciatis nulla
              praesentium, exercitationem porro.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-14 space-y-16 pb-10 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-16 md:space-y-0 lg:gap-x-10">
        <article>
          <h2 className="text-lg font-semibold leading-7">
            Why would I need this?
          </h2>
          <p>
            42 API apps are linked to an individual account, it can become
            challenging to manage and keep track of them. API Keychain would
            like to help team to overwatch all their API apps and their rotation
            deadlines to avoid disruption of their services.
          </p>
        </article>
        <article>
          <h2 className="text-lg font-semibold leading-7">
            Do I get notification when an app is about to expire?
          </h2>
          <p>
            Yes! You will receive a notification 7 days, 14 and 30 days before
            the expiration via Slack and email.
          </p>
        </article>
        <article>
          <h2 className="text-lg font-semibold leading-7">
            What is lorem ipsum?
          </h2>
          <p>
            Lorem ipsum is Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Ex, quisquam repudiandae? Deleniti repellat porro ad sapiente
            eum quis sint laborum eveniet et excepturi accusamus dolor
            molestiae, mollitia voluptatum culpa? Aperiam!
          </p>
        </article>
        <article>
          <h2 className="text-lg font-semibold leading-7">
            What is lorem ipsum?
          </h2>
          <p>
            Lorem ipsum is Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Ex, quisquam repudiandae? Deleniti repellat porro ad sapiente
            eum quis sint laborum eveniet et excepturi accusamus dolor
            molestiae, mollitia voluptatum culpa? Aperiam!
          </p>
        </article>
        <article>
          <h2 className="text-lg font-semibold leading-7">
            What is lorem ipsum?
          </h2>
          <p>
            Lorem ipsum is Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Ex, quisquam repudiandae? Deleniti repellat porro ad sapiente
            eum quis sint laborum eveniet et excepturi accusamus dolor
            molestiae, mollitia voluptatum culpa? Aperiam!
          </p>
        </article>
        <article>
          <h2 className="text-lg font-semibold leading-7">
            What is lorem ipsum?
          </h2>
          <p>
            Lorem ipsum is Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Ex, quisquam repudiandae? Deleniti repellat porro ad sapiente
            eum quis sint laborum eveniet et excepturi accusamus dolor
            molestiae, mollitia voluptatum culpa? Aperiam!
          </p>
        </article>
      </section>
    </main>
  );
};

export default page;
