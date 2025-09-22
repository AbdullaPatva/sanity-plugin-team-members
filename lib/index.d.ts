import { teamMember } from './schema/teamMember';
import { teamMemberBlock } from './blocks/teamMemberBlock';
import { teamMembersReference } from './schema/teamMembersReference';
export interface TeamMembersPluginConfig {
    /**
     * The document types that should include the team member block
     * @default ['post', 'page', 'article']
     */
    schemaTypes?: string[];
    /**
     * Whether to show the team member block in the portable text editor
     * @default true
     */
    showInPortableText?: boolean;
    /**
     * Custom icon for the team member block
     * @default '👥'
     */
    blockIcon?: string;
    /**
     * Custom title for the team member block
     * @default 'Team Membersss'
     */
    blockTitle?: string;
}
export declare const teamMembersPlugin: import("sanity").Plugin<TeamMembersPluginConfig>;
export { teamMemberBlock };
export { teamMember, teamMembersReference };
export { TeamMemberDisplay, TeamMembersDisplay } from './components/TeamMemberDisplay';
export { useTeamMembers, useTeamMember, buildImageUrl, createImageUrlBuilder } from './hooks/useTeamMembers';
export type { TeamMember, TeamMemberLayout, TeamMemberDisplayProps, TeamMembersDisplayProps, TeamMemberBlockData, TeamMemberQuery, TeamMemberConfig, UseTeamMembersResult, UseTeamMemberResult, } from './types/frontend';
export { PortableTextTeamMembers, PortableTextTeamMembersExample } from './examples/PortableTextTeamMembers';
export { ReferenceTeamMembers, ReferenceTeamMembersExample, useTeamMembersReference } from './examples/ReferenceTeamMembers';
export * from './examples/groq-queries';
