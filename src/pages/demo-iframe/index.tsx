import React from 'react';

const Page = () => {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Embedding the Chatbot</h1>

      <div className="space-y-8">
        <section>
          <h2 className="mb-4 text-2xl font-semibold">Quick Start</h2>
          <p className="mb-4">Add this code snippet to your website to embed the chatbot:</p>
          <pre className="overflow-x-auto rounded-lg bg-gray-800 p-6 font-mono text-sm leading-relaxed text-gray-100">
            {`<iframe
  src="${process.env.NEXT_PUBLIC_DOMAIN ? process.env.NEXT_PUBLIC_DOMAIN : 'http://localhost:3000/demo-community'}/serve-iframe"
  data-token=${localStorage.getItem('accessToken') || ''}
  title="Lembah Pantai Assistant"
  style={{
    position: 'fixed',
    right: 0,
    bottom: 0,
    zIndex: 9999,
    height: '600px',
    width: '400px',
    overflow: 'hidden',
    border: 0,
    transition: 'all 300ms',
  }}
/>`}
          </pre>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Requirements</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Modern web browser with JavaScript enabled</li>
            <li>Minimum viewport width of 400px</li>
            <li>No conflicting z-index values that might hide the chatbot</li>
          </ul>
        </section>
      </div>
      <iframe
        src={`${process.env.NEXT_PUBLIC_DOMAIN ? process.env.NEXT_PUBLIC_DOMAIN : 'http://localhost:3000/demo-community'}/serve-iframe`}
        data-token={localStorage.getItem('accessToken') || ''}
        title="Lembah Pantai Assistant"
        style={{
          position: 'fixed',
          right: 0,
          bottom: 0,
          zIndex: 9999,
          height: '600px',
          width: '400px',
          overflow: 'hidden',
          border: 0,
          transition: 'all 300ms',
        }}
      />
    </div>
  );
};

export default Page;
