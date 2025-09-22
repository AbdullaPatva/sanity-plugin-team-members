import { definePlugin } from 'sanity';
import { teamMember } from './schema/teamMember';
import { teamMemberBlock } from './blocks/teamMemberBlock';
import { teamMembersReference } from './schema/teamMembersReference';
export const teamMembersPlugin = definePlugin((config = {}) => {
    const { schemaTypes = ['post', 'page', 'article'], showInPortableText = true, } = config;
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
    };
});
// Export the block for use in portable text
export { teamMemberBlock };
// Export the schemas
export { teamMember, teamMembersReference };
// Export frontend components
export { TeamMemberDisplay, TeamMembersDisplay } from './components/TeamMemberDisplay';
// Export frontend hooks
export { useTeamMembers, useTeamMember, buildImageUrl, createImageUrlBuilder } from './hooks/useTeamMembers';
// Export example components
export { PortableTextTeamMembers, PortableTextTeamMembersExample } from './examples/PortableTextTeamMembers';
export { ReferenceTeamMembers, ReferenceTeamMembersExample, useTeamMembersReference } from './examples/ReferenceTeamMembers';
// Export GROQ query examples
export * from './examples/groq-queries';
// CSS styles are available at: ./styles/team-member.css
// Import them in your application: import '@multidots/sanity-plugin-team-members/styles/team-member.css'
