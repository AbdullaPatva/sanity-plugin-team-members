import { defineType, defineField } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const teamMemberBlock = defineType({
  name: 'teamMemberBlock',
  title: 'Team Members',
  type: 'object',
  icon: UsersIcon,
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
            disableNew: true,
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
      members: 'teamMembers',
      layout: 'displayLayout',
    },
    prepare(selection) {
      const { members, layout } = selection
      const memberCount = members?.length || 0
      return {
        title: `${memberCount} Team Member${memberCount !== 1 ? 's' : ''}`,
        subtitle: `Layout: ${layout || 'default'}`,
        media: '👥',
      }
    },
  },
})