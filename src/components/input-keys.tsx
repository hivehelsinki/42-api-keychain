'use client';

import * as React from 'react';

import { Input } from '@/components/ui/input';
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
    if (uid.length > 30 && secret.length > 30) {
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
      <label htmlFor="uid" className="font-bold">
        Client ID
      </label>
      <Input
        id="uid"
        value={uid}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event, setUid)
        }
      />

      <label htmlFor="secret" className="font-bold">
        Client Secret
      </label>
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
            <div className="inline-flex items-center justify-center gap-2 rounded-md bg-green-100 py-0.5 pl-2 pr-3 text-sm">
              <Icons.check className="h-4 w-4 text-green-600" />
              <p>Application found</p>
            </div>
          ) : (
            <div className="inline-flex items-center justify-center gap-2 rounded-md bg-red-100 py-0.5 pl-2 pr-3 text-sm">
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
