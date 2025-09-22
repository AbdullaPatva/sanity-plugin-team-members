import { defineType, defineField } from 'sanity'
import { teamMembersReference } from '../schema/teamMembersReference'

// Example document schema showing how to use the team members plugin
export const examplePost = defineType({
  name: 'examplePost',
  title: 'Example Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    
    // Team Members Reference Field - allows multiple member selection
    defineField({
      name: 'teamMembers',
      title: 'Team Members',
      type: 'teamMembersReference',
      description: 'Select multiple team members with common display settings',
    }),
    
    // Portable Text (add teamMemberBlock to your portable text fields)
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        // Regular text blocks
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
        },
        // Add teamMemberBlock here: teamMemberBlock,
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      teamMembers: 'teamMembers.teamMembers',
    },
    prepare(selection) {
      const { title, teamMembers } = selection
      const memberCount = teamMembers?.length || 0
      return {
        title: title || 'Untitled Post',
        subtitle: memberCount > 0 ? `${memberCount} team member${memberCount !== 1 ? 's' : ''}` : 'No team members',
      }
    },
  },
})

// Example page schema
export const examplePage = defineType({
  name: 'examplePage',
  title: 'Example Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    
    // Multiple team member selections for different sections
    defineField({
      name: 'leadershipTeam',
      title: 'Leadership Team',
      type: 'teamMembersReference',
      description: 'Select leadership team members',
    }),
    
    defineField({
      name: 'developmentTeam',
      title: 'Development Team',
      type: 'teamMembersReference',
      description: 'Select development team members',
    }),
    
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
          ],
        },
        // Add teamMemberBlock here: teamMemberBlock,
      ],
    }),
  ],
})