/**
 * GROQ Query Examples for Sanity Team Members Plugin
 *
 * These queries demonstrate how to fetch team members from both:
 * 1. teamMemberBlock (used in portable text)
 * 2. teamMembersReference (used as a regular field)
 *
 * All queries ensure only published members are fetched (not drafts).
 */
/**
 * Fetch a single document with team member blocks in portable text
 * This is useful when you have a page/post that contains team member blocks
 */
export declare const fetchDocumentWithTeamMemberBlocks = "\n  *[_type == \"post\" && _id == $documentId][0] {\n    _id,\n    title,\n    content, // This should be your portable text field\n    \"teamMemberBlocks\": content[_type == \"teamMemberBlock\"] {\n      _key,\n      _type,\n      teamMember-> {\n        _id,\n        _type,\n        name,\n        position,\n        department,\n        bio,\n        photo {\n          asset-> {\n            _id,\n            url\n          },\n          alt\n        },\n        socialLinks[] {\n          platform,\n          url,\n          label\n        },\n        url,\n        isActive\n      },\n      displayLayout,\n      showSocialLinks,\n      showBio,\n      showPosition,\n      showDepartment,\n      showUrl,\n      customTitle\n    }\n  }\n";
/**
 * Fetch all team member blocks from a specific document
 * This extracts only the team member blocks from portable text
 */
export declare const fetchTeamMemberBlocksFromDocument = "\n  *[_type == \"post\" && _id == $documentId][0].content[_type == \"teamMemberBlock\"] {\n    _key,\n    _type,\n    teamMember-> {\n      _id,\n      _type,\n      name,\n      position,\n      department,\n      bio,\n      photo {\n        asset-> {\n          _id,\n          url\n        },\n        alt\n      },\n      socialLinks[] {\n        platform,\n        url,\n        label\n      },\n      url,\n      isActive\n    },\n    displayLayout,\n    showSocialLinks,\n    showBio,\n    showPosition,\n    showDepartment,\n    showUrl,\n    customTitle\n  }\n";
/**
 * Fetch a document with team members reference field
 * This is useful when you have a dedicated team members field
 */
export declare const fetchDocumentWithTeamMembersReference = "\n  *[_type == \"post\" && _id == $documentId][0] {\n    _id,\n    title,\n    \"teamMembersData\": teamMembersReference {\n      _type,\n      teamMembers[]-> {\n        _id,\n        _type,\n        name,\n        position,\n        department,\n        bio,\n        photo {\n          asset-> {\n            _id,\n            url\n          },\n          alt\n        },\n        socialLinks[] {\n          platform,\n          url,\n          label\n        },\n        url,\n        isActive\n      },\n      displayLayout,\n      showSocialLinks,\n      showBio,\n      showPosition,\n      showDepartment,\n      showUrl,\n      gridColumns,\n      maxItems\n    }\n  }\n";
/**
 * Fetch only the team members reference data
 * This extracts just the team members configuration
 */
export declare const fetchTeamMembersReference = "\n  *[_type == \"post\" && _id == $documentId][0].teamMembersReference {\n    _type,\n    teamMembers[]-> {\n      _id,\n      _type,\n      name,\n      position,\n      department,\n      bio,\n      photo {\n        asset-> {\n          _id,\n          url\n        },\n        alt\n      },\n      socialLinks[] {\n        platform,\n        url,\n        label\n      },\n      url,\n      isActive\n    },\n    displayLayout,\n    showSocialLinks,\n    showBio,\n    showPosition,\n    showDepartment,\n    showUrl,\n    gridColumns,\n    maxItems\n  }\n";
/**
 * Fetch all published team members (not drafts)
 * This is useful for creating a team page or directory
 */
export declare const fetchAllPublishedTeamMembers = "\n  *[_type == \"teamMember\" && !(_id in path(\"drafts.**\")) && isActive == true] | order(name asc) {\n    _id,\n    _type,\n    name,\n    position,\n    department,\n    bio,\n    photo {\n      asset-> {\n        _id,\n        url\n      },\n      alt\n    },\n    socialLinks[] {\n      platform,\n      url,\n      label\n    },\n    url,\n    isActive,\n    _createdAt,\n    _updatedAt\n  }\n";
/**
 * Fetch team members by department
 * This is useful for filtering team members by department
 */
export declare const fetchTeamMembersByDepartment = "\n  *[_type == \"teamMember\" && !(_id in path(\"drafts.**\")) && isActive == true && department == $department] | order(name asc) {\n    _id,\n    _type,\n    name,\n    position,\n    department,\n    bio,\n    photo {\n      asset-> {\n        _id,\n        url\n      },\n      alt\n    },\n    socialLinks[] {\n      platform,\n      url,\n      label\n    },\n    url,\n    isActive\n  }\n";
/**
 * Fetch a document with both portable text blocks AND reference field
 * This is useful when a document has both types of team member data
 */
export declare const fetchDocumentWithAllTeamMembers = "\n  *[_type == \"post\" && _id == $documentId][0] {\n    _id,\n    title,\n    // Team member blocks from portable text\n    \"teamMemberBlocks\": content[_type == \"teamMemberBlock\"] {\n      _key,\n      _type,\n      teamMember-> {\n        _id,\n        _type,\n        name,\n        position,\n        department,\n        bio,\n        photo {\n          asset-> {\n            _id,\n            url\n          },\n          alt\n        },\n        socialLinks[] {\n          platform,\n          url,\n          label\n        },\n        url,\n        isActive\n      },\n      displayLayout,\n      showSocialLinks,\n      showBio,\n      showPosition,\n      showDepartment,\n      showUrl,\n      customTitle\n    },\n    // Team members reference field\n    \"teamMembersData\": teamMembersReference {\n      _type,\n      teamMembers[]-> {\n        _id,\n        _type,\n        name,\n        position,\n        department,\n        bio,\n        photo {\n          asset-> {\n            _id,\n            url\n          },\n          alt\n        },\n        socialLinks[] {\n          platform,\n          url,\n          label\n        },\n        url,\n        isActive\n      },\n      displayLayout,\n      showSocialLinks,\n      showBio,\n      showPosition,\n      showDepartment,\n      showUrl,\n      gridColumns,\n      maxItems\n    }\n  }\n";
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
declare const _default: {
    fetchDocumentWithTeamMemberBlocks: string;
    fetchTeamMemberBlocksFromDocument: string;
    fetchDocumentWithTeamMembersReference: string;
    fetchTeamMembersReference: string;
    fetchAllPublishedTeamMembers: string;
    fetchTeamMembersByDepartment: string;
    fetchDocumentWithAllTeamMembers: string;
};
export default _default;
