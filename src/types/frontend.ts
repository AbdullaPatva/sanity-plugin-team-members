export interface TeamMember {
  _id: string
  _type: 'teamMember'
  name: string
  position?: string
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
  url?: string
  socialLinks?: Array<{
    platform: string
    url: string
    label?: string
  }>
  bio?: string
  department?: string
  layout?: 'card' | 'list' | 'grid' | 'minimal'
  isActive?: boolean
}

export type TeamMemberLayout = 'card' | 'list' | 'grid' | 'minimal' | 'default'

export interface TeamMemberDisplayProps {
  teamMember: TeamMember
  layout?: TeamMemberLayout
  showSocialLinks?: boolean
  showBio?: boolean
  showPosition?: boolean
  showDepartment?: boolean
  showUrl?: boolean
  customTitle?: string
  className?: string
  imageUrlBuilder?: (imageRef: string) => string
  onSocialLinkClick?: (platform: string, url: string) => void
  onMemberClick?: (member: TeamMember) => void
}

export interface TeamMembersDisplayProps {
  teamMembers: TeamMember[]
  layout?: TeamMemberLayout
  showSocialLinks?: boolean
  showBio?: boolean
  showPosition?: boolean
  showDepartment?: boolean
  showUrl?: boolean
  className?: string
  imageUrlBuilder?: (imageRef: string) => string
  onSocialLinkClick?: (platform: string, url: string) => void
  onMemberClick?: (member: TeamMember) => void
  gridColumns?: number
  maxItems?: number
}

export interface TeamMemberBlockData {
  teamMember: {
    _ref: string
    _type: 'reference'
  }
  displayLayout?: TeamMemberLayout
  showSocialLinks?: boolean
  showBio?: boolean
  customTitle?: string
}

// Utility types for Sanity queries
export interface TeamMemberQuery {
  _id: string
  _type: 'teamMember'
  name: string
  position?: string
  photo?: {
    asset: {
      _ref: string
      url?: string
    }
    alt?: string
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
  }
  url?: string
  socialLinks?: Array<{
    platform: string
    url: string
    label?: string
  }>
  bio?: string
  department?: string
  layout?: 'card' | 'list' | 'grid' | 'minimal'
  isActive?: boolean
}

// Configuration types
export interface TeamMemberConfig {
  projectId: string
  dataset: string
  apiVersion?: string
  useCdn?: boolean
  token?: string
}

// Hook return types
export interface UseTeamMembersResult {
  teamMembers: TeamMember[]
  loading: boolean
  error: Error | null
  refetch: () => void
}

export interface UseTeamMemberResult {
  teamMember: TeamMember | null
  loading: boolean
  error: Error | null
  refetch: () => void
}