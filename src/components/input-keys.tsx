'use client';

import * as React from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';

const InputKeys = () => {
  const [uid, setUid] = React.useState<string>('');
  const [secret, setSecret] = React.useState<string>('');
  const [isValid, setIsValid] = React.useState<boolean | null>(null);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setInput(event.target.value);
  };

  React.useEffect(() => {
    if (uid.length >= 64 && secret.length > 64) {
      const fetchData = async () => {
        try {
          const res = await fetch('/api/keys/check', {
            method: 'POST',
            body: JSON.stringify({ client_id: uid, client_secret: secret }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await res.json();
          console.log(data);
          setIsValid(true);
        } catch (error) {
          console.error('Error checking inputs:', error);
          setIsValid(false);
        }
      };
      fetchData();
    } else {
      setIsValid(null);
    }
  }, [uid, secret]);

  return (
    <div className="flex w-full flex-col gap-2">
      <Label htmlFor="uid">Client ID</Label>
      <Input
        id="uid"
        value={uid}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event, setUid)
        }
      />

      <Label htmlFor="secret">Client Secret</Label>
      <Input
        id="secret"
        value={secret}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event, setSecret)
        }
      />
      {isValid !== null && (
        <div className="mt-4">
          {isValid ? (
            <div className="flex items-center gap-2 rounded-md bg-green-100 py-2 pl-2 text-sm">
              <Icons.check className="h-4 w-4 text-green-600" />
              <p>Application found</p>
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-md bg-red-100 py-2 pl-2 text-sm ">
              <Icons.close className="h-4 w-4 text-red-600" />
              <p>Application not found or not valid</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { InputKeys };
