/**
 * GROQ Query Examples for Sanity Team Members Plugin
 * 
 * These queries demonstrate how to fetch team members from both:
 * 1. teamMemberBlock (used in portable text)
 * 2. teamMembersReference (used as a regular field)
 * 
 * All queries ensure only published members are fetched (not drafts).
 */

// ============================================================================
// 1. FETCHING TEAM MEMBER BLOCKS FROM PORTABLE TEXT
// ============================================================================

/**
 * Fetch a single document with team member blocks in portable text
 * This is useful when you have a page/post that contains team member blocks
 */
export const fetchDocumentWithTeamMemberBlocks = `
  *[_type == "post" && _id == $documentId][0] {
    _id,
    title,
    content, // This should be your portable text field
    "teamMemberBlocks": content[_type == "teamMemberBlock"] {
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
  }
`

/**
 * Fetch all team member blocks from a specific document
 * This extracts only the team member blocks from portable text
 */
export const fetchTeamMemberBlocksFromDocument = `
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

// ============================================================================
// 2. FETCHING TEAM MEMBERS REFERENCE FIELD
// ============================================================================

/**
 * Fetch a document with team members reference field
 * This is useful when you have a dedicated team members field
 */
export const fetchDocumentWithTeamMembersReference = `
  *[_type == "post" && _id == $documentId][0] {
    _id,
    title,
    "teamMembersData": teamMembersReference {
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
  }
`

/**
 * Fetch only the team members reference data
 * This extracts just the team members configuration
 */
export const fetchTeamMembersReference = `
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

// ============================================================================
// 3. FETCHING ALL PUBLISHED TEAM MEMBERS
// ============================================================================

/**
 * Fetch all published team members (not drafts)
 * This is useful for creating a team page or directory
 */
export const fetchAllPublishedTeamMembers = `
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

/**
 * Fetch team members by department
 * This is useful for filtering team members by department
 */
export const fetchTeamMembersByDepartment = `
  *[_type == "teamMember" && !(_id in path("drafts.**")) && isActive == true && department == $department] | order(name asc) {
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
  }
`

// ============================================================================
// 4. COMBINED QUERIES FOR COMPLEX SCENARIOS
// ============================================================================

/**
 * Fetch a document with both portable text blocks AND reference field
 * This is useful when a document has both types of team member data
 */
export const fetchDocumentWithAllTeamMembers = `
  *[_type == "post" && _id == $documentId][0] {
    _id,
    title,
    // Team member blocks from portable text
    "teamMemberBlocks": content[_type == "teamMemberBlock"] {
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
    },
    // Team members reference field
    "teamMembersData": teamMembersReference {
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
  }
`

// ============================================================================
// 5. USAGE EXAMPLES WITH PARAMETERS
// ============================================================================

/**
 * Example usage in your application:
 * 
 * // For a specific document ID
 * const documentId = "your-document-id"
 * 
 * // Fetch team member blocks from portable text
 * const teamMemberBlocks = await client.fetch(fetchTeamMemberBlocksFromDocument, { documentId })
 * 
 * // Fetch team members reference
 * const teamMembersRef = await client.fetch(fetchTeamMembersReference, { documentId })
 * 
 * // Fetch all published team members
 * const allTeamMembers = await client.fetch(fetchAllPublishedTeamMembers)
 * 
 * // Fetch team members by department
 * const engineeringTeam = await client.fetch(fetchTeamMembersByDepartment, { department: "Engineering" })
 */

export default {
  fetchDocumentWithTeamMemberBlocks,
  fetchTeamMemberBlocksFromDocument,
  fetchDocumentWithTeamMembersReference,
  fetchTeamMembersReference,
  fetchAllPublishedTeamMembers,
  fetchTeamMembersByDepartment,
  fetchDocumentWithAllTeamMembers,
}