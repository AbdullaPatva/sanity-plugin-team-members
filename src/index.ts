import { definePlugin } from 'sanity'
import { teamMember } from './schema/teamMember'
import { teamMemberBlock } from './blocks/teamMemberBlock'
import { teamMembersReference } from './schema/teamMembersReference'

export interface TeamMembersPluginConfig {
  /**
   * The document types that should include the team member block
   * @default ['post', 'page', 'article']
   */
  schemaTypes?: string[]
  
  /**
   * Whether to show the team member block in the portable text editor
   * @default true
   */
  showInPortableText?: boolean
  
  /**
   * Custom icon for the team member block
   * @default '👥'
   */
  blockIcon?: string
  
  /**
   * Custom title for the team member block
   * @default 'Team Membersss'
   */
  blockTitle?: string
}

export const teamMembersPlugin = definePlugin<TeamMembersPluginConfig>((config = {}) => {
  const {
    schemaTypes = ['post', 'page', 'article'],
    showInPortableText = true,
  } = config

  return {
    name: 'team-members',
    schema: {
      types: [teamMember, teamMembersReference],
    },
    document: {
      // Add team member block to specified schema types
      ...(showInPortableText && schemaTypes.length > 0 && {
        [schemaTypes[0]]: {
          // This would be handled by the studio configuration
          // where the block is added to portable text fields
        },
      }),
    },
  }
})

// Export the block for use in portable text
export { teamMemberBlock }

// Export the schemas
export { teamMember, teamMembersReference }

// Frontend components and examples are available in the examples/ directory
// See README.md for implementation details and usage examples

// CSS styles are available at: ./styles/team-member.css
// Import them in your application: import '@multidots/sanity-plugin-team-members/styles/team-member.css'