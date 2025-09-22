interface TeamMember {
    _id: string;
    name: string;
    position?: string;
    photo?: {
        asset: {
            _ref: string;
        };
        alt?: string;
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
}
interface TeamMemberPreviewProps {
    teamMember: TeamMember;
    displayLayout?: string;
    showSocialLinks?: boolean;
    showBio?: boolean;
    customTitle?: string;
}
export declare function TeamMemberPreview({ teamMember, displayLayout, showSocialLinks, showBio, customTitle, }: TeamMemberPreviewProps): import("react/jsx-runtime").JSX.Element;
export {};
