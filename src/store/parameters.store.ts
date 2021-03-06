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

class ParametersConstructor {
  private defaultScalars: Dictionnary<string> = {
    ID: 'string',
    String: 'string',
    Int: 'number',
    Float: 'number',
    Upload: 'File',
    Boolean: 'boolean',
    Json: 'string',
    DateTime: 'string',
    Date: 'string',
    ObjectID: 'string'
  };
  public prefix = '';
  public suffix = '';
  public genFragments = false;
  public codegenFunctions = false;
  public codegenReactHooks = false;
  public codegenTemplates = false;
  public apolloVersion = 3;
  public tsCheck = true;
  public disableConnectionFragment = false;

  get isCodeGen(): boolean {
    return (
      this.codegenReactHooks || this.codegenFunctions || this.codegenTemplates
    );
  }

  addScalars(scalars: Dictionnary<string>): void {
    this.defaultScalars = {
      ...this.defaultScalars,
      ...scalars,
    };
  }

  setParamaters(data: SetParametersArgs): void {
    if (data.scalars) this.addScalars(data.scalars);
    if (data.prefix != null) this.prefix = data.prefix;
    if (data.suffix != null) this.suffix = data.suffix;
    this.genFragments = !!data.genFragments;
    this.codegenFunctions = !!data.codegenFunctions;
    this.codegenReactHooks = !!data.codegenReactHooks;
    this.codegenTemplates = !!data.codegenTemplates;
    this.apolloVersion = data.apolloVersion ?? 3;
    this.tsCheck = data.tsCheck ?? true;
    this.disableConnectionFragment = data.disableConnectionFragment ?? false;
  }

  get listScalars() {
    return this.defaultScalars;
  }
}

export const ParametersStore = new ParametersConstructor();
