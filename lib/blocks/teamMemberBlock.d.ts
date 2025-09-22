export declare const teamMemberBlock: {
    type: "object";
    name: "teamMemberBlock";
} & Omit<import("sanity").ObjectDefinition, "preview"> & {
    preview?: import("sanity").PreviewConfig<{
        title: string;
        subtitle: string;
        media: string;
        layout: string;
    }, Record<"title" | "media" | "subtitle" | "layout", any>> | undefined;
};
