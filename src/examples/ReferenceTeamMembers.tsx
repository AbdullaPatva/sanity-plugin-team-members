/**
 * Example Component: Parsing Team Members from Reference Field
 * 
 * This component demonstrates how to parse and render team members
 * from a teamMembersReference field (outside of portable text).
 * 
 * Usage:
 * 1. Fetch your document with team members reference using the GROQ queries
 * 2. Pass the teamMembersReference data to this component
 * 3. The component will render all selected team members with common settings
 */

import React from 'react'
import { TeamMembersDisplay } from '../components/TeamMemberDisplay'

// Types for the team members reference data
interface TeamMember {
  _id: string
  _type: 'teamMember'
  name: string
  position?: string
  department?: string
  bio?: string
  photo?: {
    asset: {
      _ref: string
    }
    alt?: string
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
  }
  socialLinks?: Array<{
    platform: string
    url: string
    label?: string
  }>
  url?: string
  isActive?: boolean
}

interface TeamMembersReference {
  _type: 'teamMembersReference'
  teamMembers: TeamMember[]
  displayLayout: 'card' | 'list' | 'grid' | 'minimal'
  showSocialLinks: boolean
  showBio: boolean
  showPosition: boolean
  showDepartment: boolean
  showUrl: boolean
  gridColumns?: number
  maxItems?: number
}

interface ReferenceTeamMembersProps {
  teamMembersData: TeamMembersReference | null
  sanityConfig: {
    projectId: string
    dataset: string
    useCdn?: boolean
  }
  onMemberClick?: (member: { name: string; _id: string }) => void
  onSocialLinkClick?: (platform: string, url: string) => void
  className?: string
}

// Custom image URL builder
const createImageUrlBuilder = (config: { projectId: string; dataset: string; useCdn?: boolean }) => {
  return (imageRef: string) => {
    const imageId = imageRef.replace('image-', '').replace('-jpg', '').replace('-png', '').replace('-webp', '')
    const extension = imageRef.includes('-jpg') ? 'jpg' : imageRef.includes('-png') ? 'png' : 'webp'
    const baseUrl = config.useCdn ? 'https://cdn.sanity.io' : 'https://api.sanity.io'
    return `${baseUrl}/images/${config.projectId}/${config.dataset}/${imageId}.${extension}`
  }
}

export function ReferenceTeamMembers({
  teamMembersData,
  sanityConfig,
  onMemberClick,
  onSocialLinkClick,
  className = '',
}: ReferenceTeamMembersProps) {
  const imageUrlBuilder = createImageUrlBuilder(sanityConfig)

  if (!teamMembersData) {
    return (
      <div className={`text-gray-500 text-center p-8 ${className}`}>
        No team members data available
      </div>
    )
  }

  if (!teamMembersData.teamMembers || teamMembersData.teamMembers.length === 0) {
    return (
      <div className={`text-gray-500 text-center p-8 ${className}`}>
        No team members selected
      </div>
    )
  }

  // Apply maxItems limit if specified
  const displayMembers = teamMembersData.maxItems 
    ? teamMembersData.teamMembers.slice(0, teamMembersData.maxItems)
    : teamMembersData.teamMembers

  // Filter out inactive members
  const activeMembers = displayMembers.filter(member => member.isActive !== false)

  if (activeMembers.length === 0) {
    return (
      <div className={`text-gray-500 text-center p-8 ${className}`}>
        No active team members found
      </div>
    )
  }

  return (
    <div className={`reference-team-members ${className}`}>
      <TeamMembersDisplay
        teamMembers={activeMembers}
        layout={teamMembersData.displayLayout}
        showSocialLinks={teamMembersData.showSocialLinks}
        showBio={teamMembersData.showBio}
        showPosition={teamMembersData.showPosition}
        showDepartment={teamMembersData.showDepartment}
        showUrl={teamMembersData.showUrl}
        gridColumns={teamMembersData.gridColumns || 3}
        imageUrlBuilder={imageUrlBuilder}
        onMemberClick={onMemberClick}
        onSocialLinkClick={onSocialLinkClick}
      />
    </div>
  )
}

// Example usage component
export function ReferenceTeamMembersExample() {
  const [teamMembersData, setTeamMembersData] = React.useState<TeamMembersReference | null>(null)
  const [loading, setLoading] = React.useState(true)

  // Sanity configuration
  const sanityConfig = {
    projectId: 'your-project-id',
    dataset: 'production',
    useCdn: true,
  }

  // Fetch team members reference data
  React.useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        // Example: Fetch a document with team members reference
        const query = `
          *[_type == "post" && _id == $documentId][0].teamMembersReference {
            _type,
            teamMembers[]-> {
              _id,
              _type,
              name,
              position,
              department,
              bio,
              photo {
                asset-> {
                  _id,
                  url
                },
                alt
              },
              socialLinks[] {
                platform,
                url,
                label
              },
              url,
              isActive
            },
            displayLayout,
            showSocialLinks,
            showBio,
            showPosition,
            showDepartment,
            showUrl,
            gridColumns,
            maxItems
          }
        `
        
        // Replace with your actual Sanity client
        // const client = createClient(sanityConfig)
        // const result = await client.fetch(query, { documentId: 'your-document-id' })
        // setTeamMembersData(result)
        
        // For demo purposes, using null
        setTeamMembersData(null)
      } catch (error) {
        console.error('Error fetching team members:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  const handleMemberClick = (member: { name: string; _id: string }) => {
    console.log('Member clicked:', member.name)
    // Navigate to member detail page or show modal
  }

  const handleSocialLinkClick = (platform: string, url: string) => {
    console.log(`Opening ${platform} link:`, url)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading team members...</span>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Team Members Reference</h1>
      
      <ReferenceTeamMembers
        teamMembersData={teamMembersData}
        sanityConfig={sanityConfig}
        onMemberClick={handleMemberClick}
        onSocialLinkClick={handleSocialLinkClick}
        className="bg-white rounded-lg shadow-sm p-6"
      />
    </div>
  )
}

// Hook for fetching team members reference
export function useTeamMembersReference(
  documentId: string,
  sanityConfig: { projectId: string; dataset: string; useCdn?: boolean }
) {
  const [teamMembersData, setTeamMembersData] = React.useState<TeamMembersReference | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    const fetchTeamMembers = async () => {
      if (!documentId) {
        setTeamMembersData(null)
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const query = `
          *[_type == "post" && _id == $documentId][0].teamMembersReference {
            _type,
            teamMembers[]-> {
              _id,
              _type,
              name,
              position,
              department,
              bio,
              photo {
                asset-> {
                  _id,
                  url
                },
                alt
              },
              socialLinks[] {
                platform,
                url,
                label
              },
              url,
              isActive
            },
            displayLayout,
            showSocialLinks,
            showBio,
            showPosition,
            showDepartment,
            showUrl,
            gridColumns,
            maxItems
          }
        `

        // Replace with your actual Sanity client
        // const client = createClient(sanityConfig)
        // const result = await client.fetch(query, { documentId })
        // setTeamMembersData(result)
        
        // For demo purposes
        setTeamMembersData(null)
      } catch (err: any) {
        setError(err)
        setTeamMembersData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [documentId, sanityConfig])

  return { teamMembersData, loading, error }
}

export default ReferenceTeamMembers