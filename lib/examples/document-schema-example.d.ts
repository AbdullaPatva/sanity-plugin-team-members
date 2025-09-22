export declare const examplePost: {
    type: "document";
    name: "examplePost";
} & Omit<import("sanity").DocumentDefinition, "preview"> & {
    preview?: import("sanity").PreviewConfig<{
        title: string;
        teamMembers: string;
    }, Record<"title" | "teamMembers", any>> | undefined;
};
export declare const examplePage: {
    type: "document";
    name: "examplePage";
} & Omit<import("sanity").DocumentDefinition, "preview"> & {
    preview?: import("sanity").PreviewConfig<Record<string, string>, Record<never, any>> | undefined;
};
