import React from 'react'

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

export interface TeamMemberDisplayProps {
  teamMember: TeamMember
  layout?: 'card' | 'list' | 'grid' | 'minimal' | 'default'
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

export function TeamMemberDisplay({
  teamMember,
  layout = 'default',
  showSocialLinks = true,
  showBio = true,
  showPosition = true,
  showDepartment = true,
  showUrl = true,
  customTitle,
  className = '',
  imageUrlBuilder,
  onSocialLinkClick,
  onMemberClick,
}: TeamMemberDisplayProps) {
  if (!teamMember) {
    return null
  }

  const effectiveLayout = layout === 'default' ? teamMember.layout || 'card' : layout
  const displayName = customTitle || teamMember.name

  // Default image URL builder if none provided
  const getImageUrl = (imageRef: string) => {
    if (imageUrlBuilder) {
      return imageUrlBuilder(imageRef)
    }
    
    // Default Sanity image URL construction
    const imageId = imageRef.replace('image-', '').replace('-jpg', '').replace('-png', '').replace('-webp', '')
    const extension = imageRef.includes('-jpg') ? 'jpg' : imageRef.includes('-png') ? 'png' : 'webp'
    return `https://cdn.sanity.io/images/your-project-id/production/${imageId}.${extension}`
  }

  const handleSocialLinkClick = (platform: string, url: string) => {
    if (onSocialLinkClick) {
      onSocialLinkClick(platform, url)
    } else {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  const handleMemberClick = () => {
    if (onMemberClick) {
      onMemberClick(teamMember)
    }
  }

  const getSocialIcon = (platform: string) => {
    const icons: Record<string, string> = {
      twitter: '🐦',
      linkedin: '💼',
      github: '🐙',
      instagram: '📷',
      facebook: '👥',
      youtube: '📺',
      website: '🌐',
      other: '🔗',
    }
    return icons[platform.toLowerCase()] || '🔗'
  }

  const renderSocialLinks = () => {
    if (!showSocialLinks || !teamMember.socialLinks?.length) return null

    return (
      <div className="team-member-social-links">
        {teamMember.socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            onClick={(e) => {
              e.preventDefault()
              handleSocialLinkClick(link.platform, link.url)
            }}
            className="team-member-social-link"
            title={link.label || link.platform}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="social-icon">{getSocialIcon(link.platform)}</span>
            <span className="social-label">{link.label || link.platform}</span>
          </a>
        ))}
      </div>
    )
  }

  const renderCard = () => (
    <div 
      className={`team-member-block ${className}`}
      onClick={handleMemberClick}
      style={{ cursor: onMemberClick ? 'pointer' : 'default' }}
    >
      <div className="team-member-block__container">
        <div className="team-member-block__photo-container">
          {teamMember.photo?.asset ? (
            <img
              src={getImageUrl(teamMember.photo.asset._ref)}
              alt={teamMember.photo.alt || teamMember.name}
              className="team-member-block__photo"
              loading="lazy"
            />
          ) : (
            <div className="team-member-block__photo team-member-block__photo-placeholder">
              <span>{teamMember.name.charAt(0).toUpperCase()}</span>
            </div>
          )}
          
          {showSocialLinks && teamMember.socialLinks && teamMember.socialLinks.length > 0 && (
            <div className="team-member-block__social-overlay">
              {teamMember.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="team-member-block__social-link"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSocialLinkClick(link.platform, link.url)
                  }}
                >
                  {link.platform === 'linkedin' ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  ) : (
                    <span>{link.platform.charAt(0).toUpperCase()}</span>
                  )}
                </a>
              ))}
            </div>
          )}
        </div>
        
        <div className="team-member-block__content">
          <h3 className="team-member-block__name">{displayName}</h3>
          
          {showPosition && teamMember.position && (
            <p className="team-member-block__position">{teamMember.position}</p>
          )}
          
          {showDepartment && teamMember.department && (
            <p className="team-member-block__department">{teamMember.department}</p>
          )}
          
          {showBio && teamMember.bio && (
            <p className="team-member-block__bio">{teamMember.bio}</p>
          )}
          
          {showUrl && teamMember.url && (
            <a
              href={teamMember.url}
              className="team-member-block__url"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              Visit Website
            </a>
          )}
        </div>
      </div>
    </div>
  )

  const renderList = () => (
    <div 
      className={`team-member team-member--list ${className}`}
      onClick={handleMemberClick}
      style={{ cursor: onMemberClick ? 'pointer' : 'default' }}
    >
      <div className="team-member__photo">
        {teamMember.photo?.asset ? (
          <img
            src={getImageUrl(teamMember.photo.asset._ref)}
            alt={teamMember.photo.alt || teamMember.name}
            loading="lazy"
          />
        ) : (
          <div className="team-member__photo-placeholder">
            <span>{teamMember.name.charAt(0).toUpperCase()}</span>
          </div>
        )}
      </div>
      
      <div className="team-member__content">
        <h4 className="team-member__name">{displayName}</h4>
        {showPosition && teamMember.position && (
          <p className="team-member__position">{teamMember.position}</p>
        )}
      </div>
      
      {renderSocialLinks()}
    </div>
  )

  const renderMinimal = () => (
    <div 
      className={`team-member team-member--minimal ${className}`}
      onClick={handleMemberClick}
      style={{ cursor: onMemberClick ? 'pointer' : 'default' }}
    >
      <div className="team-member__photo">
        {teamMember.photo?.asset ? (
          <img
            src={getImageUrl(teamMember.photo.asset._ref)}
            alt={teamMember.photo.alt || teamMember.name}
            loading="lazy"
          />
        ) : (
          <div className="team-member__photo-placeholder">
            <span>{teamMember.name.charAt(0).toUpperCase()}</span>
          </div>
        )}
      </div>
      <span className="team-member__name">{displayName}</span>
    </div>
  )

  const renderGrid = () => (
    <div 
      className={`team-member team-member--grid ${className}`}
      onClick={handleMemberClick}
      style={{ cursor: onMemberClick ? 'pointer' : 'default' }}
    >
      <div className="team-member__photo">
        {teamMember.photo?.asset ? (
          <img
            src={getImageUrl(teamMember.photo.asset._ref)}
            alt={teamMember.photo.alt || teamMember.name}
            loading="lazy"
          />
        ) : (
          <div className="team-member__photo-placeholder">
            <span>{teamMember.name.charAt(0).toUpperCase()}</span>
          </div>
        )}
      </div>
      
      <div className="team-member__content">
        <h4 className="team-member__name">{displayName}</h4>
        {showPosition && teamMember.position && (
          <p className="team-member__position">{teamMember.position}</p>
        )}
        {showBio && teamMember.bio && (
          <p className="team-member__bio">{teamMember.bio}</p>
        )}
        {renderSocialLinks()}
      </div>
    </div>
  )

  switch (effectiveLayout) {
    case 'list':
      return renderList()
    case 'minimal':
      return renderMinimal()
    case 'grid':
      return renderGrid()
    case 'card':
    default:
      return renderCard()
  }
}

