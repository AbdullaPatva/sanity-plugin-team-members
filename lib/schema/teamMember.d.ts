export declare const teamMember: {
    type: "document";
    name: "teamMember";
} & Omit<import("sanity").DocumentDefinition, "preview"> & {
    preview?: import("sanity").PreviewConfig<{
        title: string;
        subtitle: string;
        media: string;
    }, Record<"title" | "media" | "subtitle", any>> | undefined;
};
