import { definePlugin } from 'sanity';
import { teamMember } from './schema/teamMember';
import { teamMemberBlock } from './blocks/teamMemberBlock';
import { teamMembersReference } from './schema/teamMembersReference';
export const teamMembersPlugin = definePlugin(() => {
    return {
        name: 'team-members',
        schema: {
            types: [teamMember, teamMembersReference],
        },
    };
});
// Export the block for use in portable text
export { teamMemberBlock };
// Export the schemas
export { teamMember, teamMembersReference };
// Frontend components and examples are available in the examples/ directory
// See README.md for implementation details and usage examples
// CSS styles are available at: ./styles/team-member.css
// Import them in your application: import '@multidots/sanity-plugin-team-members/styles/team-member.css'
