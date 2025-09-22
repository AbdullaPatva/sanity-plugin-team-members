import { defineType, defineField } from 'sanity';
export const teamMemberBlock = defineType({
    name: 'teamMemberBlock',
    title: 'Team Member',
    type: 'object',
    icon: () => '👥',
    fields: [
        defineField({
            name: 'teamMember',
            title: 'Select Team Member',
            type: 'reference',
            to: [{ type: 'teamMember' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'displayLayout',
            title: 'Display Layout',
            type: 'string',
            options: {
                list: [
                    { title: 'Use Member Default', value: 'default' },
                    { title: 'Card', value: 'card' },
                    { title: 'List', value: 'list' },
                    { title: 'Grid', value: 'grid' },
                    { title: 'Minimal', value: 'minimal' },
                ],
            },
            initialValue: 'default',
            description: 'Override the team member\'s default layout for this specific display',
        }),
        defineField({
            name: 'showSocialLinks',
            title: 'Show Social Links',
            type: 'boolean',
            initialValue: true,
            description: 'Whether to display social links for this team member',
        }),
        defineField({
            name: 'showBio',
            title: 'Show Bio',
            type: 'boolean',
            initialValue: true,
            description: 'Whether to display the bio for this team member',
        }),
        defineField({
            name: 'showPosition',
            title: 'Show Position',
            type: 'boolean',
            initialValue: true,
            description: 'Whether to display the job position for this team member',
        }),
        defineField({
            name: 'showDepartment',
            title: 'Show Department',
            type: 'boolean',
            initialValue: true,
            description: 'Whether to display the department for this team member',
        }),
        defineField({
            name: 'showUrl',
            title: 'Show Website URL',
            type: 'boolean',
            initialValue: true,
            description: 'Whether to display the website URL for this team member',
        }),
        defineField({
            name: 'customTitle',
            title: 'Custom Title Override',
            type: 'string',
            description: 'Override the team member\'s name for this specific display (optional)',
        }),
    ],
    preview: {
        select: {
            title: 'teamMember.name',
            subtitle: 'teamMember.position',
            media: 'teamMember.photo',
            layout: 'displayLayout',
        },
        prepare(selection) {
            const { title, subtitle, media, layout } = selection;
            return {
                title: title || 'No Team Member Selected',
                subtitle: `${subtitle || 'No position'}${layout && layout !== 'default' ? ` (${layout})` : ''}`,
                media: media,
            };
        },
    },
});
