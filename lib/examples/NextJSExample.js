import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { createClient } from '@sanity/client';
// Example Next.js component showing how to use the team members plugin
// This example shows how to fetch data using GROQ queries
const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: true,
});
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
  `;
    return await client.fetch(query);
}
// Example of fetching team members reference with settings
export async function getTeamMembersReference(documentId) {
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
  `;
    return await client.fetch(query, { documentId });
}
// Example of fetching team member blocks from portable text
export async function getTeamMemberBlocks(documentId) {
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
  `;
    return await client.fetch(query, { documentId });
}
// Example React component using the data
export function TeamMembersPage() {
    const [teamMembers, setTeamMembers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                const members = await getAllTeamMembers();
                setTeamMembers(members);
            }
            catch (err) {
                setError(err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchTeamMembers();
    }, []);
    if (loading) {
        return (_jsx("div", { className: "team-members-loading", children: _jsx("p", { children: "Loading team members..." }) }));
    }
    if (error) {
        return (_jsx("div", { className: "team-members-error", children: _jsxs("p", { children: ["Error loading team members: ", error?.message || 'Unknown error'] }) }));
    }
    return (_jsxs("div", { className: "team-members-page", children: [_jsx("h1", { children: "Our Team" }), _jsxs("p", { children: ["Found ", teamMembers.length, " team members"] }), _jsx("div", { className: "team-members-grid", children: teamMembers.map((member) => (_jsxs("div", { className: "team-member-card", children: [_jsx("h3", { children: member.name }), member.position && _jsx("p", { children: member.position }), member.department && _jsx("p", { children: member.department })] }, member._id))) })] }));
}
