/**
 * Example Component: Parsing Team Members from Portable Text
 * 
 * This component demonstrates how to parse and render team member blocks
 * that are embedded within a portable text field.
 * 
 * Usage:
 * 1. Fetch your document with team member blocks using the GROQ queries
 * 2. Pass the portable text content to this component
 * 3. The component will automatically find and render team member blocks
 */

import React from 'react'
import { PortableText } from '@portabletext/react'
import { TeamMemberDisplay } from '../components/TeamMemberDisplay'

// Types for the team member block data
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

interface TeamMemberBlock {
  _key: string
  _type: 'teamMemberBlock'
  teamMembers: TeamMember[]
  displayLayout?: 'default' | 'card' | 'list' | 'grid' | 'minimal'
  showSocialLinks?: boolean
  showBio?: boolean
  showPosition?: boolean
  showDepartment?: boolean
  showUrl?: boolean
  customTitle?: string
}

interface PortableTextTeamMembersProps {
  content: any[] // Portable text content array
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

export function PortableTextTeamMembers({
  content,
  sanityConfig,
  onMemberClick,
  onSocialLinkClick,
  className = '',
}: PortableTextTeamMembersProps) {
  const imageUrlBuilder = createImageUrlBuilder(sanityConfig)

  // Custom components for portable text
  const components = {
    // Handle team member blocks
    block: {
      teamMemberBlock: ({ value }: any) => {
        if (!value?.teamMembers || value.teamMembers.length === 0) {
          return null
        }

        return (
          <div key={value._key} className={`portable-text-team-member ${className}`}>
            <div className="team-members-grid">
              {value.teamMembers.map((member: TeamMember) => (
                <TeamMemberDisplay
                  key={member._id}
                  teamMember={member}
                  layout={value.displayLayout || 'default'}
                  showSocialLinks={value.showSocialLinks !== undefined ? value.showSocialLinks : true}
                  showBio={value.showBio !== undefined ? value.showBio : true}
                  showPosition={value.showPosition !== undefined ? value.showPosition : true}
                  showDepartment={value.showDepartment !== undefined ? value.showDepartment : true}
                  showUrl={value.showUrl !== undefined ? value.showUrl : true}
                  customTitle={value.customTitle}
                  imageUrlBuilder={imageUrlBuilder}
                  onMemberClick={onMemberClick}
                  onSocialLinkClick={onSocialLinkClick}
                />
              ))}
            </div>
          </div>
        )
      },
    },
  }

  if (!content || !Array.isArray(content)) {
    return <div className="text-gray-500">No content available</div>
  }

  return (
    <div className={`portable-text-content ${className}`}>
      <PortableText value={content} components={components} />
    </div>
  )
}

// Example usage component
export function PortableTextTeamMembersExample() {
  const [content, setContent] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)

  // Sanity configuration
  const sanityConfig = {
    projectId: 'your-project-id',
    dataset: 'production',
    useCdn: true,
  }

  // Fetch content with team member blocks
  React.useEffect(() => {
    const fetchContent = async () => {
      try {
        // Example: Fetch a document with team member blocks
        const query = `
          *[_type == "post" && _id == $documentId][0] {
            content
          }
        `
        
        // Replace with your actual Sanity client
        // const client = createClient(sanityConfig)
        // const result = await client.fetch(query, { documentId: 'your-document-id' })
        // setContent(result.content || [])
        
        // For demo purposes, using empty array
        setContent([])
      } catch (error) {
        console.error('Error fetching content:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
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
        <span className="ml-2 text-gray-600">Loading content...</span>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Portable Text with Team Members</h1>
      
      <PortableTextTeamMembers
        content={content}
        sanityConfig={sanityConfig}
        onMemberClick={handleMemberClick}
        onSocialLinkClick={handleSocialLinkClick}
        className="prose max-w-none"
      />
    </div>
  )
}

export default PortableTextTeamMembers