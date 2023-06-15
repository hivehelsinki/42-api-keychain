'use client';

import * as React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';

const InputKeys = () => {
  const [uid, setUid] = React.useState<string>('');
  const [secret, setSecret] = React.useState<string>('');
  const [isValid, setIsValid] = React.useState<boolean | null>(null);
  const [data, setData] = React.useState({});

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setInput(event.target.value);
  };

  React.useEffect(() => {
    if (uid.length >= 64 && secret.length >= 64) {
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
          setData(data);
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

      <Label className="mt-4" htmlFor="secret">
        Client Secret
      </Label>
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
            <div className="flex items-center gap-2 bg-green-100 py-2 pl-2 text-sm dark:bg-green-700">
              <Icons.check className="h-4 w-4 text-green-600 dark:text-gray-200" />
              <p className="dark:text-gray-200">
                Application found under the name <b>{data?.appName}</b>
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-red-100 py-2 pl-2 text-sm dark:bg-destructive dark:bg-red-500">
              <Icons.close className="h-4 w-4 text-red-600/80 dark:text-gray-200" />
              <p className="text-gray-200">
                Application not found or not valid
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { InputKeys };
