import { Arg, Field, GraphQLJSONSchema, InputField, Type } from '../models';
declare class SchemaConstructor {
    private schema;
    get schemaTypes(): Type[];
    get schemaObjectTypes(): Type[];
    get schemaFunctions(): [Field[], Field[], Field[]];
    findType(typeName: string): Type | undefined;
    isTypeConnection(typeName: string): boolean;
    areFieldArgsAllOptional(field: Field): boolean;
    getFunctionFieldArgs(field: Field): {
        GQLVariables: string[];
        GQLArgs: string[];
        functionArgsTypeName: string;
    };
    getFieldProps(field: Field | InputField | Arg): {
        isRequired: boolean;
        isArray: boolean;
        isArrayRequired: boolean;
        isConnection: boolean;
        isScalar: boolean;
        typeName: string;
        isEnum: boolean;
    };
    setSchema(schema: GraphQLJSONSchema): void;
}
export declare const SchemaStore: SchemaConstructor;
export {};
