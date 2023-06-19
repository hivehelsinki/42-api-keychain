import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export default function Home() {
  return (
    <main className="container mt-10">
      <section className="flex max-w-[980px] flex-col items-start gap-2 px-4 pt-8 md:pt-12">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
          Manage smoothly your 42 API applications.
        </h1>
        <div className="max-w-[780px] text-lg text-muted-foreground sm:text-xl">
          Experience seamless managuement of your 42 API Keys with Hive Keychain
          - the ultimate solution designed for hassle-free control.
        </div>
        <div className="flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10">
          <Button>Get started</Button>
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
      </section>
      <section className="mt-20 flex items-center justify-center">
        <Image
          src="https://picsum.photos/1024/600"
          width={1024}
          height={600}
          alt="placeholder"
        />
      </section>
      <section className="mt-20 space-y-16 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-16 md:space-y-0 lg:gap-x-10">
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
            What is lorem ipsum?
          </h2>
          <p>
            Lorem ipsum is Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Ex, quisquam repudiandae? Deleniti repellat porro ad sapiente
            eum quis sint laborum eveniet et excepturi accusamus dolor
            molestiae, mollitia voluptatum culpa? Aperiam! Lorem ipsum is Lorem
            ipsum dolor sit, amet consectetur adipisicing elit. Ex, quisquam
            repudiandae? Deleniti repellat porro ad sapiente eum quis sint
            laborum eveniet et excepturi accusamus dolor molestiae, mollitia
            voluptatum culpa? Aperiam!
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
}