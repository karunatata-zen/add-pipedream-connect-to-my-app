import { PipedreamClient } from '@pipedream/sdk';

const projectId = process.env.NEXT_PUBLIC_PIPEDREAM_PROJECT_ID;

if (!projectId) {
  throw new Error('NEXT_PUBLIC_PIPEDREAM_PROJECT_ID environment variable is not set');
}

export const pipedreamClient = new PipedreamClient({
  projectId,
});

export { PipedreamClient };
