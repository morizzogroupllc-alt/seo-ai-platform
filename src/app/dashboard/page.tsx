import BusinessProfileForm from '../../components/BusinessProfileForm'
import ProfileList from '../../components/ProfileList'

export default function UserDashboard() {
    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <div className="bg-gradient-to-r from-red-600 to-orange-500 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-4xl font-black mb-2 italic">WELCOME TO THE FUTURE.</h1>
                    <p className="text-red-100 text-lg opacity-90">Building the world's fastest Local SEO empire.</p>
                </div>
                <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
                    <span className="text-[120px]">🚀</span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-10">
                <BusinessProfileForm />
                <ProfileList />
            </div>
        </div>
    )
}
