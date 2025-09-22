import { definePlugin } from 'sanity';
import { teamMember } from './schema/teamMember';
import { teamMemberBlock } from './blocks/teamMemberBlock';
export const teamMembersPlugin = definePlugin((config = {}) => {
    const { schemaTypes = ['post', 'page', 'article'], showInPortableText = true, blockIcon = '👥', blockTitle = 'Team Member', } = config;
    return {
        name: 'team-members',
        schema: {
            types: [teamMember],
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
    };
});
// Export the block for use in portable text
export { teamMemberBlock };
// Export the schema
export { teamMember };
// Export frontend components
export { TeamMemberDisplay, TeamMembersDisplay } from './components/TeamMemberDisplay';
// Export frontend hooks
export { useTeamMembers, useTeamMember, buildImageUrl, createImageUrlBuilder } from './hooks/useTeamMembers';
// CSS styles are available at: ./styles/team-member.css
// Import them in your application: import '@multidots/sanity-plugin-team-members/styles/team-member.css'
