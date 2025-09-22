/**
 * Example Component: Parsing Team Members from Portable Text
 *
 * This component demonstrates how to parse and render team member blocks
 * that are embedded within a portable text field.
 *
 * Usage:
 * 1. Fetch your document with team member blocks using the GROQ queries
 * 2. Pass the portable text content to this component
 * 3. The component will automatically find and render team member blocks
 */
interface PortableTextTeamMembersProps {
    content: any[];
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
export declare function PortableTextTeamMembers({ content, sanityConfig, onMemberClick, onSocialLinkClick, className, }: PortableTextTeamMembersProps): import("react/jsx-runtime").JSX.Element;
export declare function PortableTextTeamMembersExample(): import("react/jsx-runtime").JSX.Element;
export default PortableTextTeamMembers;
