import { guessFragmentTypeTemplate } from './fragmentType.template';
import { ParametersStore } from '../store';

export const defineImports = (): string => {
  let template = '';
  const { isCodeGen, codegenFunctions, codegenReactHooks, apolloVersion } =
    ParametersStore;
  if (isCodeGen) {
    template = `
    ${guessFragmentTypeTemplate}
    `;
    if (codegenReactHooks) {
      template += `
      import { DocumentNode, gql, useMutation, useLazyQuery, useSubscription, QueryHookOptions, MutationHookOptions, SubscriptionHookOptions, MutationTuple  } from '${
        apolloVersion === 3 ? '@apollo/client' : 'apollo-client'
      }'
      `;
    }

    if (codegenFunctions) {
      if (apolloVersion === 3) {
        template += `
        import { OperationDefinitionNode } from 'graphql';
        import { ApolloClient, execute, DocumentNode, gql } from '@apollo/client/core';
      `;
      } else {
        template += `
        import ApolloClient, { QueryOptions, OperationVariables, MutationOptions, ObservableQuery } from 'apollo-client';
        import { execute } from 'apollo-link';
      `;
      }
    }
  }

  return template;
};
