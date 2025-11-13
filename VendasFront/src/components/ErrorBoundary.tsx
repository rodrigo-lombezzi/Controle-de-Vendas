import React from 'react';

type Props = { children: React.ReactNode };

export default function ErrorBoundary({ children }: Props) {
  const [error, setError] = React.useState<any>(null);

  React.useEffect(() => {
    const onError = (e: ErrorEvent) => setError(e.error ?? e.message ?? String(e));
    const onRejection = (e: PromiseRejectionEvent) => setError(e.reason ?? String(e));

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection as any);

    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection as any);
    };
  }, []);

  if (error) {
    return (
      <div style={{ padding: 20, fontFamily: 'system-ui, sans-serif' }}>
        <h2 style={{ color: '#b91c1c' }}>Runtime error</h2>
        <pre style={{ whiteSpace: 'pre-wrap', background: '#111827', color: '#f8fafc', padding: 12, borderRadius: 6 }}>
          {typeof error === 'string' ? error : String(error)}
        </pre>
        <p>Open the devtools console for full stack trace.</p>
      </div>
    );
  }

  return <>{children}</>;
}