// Multiple team members display component
export interface TeamMembersDisplayProps {
  teamMembers: TeamMember[]
  layout?: 'card' | 'list' | 'grid' | 'minimal' | 'default'
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

export function TeamMembersDisplay({
  teamMembers,
  layout = 'default',
  showSocialLinks = true,
  showBio = true,
  showPosition = true,
  showDepartment = true,
  showUrl = true,
  className = '',
  imageUrlBuilder,
  onSocialLinkClick,
  onMemberClick,
  gridColumns = 3,
  maxItems,
}: TeamMembersDisplayProps) {
  if (!teamMembers?.length) {
    return null
  }

  const displayMembers = maxItems ? teamMembers.slice(0, maxItems) : teamMembers
  const effectiveLayout = layout === 'default' ? 'grid' : layout

  const containerClass = effectiveLayout === 'grid' || effectiveLayout === 'card' 
    ? `team-member-blocks-grid ${className}`
    : `team-members team-members--${effectiveLayout} ${className}`

  const gridStyle = effectiveLayout === 'grid' ? {
    gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
  } : {}

  return (
    <div className={containerClass} style={gridStyle}>
      {displayMembers.map((member) => (
        <TeamMemberDisplay
          key={member._id}
          teamMember={member}
          layout={layout}
          showSocialLinks={showSocialLinks}
          showBio={showBio}
          showPosition={showPosition}
          showDepartment={showDepartment}
          showUrl={showUrl}
          imageUrlBuilder={imageUrlBuilder}
          onSocialLinkClick={onSocialLinkClick}
          onMemberClick={onMemberClick}
        />
      ))}
    </div>
  )
}