import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Icons } from '@/components/icons';
import { InputKeys } from '@/components/input-keys';

export default function Dev() {
  return (
    <main className="container flex flex-col gap-6 p-4">
      <div>
        <p className="mb-4 text-xl font-bold">Button</p>
        <div className="flex gap-2">
          <Button>Button</Button>
          <Button variant="destructive">destructive</Button>
          <Button variant="outline">outline</Button>
          <Button variant="secondary">secondary</Button>
          <Button variant="ghost">ghost</Button>
          <Button variant="link">link</Button>
        </div>

        <div className="mt-2 flex gap-2">
          <Button size="sm">sm</Button>
          <Button size="default">default</Button>
          <Button size="lg">lg</Button>
        </div>
      </div>
      <div className="mt-10 flex items-center gap-2">
        <p className="text-xl font-bold">Avatar</p>
        <Avatar className="border border-gray-400">
          <AvatarImage src="https://avatars.githubusercontent.com/u/47269261?v=4" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
      <div className="mt-10  flex items-center gap-2">
        <p className="text-xl font-bold">Input</p>
        <Input placeholder="Input" />
      </div>
      <div className="mt-10  flex items-center  gap-2">
        <p className="text-xl font-bold">Skeleton</p>
        <Skeleton className="h-6 w-80 bg-gray-200" />
      </div>

      <div className="mt-10  flex items-center gap-2">
        <p className="text-xl font-bold">Icons</p>
        <Icons.gitHub className="h-7 w-7" />
        <Icons.close className="h-7 w-7" />
      </div>

      <div className="mt-10 flex flex-col gap-2">
        <p className="text-xl font-bold">Input keys</p>
        <InputKeys />
      </div>
    </main>
  );
}
