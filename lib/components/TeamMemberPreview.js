import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Text, Flex, Avatar, Badge, Box } from '@sanity/ui';
import { LinkIcon } from '@sanity/icons';
export function TeamMemberPreview({ teamMember, displayLayout = 'default', showSocialLinks = true, showBio = true, customTitle, }) {
    if (!teamMember) {
        return (_jsx(Card, { padding: 3, tone: "caution", children: _jsx(Text, { children: "No team member selected" }) }));
    }
    const effectiveLayout = displayLayout === 'default' ? teamMember.layout || 'card' : displayLayout;
    const displayName = customTitle || teamMember.name;
    const renderSocialLinks = () => {
        if (!showSocialLinks || !teamMember.socialLinks?.length)
            return null;
        return (_jsx(Flex, { gap: 2, wrap: "wrap", children: teamMember.socialLinks.map((link, index) => (_jsx(Badge, { tone: "primary", padding: 1, children: _jsxs(Flex, { align: "center", gap: 1, children: [_jsx(LinkIcon, {}), _jsx(Text, { size: 1, children: link.label || link.platform })] }) }, index))) }));
    };
    const renderCard = () => (_jsx(Card, { padding: 3, radius: 2, shadow: 1, children: _jsxs(Flex, { direction: "column", gap: 3, children: [_jsxs(Flex, { align: "center", gap: 3, children: [_jsx(Avatar, { size: 3, src: teamMember.photo?.asset ? `https://cdn.sanity.io/images/your-project-id/production/${teamMember.photo.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}` : undefined, alt: teamMember.photo?.alt || teamMember.name }), _jsxs(Box, { flex: 1, children: [_jsx(Text, { weight: "bold", size: 2, children: displayName }), teamMember.position && (_jsx(Text, { size: 1, muted: true, children: teamMember.position })), teamMember.department && (_jsx(Text, { size: 1, muted: true, children: teamMember.department }))] })] }), showBio && teamMember.bio && (_jsx(Text, { size: 1, children: teamMember.bio })), renderSocialLinks(), teamMember.url && (_jsx(Badge, { tone: "positive", padding: 1, children: _jsxs(Flex, { align: "center", gap: 1, children: [_jsx(LinkIcon, {}), _jsx(Text, { size: 1, children: "Website" })] }) }))] }) }));
    const renderList = () => (_jsx(Card, { padding: 2, radius: 1, children: _jsxs(Flex, { align: "center", gap: 3, children: [_jsx(Avatar, { size: 2, src: teamMember.photo?.asset ? `https://cdn.sanity.io/images/your-project-id/production/${teamMember.photo.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}` : undefined, alt: teamMember.photo?.alt || teamMember.name }), _jsxs(Box, { flex: 1, children: [_jsx(Text, { weight: "bold", size: 1, children: displayName }), teamMember.position && (_jsx(Text, { size: 1, muted: true, children: teamMember.position }))] }), renderSocialLinks()] }) }));
    const renderMinimal = () => (_jsxs(Flex, { align: "center", gap: 2, children: [_jsx(Avatar, { size: 1, src: teamMember.photo?.asset ? `https://cdn.sanity.io/images/your-project-id/production/${teamMember.photo.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}` : undefined, alt: teamMember.photo?.alt || teamMember.name }), _jsx(Text, { size: 1, weight: "bold", children: displayName })] }));
    switch (effectiveLayout) {
        case 'list':
            return renderList();
        case 'minimal':
            return renderMinimal();
        case 'grid':
        case 'card':
        default:
            return renderCard();
    }
}
