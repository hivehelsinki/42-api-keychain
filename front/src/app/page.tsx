import Link from 'next/link';
import Image from 'next/image';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { LoginButton } from '@/components/auth/login-button';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <main className="container mt-8">
      <section>
        <div className="mx-auto max-w-screen-xl gap-8 px-4 py-8 sm:py-16 md:grid md:grid-cols-3 lg:px-6">
          <div className="col-span-2 ">
            <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
              Manage smoothly your 42 API applications.
            </h1>
            <div className="text-lg text-muted-foreground sm:text-xl">
              Experience seamless management of your 42 API Keys with Hive Keychain - the ultimate solution designed for
              hassle-free control.
            </div>
            <div className="flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10">
              <LoginButton>Get started</LoginButton>
              <Button variant="outline">
                <Link
                  href="https://github.com/hivehelsinki/42-api-keychain"
                  target="_blank"
                  className="inline-flex items-center"
                >
                  <Icons.gitHub className="h-4 pr-2" />
                  Github
                </Link>
              </Button>
            </div>
          </div>
          <div>
            <Image
              src="/key.png"
              alt="key illustration"
              width={200}
              height={200}
              className="mx-auto hidden hover:animate-pulse md:block"
            />
          </div>
        </div>
      </section>

      <section className="mt-10 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl items-center gap-8 px-4 py-6 md:grid md:grid-cols-5 lg:px-6">
          <Image src="/keys.png" alt="keys illustration" width={130} height={130} className="mx-auto -translate-y-3" />
          <div className="col-span-4 mt-4 md:mt-0">
            <h2 className="mb-4 text-center text-2xl font-bold leading-tight tracking-tighter md:text-left lg:leading-[1.1]">
              Centralized management
            </h2>
            <p className="mb-6 text-center font-light text-muted-foreground sm:text-xl md:text-left md:text-lg">
              Centralize your team&apos;s keys for a comprehensive overview of their validity in one place. Empower
              every member to proactively address potential service disruptions and take ownership of the process for
              updating keys.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl gap-8 px-4 py-6 md:grid md:grid-cols-5 lg:px-6">
          <Image
            src="/notification.png"
            alt="notification illustration"
            width={130}
            height={130}
            className="col-start-5 row-start-1 mx-auto -translate-y-3"
          />
          <div className="col-span-4 col-start-1 row-start-1 mt-4 md:mt-0">
            <h2 className="mb-4 text-center text-2xl font-bold leading-tight tracking-tighter md:text-left lg:leading-[1.1]">
              Get notified before it&apos;s too late
            </h2>
            <p className="mb-6 text-center font-light text-gray-500 dark:text-gray-400 md:text-left md:text-lg">
              Enhance your app management with Keychain&apos;s advanced monitoring solution. Receive real-time alerts,
              staying ahead by 24 hours, 7 days, and 30 days before app expiration. Keychain ensures smooth workflow by
              providing timely validity checks and prompt unresponsive app notifications. Say goodbye to surprises and
              maintain efficiency with Keychain.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl items-center gap-8 px-4 py-6 md:grid md:grid-cols-5 lg:px-6">
          <Image src="/server.png" alt="server illustration" width={145} height={145} className="mx-auto" />
          <div className="col-span-4 mt-4 md:mt-0	">
            <h2 className="mb-4 text-center text-2xl font-bold leading-tight tracking-tighter md:text-left lg:leading-[1.1]">
              Self-hosted solution
            </h2>
            <p className="mb-6 text-center font-light text-gray-500 dark:text-gray-400 md:text-left md:text-lg">
              Unleash the full potential of your internal network with Keychain&apos;s open-source tool. Tailor it to
              your unique needs and seamlessly integrate it within your network. Enjoy the benefits of complete control
              and customization as you harness the power of Keychain for your organization.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <div className="flex items-center gap-3">
          <Image src="/speech.png" alt="speech illustration" width={50} height={50} />
          <h2 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-left md:text-4xl lg:leading-[1.1]">
            FAQ
          </h2>
        </div>
        <div className="mt-6 space-y-16 pb-10 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-16 md:space-y-0 lg:gap-x-10">
          <article>
            <h2 className="text-lg font-semibold leading-7">Why would I need this?</h2>
            <p>
              42 API apps are linked to an individual account, it can become challenging to manage and keep track of
              them. API Keychain would like to help team to overwatch all their API apps and their rotation deadlines to
              avoid disruption of their services.
            </p>
          </article>
          <article>
            <h2 className="text-lg font-semibold leading-7">Do I get notification when an app is about to expire?</h2>
            <p>
              Yes! You will receive a notification 24 hours, 7 days, and 14 days before the expiration via Slack and
              email.
            </p>
          </article>
          <article>
            <h2 className="text-lg font-semibold leading-7">How often it checks the keys and how to change it?</h2>
            <p>
              The keys are checked every day at 10am. To adjust this schedule, you can modify the time or frequency
              within the <code>back/tasks/scheduled-check.js</code> file. However, I strongly recommend against changing
              the frequency. The code in the backend is not optimally structured for altering the frequency, and doing
              so could potentially lead to additional notifications or even missed notifications.
            </p>
          </article>
          <article>
            <h2 className="text-lg font-semibold leading-7">
              The Keychain&apos;s secret rotated, how can I update the secret?
            </h2>
            <p>
              To update the API secret for the app, edit the .env file and replace the existing <code>FT_SECRET</code>{' '}
              entry with the new secret, and then reload the container using the command docker-compose down &&
              docker-compose up -d to apply the changes.
            </p>
          </article>
          <article>
            <h2 className="text-lg font-semibold leading-7">
              I&apos;m a student and I want to use Keychain, how does that work?
            </h2>
            <p>
              Please note that if you intend to run this application as a student, you&apos;ll need to edit the file
              <code>front/src/lib/auth.ts</code>. In this file, you should replace the section responsible for verifying
              the user&apos;s staff status with a check based on your login credentials.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
};

export default page;
