import { generateFunction } from '../generators';
import { CodeGenType, MethodType } from '../models';
import { SchemaStore } from '../store';
import {
  withDefinitionsTemplate,
  withFunctionsTemplate,
  withReactHooksTemplate,
} from '../templates';
import ora from 'ora';

const MessageMode = {
  [CodeGenType.METHODS]: '🧬 queries, mutations and subscriptions',
  [CodeGenType.REACT_HOOKS]: '⚛️  React hooks',
  [CodeGenType.TEMPLATE]: 'GraphQL templates',
};

export function buildCodeGenFunctions(mode: CodeGenType): string {
  const message = MessageMode[mode];
  const oraMethods = ora(`Generating ${message}...`).start();
  try {
    const [queries, mutations, subscriptions] = SchemaStore.schemaFunctions;

    const generatedQueries = queries.map((field) =>
      generateFunction({ field, functionType: MethodType.Query, mode })
    );
    const generatedMutations = mutations.map((field) =>
      generateFunction({ field, functionType: MethodType.Mutation, mode })
    );
    const generatedSubscriptions = subscriptions.map((field) =>
      generateFunction({ field, functionType: MethodType.Subscription, mode })
    );

    oraMethods.succeed(`${message} successfully generated`);

    const allFunctions = [
      ...generatedQueries,
      ...generatedMutations,
      ...generatedSubscriptions,
    ];

    if (mode === CodeGenType.REACT_HOOKS) {
      return withReactHooksTemplate(allFunctions);
    } else if (mode === CodeGenType.METHODS) {
      return withFunctionsTemplate(generatedQueries, generatedMutations);
    } else {
      return withDefinitionsTemplate(allFunctions);
    }
  } catch (e: any) {
    console.log(e);
    oraMethods.fail(`${message} generation failed`);
    return e;
  }
}
