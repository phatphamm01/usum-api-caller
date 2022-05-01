import { Field, MethodType, Type } from '../models';
import { capitalizeFirstLetter } from '../utilities';
import { getOneTSTypeDisplay } from './types.generator';
import {
  generateQueryFunction,
  generateTemplateQuery,
} from './templates.generator';
import { SchemaStore } from '../store';

interface GraphQLFunctionArgs {
  field: Field;
  functionType: MethodType;
  innerFragment: string;
}

export const createReactApolloHook = ({
  field,
  functionType,
  innerFragment,
}: GraphQLFunctionArgs): string => {
  const hasArgs = field.args.length > 0;
  const methodName = field.name;

  const { functionArgsTypeName } = SchemaStore.getFunctionFieldArgs(field);
  const { isScalar } = SchemaStore.getFieldProps(field);
  const returnedTypeDisplay = getOneTSTypeDisplay({
    field,
  });

  const typeNameLower = functionType;
  const typeNameUpper = capitalizeFirstLetter(functionType);

  const Query = generateTemplateQuery({
    field,
    innerFragment,
    functionType,
  });

  const TOptions = `{${methodName}: ${returnedTypeDisplay}}${
    hasArgs ? ', ' + functionArgsTypeName : ''
  }`;

  let useHookOutput = `return use${
    typeNameUpper === 'Query' ? 'LazyQuery' : typeNameUpper
  }<${TOptions}>(${typeNameLower}, options);`;

  if (isScalar) {
    return `
    ${field.description ? `/** ${field.description} */` : ''}
    export const use${capitalizeFirstLetter(
      field.name
    )} = (options?: ${typeNameUpper}HookOptions<${TOptions}>) =>  {
      const ${typeNameLower} = ${Query}
      ${useHookOutput}
    },`;
  } else {
    return `
    ${field.description ? `/** ${field.description} */` : ''}
    export const use${capitalizeFirstLetter(
      field.name
    )} = (fragment: GenFields<${returnedTypeDisplay}>, options?: ${typeNameUpper}HookOptions<${TOptions}>) => {
      const { isString, isFragment, fragmentName } = guessFragmentType(queryBuilder(fragment));
      const ${typeNameLower} = ${Query}

      ${useHookOutput}
    }
  ,`;
  }
};
