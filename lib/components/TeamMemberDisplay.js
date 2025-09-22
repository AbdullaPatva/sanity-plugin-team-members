import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function TeamMemberDisplay({ teamMember, layout = 'default', showSocialLinks = true, showBio = true, showPosition = true, showDepartment = true, showUrl = true, customTitle, className = '', imageUrlBuilder, onSocialLinkClick, onMemberClick, }) {
    if (!teamMember) {
        return null;
    }
    const effectiveLayout = layout === 'default' ? teamMember.layout || 'card' : layout;
    const displayName = customTitle || teamMember.name;
    // Default image URL builder if none provided
    const getImageUrl = (imageRef) => {
        if (imageUrlBuilder) {
            return imageUrlBuilder(imageRef);
        }
        // Default Sanity image URL construction
        const imageId = imageRef.replace('image-', '').replace('-jpg', '').replace('-png', '').replace('-webp', '');
        const extension = imageRef.includes('-jpg') ? 'jpg' : imageRef.includes('-png') ? 'png' : 'webp';
        return `https://cdn.sanity.io/images/your-project-id/production/${imageId}.${extension}`;
    };
    const handleSocialLinkClick = (platform, url) => {
        if (onSocialLinkClick) {
            onSocialLinkClick(platform, url);
        }
        else {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };
    const handleMemberClick = () => {
        if (onMemberClick) {
            onMemberClick(teamMember);
        }
    };
    const getSocialIcon = (platform) => {
        const icons = {
            twitter: '🐦',
            linkedin: '💼',
            github: '🐙',
            instagram: '📷',
            facebook: '👥',
            youtube: '📺',
            website: '🌐',
            other: '🔗',
        };
        return icons[platform.toLowerCase()] || '🔗';
    };
    const renderSocialLinks = () => {
        if (!showSocialLinks || !teamMember.socialLinks?.length)
            return null;
        return (_jsx("div", { className: "team-member-social-links", children: teamMember.socialLinks.map((link, index) => (_jsxs("a", { href: link.url, onClick: (e) => {
                    e.preventDefault();
                    handleSocialLinkClick(link.platform, link.url);
                }, className: "team-member-social-link", title: link.label || link.platform, target: "_blank", rel: "noopener noreferrer", children: [_jsx("span", { className: "social-icon", children: getSocialIcon(link.platform) }), _jsx("span", { className: "social-label", children: link.label || link.platform })] }, index))) }));
    };
    const renderCard = () => (_jsxs("div", { className: `team-member team-member--card ${className}`, onClick: handleMemberClick, style: { cursor: onMemberClick ? 'pointer' : 'default' }, children: [_jsx("div", { className: "team-member__photo", children: teamMember.photo?.asset ? (_jsx("img", { src: getImageUrl(teamMember.photo.asset._ref), alt: teamMember.photo.alt || teamMember.name, loading: "lazy" })) : (_jsx("div", { className: "team-member__photo-placeholder", children: _jsx("span", { children: teamMember.name.charAt(0).toUpperCase() }) })) }), _jsxs("div", { className: "team-member__content", children: [_jsx("h3", { className: "team-member__name", children: displayName }), showPosition && teamMember.position && (_jsx("p", { className: "team-member__position", children: teamMember.position })), showDepartment && teamMember.department && (_jsx("p", { className: "team-member__department", children: teamMember.department })), showBio && teamMember.bio && (_jsx("p", { className: "team-member__bio", children: teamMember.bio })), renderSocialLinks(), showUrl && teamMember.url && (_jsx("a", { href: teamMember.url, className: "team-member__url", target: "_blank", rel: "noopener noreferrer", onClick: (e) => e.stopPropagation(), children: "Visit Website" }))] })] }));
    const renderList = () => (_jsxs("div", { className: `team-member team-member--list ${className}`, onClick: handleMemberClick, style: { cursor: onMemberClick ? 'pointer' : 'default' }, children: [_jsx("div", { className: "team-member__photo", children: teamMember.photo?.asset ? (_jsx("img", { src: getImageUrl(teamMember.photo.asset._ref), alt: teamMember.photo.alt || teamMember.name, loading: "lazy" })) : (_jsx("div", { className: "team-member__photo-placeholder", children: _jsx("span", { children: teamMember.name.charAt(0).toUpperCase() }) })) }), _jsxs("div", { className: "team-member__content", children: [_jsx("h4", { className: "team-member__name", children: displayName }), showPosition && teamMember.position && (_jsx("p", { className: "team-member__position", children: teamMember.position }))] }), renderSocialLinks()] }));
    const renderMinimal = () => (_jsxs("div", { className: `team-member team-member--minimal ${className}`, onClick: handleMemberClick, style: { cursor: onMemberClick ? 'pointer' : 'default' }, children: [_jsx("div", { className: "team-member__photo", children: teamMember.photo?.asset ? (_jsx("img", { src: getImageUrl(teamMember.photo.asset._ref), alt: teamMember.photo.alt || teamMember.name, loading: "lazy" })) : (_jsx("div", { className: "team-member__photo-placeholder", children: _jsx("span", { children: teamMember.name.charAt(0).toUpperCase() }) })) }), _jsx("span", { className: "team-member__name", children: displayName })] }));
    const renderGrid = () => (_jsxs("div", { className: `team-member team-member--grid ${className}`, onClick: handleMemberClick, style: { cursor: onMemberClick ? 'pointer' : 'default' }, children: [_jsx("div", { className: "team-member__photo", children: teamMember.photo?.asset ? (_jsx("img", { src: getImageUrl(teamMember.photo.asset._ref), alt: teamMember.photo.alt || teamMember.name, loading: "lazy" })) : (_jsx("div", { className: "team-member__photo-placeholder", children: _jsx("span", { children: teamMember.name.charAt(0).toUpperCase() }) })) }), _jsxs("div", { className: "team-member__content", children: [_jsx("h4", { className: "team-member__name", children: displayName }), showPosition && teamMember.position && (_jsx("p", { className: "team-member__position", children: teamMember.position })), showBio && teamMember.bio && (_jsx("p", { className: "team-member__bio", children: teamMember.bio })), renderSocialLinks()] })] }));
    switch (effectiveLayout) {
        case 'list':
            return renderList();
        case 'minimal':
            return renderMinimal();
        case 'grid':
            return renderGrid();
        case 'card':
        default:
            return renderCard();
    }
}
export function TeamMembersDisplay({ teamMembers, layout = 'default', showSocialLinks = true, showBio = true, showPosition = true, showDepartment = true, showUrl = true, className = '', imageUrlBuilder, onSocialLinkClick, onMemberClick, gridColumns = 3, maxItems, }) {
    if (!teamMembers?.length) {
        return null;
    }
    const displayMembers = maxItems ? teamMembers.slice(0, maxItems) : teamMembers;
    const effectiveLayout = layout === 'default' ? 'grid' : layout;
    const containerClass = `team-members team-members--${effectiveLayout} ${className}`;
    const gridStyle = effectiveLayout === 'grid' ? {
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
    } : {};
    return (_jsx("div", { className: containerClass, style: gridStyle, children: displayMembers.map((member) => (_jsx(TeamMemberDisplay, { teamMember: member, layout: layout, showSocialLinks: showSocialLinks, showBio: showBio, showPosition: showPosition, showDepartment: showDepartment, showUrl: showUrl, imageUrlBuilder: imageUrlBuilder, onSocialLinkClick: onSocialLinkClick, onMemberClick: onMemberClick }, member._id))) }));
}
