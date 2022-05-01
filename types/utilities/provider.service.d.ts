import { GraphQLJSONSchema } from '../models';
export declare function downloadSchema(endpoint: string, header?: string): Promise<string>;
export declare function retrieveIntrospectionSchema({ endpoint, header, json, download, }: {
    endpoint?: string;
    header?: string;
    json?: string;
    download?: string;
}): Promise<GraphQLJSONSchema | null>;
