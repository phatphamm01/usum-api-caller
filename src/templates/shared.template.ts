import { ParametersStore } from '../store';

export const sharedTemplate = () => {
  const { tsCheck } = ParametersStore;
  return `
 /* eslint-disable */
 ${tsCheck ? '' : '// @ts-nocheck'}
 // *******************************************************
 // *******************************************************
 //
 // GENERATED FILE, DO NOT MODIFY
 // USUM SOFTWARE
 // *******************************************************
 // *******************************************************
 // 💙
 
 export type Maybe<T> = T | null;

 type GenFields<T> = ((keyof T) | {[k in keyof T]?: GenFields<T[k]>})[];

 const queryBuilder = <T>(fields?: GenFields<T>): string => {
  return fields
      ? fields
          .map((field: any) => {
              if (typeof field === "object") {
                  let result = "";

                  Object.entries<any>(field as Record<string, any>).forEach(
                      ([key, values], index, array) => {
                          result += \`\${key} \${values.length > 0
                              ? "{ " + queryBuilder(values) + " }"
                              : ""
                              }\`;

                          // If it's not the last item in array, join with comma
                          if (index < array.length - 1) {
                              result += ", ";
                          }
                      }
                  );

                  return result;
              } else {
                  return \`\${field}\`;
              }
          })
          .join("\\n ")
      : "";
}

 `;
};
