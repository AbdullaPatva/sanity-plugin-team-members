export interface TeamMember {
    _id: string;
    _type: 'teamMember';
    name: string;
    position?: string;
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
    url?: string;
    socialLinks?: Array<{
        platform: string;
        url: string;
        label?: string;
    }>;
    bio?: string;
    department?: string;
    layout?: 'card' | 'list' | 'grid' | 'minimal';
    isActive?: boolean;
}
export interface TeamMemberDisplayProps {
    teamMember: TeamMember;
    layout?: 'card' | 'list' | 'grid' | 'minimal' | 'default';
    showSocialLinks?: boolean;
    showBio?: boolean;
    showPosition?: boolean;
    showDepartment?: boolean;
    showUrl?: boolean;
    customTitle?: string;
    className?: string;
    imageUrlBuilder?: (imageRef: string) => string;
    onSocialLinkClick?: (platform: string, url: string) => void;
    onMemberClick?: (member: TeamMember) => void;
}
export declare function TeamMemberDisplay({ teamMember, layout, showSocialLinks, showBio, showPosition, showDepartment, showUrl, customTitle, className, imageUrlBuilder, onSocialLinkClick, onMemberClick, }: TeamMemberDisplayProps): import("react/jsx-runtime").JSX.Element | null;
export interface TeamMembersDisplayProps {
    teamMembers: TeamMember[];
    layout?: 'card' | 'list' | 'grid' | 'minimal' | 'default';
    showSocialLinks?: boolean;
    showBio?: boolean;
    showPosition?: boolean;
    showDepartment?: boolean;
    showUrl?: boolean;
    className?: string;
    imageUrlBuilder?: (imageRef: string) => string;
    onSocialLinkClick?: (platform: string, url: string) => void;
    onMemberClick?: (member: TeamMember) => void;
    gridColumns?: number;
    maxItems?: number;
}
export declare function TeamMembersDisplay({ teamMembers, layout, showSocialLinks, showBio, showPosition, showDepartment, showUrl, className, imageUrlBuilder, onSocialLinkClick, onMemberClick, gridColumns, maxItems, }: TeamMembersDisplayProps): import("react/jsx-runtime").JSX.Element | null;
