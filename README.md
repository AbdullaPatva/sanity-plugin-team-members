# Sanity Plugin: Team Members

A modern Sanity Studio plugin for managing team members with block editor integration. Create team member profiles and easily embed them in your content using a flexible block editor component.

## Features

- **Team Member Schema**: Complete team member document type with photo, social links, and metadata
- **Block Editor Integration**: Add team members to any content using a simple block component
- **Flexible Layouts**: Multiple display layouts (card, list, grid, minimal)
- **Social Links Management**: Support for multiple social platforms with custom labels
- **Image Optimization**: Built-in image handling with alt text support
- **Customizable Display**: Override team member settings per block instance
- **TypeScript Support**: Full TypeScript definitions included

## Installation

```bash
npm install @multidots/sanity-plugin-team-members
```

## Setup

### 1. Add Plugin to Sanity Config

```typescript
// sanity.config.ts
import { defineConfig } from 'sanity'
import { teamMembersPlugin } from '@multidots/sanity-plugin-team-members'

export default defineConfig({
  name: 'default',
  title: 'Your Studio',
  projectId: 'your-project-id',
  dataset: 'production',
  
  plugins: [
    teamMembersPlugin({
      // Optional configuration
      schemaTypes: ['post', 'page', 'article'], // Document types to include team member blocks
      showInPortableText: true, // Show in portable text editor
      blockIcon: '👥', // Custom block icon
      blockTitle: 'Team Member', // Custom block title
    }),
  ],
  
  schema: {
    types: [
      // Your existing schemas
    ],
  },
})
```

### 2. Add Team Member Block to Portable Text

To use team member blocks in your content, add the block to your portable text fields:

```typescript
// In your schema files
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
        teamMemberBlock, // Add team member block
      ],
    },
  ],
})
```

## Usage

### Creating Team Members

1. Navigate to the **Team Members** section in your Sanity Studio
2. Click **Create** to add a new team member
3. Fill in the required fields:
   - **Member Name**: Full name of the team member
   - **Member Photo**: Upload a profile photo with alt text
   - **URL**: Personal website or portfolio (optional)
   - **Social Links**: Add social media profiles
   - **Layout**: Choose default display layout
   - **Bio**: Short description
   - **Position/Title**: Job title or role
   - **Department**: Team or department

### Adding Team Members to Content

1. In any document with portable text content, click the **+** button
2. Select **Team Member** from the block options
3. Choose a team member from the dropdown
4. Customize the display options:
   - **Display Layout**: Override the member's default layout
   - **Show Social Links**: Toggle social links display
   - **Show Bio**: Toggle bio display
   - **Custom Title Override**: Use a different name for this instance

## Schema Fields

### Team Member Document

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | String | Yes | Member's full name |
| `photo` | Image | Yes | Profile photo with alt text |
| `url` | URL | No | Personal website or portfolio |
| `socialLinks` | Array | No | Social media profiles |
| `layout` | String | Yes | Default display layout |
| `bio` | Text | No | Short bio or description |
| `position` | String | No | Job title or role |
| `department` | String | No | Department or team |
| `isActive` | Boolean | No | Whether member is currently active |

### Social Links

Each social link includes:
- **Platform**: Twitter, LinkedIn, GitHub, Instagram, Facebook, YouTube, Website, Other
- **URL**: The social media profile URL
- **Label**: Custom label for the link (optional)

### Display Layouts

- **Card**: Full card layout with photo, name, position, bio, and social links
- **List**: Compact horizontal layout with photo, name, and position
- **Grid**: Grid-friendly layout for multiple team members
- **Minimal**: Simple layout with just photo and name

## Configuration Options

```typescript
interface TeamMembersPluginConfig {
  schemaTypes?: string[] // Document types to include team member blocks
  showInPortableText?: boolean // Show in portable text editor
  blockIcon?: string // Custom block icon
  blockTitle?: string // Custom block title
}
```

## Frontend Integration

The plugin provides React components and hooks for frontend integration:

### Installation

```bash
npm install @multidots/sanity-plugin-team-members
```

### Basic Usage

```typescript
import { TeamMembersDisplay, useTeamMembers } from '@multidots/sanity-plugin-team-members'
import '@multidots/sanity-plugin-team-members/styles/team-member.css'

function TeamPage() {
  const { teamMembers, loading, error } = useTeamMembers({
    projectId: 'your-project-id',
    dataset: 'production',
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <TeamMembersDisplay
      teamMembers={teamMembers}
      layout="card"
      showSocialLinks={true}
      showBio={true}
      showPosition={true}
    />
  )
}
```

### Advanced Usage

