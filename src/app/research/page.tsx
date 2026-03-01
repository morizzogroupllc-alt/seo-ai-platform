'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
    Search,
    BarChart2,
    Users,
    Key,
    ArrowRight,
    Target,
    Settings,
    CheckCircle2,
    Globe,
    Monitor,
    X,
    Loader2,
    ChevronDown,
    Info
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Types
interface Country {
    name: { common: string }
    cca2: string
    flags: { svg: string }
}

interface CityData {
    city: string
    niche: string
    pop: string
    sv: string
    da: number
    dr: number
    bl: number
}

// Popular Countries Order
const POPULAR_CCA2 = ['US', 'GB', 'CA', 'AU', 'PK', 'AE', 'IN']

export default function ResearchPage() {
    // Page State
    const [isProvenMode, setIsProvenMode] = useState(true)
    const [showResults, setShowResults] = useState(false)
    const [service, setService] = useState('')
    const [selectedResult, setSelectedResult] = useState<CityData | null>(null)

    // Location APIs State
    const [countries, setCountries] = useState<Country[]>([])
    const [loadingCountries, setLoadingCountries] = useState(false)
    const [countrySearch, setCountrySearch] = useState('')
    const [showCountryDrop, setShowCountryDrop] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)

    const [cities, setCities] = useState<string[]>([])
    const [loadingCities, setLoadingCities] = useState(false)
    const [citySearch, setCitySearch] = useState('')
    const [showCityDrop, setShowCityDrop] = useState(false)
    const [selectedCity, setSelectedCity] = useState('')

    // Auto-filled Fields
    const [neighborhood, setNeighborhood] = useState({ value: '', isAuto: false, loading: false })
    const [district, setDistrict] = useState({ value: '', isAuto: false, loading: false })
    const [zipcode, setZipcode] = useState({ value: '', isAuto: false, loading: false })

    // Modal State
    const [activeTab, setActiveTab] = useState<'Overview' | 'Keywords' | 'Competitors'>('Overview')

    // Refs for clicks outside
    const countryRef = useRef<HTMLDivElement>(null)
    const cityRef = useRef<HTMLDivElement>(null)

    // 1. Fetch Countries on Load
    useEffect(() => {
        const fetchCountries = async () => {
            setLoadingCountries(true)
            try {
                const res = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,cca2')
                if (!res.ok) throw new Error('Failed to fetch countries')
                const data: Country[] = await res.json()

                // Sort: Popular first, then A-Z
                const sorted = data.sort((a, b) => {
                    const aIndex = POPULAR_CCA2.indexOf(a.cca2)
                    const bIndex = POPULAR_CCA2.indexOf(b.cca2)
                    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex
                    if (aIndex !== -1) return -1
                    if (bIndex !== -1) return 1
                    return a.name.common.localeCompare(b.name.common)
                })
                setCountries(sorted)
            } catch (err) {
                console.error('Country API Error:', err)
            } finally {
                setLoadingCountries(false)
            }
        }
        fetchCountries()
    }, [])

    // 2. Fetch Cities when Country changes
    useEffect(() => {
        if (!selectedCountry) return
        const fetchCities = async () => {
            setLoadingCities(true)
            setCities([])
            setSelectedCity('')
            try {
                const res = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ country: selectedCountry.name.common })
                })
                const data = await res.json()
                if (!data.error) setCities(data.data)
            } catch (err) {
                console.error('Cities API Error:', err)
            } finally {
                setLoadingCities(false)
            }
        }
        fetchCities()
    }, [selectedCountry])

    // 3. Auto-fetch Neighborhoods, District, Zip when City changes
    useEffect(() => {
        if (!selectedCity || !selectedCountry) return

        const fetchExtraData = async () => {
            // Neighborhood Simulation via state/cities
            setNeighborhood(s => ({ ...s, loading: true }))
            try {
                // Find state for this city first
                const stateRes = await fetch('https://countriesnow.space/api/v0.1/countries/states', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ country: selectedCountry.name.common })
                })
                const stateData = await stateRes.json()
                if (!stateData.error && stateData.data.states.length > 0) {
                    // Pick first state's cities as "neighborhoods" for demo
                    const neighborRes = await fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ country: selectedCountry.name.common, state: stateData.data.states[0].name })
                    })
                    const neighborData = await neighborRes.json()
                    if (!neighborData.error && neighborData.data.length > 0) {
                        setNeighborhood({ value: neighborData.data[0], isAuto: true, loading: false })
                    } else {
                        setNeighborhood({ value: '', isAuto: false, loading: false })
                    }

                    // District
                    setDistrict({ value: stateData.data.states[0].name, isAuto: true, loading: false })
                } else {
                    setNeighborhood({ value: '', isAuto: false, loading: false })
                    setDistrict({ value: '', isAuto: false, loading: false })
                }
            } catch (e) {
                setNeighborhood({ value: '', isAuto: false, loading: false })
                setDistrict({ value: '', isAuto: false, loading: false })
            }

            // Zip Code (Zippopotam for US, fallback else)
            setZipcode(s => ({ ...s, loading: true }))
            try {
                if (selectedCountry.cca2 === 'US') {
                    const zipRes = await fetch(`https://api.zippopotam.us/us/${selectedCity.toLowerCase()}`)
                    const zipData = await zipRes.json()
                    if (zipData.places && zipData.places.length > 0) {
                        setZipcode({ value: zipData.places[0]['post code'], isAuto: true, loading: false })
                    } else {
                        setZipcode({ value: '', isAuto: false, loading: false })
                    }
                } else {
                    setZipcode({ value: '', isAuto: false, loading: false })
                }
            } catch (e) {
                setZipcode({ value: '', isAuto: false, loading: false })
            }
        }

        fetchExtraData()
    }, [selectedCity, selectedCountry])

    // Click Outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (countryRef.current && !countryRef.current.contains(event.target as Node)) setShowCountryDrop(false)
            if (cityRef.current && !cityRef.current.contains(event.target as Node)) setShowCityDrop(false)
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleFindNiches = () => {
        if (!service) return alert('Please enter a service first!')
        setShowResults(true)
    }

    const mockResults: CityData[] = [
        { city: selectedCity || 'Springfield, IL', niche: service || 'Plumber', pop: '150,000', sv: '320/mo', da: 12, dr: 8, bl: 95 },
        { city: 'Peoria, IL', niche: service || 'Plumber', pop: '110,000', sv: '280/mo', da: 14, dr: 10, bl: 120 },
        { city: 'Rockford, IL', niche: service || 'Plumber', pop: '145,000', sv: '310/mo', da: 11, dr: 7, bl: 85 },
    ]

    return (
        <div className="p-6 lg:p-10 space-y-10 max-w-7xl mx-auto">

            {/* SECTION 1: Page Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-black text-white tracking-tight flex items-center">
                    <Search className="mr-3 text-purple-500 w-8 h-8" />
                    Research Phase
                </h1>
                <p className="text-slate-400 font-medium">
                    Find your niche, analyze competitors, discover keywords
                </p>
            </div>

            {/* SECTION 2: Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { id: 'niche', name: 'AI Niche Finder', desc: 'Find profitable local niches using proven criteria', badge: 'Start Here', color: 'emerald', active: true, icon: Target },
                    { id: 'serp', name: 'SERP Analyzer', desc: 'Analyze search results', active: false, icon: BarChart2 },
                    { id: 'comp', name: 'Competitor Research', desc: 'Spy on competitors', active: false, icon: Users },
                    { id: 'key', name: 'Keyword Research', desc: 'Find local keywords', active: false, icon: Key },
                ].map((tool) => (
                    <div key={tool.id} className={cn("bg-[#1A1740] border p-5 rounded-2xl flex flex-col justify-between transition-all", tool.active ? "border-purple-800" : "border-white/5 opacity-60")}>
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className={cn("p-2 rounded-lg", tool.active ? "bg-purple-500/10 text-purple-400" : "bg-white/5 text-slate-500")}>
                                    <tool.icon className="w-5 h-5" />
                                </div>
                                {tool.badge && (
                                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase rounded border border-emerald-500/20">
                                        {tool.badge}
                                    </span>
                                )}
                            </div>
                            <h3 className="text-white font-bold mb-1">{tool.name}</h3>
                            <p className="text-slate-400 text-xs leading-relaxed">{tool.desc}</p>
                        </div>
                        <button disabled={!tool.active} className={cn("mt-6 w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all", tool.active ? "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/40" : "bg-white/5 text-slate-500 whitespace-nowrap")}>
                            {tool.active ? 'Open Tool →' : 'Coming Soon'}
                        </button>
                    </div>
                ))}
            </div>

            {/* SECTION 3: Niche Finder Tool */}
            <div className="bg-[#110E33] border border-purple-800/50 rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-1 px-1"> {/* Wrapper to prevent edge touching */}
                    <div className="p-8 lg:p-10 space-y-8 px-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-purple-600 rounded-2xl shadow-lg shadow-purple-500/20">
                                <Target className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white tracking-tight">AI Niche Finder Tool</h2>
                                <p className="text-slate-400 text-sm">Target profitable locations with scientific precision</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 pt-4">
                            {/* LEFT COLUMN: BASIC SEARCH */}
                            <div className="space-y-4">
                                {/* Field 1: Service */}
                                <div className="mt-4 mb-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Service / Niche</label>
                                    <input
                                        type="text"
                                        value={service}
                                        onChange={(e) => setService(e.target.value)}
                                        placeholder="e.g. plumber, dentist, roofer, lawyer"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                                    />
                                </div>

                                {/* Field 2: Country Selector */}
                                <div className="mt-4 mb-4 relative" ref={countryRef}>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Country</label>
                                    <button
                                        onClick={() => setShowCountryDrop(!showCountryDrop)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white flex items-center justify-between group focus:ring-2 focus:ring-purple-500/50 transition-all"
                                    >
                                        <div className="flex items-center space-x-3">
                                            {selectedCountry ? (
                                                <>
                                                    <img src={selectedCountry.flags.svg} className="w-5 h-3.5 object-cover rounded-sm" alt="" />
                                                    <span className="text-sm font-medium">{selectedCountry.name.common}</span>
                                                </>
                                            ) : (
                                                <span className="text-slate-500 text-sm">{loadingCountries ? 'Loading countries...' : 'Select Country'}</span>
                                            )}
                                        </div>
                                        {loadingCountries ? <Loader2 className="w-4 h-4 animate-spin text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />}
                                    </button>

                                    {showCountryDrop && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-[#1A1740] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
                                            <div className="p-3 border-b border-white/5">
                                                <div className="relative">
                                                    <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
                                                    <input
                                                        type="text"
                                                        placeholder="Search countries..."
                                                        className="w-full bg-white/5 border border-white/5 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none"
                                                        autoFocus
                                                        value={countrySearch}
                                                        onChange={(e) => setCountrySearch(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="max-h-60 overflow-y-auto custom-scrollbar">
                                                {countries
                                                    .filter(c => c.name.common.toLowerCase().includes(countrySearch.toLowerCase()))
                                                    .map((country, idx) => (
                                                        <button
                                                            key={country.cca2}
                                                            onClick={() => { setSelectedCountry(country); setShowCountryDrop(false); }}
                                                            className="w-full px-5 py-3 text-left hover:bg-purple-600/20 text-sm text-slate-300 flex items-center space-x-3 transition-colors border-b border-white/5 last:border-0"
                                                        >
                                                            <img src={country.flags.svg} className="w-5 h-3.5 object-cover rounded-sm" alt="" />
                                                            <div className="flex flex-col">
                                                                <span className="font-medium">{country.name.common}</span>
                                                                {idx < POPULAR_CCA2.length && countrySearch === '' && <span className="text-[9px] text-purple-400 font-black uppercase tracking-tighter">Popular</span>}
                                                            </div>
                                                        </button>
                                                    ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Field 3: City Selector */}
                                {selectedCountry && (
                                    <div className="mt-4 mb-4 relative animate-in fade-in slide-in-from-top-2" ref={cityRef}>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">City</label>
                                        <button
                                            onClick={() => setShowCityDrop(!showCityDrop)}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white flex items-center justify-between group focus:ring-2 focus:ring-purple-500/50 transition-all font-medium text-sm"
                                        >
                                            <span className={selectedCity ? 'text-white' : 'text-slate-500'}>
                                                {selectedCity || (loadingCities ? 'Loading cities...' : 'Select City')}
                                            </span>
                                            {loadingCities ? <Loader2 className="w-4 h-4 animate-spin text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />}
                                        </button>

                                        {showCityDrop && (
                                            <div className="absolute top-full left-0 right-0 mt-2 bg-[#1A1740] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
                                                <div className="p-3 border-b border-white/5">
                                                    <div className="relative">
                                                        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
                                                        <input
                                                            type="text"
                                                            placeholder="Search cities..."
                                                            className="w-full bg-white/5 border border-white/5 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none"
                                                            autoFocus
                                                            value={citySearch}
                                                            onChange={(e) => setCitySearch(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="max-h-60 overflow-y-auto custom-scrollbar">
                                                    {cities.length === 0 && !loadingCities ? (
                                                        <div className="p-8 text-center bg-white/5 border border-purple-500/30 rounded-xl m-2">
                                                            <p className="text-slate-400 text-xs">Type your city manually</p>
                                                            <input
                                                                type="text"
                                                                className="mt-3 w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white text-xs"
                                                                onKeyDown={(e) => { if (e.key === 'Enter') { setSelectedCity((e.target as HTMLInputElement).value); setShowCityDrop(false); } }}
                                                            />
                                                        </div>
                                                    ) : (
                                                        cities
                                                            .filter(c => c.toLowerCase().includes(citySearch.toLowerCase()))
                                                            .slice(0, 100) // Performance
                                                            .map(city => (
                                                                <button
                                                                    key={city}
                                                                    onClick={() => { setSelectedCity(city); setShowCityDrop(false); }}
                                                                    className="w-full px-5 py-3 text-left hover:bg-purple-600/20 text-xs text-slate-300 transition-colors border-b border-white/5 last:border-0"
                                                                >
                                                                    {city}
                                                                </button>
                                                            ))
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* RIGHT COLUMN: AUTO FIELDS & CRITERIA */}
                            <div className="space-y-4">
                                {selectedCity && (
                                    <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-4">
                                        {/* Neighborhood */}
                                        <div className="mt-2 mb-2">
                                            <div className="flex items-center justify-between mb-1">
                                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Neighborhood</label>
                                                {neighborhood.isAuto && <span className="text-[8px] text-emerald-400 font-black">Auto ✓</span>}
                                            </div>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={neighborhood.value}
                                                    onChange={(e) => setNeighborhood({ value: e.target.value, isAuto: false, loading: false })}
                                                    placeholder="e.g. Downtown"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                                />
                                                {neighborhood.loading && <Loader2 className="absolute right-3 top-2.5 h-3 w-3 animate-spin text-slate-500" />}
                                                {neighborhood.isAuto && <button onClick={() => setNeighborhood({ value: '', isAuto: false, loading: false })} className="text-[9px] text-slate-500 hover:text-white mt-1 underline ml-1 font-bold">Edit</button>}
                                            </div>
                                        </div>

                                        {/* District */}
                                        <div className="mt-2 mb-2">
                                            <div className="flex items-center justify-between mb-1">
                                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">District</label>
                                                {district.isAuto && <span className="text-[8px] text-emerald-400 font-black">Auto ✓</span>}
                                            </div>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={district.value}
                                                    onChange={(e) => setDistrict({ value: e.target.value, isAuto: false, loading: false })}
                                                    placeholder="e.g. West Side"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                                />
                                                {district.loading && <Loader2 className="absolute right-3 top-2.5 h-3 w-3 animate-spin text-slate-500" />}
                                                {district.isAuto && <button onClick={() => setDistrict({ value: '', isAuto: false, loading: false })} className="text-[9px] text-slate-500 hover:text-white mt-1 underline ml-1 font-bold">Edit</button>}
                                            </div>
                                        </div>

                                        {/* Zip Code */}
                                        <div className="mt-2 mb-2 col-span-2">
                                            <div className="flex items-center justify-between mb-1">
                                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Zip / Postal Code</label>
                                                {zipcode.isAuto && <span className="text-[8px] text-emerald-400 font-black">Auto ✓</span>}
                                            </div>
                                            <div className="relative flex items-center space-x-2">
                                                <input
                                                    type="text"
                                                    value={zipcode.value}
                                                    onChange={(e) => setZipcode({ value: e.target.value, isAuto: false, loading: false })}
                                                    placeholder="e.g. 60601"
                                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                                />
                                                {zipcode.loading && <Loader2 className="absolute right-10 top-2.5 h-3 w-3 animate-spin text-slate-500" />}
                                                {zipcode.isAuto && <button onClick={() => setZipcode({ value: '', isAuto: false, loading: false })} className="text-[9px] text-slate-500 hover:text-white underline font-bold whitespace-nowrap">Edit</button>}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* CRITERIA MODE TOGGLE */}
                                <div className="mt-6 mb-4 space-y-4">
                                    <div className="flex items-center justify-between bg-white/5 p-1 rounded-2xl border border-white/5">
                                        <button
                                            onClick={() => setIsProvenMode(true)}
                                            className={cn("flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-[10px] font-black uppercase transition-all", isProvenMode ? "bg-purple-600 text-white" : "text-slate-500 hover:text-slate-300")}
                                        >
                                            <CheckCircle2 className="w-3 h-3" />
                                            <span>Proven Criteria</span>
                                        </button>
                                        <button
                                            onClick={() => setIsProvenMode(false)}
                                            className={cn("flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-[10px] font-black uppercase transition-all", !isProvenMode ? "bg-purple-600 text-white" : "text-slate-500 hover:text-slate-300")}
                                        >
                                            <Settings className="w-3 h-3" />
                                            <span>Custom Settings</span>
                                        </button>
                                    </div>

                                    {isProvenMode ? (
                                        <div className="flex flex-wrap gap-2">
                                            {['🏙️ City Pop ≤ 200k', '🔍 Search Vol ≥ 200', '📊 DA ≤ 15', '💪 DR ≤ 10', '🔗 Backlinks ≤ 150', '🚫 No Maps Traffic'].map((p, i) => (
                                                <span key={i} className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-bold rounded-lg">{p}</span>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-2">
                                            {['Max Pop', 'Min Vol'].map(f => (
                                                <input key={f} type="number" placeholder={f} className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[10px] text-white focus:outline-none" />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleFindNiches}
                            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-purple-900/20 transition-all active:scale-[0.98] uppercase tracking-[0.2em] mt-8"
                        >
                            🔍 Find Niches
                        </button>
                    </div>
                </div>

                {/* RESULTS AREA */}
                <div className="border-t border-white/5 bg-black/20 p-8 lg:p-10">
                    {!showResults ? (
                        <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10 opacity-30">
                                <Target className="w-10 h-10 text-white" />
                            </div>
                            <p className="text-slate-500 text-sm font-medium">Enter a service above to discover profitable niches</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in zoom-in-95">
                            {mockResults.map((res, i) => (
                                <div key={i} className="bg-[#1A1740] border border-emerald-500/30 rounded-2xl p-6 space-y-4 hover:border-emerald-500/60 transition-colors group">
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-white font-black text-lg leading-tight">{res.city}</h4>
                                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[9px] font-black rounded border border-emerald-500/30">Opportunity!</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-y-3 pt-2">
                                        <div className="text-[10px] text-slate-400">🏙️ Pop: <span className="text-white font-bold">{res.pop}</span></div>
                                        <div className="text-[10px] text-slate-400">🔍 SV: <span className="text-white font-bold">{res.sv}</span></div>
                                        <div className="text-[10px] text-slate-400">📊 DA: <span className="text-white font-bold">{res.da}</span></div>
                                        <div className="text-[10px] text-slate-400 col-span-2">💪 DR: <span className="text-white font-bold">{res.dr}</span></div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedResult(res)}
                                        className="w-full pt-4 border-t border-white/5 flex items-center justify-between text-xs font-black text-emerald-400 uppercase tracking-widest group-hover:text-emerald-300 transition-colors"
                                    >
                                        OPPORTUNITY FOUND →
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* OPPORTUNITY MODAL */}
            {selectedResult && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedResult(null)}></div>
                    <div className="relative bg-[#1A1740] w-full max-w-[600px] rounded-3xl overflow-hidden border border-purple-500/30 shadow-2xl animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                        {/* Modal Header */}
                        <div className="bg-[#110E33] p-6 border-b border-white/5 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-black text-white italic">{selectedResult.city} — {selectedResult.niche}</h3>
                                <div className="flex items-center mt-1 space-x-2">
                                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 rounded font-black uppercase">Phase 1 Audited</span>
                                    <span className="text-[10px] text-slate-500">Manual verification recommended</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedResult(null)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-slate-400" />
                            </button>
                        </div>

                        {/* Modal Tabs */}
                        <div className="flex border-b border-white/5 bg-[#110E33]/50">
                            {['Overview', 'Keywords', 'Competitors'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={cn(
                                        "flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all relative",
                                        activeTab === tab ? "text-purple-400" : "text-slate-500 hover:text-slate-300"
                                    )}
                                >
                                    {tab}
                                    {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"></div>}
                                </button>
                            ))}
                        </div>

                        {/* Modal Content */}
                        <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                            {activeTab === 'Overview' && (
                                <div className="space-y-8 animate-in fade-in duration-300">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                            <p className="text-[10px] font-black text-slate-500 uppercase mb-2 leading-none">Market Size</p>
                                            <div className="flex items-baseline space-x-2">
                                                <span className="text-2xl font-black text-white">{selectedResult.pop}</span>
                                                <span className="text-xs text-slate-400 font-medium">Population</span>
                                            </div>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                            <p className="text-[10px] font-black text-slate-500 uppercase mb-2 leading-none">Intensity</p>
                                            <div className="flex items-baseline space-x-2">
                                                <span className="text-2xl font-black text-white">{selectedResult.sv}</span>
                                                <span className="text-xs text-slate-400 font-medium">Search Vol</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-8">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Authority Gap</p>
                                            <div className="flex items-center space-x-3">
                                                <div className="text-xs text-slate-300">DA: <span className="font-bold text-white">{selectedResult.da}</span></div>
                                                <div className="text-xs text-slate-300">DR: <span className="font-bold text-white">{selectedResult.dr}</span></div>
                                                <div className="text-xs text-slate-300">BL: <span className="font-bold text-white">{selectedResult.bl}</span></div>
                                            </div>
                                        </div>
                                        <div className="flex-1 text-right">
                                            <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-black rounded-xl">
                                                DIFFICULTY: EASY ✅
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-purple-900/10 border border-purple-500/20 p-6 rounded-2xl space-y-3">
                                        <h4 className="flex items-center text-purple-300 font-black uppercase text-[10px] tracking-[0.2em]">
                                            <Info className="w-3 h-3 mr-2" /> Recommendation
                                        </h4>
                                        <p className="text-slate-300 text-sm leading-relaxed font-medium">
                                            "Build a static site targeting this niche. Low competition detected. Minimal backlink profile required to hit top 3 results within 3-4 months."
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => { /* Navigate to build */ window.location.href = '/build' }}
                                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-purple-900/40 uppercase tracking-[0.2em] text-sm flex items-center justify-center space-x-3 transition-all"
                                    >
                                        <span>🏗️ Start Building</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            )}

                            {activeTab === 'Keywords' && (
                                <div className="space-y-4 animate-in fade-in duration-300">
                                    <table className="w-full text-left text-sm">
                                        <thead className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                            <tr className="border-b border-white/5">
                                                <th className="pb-4">Keyword</th>
                                                <th className="pb-4">SV</th>
                                                <th className="pb-4 text-right">Intent</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-slate-300">
                                            {[
                                                { k: `${selectedResult.niche} ${selectedResult.city.split(',')[0].toLowerCase()} il`, v: 320, i: 'Buy', c: 'text-emerald-400' },
                                                { k: `emergency ${selectedResult.niche} ${selectedResult.city.split(',')[0].toLowerCase()}`, v: 140, i: 'Buy', c: 'text-emerald-400' },
                                                { k: `best ${selectedResult.niche} ${selectedResult.city.split(',')[0].toLowerCase()} il`, v: 90, i: 'Info', c: 'text-amber-400' },
                                                { k: `${selectedResult.niche} near me ${selectedResult.city.split(',')[0].toLowerCase()}`, v: 260, i: 'Buy', c: 'text-emerald-400' },
                                                { k: `cheap ${selectedResult.niche} ${selectedResult.city.split(',')[0].toLowerCase()} il`, v: 70, i: 'Buy', c: 'text-emerald-400' },
                                            ].map((row, i) => (
                                                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                    <td className="py-3 font-medium">{row.k}</td>
                                                    <td className="py-3 font-bold">{row.v}</td>
                                                    <td className="py-3 text-right">
                                                        <span className={cn("text-[9px] font-black uppercase px-2 py-0.5 rounded-full border bg-white/5", row.c, row.c.replace('text', 'border'))}>
                                                            {row.i}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {activeTab === 'Competitors' && (
                                <div className="space-y-4 animate-in fade-in duration-300">
                                    <table className="w-full text-left text-xs">
                                        <thead className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                            <tr className="border-b border-white/5">
                                                <th className="pb-4">Domain</th>
                                                <th className="pb-4">DA</th>
                                                <th className="pb-4">BL</th>
                                                <th className="pb-4 text-right">Traffic</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-slate-300">
                                            {[
                                                { d: 'yelp.com', da: 93, bl: '2M', t: 45 },
                                                { d: 'thumbtack.com', da: 74, bl: '890k', t: 30 },
                                                { d: 'local-plumber-il.com', da: 11, bl: '87', t: 65, best: true },
                                            ].map((row, i) => (
                                                <tr key={i} className={cn("border-b border-white/5 hover:bg-white/5 transition-colors", row.best && "bg-emerald-500/5")}>
                                                    <td className="py-4">
                                                        <span className="font-bold flex items-center">
                                                            {row.d}
                                                            {row.best && <Target className="w-3 h-3 ml-2 text-emerald-500" />}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 font-mono">{row.da}</td>
                                                    <td className="py-4 font-mono">{row.bl}</td>
                                                    <td className="py-4 text-right">
                                                        <span className="font-black text-white">{row.t}%</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}
