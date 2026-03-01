export default function AdminPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Admin Control Room</h1>
            <p className="text-gray-400">Yahan se aap poore platform ko control karenge.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                    <h3 className="text-gray-400 text-sm mb-2">Total Users</h3>
                    <p className="text-4xl font-bold text-white">1,254</p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                    <h3 className="text-gray-400 text-sm mb-2">Active Projects</h3>
                    <p className="text-4xl font-bold text-red-500">842</p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                    <h3 className="text-gray-400 text-sm mb-2">API Usage</h3>
                    <p className="text-4xl font-bold text-orange-400">$42.50</p>
                </div>
            </div>
        </div>
    )
}
