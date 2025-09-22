export declare const teamMembersReference: {
    type: "object";
    name: "teamMembersReference";
} & Omit<import("sanity").ObjectDefinition, "preview"> & {
    preview?: import("sanity").PreviewConfig<{
        members: string;
        layout: string;
        maxItems: string;
    }, Record<"layout" | "members" | "maxItems", any>> | undefined;
};
