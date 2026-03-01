import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-gray-900 italic tracking-tighter">SEO AI PLATFORM</h1>
          <p className="text-gray-500 text-lg">Automate your Local SEO agency at scale.</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Link
            href="/dashboard"
            className="bg-red-600 hover:bg-black text-white py-4 px-8 rounded-2xl font-black tracking-widest transition-all shadow-xl hover:-translate-y-1"
          >
            OPEN USER TOOL
          </Link>
          <Link
            href="/admin"
            className="bg-gray-100 hover:bg-gray-200 text-gray-900 py-4 px-8 rounded-2xl font-bold tracking-widest transition-all"
          >
            ADMIN GATEWAY
          </Link>
        </div>
      </div>
    </main>
  )
}
