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
    teamMembersPlugin({
      schemaTypes: ['post', 'page', 'article'], // Document types to include team member blocks
      showInPortableText: true, // Show team member blocks in portable text editor
    }),
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

For embedding in portable text fields:

- **teamMember**: Reference to a team member
- **displayLayout**: Override layout for this specific display
- **showSocialLinks**: Show/hide social links
- **showBio**: Show/hide bio
- **showPosition**: Show/hide position
- **showDepartment**: Show/hide department
- **showUrl**: Show/hide website URL
- **customTitle**: Override member name

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
import '@multidots/sanity-plugin-team-members/styles/team-member.css'
```

The CSS includes classes for:
- `.team-member-block`: Main container for team member blocks
- `.team-member-block__photo`: Profile photo styling
- `.team-member-block__name`: Member name styling
- `.team-member-block__position`: Position styling
- `.team-member-block__social-overlay`: Social links overlay
- `.team-member-blocks-grid`: Grid container for multiple members

## License

MIT

## Support

For issues and feature requests, please visit the [GitHub repository](https://github.com/AbdullaPatva/sanity-plugin-team-members).