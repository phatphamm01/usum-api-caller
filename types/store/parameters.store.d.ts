import { Dictionnary } from '../models';
interface SetParametersArgs {
    scalars?: Dictionnary<string>;
    prefix?: string;
    suffix?: string;
    genFragments?: boolean;
    codegenFunctions?: boolean;
    codegenReactHooks?: boolean;
    codegenTemplates?: boolean;
    apolloVersion?: 2 | 3;
    tsCheck?: boolean;
    disableConnectionFragment?: boolean;
}
declare class ParametersConstructor {
    private defaultScalars;
    prefix: string;
    suffix: string;
    genFragments: boolean;
    codegenFunctions: boolean;
    codegenReactHooks: boolean;
    codegenTemplates: boolean;
    apolloVersion: number;
    tsCheck: boolean;
    disableConnectionFragment: boolean;
    get isCodeGen(): boolean;
    addScalars(scalars: Dictionnary<string>): void;
    setParamaters(data: SetParametersArgs): void;
    get listScalars(): Dictionnary<string>;
}
export declare const ParametersStore: ParametersConstructor;
export {};
