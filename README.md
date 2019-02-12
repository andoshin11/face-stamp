# Face Stamp

Face Stamp is a simple node script to generate emojis from you Slack Team member's profile picture and register them to the workspace.

## Requirements

Create `.env` file and set your secrets.

```
# .env
SLACK_TOKEN=<Your Slack Token>
SLACK_DOMAIN=<Your Slack domain>
SLACK_USER_TOKEN=<Your User Token>
```

### `SLACK_TOKEN`:

You can generate your legacy token from [here](https://api.slack.com/custom-integrations/legacy-tokens).

Example: `xoxp-xxxxxxxxx-xxxxxx-xxxxxxx`

### `SLACK_DOMAIN`:

If your Slack Team url is `my-team.slack.com`, then `my-team` will be your Slack domain

### `SLACK_USER_TOKEN`:

Getting user token is a bit tricky.

1. Open your slack workspace on a browser.
2. Right click window → inspect element, to open the developer console.
3. Copy and paste the script down below to achieve your user token.

```
window.prompt("your api token is: ",/api_token: "(.*)"/.exec(document.body.innerHTML)[1])
```

Example: `xoxs-xxxxxxxxxx-xxxxxxxxx-xxxxxxxxxx`

# How to use.

Type following command and let the magic happen:)

```
$ yarn install
$ yarn start
```
