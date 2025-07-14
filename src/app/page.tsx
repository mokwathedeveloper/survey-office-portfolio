import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Survey Office Portfolio</h1>
      <p className="text-lg mb-8">This is a portfolio of survey jobs. Click the link below to see the work.</p>
      <Link href="/jobs" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        View Survey Jobs
      </Link>
    </main>
  );
}
