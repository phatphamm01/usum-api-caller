import { Field, MethodType } from '../models';
interface QueryBuilderArgs {
    field: Field;
    functionType: MethodType;
    innerFragment: string;
    defaultFragmentName?: string;
}
export declare function generateTemplateQuery({ field, functionType, innerFragment, defaultFragmentName, }: QueryBuilderArgs): string;
interface CreateQueryFunctionArgs {
    field: Field;
    functionType: MethodType;
    innerFragment: string;
}
export declare function generateQueryFunction({ field, functionType, innerFragment, }: CreateQueryFunctionArgs): string;
export {};
