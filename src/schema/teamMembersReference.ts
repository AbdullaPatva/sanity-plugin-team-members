import { defineType, defineField } from 'sanity'

export const teamMembersReference = defineType({
  name: 'teamMembersReference',
  title: 'Team Members Selection',
  type: 'object',
  icon: () => '👥',
  fields: [
    defineField({
      name: 'teamMembers',
      title: 'Select Team Members',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'teamMember' }],
          options: {
            disableNew: true, // Prevent creating new team members from this field
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(20),
      description: 'Select multiple team members to display (1-20 members). Click the + button to add more members.',
      options: {
        sortable: true,
        layout: 'grid',
        modal: {
          type: 'popover',
          width: 'auto',
        },
      },
    }),
    defineField({
      name: 'displayLayout',
      title: 'Display Layout',
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
      description: 'Layout style for displaying team members',
    }),
    defineField({
      name: 'showSocialLinks',
      title: 'Show Social Links',
      type: 'boolean',
      initialValue: true,
      description: 'Whether to display social links for all team members',
    }),
    defineField({
      name: 'showBio',
      title: 'Show Bio',
      type: 'boolean',
      initialValue: true,
      description: 'Whether to display the bio for all team members',
    }),
    defineField({
      name: 'showPosition',
      title: 'Show Position',
      type: 'boolean',
      initialValue: true,
      description: 'Whether to display the job position for all team members',
    }),
    defineField({
      name: 'showDepartment',
      title: 'Show Department',
      type: 'boolean',
      initialValue: true,
      description: 'Whether to display the department for all team members',
    }),
    defineField({
      name: 'showUrl',
      title: 'Show Website URL',
      type: 'boolean',
      initialValue: true,
      description: 'Whether to display the website URL for all team members',
    }),
    defineField({
      name: 'gridColumns',
      title: 'Grid Columns',
      type: 'number',
      initialValue: 3,
      validation: (Rule) => Rule.min(1).max(6),
      description: 'Number of columns for grid layout (1-6)',
      hidden: ({ parent }) => parent?.displayLayout !== 'grid',
    }),
    defineField({
      name: 'maxItems',
      title: 'Maximum Items to Display',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(50),
      description: 'Limit the number of team members displayed (optional)',
    }),
  ],
  preview: {
    select: {
      members: 'teamMembers',
      layout: 'displayLayout',
      maxItems: 'maxItems',
    },
    prepare(selection) {
      const { members, layout, maxItems } = selection
      const memberCount = members?.length || 0
      const displayCount = maxItems ? Math.min(memberCount, maxItems) : memberCount
      return {
        title: `${displayCount} Team Member${displayCount !== 1 ? 's' : ''}`,
        subtitle: `Layout: ${layout || 'card'}${maxItems ? ` (max ${maxItems})` : ''}`,
        media: '👥',
      }
    },
  },
})