```typescript
import { 
  TeamMembersDisplay, 
  useTeamMembers, 
  createImageUrlBuilder,
  type TeamMember 
} from '@multidots/sanity-plugin-team-members'

function AdvancedTeamPage() {
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
    // Track analytics or handle custom behavior
    console.log(`Opening ${platform}: ${url}`)
  }

  const handleMemberClick = (member: TeamMember) => {
    // Navigate to member detail page
    router.push(`/team/${member._id}`)
  }

  return (
    <div>
      {/* Card Layout */}
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
        className="my-team-section"
      />

      {/* Grid Layout */}
      <TeamMembersDisplay
        teamMembers={teamMembers}
        layout="grid"
        gridColumns={4}
        maxItems={8}
        showSocialLinks={true}
        showBio={false}
        imageUrlBuilder={imageUrlBuilder}
      />

      {/* List Layout */}
      <TeamMembersDisplay
        teamMembers={teamMembers}
        layout="list"
        showSocialLinks={true}
        showPosition={true}
        imageUrlBuilder={imageUrlBuilder}
      />
    </div>
  )
}
```

### Individual Team Member

```typescript
import { TeamMemberDisplay, useTeamMember } from '@multidots/sanity-plugin-team-members'

function TeamMemberCard({ memberId }: { memberId: string }) {
  const { teamMember, loading, error } = useTeamMember(memberId, {
    projectId: 'your-project-id',
    dataset: 'production',
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!teamMember) return <div>Member not found</div>

  return (
    <TeamMemberDisplay
      teamMember={teamMember}
      layout="card"
      showSocialLinks={true}
      showBio={true}
      customTitle="Custom Name Override"
    />
  )
}
```

### Available Props

#### TeamMembersDisplay Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `teamMembers` | `TeamMember[]` | - | Array of team members to display |
| `layout` | `'card' \| 'list' \| 'grid' \| 'minimal' \| 'default'` | `'default'` | Display layout |
| `showSocialLinks` | `boolean` | `true` | Show social media links |
| `showBio` | `boolean` | `true` | Show member bio |
| `showPosition` | `boolean` | `true` | Show job position |
| `showDepartment` | `boolean` | `true` | Show department |
| `showUrl` | `boolean` | `true` | Show website URL |
| `className` | `string` | `''` | Additional CSS classes |
| `imageUrlBuilder` | `(imageRef: string) => string` | - | Custom image URL builder |
| `onSocialLinkClick` | `(platform: string, url: string) => void` | - | Social link click handler |
| `onMemberClick` | `(member: TeamMember) => void` | - | Member click handler |
| `gridColumns` | `number` | `3` | Number of columns for grid layout |
| `maxItems` | `number` | - | Maximum number of items to display |

#### TeamMemberDisplay Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `teamMember` | `TeamMember` | - | Team member data |
| `layout` | `TeamMemberLayout` | `'default'` | Display layout |
| `showSocialLinks` | `boolean` | `true` | Show social media links |
| `showBio` | `boolean` | `true` | Show member bio |
| `showPosition` | `boolean` | `true` | Show job position |
| `showDepartment` | `boolean` | `true` | Show department |
| `showUrl` | `boolean` | `true` | Show website URL |
| `customTitle` | `string` | - | Override member name |
| `className` | `string` | `''` | Additional CSS classes |
| `imageUrlBuilder` | `(imageRef: string) => string` | - | Custom image URL builder |
| `onSocialLinkClick` | `(platform: string, url: string) => void` | - | Social link click handler |
| `onMemberClick` | `(member: TeamMember) => void` | - | Member click handler |

### Hooks

#### useTeamMembers

```typescript
const { teamMembers, loading, error, refetch } = useTeamMembers({
  projectId: 'your-project-id',
  dataset: 'production',
  useCdn: true,
  token: 'optional-token', // For private datasets
})
```

#### useTeamMember

```typescript
const { teamMember, loading, error, refetch } = useTeamMember('member-id', {
  projectId: 'your-project-id',
  dataset: 'production',
})
```

### Styling

The plugin includes comprehensive CSS styles. Import them in your application:

```typescript
import '@multidots/sanity-plugin-team-members/styles/team-member.css'
```

#### Custom Styling

You can override the default styles by targeting the CSS classes:

```css
.team-member--card {
  /* Custom card styles */
}

.team-member__name {
  /* Custom name styles */
}

.team-member-social-links {
  /* Custom social links styles */
}
```

#### Layout Classes

- `.team-member--card` - Card layout
- `.team-member--list` - List layout  
- `.team-member--grid` - Grid layout
- `.team-member--minimal` - Minimal layout
- `.team-members--card` - Multiple members in card layout
- `.team-members--list` - Multiple members in list layout
- `.team-members--grid` - Multiple members in grid layout
- `.team-members--minimal` - Multiple members in minimal layout

## Development

```bash
# Install dependencies
npm install

# Build the plugin
npm run build

# Watch for changes
npm run dev
```

## License

MIT

## Support

For issues and feature requests, please visit the [GitHub repository](https://github.com/AbdullaPatva/sanity-plugin-team-members).