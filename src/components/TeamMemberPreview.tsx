import React from 'react'
import { Card, Text, Flex, Avatar, Badge, Box } from '@sanity/ui'
import { ImageIcon, LinkIcon } from '@sanity/icons'

interface TeamMember {
  _id: string
  name: string
  position?: string
  photo?: {
    asset: {
      _ref: string
    }
    alt?: string
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
}

interface TeamMemberPreviewProps {
  teamMember: TeamMember
  displayLayout?: string
  showSocialLinks?: boolean
  showBio?: boolean
  customTitle?: string
}

export function TeamMemberPreview({
  teamMember,
  displayLayout = 'default',
  showSocialLinks = true,
  showBio = true,
  customTitle,
}: TeamMemberPreviewProps) {
  if (!teamMember) {
    return (
      <Card padding={3} tone="caution">
        <Text>No team member selected</Text>
      </Card>
    )
  }

  const effectiveLayout = displayLayout === 'default' ? teamMember.layout || 'card' : displayLayout
  const displayName = customTitle || teamMember.name

  const renderSocialLinks = () => {
    if (!showSocialLinks || !teamMember.socialLinks?.length) return null

    return (
      <Flex gap={2} wrap="wrap">
        {teamMember.socialLinks.map((link, index) => (
          <Badge key={index} tone="primary" padding={1}>
            <Flex align="center" gap={1}>
              <LinkIcon />
              <Text size={1}>{link.label || link.platform}</Text>
            </Flex>
          </Badge>
        ))}
      </Flex>
    )
  }

  const renderCard = () => (
    <Card padding={3} radius={2} shadow={1}>
      <Flex direction="column" gap={3}>
        <Flex align="center" gap={3}>
          <Avatar
            size={3}
            src={teamMember.photo?.asset ? `https://cdn.sanity.io/images/your-project-id/production/${teamMember.photo.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}` : undefined}
            alt={teamMember.photo?.alt || teamMember.name}
          />
          <Box flex={1}>
            <Text weight="bold" size={2}>
              {displayName}
            </Text>
            {teamMember.position && (
              <Text size={1} muted>
                {teamMember.position}
              </Text>
            )}
            {teamMember.department && (
              <Text size={1} muted>
                {teamMember.department}
              </Text>
            )}
          </Box>
        </Flex>
        
        {showBio && teamMember.bio && (
          <Text size={1}>
            {teamMember.bio}
          </Text>
        )}
        
        {renderSocialLinks()}
        
        {teamMember.url && (
          <Badge tone="positive" padding={1}>
            <Flex align="center" gap={1}>
              <LinkIcon />
              <Text size={1}>Website</Text>
            </Flex>
          </Badge>
        )}
      </Flex>
    </Card>
  )

  const renderList = () => (
    <Card padding={2} radius={1}>
      <Flex align="center" gap={3}>
        <Avatar
          size={2}
          src={teamMember.photo?.asset ? `https://cdn.sanity.io/images/your-project-id/production/${teamMember.photo.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}` : undefined}
          alt={teamMember.photo?.alt || teamMember.name}
        />
        <Box flex={1}>
          <Text weight="bold" size={1}>
            {displayName}
          </Text>
          {teamMember.position && (
            <Text size={1} muted>
              {teamMember.position}
            </Text>
          )}
        </Box>
        {renderSocialLinks()}
      </Flex>
    </Card>
  )

  const renderMinimal = () => (
    <Flex align="center" gap={2}>
      <Avatar
        size={1}
        src={teamMember.photo?.asset ? `https://cdn.sanity.io/images/your-project-id/production/${teamMember.photo.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}` : undefined}
        alt={teamMember.photo?.alt || teamMember.name}
      />
      <Text size={1} weight="bold">
        {displayName}
      </Text>
    </Flex>
  )

  switch (effectiveLayout) {
    case 'list':
      return renderList()
    case 'minimal':
      return renderMinimal()
    case 'grid':
    case 'card':
    default:
      return renderCard()
  }
}