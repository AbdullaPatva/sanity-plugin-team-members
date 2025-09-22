# Sanity Team Members Plugin

A Sanity plugin for managing team members with flexible configuration options for both portable text blocks and reference fields.

## Features

- **Team Member Schema**: Complete schema for team member data with photo, bio, social links, and more
- **Portable Text Integration**: Team member blocks that can be embedded in portable text fields
- **Reference Field**: Standalone reference field for selecting multiple team members
- **Flexible Display Options**: Common settings for both block and reference fields
- **Multiple Member Selection**: Select multiple team members in reference fields
- **TypeScript Support**: Full type definitions for all schemas

## Installation

```bash
npm install @multidots/sanity-plugin-team-members
```

## Sanity Studio Setup

### 1. Install the Plugin

```typescript
// sanity.config.ts
import { defineConfig } from 'sanity'
import { teamMembersPlugin } from '@multidots/sanity-plugin-team-members'

export default defineConfig({
  // ... your config
  plugins: [
    teamMembersPlugin(),
  ],
})
```

### 2. Add Team Member Block to Portable Text

```typescript
// In your document schema
import { teamMemberBlock } from '@multidots/sanity-plugin-team-members'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    // ... other fields
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        // ... other block types
        teamMemberBlock, // Add team member blocks to portable text
      ],
    },
  ],
})
```

### 3. Add Team Members Reference Field

```typescript
// In your document schema
import { teamMembersReference } from '@multidots/sanity-plugin-team-members'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    // ... other fields
    {
      name: 'teamMembers',
      title: 'Team Members',
      type: 'teamMembersReference', // Add team members reference field
    },
  ],
})
```

## Schema Types

### Team Member Schema

The base team member schema includes:

- **name**: Member name (required)
- **photo**: Profile photo with alt text
- **position**: Job title or role
- **department**: Department or team
- **bio**: Short bio or description
- **url**: Personal website or portfolio
- **socialLinks**: Array of social media links
- **layout**: Default display layout
- **isActive**: Whether the member is currently active

### Team Member Block (Portable Text)

For embedding in portable text fields (supports multiple members per block):

- **teamMembers**: Array of team member references (1-20 members)
- **displayLayout**: Override layout for this specific display
- **showSocialLinks**: Show/hide social links for all members
- **showBio**: Show/hide bio for all members
- **showPosition**: Show/hide position for all members
- **showDepartment**: Show/hide department for all members
- **showUrl**: Show/hide website URL for all members
- **customTitle**: Override member name for all members

### Team Members Reference

For selecting multiple team members:

- **teamMembers**: Array of team member references
- **displayLayout**: Layout for all selected members
- **showSocialLinks**: Show/hide social links for all members
- **showBio**: Show/hide bio for all members
- **showPosition**: Show/hide position for all members
- **showDepartment**: Show/hide department for all members
- **showUrl**: Show/hide website URL for all members
- **gridColumns**: Number of columns for grid layout
- **maxItems**: Maximum number of members to display

## GROQ Queries

### Fetch Team Member Blocks from Portable Text

```groq
*[_type == "post" && _id == $documentId][0] {
  _id,
  title,
  "teamMemberBlocks": content[_type == "teamMemberBlock"] {
    _key,
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
    customTitle
  }
}
```

### Fetch Team Members Reference

```groq
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
```

### Fetch All Published Team Members

```groq
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
  isActive
}
```

## Frontend Integration

The plugin provides schemas and blocks for Sanity Studio. For frontend implementation, you'll need to create your own components using the GROQ queries and data structures provided.

### Frontend Implementation Examples

See the `examples/` directory for complete working examples:

- `PortableTextTeamMembers.tsx`: Example for portable text integration
- `ReferenceTeamMembers.tsx`: Example for reference field usage  
- `groq-queries.ts`: Complete GROQ query examples

### Basic Frontend Setup

```typescript
// 1. Create a Sanity client
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'your-project-id',
  dataset: 'production',
  useCdn: true,
})

// 2. Fetch team members using GROQ queries
const teamMembers = await client.fetch(`
  *[_type == "teamMember" && !(_id in path("drafts.**")) && isActive == true] {
    _id,
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
`)

// 3. Fetch team members reference with settings
const teamMembersRef = await client.fetch(`
  *[_type == "post" && _id == $documentId][0].teamMembersReference {
    teamMembers[]-> {
      _id,
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
`, { documentId: 'your-document-id' })
```

### CSS Styles

Import the provided CSS styles in your application:

```typescript
import 'sanity-plugin-team-members/styles/team-member.css'
```

The CSS includes classes for:
- `.team-member-block`: Main container for team member blocks
- `.team-member-block__photo`: Profile photo styling
- `.team-member-block__name`: Member name styling
- `.team-member-block__position`: Position styling
- `.team-member-block__social-overlay`: Social links overlay
- `.team-member-blocks-grid`: Grid container for multiple members

## Troubleshooting

### Can't Select Multiple Team Members

If you're unable to select multiple team members in the reference field:

1. **Check Field Type**: Make sure you're using `teamMembersReference` type, not just a simple reference
2. **Array Field**: The field should be an array of references, not a single reference
3. **Sanity Studio**: Look for the "+" button next to the field to add more members
4. **Validation**: Ensure you have at least 1 team member selected (required by validation)

**Correct Usage:**
```typescript
// In your document schema
{
  name: 'teamMembers',
  title: 'Team Members',
  type: 'teamMembersReference', // Use the full reference type
}
```

**Incorrect Usage:**
```typescript
// This only allows single selection
{
  name: 'teamMember',
  title: 'Team Member',
  type: 'reference',
  to: [{ type: 'teamMember' }],
}
```

### Field Not Showing in Sanity Studio

1. **Plugin Installation**: Make sure the plugin is properly installed and configured
2. **Schema Registration**: Ensure `teamMembersReference` is included in your schema types
3. **Document Type**: Add the field to your document schema

### GROQ Queries Not Working

1. **Published Documents**: Make sure you're querying published documents, not drafts
2. **Field Path**: Use the correct field path in your GROQ query
3. **Reference Resolution**: Use `->` to resolve references in GROQ

## License

MIT

## Support

For issues and feature requests, please visit the [GitHub repository](https://github.com/AbdullaPatva/sanity-plugin-team-members).