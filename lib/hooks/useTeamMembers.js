import { useState, useEffect, useCallback } from 'react';
// Default Sanity client configuration
const DEFAULT_CONFIG = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2023-01-01',
    useCdn: true,
};
// Helper function to build image URLs
export const buildImageUrl = (imageRef, config = DEFAULT_CONFIG) => {
    if (!imageRef)
        return '';
    const imageId = imageRef.replace('image-', '').replace('-jpg', '').replace('-png', '').replace('-webp', '');
    const extension = imageRef.includes('-jpg') ? 'jpg' : imageRef.includes('-png') ? 'png' : 'webp';
    const baseUrl = config.useCdn
        ? `https://cdn.sanity.io/images/${config.projectId}/${config.dataset}`
        : `https://${config.projectId}.api.sanity.io/v${config.apiVersion}/images/${config.dataset}`;
    return `${baseUrl}/${imageId}.${extension}`;
};
// Helper function to transform Sanity query result to TeamMember
const transformTeamMember = (data, config = DEFAULT_CONFIG) => {
    return {
        _id: data._id,
        _type: data._type,
        name: data.name,
        position: data.position,
        photo: data.photo ? {
            asset: {
                _ref: data.photo.asset._ref,
            },
            alt: data.photo.alt,
            hotspot: data.photo.hotspot,
        } : undefined,
        url: data.url,
        socialLinks: data.socialLinks,
        bio: data.bio,
        department: data.department,
        layout: data.layout,
        isActive: data.isActive,
    };
};
// GROQ query for fetching team members
const TEAM_MEMBERS_QUERY = `*[_type == "teamMember" && defined(isActive) && isActive == true] | order(name asc) {
  _id,
  _type,
  name,
  position,
  photo {
    asset {
      _ref
    },
    alt,
    hotspot
  },
  url,
  socialLinks[] {
    platform,
    url,
    label
  },
  bio,
  department,
  layout,
  isActive
}`;
// GROQ query for fetching a single team member
const TEAM_MEMBER_QUERY = `*[_type == "teamMember" && _id == $id][0] {
  _id,
  _type,
  name,
  position,
  photo {
    asset {
      _ref
    },
    alt,
    hotspot
  },
  url,
  socialLinks[] {
    platform,
    url,
    label
  },
  bio,
  department,
  layout,
  isActive
}`;
// Hook for fetching all team members
export function useTeamMembers(config = DEFAULT_CONFIG) {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchTeamMembers = useCallback(async () => {
        if (!config.projectId || !config.dataset) {
            setError(new Error('Sanity project ID and dataset are required'));
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const baseUrl = config.useCdn
                ? `https://${config.projectId}.apicdn.sanity.io/v${config.apiVersion}/data/query/${config.dataset}`
                : `https://${config.projectId}.api.sanity.io/v${config.apiVersion}/data/query/${config.dataset}`;
            const url = `${baseUrl}?query=${encodeURIComponent(TEAM_MEMBERS_QUERY)}`;
            const headers = {
                'Content-Type': 'application/json',
            };
            if (config.token) {
                headers.Authorization = `Bearer ${config.token}`;
            }
            const response = await fetch(url, { headers });
            if (!response.ok) {
                throw new Error(`Failed to fetch team members: ${response.statusText}`);
            }
            const data = await response.json();
            const transformedMembers = data.result?.map((member) => transformTeamMember(member, config)) || [];
            setTeamMembers(transformedMembers);
        }
        catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch team members'));
        }
        finally {
            setLoading(false);
        }
    }, [config]);
    useEffect(() => {
        fetchTeamMembers();
    }, [fetchTeamMembers]);
    return {
        teamMembers,
        loading,
        error,
        refetch: fetchTeamMembers,
    };
}
// Hook for fetching a single team member
export function useTeamMember(id, config = DEFAULT_CONFIG) {
    const [teamMember, setTeamMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchTeamMember = useCallback(async () => {
        if (!id || !config.projectId || !config.dataset) {
            setError(new Error('Team member ID, Sanity project ID and dataset are required'));
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const baseUrl = config.useCdn
                ? `https://${config.projectId}.apicdn.sanity.io/v${config.apiVersion}/data/query/${config.dataset}`
                : `https://${config.projectId}.api.sanity.io/v${config.apiVersion}/data/query/${config.dataset}`;
            const url = `${baseUrl}?query=${encodeURIComponent(TEAM_MEMBER_QUERY)}&$id="${id}"`;
            const headers = {
                'Content-Type': 'application/json',
            };
            if (config.token) {
                headers.Authorization = `Bearer ${config.token}`;
            }
            const response = await fetch(url, { headers });
            if (!response.ok) {
                throw new Error(`Failed to fetch team member: ${response.statusText}`);
            }
            const data = await response.json();
            const transformedMember = data.result ? transformTeamMember(data.result, config) : null;
            setTeamMember(transformedMember);
        }
        catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch team member'));
        }
        finally {
            setLoading(false);
        }
    }, [id, config]);
    useEffect(() => {
        fetchTeamMember();
    }, [fetchTeamMember]);
    return {
        teamMember,
        loading,
        error,
        refetch: fetchTeamMember,
    };
}
// Utility function to create a custom image URL builder
export const createImageUrlBuilder = (config = DEFAULT_CONFIG) => {
    return (imageRef) => buildImageUrl(imageRef, config);
};
