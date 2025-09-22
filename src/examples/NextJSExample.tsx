import React from 'react'
import { TeamMembersDisplay, useTeamMembers, useTeamMember, createImageUrlBuilder } from '../index'

// Example Next.js component showing how to use the team members plugin
export function TeamMembersPage() {
  const { teamMembers, loading, error } = useTeamMembers({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    useCdn: true,
  })

  const imageUrlBuilder = createImageUrlBuilder({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  })

  const handleSocialLinkClick = (platform: string, url: string) => {
    console.log(`Opening ${platform} link:`, url)
    // You can add analytics tracking here
  }

  const handleMemberClick = (member: any) => {
    console.log('Member clicked:', member.name)
    // You can navigate to a member detail page here
  }

  if (loading) {
    return (
      <div className="team-members-loading">
        <p>Loading team members...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="team-members-error">
        <p>Error loading team members: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="team-members-page">
      <h1>Our Team</h1>
      
      {/* Card Layout */}
      <section>
        <h2>Card Layout</h2>
        <TeamMembersDisplay
          teamMembers={teamMembers}
          layout="card"
          showSocialLinks={true}
          showBio={true}
          showPosition={true}
          showDepartment={true}
          imageUrlBuilder={imageUrlBuilder}
          onSocialLinkClick={handleSocialLinkClick}
          onMemberClick={handleMemberClick}
          className="team-section"
        />
      </section>

      {/* Grid Layout */}
      <section>
        <h2>Grid Layout</h2>
        <TeamMembersDisplay
          teamMembers={teamMembers}
          layout="grid"
          gridColumns={3}
          showSocialLinks={true}
          showBio={true}
          showPosition={true}
          imageUrlBuilder={imageUrlBuilder}
          onSocialLinkClick={handleSocialLinkClick}
          onMemberClick={handleMemberClick}
          className="team-section"
        />
      </section>

      {/* List Layout */}
      <section>
        <h2>List Layout</h2>
        <TeamMembersDisplay
          teamMembers={teamMembers}
          layout="list"
          showSocialLinks={true}
          showPosition={true}
          imageUrlBuilder={imageUrlBuilder}
          onSocialLinkClick={handleSocialLinkClick}
          onMemberClick={handleMemberClick}
          className="team-section"
        />
      </section>

      {/* Minimal Layout */}
      <section>
        <h2>Minimal Layout</h2>
        <TeamMembersDisplay
          teamMembers={teamMembers}
          layout="minimal"
          showSocialLinks={false}
          showBio={false}
          showPosition={false}
          imageUrlBuilder={imageUrlBuilder}
          onMemberClick={handleMemberClick}
          className="team-section"
        />
      </section>
    </div>
  )
}

// Example of using individual team member
export function TeamMemberCard({ memberId }: { memberId: string }) {
  const { teamMember, loading, error } = useTeamMember(memberId, {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!teamMember) return <div>Member not found</div>

  return (
    <TeamMembersDisplay
      teamMembers={[teamMember]}
      layout="card"
      showSocialLinks={true}
      showBio={true}
      showPosition={true}
      imageUrlBuilder={createImageUrlBuilder({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
      })}
    />
  )
}