'use client';

import { useState } from 'react';

export default function Home() {
  const [connectionStatus, setConnectionStatus] = useState<string>('');
  const projectId = process.env.NEXT_PUBLIC_PIPEDREAM_PROJECT_ID;

  if (!projectId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-black">
        <div className="text-red-600">
          Error: NEXT_PUBLIC_PIPEDREAM_PROJECT_ID is not configured
        </div>
      </div>
    );
  }

  const handleConnect = async () => {
    try {
      setConnectionStatus('Connecting...');
      const response = await fetch('/api/connections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
      });

      if (response.ok) {
        setConnectionStatus('Connection successful!');
      } else {
        setConnectionStatus('Connection failed');
      }
    } catch (error) {
      console.error('Connection error:', error);
      setConnectionStatus('Connection error');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black">
      <nav className="flex justify-end gap-4 p-4 text-sm">
        <a href="/reddit" className="rounded-lg bg-orange-600 px-4 py-2 font-medium text-white hover:bg-orange-700">
          r/hopsai Stats Dashboard &rarr;
        </a>
      </nav>
      <main className="flex-1 flex flex-col items-center justify-start py-12 px-4">
        <div className="max-w-2xl w-full">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-2">
            Pipedream Connect Integration
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
            Connect your accounts to 10,000+ applications with Pipedream
          </p>

          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-black dark:text-white mb-6">
              Integration Setup
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-black dark:text-white mb-2">
                  Project ID
                </h3>
                <code className="bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded text-sm font-mono block">
                  {projectId}
                </code>
              </div>

              <div>
                <h3 className="font-semibold text-black dark:text-white mb-2">
                  Configuration Status
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                    <span className="text-zinc-700 dark:text-zinc-300">Project ID configured</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                    <span className="text-zinc-700 dark:text-zinc-300">Pipedream SDK installed</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                    <span className="text-zinc-700 dark:text-zinc-300">API routes configured</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleConnect}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Test Connection
              </button>

              {connectionStatus && (
                <div className={`p-4 rounded-lg ${
                  connectionStatus.includes('successful') 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                }`}>
                  {connectionStatus}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
              To Complete Setup
            </h2>
            <ol className="space-y-3 text-zinc-700 dark:text-zinc-300 list-decimal list-inside">
              <li>Authenticate with Pipedream CLI: <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-sm">pd login</code></li>
              <li>Configure OAuth credentials in your Pipedream dashboard</li>
              <li>Set up your OAuth client with production callback URLs</li>
              <li>Update environment variables for production deployment</li>
              <li>Deploy to your production environment (Vercel, etc.)</li>
            </ol>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg shadow-lg p-8 border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">
              Project Structure
            </h3>
            <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200 font-mono">
              <div><span className="font-semibold">./lib/pipedream.ts</span> - SDK configuration</div>
              <div><span className="font-semibold">./app/api/connections/</span> - Connection management API</div>
              <div><span className="font-semibold">./app/api/webhooks/</span> - Webhook receiver endpoint</div>
              <div><span className="font-semibold">.env.local</span> - Configuration with project ID</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
