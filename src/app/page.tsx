import BusinessProfileForm from '../components/BusinessProfileForm'
import ProfileList from '../components/ProfileList'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 space-y-10">
        <BusinessProfileForm />
        <ProfileList />
      </div>
    </main>
  )
}
