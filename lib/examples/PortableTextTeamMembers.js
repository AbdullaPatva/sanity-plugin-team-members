import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import React from 'react';
import { PortableText } from '@portabletext/react';
import { TeamMemberDisplay } from '../components/TeamMemberDisplay';
// Custom image URL builder
const createImageUrlBuilder = (config) => {
    return (imageRef) => {
        const imageId = imageRef.replace('image-', '').replace('-jpg', '').replace('-png', '').replace('-webp', '');
        const extension = imageRef.includes('-jpg') ? 'jpg' : imageRef.includes('-png') ? 'png' : 'webp';
        const baseUrl = config.useCdn ? 'https://cdn.sanity.io' : 'https://api.sanity.io';
        return `${baseUrl}/images/${config.projectId}/${config.dataset}/${imageId}.${extension}`;
    };
};
export function PortableTextTeamMembers({ content, sanityConfig, onMemberClick, onSocialLinkClick, className = '', }) {
    const imageUrlBuilder = createImageUrlBuilder(sanityConfig);
    // Custom components for portable text
    const components = {
        // Handle team member blocks
        block: {
            teamMemberBlock: ({ value }) => {
                if (!value?.teamMembers || value.teamMembers.length === 0) {
                    return null;
                }
                return (_jsx("div", { className: `portable-text-team-member ${className}`, children: _jsx("div", { className: "team-members-grid", children: value.teamMembers.map((member) => (_jsx(TeamMemberDisplay, { teamMember: member, layout: value.displayLayout || 'default', showSocialLinks: value.showSocialLinks !== undefined ? value.showSocialLinks : true, showBio: value.showBio !== undefined ? value.showBio : true, showPosition: value.showPosition !== undefined ? value.showPosition : true, showDepartment: value.showDepartment !== undefined ? value.showDepartment : true, showUrl: value.showUrl !== undefined ? value.showUrl : true, customTitle: value.customTitle, imageUrlBuilder: imageUrlBuilder, onMemberClick: onMemberClick, onSocialLinkClick: onSocialLinkClick }, member._id))) }) }, value._key));
            },
        },
    };
    if (!content || !Array.isArray(content)) {
        return _jsx("div", { className: "text-gray-500", children: "No content available" });
    }
    return (_jsx("div", { className: `portable-text-content ${className}`, children: _jsx(PortableText, { value: content, components: components }) }));
}
// Example usage component
export function PortableTextTeamMembersExample() {
    const [content, setContent] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    // Sanity configuration
    const sanityConfig = {
        projectId: 'your-project-id',
        dataset: 'production',
        useCdn: true,
    };
    // Fetch content with team member blocks
    React.useEffect(() => {
        const fetchContent = async () => {
            try {
                // Example: Fetch a document with team member blocks
                const query = `
          *[_type == "post" && _id == $documentId][0] {
            content
          }
        `;
                // Replace with your actual Sanity client
                // const client = createClient(sanityConfig)
                // const result = await client.fetch(query, { documentId: 'your-document-id' })
                // setContent(result.content || [])
                // For demo purposes, using empty array
                setContent([]);
            }
            catch (error) {
                console.error('Error fetching content:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);
    const handleMemberClick = (member) => {
        console.log('Member clicked:', member.name);
        // Navigate to member detail page or show modal
    };
    const handleSocialLinkClick = (platform, url) => {
        console.log(`Opening ${platform} link:`, url);
        window.open(url, '_blank', 'noopener,noreferrer');
    };
    if (loading) {
        return (_jsxs("div", { className: "flex items-center justify-center p-8", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }), _jsx("span", { className: "ml-2 text-gray-600", children: "Loading content..." })] }));
    }
    return (_jsxs("div", { className: "max-w-4xl mx-auto p-6", children: [_jsx("h1", { className: "text-3xl font-bold mb-6", children: "Portable Text with Team Members" }), _jsx(PortableTextTeamMembers, { content: content, sanityConfig: sanityConfig, onMemberClick: handleMemberClick, onSocialLinkClick: handleSocialLinkClick, className: "prose max-w-none" })] }));
}
export default PortableTextTeamMembers;
