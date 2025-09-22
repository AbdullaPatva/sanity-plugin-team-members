import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TeamMembersDisplay, useTeamMembers, useTeamMember, createImageUrlBuilder } from '../index';
// Example Next.js component showing how to use the team members plugin
export function TeamMembersPage() {
    const { teamMembers, loading, error } = useTeamMembers({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        useCdn: true,
    });
    const imageUrlBuilder = createImageUrlBuilder({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    });
    const handleSocialLinkClick = (platform, url) => {
        console.log(`Opening ${platform} link:`, url);
        // You can add analytics tracking here
    };
    const handleMemberClick = (member) => {
        console.log('Member clicked:', member.name);
        // You can navigate to a member detail page here
    };
    if (loading) {
        return (_jsx("div", { className: "team-members-loading", children: _jsx("p", { children: "Loading team members..." }) }));
    }
    if (error) {
        return (_jsx("div", { className: "team-members-error", children: _jsxs("p", { children: ["Error loading team members: ", error.message] }) }));
    }
    return (_jsxs("div", { className: "team-members-page", children: [_jsx("h1", { children: "Our Team" }), _jsxs("section", { children: [_jsx("h2", { children: "Card Layout" }), _jsx(TeamMembersDisplay, { teamMembers: teamMembers, layout: "card", showSocialLinks: true, showBio: true, showPosition: true, showDepartment: true, imageUrlBuilder: imageUrlBuilder, onSocialLinkClick: handleSocialLinkClick, onMemberClick: handleMemberClick, className: "team-section" })] }), _jsxs("section", { children: [_jsx("h2", { children: "Grid Layout" }), _jsx(TeamMembersDisplay, { teamMembers: teamMembers, layout: "grid", gridColumns: 3, showSocialLinks: true, showBio: true, showPosition: true, imageUrlBuilder: imageUrlBuilder, onSocialLinkClick: handleSocialLinkClick, onMemberClick: handleMemberClick, className: "team-section" })] }), _jsxs("section", { children: [_jsx("h2", { children: "List Layout" }), _jsx(TeamMembersDisplay, { teamMembers: teamMembers, layout: "list", showSocialLinks: true, showPosition: true, imageUrlBuilder: imageUrlBuilder, onSocialLinkClick: handleSocialLinkClick, onMemberClick: handleMemberClick, className: "team-section" })] }), _jsxs("section", { children: [_jsx("h2", { children: "Minimal Layout" }), _jsx(TeamMembersDisplay, { teamMembers: teamMembers, layout: "minimal", showSocialLinks: false, showBio: false, showPosition: false, imageUrlBuilder: imageUrlBuilder, onMemberClick: handleMemberClick, className: "team-section" })] })] }));
}
// Example of using individual team member
export function TeamMemberCard({ memberId }) {
    const { teamMember, loading, error } = useTeamMember(memberId, {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    });
    if (loading)
        return _jsx("div", { children: "Loading..." });
    if (error)
        return _jsxs("div", { children: ["Error: ", error.message] });
    if (!teamMember)
        return _jsx("div", { children: "Member not found" });
    return (_jsx(TeamMembersDisplay, { teamMembers: [teamMember], layout: "card", showSocialLinks: true, showBio: true, showPosition: true, imageUrlBuilder: createImageUrlBuilder({
            projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
            dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        }) }));
}
