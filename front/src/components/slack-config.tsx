import { FC } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from './ui/input';

interface slackConfigProps {}

async function getSlackConfig() {}

const SlackConfig: FC<slackConfigProps> = ({}) => {
  return (
    <div className="flex max-w-[700px] flex-col gap-2">
      <div className="flex flex-col">
        <Label htmlFor="slack-enabled" className="font-bold uppercase">
          Slack notification
        </Label>
        <p className="my-2 text-muted-foreground ">
          Receive notification on Slack when an app is about to be expired
        </p>
        <div className="flex items-center gap-2">
          <Switch id="slack-enabled" />
          <p className="font-bold">Disabled</p>
        </div>
      </div>

      <div className="mt-10 flex flex-col">
        <Label className="font-bold uppercase" htmlFor="slack-webhook-url">
          Slack Webhook
        </Label>
        <p className="my-2 text-muted-foreground">
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
