import { UseTeamMembersResult, UseTeamMemberResult } from '../types/frontend';
interface SanityConfig {
    projectId: string;
    dataset: string;
    apiVersion?: string;
    useCdn?: boolean;
    token?: string;
}
export declare const buildImageUrl: (imageRef: string, config?: SanityConfig) => string;
export declare function useTeamMembers(config?: SanityConfig): UseTeamMembersResult;
export declare function useTeamMember(id: string, config?: SanityConfig): UseTeamMemberResult;
export declare const createImageUrlBuilder: (config?: SanityConfig) => (imageRef: string) => string;
export {};
