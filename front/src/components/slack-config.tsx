'use client';

import { FC, useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from './ui/input';

interface slackConfigProps {}

const SlackConfig: FC<slackConfigProps> = ({}) => {
  const [slackEnabled, setSlackEnabled] = useState<boolean>(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('http://localhost:5001/settings');
      const { slack_enabled } = await res.json();
      setSlackEnabled(slack_enabled === 'true' ? true : false);
    } catch (error) {
      console.error('error fetching settings', error);
    }
  };

  const handleChange = async () => {
    try {
      const res = await fetch('http://localhost:5001/settings/slack_enabled', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: !slackEnabled }),
      });

      setSlackEnabled(!slackEnabled);
    } catch (error) {
      console.error('error updating settings', error);
    }
  };

  return (
    <div className="flex max-w-[700px] flex-col gap-2">
      <div className="flex flex-col">
        <Label htmlFor="slack-enabled" className="font-bold uppercase">
          Slack notification
        </Label>
        <p className="my-2 leading-7 text-muted-foreground">
          Receive notification on Slack when an app is about to be expired
        </p>
        <div className="flex items-center gap-2">
          <Switch
            id="slack-enabled"
            checked={slackEnabled}
            onClick={handleChange}
          />
          <p className="font-bold">{slackEnabled ? 'Enabled' : 'Disabled'}</p>
        </div>
      </div>

      <div className="mt-10 flex flex-col">
        <Label className="font-bold uppercase" htmlFor="slack-webhook-url">
          Slack Webhook
        </Label>
        <p className="my-2 leading-7 text-muted-foreground">
          Your webhook url to send notification to slack
        </p>
        <Input
          placeholder="https://hooks.slack.com/services/..."
          id="slack-webhook-url"
          className="font-semibold"
        />
      </div>
    </div>
  );
};

export default SlackConfig;
