import { defineType, defineField } from 'sanity';
export const teamMember = defineType({
    name: 'teamMember',
    title: 'Team Member',
    type: 'document',
    icon: () => '👤',
    fields: [
        defineField({
            name: 'name',
            title: 'Member Name',
            type: 'string',
            validation: (Rule) => Rule.required().min(2).max(100),
        }),
        defineField({
            name: 'photo',
            title: 'Member Photo',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string',
                    description: 'Important for accessibility and SEO',
                },
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'url',
            title: 'URL',
            type: 'url',
            description: 'Personal website or portfolio URL',
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'socialLink',
                    title: 'Social Link',
                    fields: [
                        {
                            name: 'platform',
                            title: 'Platform',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Twitter', value: 'twitter' },
                                    { title: 'LinkedIn', value: 'linkedin' },
                                    { title: 'GitHub', value: 'github' },
                                    { title: 'Instagram', value: 'instagram' },
                                    { title: 'Facebook', value: 'facebook' },
                                    { title: 'YouTube', value: 'youtube' },
                                    { title: 'Website', value: 'website' },
                                    { title: 'Other', value: 'other' },
                                ],
                            },
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'url',
                            title: 'URL',
                            type: 'url',
                            validation: (Rule) => Rule.required().uri({
                                scheme: ['http', 'https', 'mailto'],
                            }),
                        },
                        {
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                            description: 'Custom label for the link (optional)',
                        },
                    ],
                    preview: {
                        select: {
                            title: 'platform',
                            subtitle: 'url',
                        },
                    },
                },
            ],
        }),
        defineField({
            name: 'layout',
            title: 'Layout',
            type: 'string',
            options: {
                list: [
                    { title: 'Card', value: 'card' },
                    { title: 'List', value: 'list' },
                    { title: 'Grid', value: 'grid' },
                    { title: 'Minimal', value: 'minimal' },
                ],
            },
            initialValue: 'card',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'bio',
            title: 'Bio',
            type: 'text',
            rows: 3,
            description: 'Short bio or description',
        }),
        defineField({
            name: 'position',
            title: 'Position/Title',
            type: 'string',
            description: 'Job title or role',
        }),
        defineField({
            name: 'department',
            title: 'Department',
            type: 'string',
            description: 'Department or team',
        }),
        defineField({
            name: 'isActive',
            title: 'Active',
            type: 'boolean',
            description: 'Whether this team member is currently active',
            initialValue: true,
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'position',
            media: 'photo',
        },
        prepare(selection) {
            const { title, subtitle, media } = selection;
            return {
                title: title || 'Untitled Team Member',
                subtitle: subtitle || 'No position',
                media: media,
            };
        },
    },
    orderings: [
        {
            title: 'Name A-Z',
            name: 'nameAsc',
            by: [{ field: 'name', direction: 'asc' }],
        },
        {
            title: 'Name Z-A',
            name: 'nameDesc',
            by: [{ field: 'name', direction: 'desc' }],
        },
        {
            title: 'Position A-Z',
            name: 'positionAsc',
            by: [{ field: 'position', direction: 'asc' }],
        },
        {
            title: 'Recently Created',
            name: 'createdDesc',
            by: [{ field: '_createdAt', direction: 'desc' }],
        },
    ],
});
