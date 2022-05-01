import chalk from 'chalk';
import fetch from 'node-fetch';

import * as query from 'querystringify';
import { getIntrospectionQuery, printSchema } from 'graphql';
import { buildClientSchema } from 'graphql/utilities/buildClientSchema';
import { GraphQLJSONSchema, ObjectLiteral } from '../models';
import path from 'path';
import fs from 'fs';

const possibleGraphQLSuffix = ['/graphql', '/api', '/__graphql', '/__api'];

export async function downloadSchema(
  endpoint: string,
  header?: string
): Promise<string> {
  try {
    let formatedHeaders = getHeadersFromInput(header);
    formatedHeaders = {
      ...formatedHeaders,
      'Content-Type': 'application/json',
    };
    const schema = await getRemoteSchema(endpoint, {
      method: 'POST',
      json: true,
      headers: formatedHeaders,
    });
    if (schema.status === 'err') {
      return Promise.reject(schema.message);
    } else {
      return schema.schema;
    }
  } catch (e: any) {
    return Promise.reject(
      `❗️ Unable to request from the GraphQL Api, please verify that the server is online \n ${chalk.yellow(
        `Maybe the endpoint is not a GraphQL Api, try to add ${chalk.green(
          possibleGraphQLSuffix.join(', ')
        )} at the end of your url`
      )}
      `
    );
  }
}

function getHeadersFromInput(header?: string | ObjectLiteral): {
  [key: string]: string;
} {
  switch (typeof header) {
    case 'string': {
      const keys = query.parse(header) as ObjectLiteral;
      const key = Object.keys(keys)[0];
      return { [key]: keys[key] };
    }
    case 'object': {
      return header;
    }
    default: {
      return {};
    }
  }
}

interface Options {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: { [key: string]: string };
  json?: boolean;
}

async function getRemoteSchema(
  endpoint: string,
  options: Options
): Promise<
  { status: 'ok'; schema: string } | { status: 'err'; message: string }
> {
  try {
    const { data, errors }: any = await fetch(endpoint, {
      method: options.method,
      headers: options.headers,
      body: JSON.stringify({ query: getIntrospectionQuery() }),
    }).then((res) => res.json());

    if (errors) {
      return { status: 'err', message: JSON.stringify(errors, null, 2) };
    }

    if (options.json) {
      return {
        status: 'ok',
        schema: JSON.stringify(data, null, 2),
      };
    } else {
      const schema = buildClientSchema(data);
      return {
        status: 'ok',
        schema: printSchema(schema),
      };
    }
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function retrieveIntrospectionSchema({
  endpoint,
  header,
  json,
  download,
}: {
  endpoint?: string;
  header?: string;
  json?: string;
  download?: string;
}): Promise<GraphQLJSONSchema | null> {
  try {
    if (endpoint) {
      // const graphqlRegxp = /[^/]+(?=\/$|$)/;
      // const [result] = graphqlRegxp.exec(endpoint);
      const JSONschema = await downloadSchema(endpoint, header);
      if (download) {
        const outputfile = path.resolve(process.cwd(), download);
        try {
          await fs.writeFileSync(outputfile, JSONschema);
          console.log(
            chalk.green(`Graphql intropesction schema saved at ${download}`)
          );
        } catch (e: any) {
          console.error(e);
        }
      }
      return JSON.parse(JSONschema);
    } else if (json) {
      return require(path.resolve(process.cwd(), json));
    } else {
      return null;
    }
  } catch (e: any) {
    return Promise.reject(e);
  }
}
