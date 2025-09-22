import React from 'react'
import { createClient } from '@sanity/client'

// Example Next.js component showing how to use the team members plugin
// This example shows how to fetch data using GROQ queries

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: true,
})

// Example of fetching all team members
export async function getAllTeamMembers() {
  const query = `
    *[_type == "teamMember" && !(_id in path("drafts.**")) && isActive == true] | order(name asc) {
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
      isActive,
      _createdAt,
      _updatedAt
    }
  `
  
  return await client.fetch(query)
}

// Example of fetching team members reference with settings
export async function getTeamMembersReference(documentId: string) {
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
  
  return await client.fetch(query, { documentId })
}

// Example of fetching team member blocks from portable text
export async function getTeamMemberBlocks(documentId: string) {
  const query = `
    *[_type == "post" && _id == $documentId][0].content[_type == "teamMemberBlock"] {
      _key,
      _type,
      teamMember-> {
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
      customTitle
    }
  `
  
  return await client.fetch(query, { documentId })
}

// Example React component using the data
export function TeamMembersPage() {
  const [teamMembers, setTeamMembers] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const members = await getAllTeamMembers()
        setTeamMembers(members)
      } catch (err: any) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

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
        <p>Error loading team members: {error?.message || 'Unknown error'}</p>
      </div>
    )
  }

  return (
    <div className="team-members-page">
      <h1>Our Team</h1>
      <p>Found {teamMembers.length} team members</p>
      
      {/* Render your team members here using your own components */}
      <div className="team-members-grid">
        {teamMembers.map((member: any) => (
          <div key={member._id} className="team-member-card">
            <h3>{member.name}</h3>
            {member.position && <p>{member.position}</p>}
            {member.department && <p>{member.department}</p>}
            {/* Add your own rendering logic here */}
          </div>
        ))}
      </div>
    </div>
  )
}