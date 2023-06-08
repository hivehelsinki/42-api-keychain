import { InputKeys } from '@/components/input-keys';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function AdminNew() {
  return (
    <main className="container mt-4">
      <section className="flex max-w-[700px] flex-col gap-5">
        <h1 className="text-2xl font-bold leading-tight tracking-tighter md:text-3xl lg:leading-[1.1]">
          Add a new application
        </h1>
        <div className="mt-10">
          <InputKeys />
        </div>
        <div className="mt-4 rounded-md bg-gray-100 p-4">
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </Label>
            <Input disabled value="HIVE - BigBro" className="border-gray-400" />
          </div>
        </div>
        <Button disabled>Add</Button>
      </section>
    </main>
  );
}
