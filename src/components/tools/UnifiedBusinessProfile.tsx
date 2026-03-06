'use client'
import React, {
    useState, useEffect
} from 'react'
import {
    getCurrentUser
} from '@/lib/auth'
import {
    getProfiles,
    createProfile,
    updateProfile,
    deleteProfile,
    setActiveProfile,
    BusinessProfile
} from '@/lib/businessProfile'
import {
    Plus, Trash2, Edit3,
    Save, Check, Building2,
    MapPin, Phone, Globe,
    Key, Share2, User,
    ChevronRight, Loader2,
    Heart, Star, AlertCircle
} from 'lucide-react'

export default function
    UnifiedBusinessProfile() {

    const [profiles, setProfiles] =
        useState<BusinessProfile[]>([])
    const [selected, setSelected] =
        useState<BusinessProfile | null>(
            null
        )
    const [formData, setFormData] =
        useState<Partial<BusinessProfile>>(
            {}
        )
    const [activeTab, setActiveTab] =
        useState('nap')
    const [loading, setLoading] =
        useState(true)
    const [saving, setSaving] =
        useState(false)
    const [isNew, setIsNew] =
        useState(false)
    const [userId, setUserId] =
        useState<string | null>(null)
    const [userType, setUserType] =
        useState('')
    const [toast, setToast] =
        useState<{
            msg: string,
            type: 'success' | 'error'
        } | null>(null)
    const [deleteConfirm,
        setDeleteConfirm] =
        useState<string | null>(null)

    // ── Load user + profiles ──
    useEffect(() => {
        const init = async () => {
            try {
                const user = await getCurrentUser()
                if (!user) return
                setUserId(user.id)
                const ut = localStorage
                    .getItem('user_type') || ''
                setUserType(ut)
                const data = await getProfiles(
                    user.id
                )
                setProfiles(data)
                // Auto-select active profile
                const active = data.find(
                    p => p.is_active
                )
                if (active) {
                    setSelected(active)
                    setFormData(active)
                }
            } catch (e) {
                showToast(
                    'Error loading profiles',
                    'error'
                )
            } finally {
                setLoading(false)
            }
        }
        init()
    }, [])

    const showToast = (
        msg: string,
        type: 'success' | 'error'
    ) => {
        setToast({ msg, type })
        setTimeout(
            () => setToast(null), 3000
        )
    }

    const handleSelectProfile =
        async (profile: BusinessProfile) => {
            setSelected(profile)
            setFormData(profile)
            setActiveTab('nap')
            setIsNew(false)
            if (!userId) return
            try {
                await setActiveProfile(
                    profile.id, userId
                )
                setProfiles(prev =>
                    prev.map(p => ({
                        ...p,
                        is_active: p.id === profile.id
                    }))
                )
            } catch (e) {
                showToast(
                    'Could not set active',
                    'error'
                )
            }
        }

    const handleNewProfile = () => {
        setSelected(null)
        setIsNew(true)
        setActiveTab('nap')
        const label =
            userType === 'Rank & Rent'
                ? 'New Site' :
                userType === 'Agency' ||
                    userType ===
                    'Client SEO Professional'
                    ? 'New Client' :
                    userType === 'Automation / Scale'
                        ? 'New Campaign' :
                        'My Business'
        setFormData({
            profile_name: label,
            service_areas: [],
            secondary_keywords: []
        })
    }

    const handleSave = async () => {
        if (!userId) return
        setSaving(true)
        try {
            if (isNew) {
                const created =
                    await createProfile(
                        userId, formData
                    )
                setProfiles(prev =>
                    [created, ...prev]
                )
                setSelected(created)
                setFormData(created)
                setIsNew(false)
                showToast(
                    '✅ Profile created!',
                    'success'
                )
            } else if (selected) {
                const updated =
                    await updateProfile(
                        selected.id, formData
                    )
                setProfiles(prev =>
                    prev.map(p =>
                        p.id === updated.id
                            ? updated : p
                    )
                )
                setSelected(updated)
                setFormData(updated)
                showToast(
                    '✅ Profile saved!',
                    'success'
                )
            }
        } catch (e) {
            showToast(
                '❌ Save failed', 'error'
            )
        } finally {
            setSaving(false)
        }
    }

    const handleDelete =
        async (id: string) => {
            try {
                await deleteProfile(id)
                setProfiles(prev =>
                    prev.filter(p => p.id !== id)
                )
                if (selected?.id === id) {
                    setSelected(null)
                    setFormData({})
                }
                setDeleteConfirm(null)
                showToast(
                    '🗑️ Profile deleted',
                    'success'
                )
            } catch (e) {
                showToast(
                    'Delete failed', 'error'
                )
            }
        }

    const update = (
        key: string, val: any
    ) => {
        setFormData(prev => ({
            ...prev, [key]: val
        }))
    }

    // ── Labels by user type ──
    const profileLabel =
        userType === 'Rank & Rent'
            ? 'Site / Niche Name' :
            userType === 'Agency' ||
                userType ===
                'Client SEO Professional'
                ? 'Client Name' :
                userType === 'Automation / Scale'
                    ? 'Campaign Name' :
                    'Business Name'

    const showClientTab =
        userType === 'Agency' ||
        userType ===
        'Client SEO Professional'

    const showRankRentFields =
        userType === 'Rank & Rent'

    const showAutoFields =
        userType === 'Automation / Scale'

    // ── Tabs config ──
    const tabs = [
        {
            id: 'nap',
            label: '📍 NAP & Address',
            icon: MapPin
        },
        {
            id: 'service',
            label: '🔧 Service Info',
            icon: Building2
        },
        {
            id: 'seo',
            label: '🔑 SEO & Keywords',
            icon: Key
        },
        {
            id: 'social',
            label: '📱 Social Media',
            icon: Share2
        },
        ...(showClientTab ? [{
            id: 'client',
            label: '👤 Client Info',
            icon: User
        }] : [])
    ]

    // ── Input component ──
    const Field = ({
        label, field, placeholder,
        type = 'text', half = false,
        hint = ''
    }: any) => (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            gridColumn: half
                ? 'span 1' : 'span 2'
        }}>
            <label style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#64748B',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
            }}>
                {label}
            </label>
            <input
                type={type}
                value={
                    (formData as any)[field]
                    || ''
                }
                onChange={e =>
                    update(field, e.target.value)
                }
                placeholder={placeholder}
                style={{
                    background: '#162032',
                    border: '1px solid rgba(168,85,247,0.2)',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    color: '#F1F5F9',
                    fontSize: '13px',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    width: '100%'
                }}
                onFocus={e => {
                    e.target.style.border =
                        '1px solid rgba(168,85,247,0.6)'
                    e.target.style.boxShadow =
                        '0 0 0 3px rgba(168,85,247,0.1)'
                }}
                onBlur={e => {
                    e.target.style.border =
                        '1px solid rgba(168,85,247,0.2)'
                    e.target.style.boxShadow =
                        'none'
                }}
            />
            {hint && (
                <span style={{
                    fontSize: '10px',
                    color: '#475569'
                }}>
                    {hint}
                </span>
            )}
        </div>
    )

    const Textarea = ({
        label, field, placeholder
    }: any) => (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            gridColumn: 'span 2'
        }}>
            <label style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#64748B',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
            }}>
                {label}
            </label>
            <textarea
                value={
                    (formData as any)[field]
                    || ''
                }
                onChange={e =>
                    update(field, e.target.value)
                }
                placeholder={placeholder}
                rows={3}
                style={{
                    background: '#162032',
                    border: '1px solid rgba(168,85,247,0.2)',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    color: '#F1F5F9',
                    fontSize: '13px',
                    outline: 'none',
                    resize: 'vertical',
                    width: '100%',
                    fontFamily: 'inherit'
                }}
                onFocus={e => {
                    e.target.style.border =
                        '1px solid rgba(168,85,247,0.6)'
                    e.target.style.boxShadow =
                        '0 0 0 3px rgba(168,85,247,0.1)'
                }}
                onBlur={e => {
                    e.target.style.border =
                        '1px solid rgba(168,85,247,0.2)'
                    e.target.style.boxShadow =
                        'none'
                }}
            />
        </div>
    )

    if (loading) return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            gap: '12px',
            color: '#64748B'
        }}>
            <Loader2
                size={24}
                style={{
                    animation:
                        'spin 1s linear infinite'
                }}
            />
            <span>Loading profiles...</span>
        </div>
    )

    return (
        <div style={{
            fontFamily: 'Inter, sans-serif',
            color: '#F1F5F9'
        }}>

            {/* Toast */}
            {toast && (
                <div style={{
                    position: 'fixed',
                    top: '80px',
                    right: '24px',
                    zIndex: 9999,
                    background: toast.type ===
                        'success'
                        ? 'rgba(5,150,105,0.95)'
                        : 'rgba(220,38,38,0.95)',
                    color: 'white',
                    padding: '12px 20px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: 600,
                    boxShadow:
                        '0 8px 32px rgba(0,0,0,0.3)',
                    animation: 'fadeIn 0.3s ease'
                }}>
                    {toast.msg}
                </div>
            )}

            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '28px',
                flexWrap: 'wrap',
                gap: '12px'
            }}>
                <div>
                    <h1 style={{
                        fontSize: '22px',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        color: 'white',
                        margin: 0
                    }}>
                        <Heart
                            size={22}
                            style={{ color: '#A855F7' }}
                        />
                        Business Profile Hub
                    </h1>
                    <p style={{
                        color: '#64748B',
                        fontSize: '13px',
                        marginTop: '4px'
                    }}>
                        Apna business data ek jagah
                        — tamam tools yahan se
                        data lete hain
                    </p>
                </div>
                <div style={{
                    background:
                        'rgba(168,85,247,0.1)',
                    border: '1px solid rgba(168,85,247,0.2)',
                    borderRadius: '20px',
                    padding: '6px 14px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#A855F7'
                }}>
                    {profiles.length} Profile
                    {profiles.length !== 1
                        ? 's' : ''}
                </div>
            </div>

            {/* Profile Cards Row */}
            <div style={{
                display: 'flex',
                gap: '12px',
                overflowX: 'auto',
                paddingBottom: '8px',
                marginBottom: '28px'
            }}>
                {/* Existing profiles */}
                {profiles.map(profile => {
                    const isActive =
                        profile.is_active
                    const isSelectedCard =
                        selected?.id === profile.id
                    return (
                        <div
                            key={profile.id}
                            onClick={() =>
                                handleSelectProfile(
                                    profile
                                )
                            }
                            style={{
                                minWidth: '180px',
                                maxWidth: '180px',
                                background: '#0D1B2E',
                                border: isSelectedCard
                                    ? '1px solid rgba(168,85,247,0.8)'
                                    : '1px solid rgba(168,85,247,0.2)',
                                borderRadius: '14px',
                                padding: '14px',
                                cursor: 'pointer',
                                position: 'relative',
                                transition:
                                    'all 0.2s ease',
                                boxShadow: isSelectedCard
                                    ? '0 0 24px rgba(168,85,247,0.25)'
                                    : 'none',
                                flexShrink: 0
                            }}
                            onMouseEnter={e => {
                                if (!isSelectedCard)
                                    e.currentTarget
                                        .style.borderColor =
                                        'rgba(168,85,247,0.5)'
                            }}
                            onMouseLeave={e => {
                                if (!isSelectedCard)
                                    e.currentTarget
                                        .style.borderColor =
                                        'rgba(168,85,247,0.2)'
                            }}
                        >
                            {/* Active badge */}
                            {isActive && (
                                <div style={{
                                    position: 'absolute',
                                    top: '8px',
                                    right: '8px',
                                    background:
                                        'linear-gradient(135deg, #A855F7, #3B82F6)',
                                    borderRadius: '6px',
                                    padding: '2px 6px',
                                    fontSize: '8px',
                                    fontWeight: 800,
                                    color: 'white',
                                    letterSpacing:
                                        '0.05em'
                                }}>
                                    ACTIVE
                                </div>
                            )}

                            {/* Icon */}
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                background: isSelectedCard
                                    ? 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(59,130,246,0.2))'
                                    : 'rgba(168,85,247,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '10px'
                            }}>
                                <Building2
                                    size={18}
                                    style={{
                                        color: '#A855F7'
                                    }}
                                />
                            </div>

                            {/* Name */}
                            <div style={{
                                fontSize: '12px',
                                fontWeight: 700,
                                color: 'white',
                                marginBottom: '4px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                paddingRight: '20px'
                            }}>
                                {profile.profile_name
                                    || 'Unnamed'}
                            </div>

                            {/* Service type */}
                            {profile.service_type && (
                                <div style={{
                                    fontSize: '10px',
                                    color: '#A855F7',
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    textOverflow:
                                        'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {profile.service_type}
                                </div>
                            )}

                            {/* City */}
                            {profile.city && (
                                <div style={{
                                    fontSize: '10px',
                                    color: '#64748B',
                                    marginTop: '2px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '3px'
                                }}>
                                    <MapPin size={9} />
                                    {profile.city}
                                </div>
                            )}

                            {/* Delete button */}
                            <button
                                onClick={e => {
                                    e.stopPropagation()
                                    setDeleteConfirm(
                                        profile.id
                                    )
                                }}
                                style={{
                                    position: 'absolute',
                                    bottom: '10px',
                                    right: '10px',
                                    background:
                                        'rgba(239,68,68,0.1)',
                                    border: 'none',
                                    borderRadius: '6px',
                                    padding: '4px',
                                    cursor: 'pointer',
                                    color: '#EF4444',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <Trash2 size={11} />
                            </button>
                        </div>
                    )
                })}

                {/* New Profile card */}
                <div
                    onClick={handleNewProfile}
                    style={{
                        minWidth: '160px',
                        maxWidth: '160px',
                        background: 'transparent',
                        border: '2px dashed rgba(168,85,247,0.3)',
                        borderRadius: '14px',
                        padding: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition:
                            'all 0.2s ease',
                        flexShrink: 0,
                        minHeight: '120px'
                    }}
                    onMouseEnter={e => {
                        e.currentTarget
                            .style.borderColor =
                            'rgba(168,85,247,0.7)'
                        e.currentTarget
                            .style.background =
                            'rgba(168,85,247,0.04)'
                    }}
                    onMouseLeave={e => {
                        e.currentTarget
                            .style.borderColor =
                            'rgba(168,85,247,0.3)'
                        e.currentTarget
                            .style.background =
                            'transparent'
                    }}
                >
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background:
                            'rgba(168,85,247,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Plus
                            size={16}
                            style={{
                                color: '#A855F7'
                            }}
                        />
                    </div>
                    <span style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#A855F7',
                        textAlign: 'center'
                    }}>
                        + New Profile
                    </span>
                </div>
            </div>

            {/* Delete Confirm Modal */}
            {deleteConfirm && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background:
                        'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{
                        background: '#0D1B2E',
                        border: '1px solid rgba(239,68,68,0.3)',
                        borderRadius: '16px',
                        padding: '28px',
                        maxWidth: '360px',
                        width: '90%'
                    }}>
                        <div style={{
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'flex-start',
                            marginBottom: '20px'
                        }}>
                            <AlertCircle
                                size={22}
                                style={{
                                    color: '#EF4444',
                                    flexShrink: 0,
                                    marginTop: '2px'
                                }}
                            />
                            <div>
                                <div style={{
                                    fontWeight: 700,
                                    fontSize: '15px',
                                    color: 'white',
                                    marginBottom: '6px'
                                }}>
                                    Delete Profile?
                                </div>
                                <div style={{
                                    fontSize: '13px',
                                    color: '#94A3B8'
                                }}>
                                    Ye profile hamesha
                                    ke liye delete ho
                                    jayegi. Wapas nahi
                                    aa sakti.
                                </div>
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            gap: '10px'
                        }}>
                            <button
                                onClick={() =>
                                    setDeleteConfirm(null)
                                }
                                style={{
                                    flex: 1,
                                    padding: '10px',
                                    borderRadius: '10px',
                                    background:
                                        'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: '#94A3B8',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    fontSize: '13px'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() =>
                                    handleDelete(
                                        deleteConfirm
                                    )
                                }
                                style={{
                                    flex: 1,
                                    padding: '10px',
                                    borderRadius: '10px',
                                    background:
                                        'rgba(239,68,68,0.15)',
                                    border: '1px solid rgba(239,68,68,0.4)',
                                    color: '#EF4444',
                                    cursor: 'pointer',
                                    fontWeight: 700,
                                    fontSize: '13px'
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Form Area */}
            {(selected || isNew) && (
                <div style={{
                    background: '#0D1B2E',
                    border: '1px solid rgba(168,85,247,0.2)',
                    borderRadius: '20px',
                    overflow: 'hidden'
                }}>
                    {/* Profile name input */}
                    <div style={{
                        padding: '20px 24px',
                        borderBottom: '1px solid rgba(168,85,247,0.1)',
                        background:
                            'rgba(168,85,247,0.04)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        flexWrap: 'wrap'
                    }}>
                        <label style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            color: '#64748B',
                            textTransform:
                                'uppercase',
                            letterSpacing: '0.1em',
                            whiteSpace: 'nowrap'
                        }}>
                            {profileLabel}
                        </label>
                        <input
                            value={
                                formData.profile_name
                                || ''
                            }
                            onChange={e =>
                                update(
                                    'profile_name',
                                    e.target.value
                                )
                            }
                            placeholder={profileLabel}
                            style={{
                                flex: 1,
                                minWidth: '200px',
                                background: '#162032',
                                border: '1px solid rgba(168,85,247,0.3)',
                                borderRadius: '10px',
                                padding: '8px 14px',
                                color: '#F1F5F9',
                                fontSize: '14px',
                                fontWeight: 600,
                                outline: 'none'
                            }}
                        />
                    </div>

                    {/* Tabs */}
                    <div style={{
                        display: 'flex',
                        borderBottom: '1px solid rgba(168,85,247,0.1)',
                        overflowX: 'auto'
                    }}>
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() =>
                                    setActiveTab(tab.id)
                                }
                                style={{
                                    padding: '14px 18px',
                                    background:
                                        'transparent',
                                    border: 'none',
                                    borderBottom:
                                        activeTab === tab.id
                                            ? '2px solid #A855F7'
                                            : '2px solid transparent',
                                    color:
                                        activeTab === tab.id
                                            ? '#A855F7'
                                            : '#64748B',
                                    fontSize: '12px',
                                    fontWeight:
                                        activeTab === tab.id
                                            ? 700 : 500,
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    transition:
                                        'all 0.2s ease'
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div style={{ padding: '24px' }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns:
                                'repeat(2, 1fr)',
                            gap: '16px'
                        }}>

                            {/* NAP & Address */}
                            {activeTab === 'nap' && (<>
                                <Field
                                    label="Business Name"
                                    field="business_name"
                                    placeholder=
                                    "e.g. Ali's Plumbing"
                                />
                                <Field
                                    label="Phone"
                                    field="phone"
                                    placeholder=
                                    "+1 (555) 000-0000"
                                    half
                                />
                                <Field
                                    label="Email"
                                    field="email"
                                    type="email"
                                    placeholder=
                                    "info@business.com"
                                    half
                                />
                                <Field
                                    label="Website"
                                    field="website"
                                    placeholder=
                                    "https://example.com"
                                />
                                <Field
                                    label="Address Line 1"
                                    field="address_line1"
                                    placeholder=
                                    "123 Main Street"
                                />
                                <Field
                                    label="Address Line 2"
                                    field="address_line2"
                                    placeholder=
                                    "Suite 100 (optional)"
                                />
                                <Field
                                    label="City"
                                    field="city"
                                    placeholder=
                                    "e.g. Chicago"
                                    half
                                />
                                <Field
                                    label="State / Province"
                                    field="state"
                                    placeholder="e.g. IL"
                                    half
                                />
                                <Field
                                    label="Zip / Postal Code"
                                    field="zip_code"
                                    placeholder="e.g. 60601"
                                    half
                                />
                                <Field
                                    label="Country"
                                    field="country"
                                    placeholder="e.g. USA"
                                    half
                                />
                            </>)}

                            {/* Service Info */}
                            {activeTab === 'service'
                                && (<>
                                    <Field
                                        label="Service Type / Niche"
                                        field="service_type"
                                        placeholder=
                                        "e.g. Plumber, Dentist"
                                    />
                                    <Field
                                        label="Service Areas (comma separated)"
                                        field="service_areas_text"
                                        placeholder=
                                        "Chicago, Naperville, Evanston"
                                        hint=
                                        "Cities you serve"
                                    />
                                    <Textarea
                                        label="Business Description"
                                        field="description"
                                        placeholder=
                                        "Brief description of your business..."
                                    />
                                    {showRankRentFields && (<>
                                        <Field
                                            label="Target Rent Price / Month"
                                            field="target_rent_price"
                                            placeholder="e.g. $500/mo"
                                            half
                                        />
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '6px'
                                        }}>
                                            <label style={{
                                                fontSize: '11px',
                                                fontWeight: 700,
                                                color: '#64748B',
                                                textTransform:
                                                    'uppercase',
                                                letterSpacing:
                                                    '0.1em'
                                            }}>
                                                Site Status
                                            </label>
                                            <select
                                                value={
                                                    formData
                                                        .site_status
                                                    || ''
                                                }
                                                onChange={e =>
                                                    update(
                                                        'site_status',
                                                        e.target.value
                                                    )
                                                }
                                                style={{
                                                    background:
                                                        '#162032',
                                                    border: '1px solid rgba(168,85,247,0.2)',
                                                    borderRadius:
                                                        '10px',
                                                    padding:
                                                        '10px 14px',
                                                    color: '#F1F5F9',
                                                    fontSize: '13px',
                                                    outline: 'none'
                                                }}
                                            >
                                                <option value="">
                                                    Select status
                                                </option>
                                                <option value="Building">
                                                    🏗️ Building
                                                </option>
                                                <option value="Ranking">
                                                    📈 Ranking
                                                </option>
                                                <option value="Rented">
                                                    💰 Rented
                                                </option>
                                            </select>
                                        </div>
                                    </>)}
                                    {showAutoFields && (
                                        <Field
                                            label="Automation Status"
                                            field="automation_status"
                                            placeholder=
                                            "e.g. Active, Paused"
                                            half
                                        />
                                    )}
                                </>)}

                            {/* SEO */}
                            {activeTab === 'seo'
                                && (<>
                                    <Field
                                        label="Primary Keyword"
                                        field="primary_keyword"
                                        placeholder=
                                        "e.g. plumber chicago"
                                    />
                                    <Field
                                        label="Secondary Keywords (comma separated)"
                                        field="secondary_keywords_text"
                                        placeholder=
                                        "emergency plumber, pipe repair chicago"
                                        hint=
                                        "Your target keywords"
                                    />
                                    <Field
                                        label="GBP / Google Maps URL"
                                        field="gbp_url"
                                        placeholder=
                                        "https://maps.google.com/..."
                                    />
                                    <Field
                                        label="Google CID / Place ID"
                                        field="google_cid"
                                        placeholder=
                                        "e.g. ChIJ..."
                                        hint=
                                        "Find in Google Maps URL"
                                    />
                                </>)}

                            {/* Social */}
                            {activeTab === 'social'
                                && (<>
                                    <Field
                                        label="Facebook URL"
                                        field="facebook_url"
                                        placeholder=
                                        "https://facebook.com/..."
                                        half
                                    />
                                    <Field
                                        label="Instagram URL"
                                        field="instagram_url"
                                        placeholder=
                                        "https://instagram.com/..."
                                        half
                                    />
                                    <Field
                                        label="Twitter / X URL"
                                        field="twitter_url"
                                        placeholder=
                                        "https://twitter.com/..."
                                        half
                                    />
                                    <Field
                                        label="LinkedIn URL"
                                        field="linkedin_url"
                                        placeholder=
                                        "https://linkedin.com/..."
                                        half
                                    />
                                    <Field
                                        label="WhatsApp Number"
                                        field="whatsapp_number"
                                        placeholder=
                                        "+92 300 0000000"
                                        half
                                    />
                                    <Field
                                        label="YouTube URL"
                                        field="youtube_url"
                                        placeholder=
                                        "https://youtube.com/..."
                                        half
                                    />
                                </>)}

                            {/* Client Info */}
                            {activeTab === 'client'
                                && showClientTab
                                && (<>
                                    <Field
                                        label="Client Name"
                                        field="client_name"
                                        placeholder=
                                        "e.g. John Smith"
                                        half
                                    />
                                    <Field
                                        label="Monthly Budget"
                                        field="monthly_budget"
                                        placeholder=
                                        "e.g. $1,500/mo"
                                        half
                                    />
                                    <Field
                                        label="Contract Start Date"
                                        field="contract_start"
                                        type="date"
                                        half
                                    />
                                    <Textarea
                                        label="Notes / Special Instructions"
                                        field="notes"
                                        placeholder=
                                        "Client preferences, special notes..."
                                    />
                                </>)}

                        </div>

                        {/* Save Button */}
                        <div style={{
                            display: 'flex',
                            justifyContent:
                                'flex-end',
                            marginTop: '24px',
                            paddingTop: '20px',
                            borderTop: '1px solid rgba(168,85,247,0.1)'
                        }}>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '12px 32px',
                                    background:
                                        'linear-gradient(135deg, #A855F7, #3B82F6)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    cursor: saving
                                        ? 'not-allowed'
                                        : 'pointer',
                                    opacity: saving
                                        ? 0.7 : 1,
                                    boxShadow:
                                        '0 0 24px rgba(168,85,247,0.3)',
                                    transition:
                                        'all 0.2s ease'
                                }}
                            >
                                {saving
                                    ? <Loader2
                                        size={16}
                                        style={{
                                            animation:
                                                'spin 1s linear infinite'
                                        }}
                                    />
                                    : <Save size={16} />
                                }
                                {saving
                                    ? 'Saving...'
                                    : isNew
                                        ? 'Create Profile'
                                        : 'Save Profile'
                                }
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Empty state */}
            {profiles.length === 0
                && !isNew && (
                    <div style={{
                        textAlign: 'center',
                        padding: '60px 20px',
                        background: '#0D1B2E',
                        border: '1px dashed rgba(168,85,247,0.3)',
                        borderRadius: '20px'
                    }}>
                        <Heart
                            size={40}
                            style={{
                                color: 'rgba(168,85,247,0.3)',
                                marginBottom: '16px'
                            }}
                        />
                        <div style={{
                            fontSize: '16px',
                            fontWeight: 700,
                            color: '#64748B',
                            marginBottom: '8px'
                        }}>
                            Koi profile nahi hai abhi
                        </div>
                        <div style={{
                            fontSize: '13px',
                            color: '#475569',
                            marginBottom: '20px'
                        }}>
                            Apna pehla business
                            profile banao — tamam
                            tools isko use karenge
                        </div>
                        <button
                            onClick={handleNewProfile}
                            style={{
                                padding: '12px 24px',
                                background:
                                    'linear-gradient(135deg, #A855F7, #3B82F6)',
                                border: 'none',
                                borderRadius: '12px',
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '14px',
                                cursor: 'pointer'
                            }}
                        >
                            + Create First Profile
                        </button>
                    </div>
                )}
        </div>
    )
}
