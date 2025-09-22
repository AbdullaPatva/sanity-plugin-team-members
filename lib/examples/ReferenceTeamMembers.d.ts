/**
 * Example Component: Parsing Team Members from Reference Field
 *
 * This component demonstrates how to parse and render team members
 * from a teamMembersReference field (outside of portable text).
 *
 * Usage:
 * 1. Fetch your document with team members reference using the GROQ queries
 * 2. Pass the teamMembersReference data to this component
 * 3. The component will render all selected team members with common settings
 */
interface TeamMember {
    _id: string;
    _type: 'teamMember';
    name: string;
    position?: string;
    department?: string;
    bio?: string;
    photo?: {
        asset: {
            _ref: string;
        };
        alt?: string;
        hotspot?: {
            x: number;
            y: number;
            height: number;
            width: number;
        };
    };
    socialLinks?: Array<{
        platform: string;
        url: string;
        label?: string;
    }>;
    url?: string;
    isActive?: boolean;
}
interface TeamMembersReference {
    _type: 'teamMembersReference';
    teamMembers: TeamMember[];
    displayLayout: 'card' | 'list' | 'grid' | 'minimal';
    showSocialLinks: boolean;
    showBio: boolean;
    showPosition: boolean;
    showDepartment: boolean;
    showUrl: boolean;
    gridColumns?: number;
    maxItems?: number;
}
interface ReferenceTeamMembersProps {
    teamMembersData: TeamMembersReference | null;
    sanityConfig: {
        projectId: string;
        dataset: string;
        useCdn?: boolean;
    };
    onMemberClick?: (member: {
        name: string;
        _id: string;
    }) => void;
    onSocialLinkClick?: (platform: string, url: string) => void;
    className?: string;
}
export declare function ReferenceTeamMembers({ teamMembersData, sanityConfig, onMemberClick, onSocialLinkClick, className, }: ReferenceTeamMembersProps): import("react/jsx-runtime").JSX.Element;
export declare function ReferenceTeamMembersExample(): import("react/jsx-runtime").JSX.Element;
export declare function useTeamMembersReference(documentId: string, sanityConfig: {
    projectId: string;
    dataset: string;
    useCdn?: boolean;
}): {
    teamMembersData: TeamMembersReference | null;
    loading: boolean;
    error: Error | null;
};
export default ReferenceTeamMembers;
