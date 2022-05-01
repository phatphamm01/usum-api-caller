import { Field, InputField, Arg, Type } from '../models';
export declare const generateEnumType: (object: Type) => string;
export declare const generateUnionType: (object: Type) => string;
export declare const getOneTSTypeDisplay: ({ field, }: {
    field: Field | InputField | Arg;
}) => string;
export declare const generatedTsFields: (fields: (Field | InputField)[], isInput?: boolean | undefined) => string[];
export declare const generateQGLArg: (field: Arg) => string;
export declare const getObjectTSInterfaces: (object: Type, isInput?: boolean | undefined) => string;
export declare const getQueriesArgsTSInterfaces: (object: Field) => string;
export declare const buildTsInterfaceString: (type: Type | Field, fields: string[], additionalSuffix?: string | undefined) => string;
