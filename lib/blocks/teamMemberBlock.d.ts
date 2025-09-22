export declare const teamMemberBlock: {
    type: "object";
    name: "teamMemberBlock";
} & Omit<import("sanity").ObjectDefinition, "preview"> & {
    preview?: import("sanity").PreviewConfig<{
        members: string;
        layout: string;
    }, Record<"layout" | "members", any>> | undefined;
};
