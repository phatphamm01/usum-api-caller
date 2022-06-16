import { ParametersStore } from '../store';

export const sharedTemplate = () => {
  const { tsCheck } = ParametersStore;
  return `
 /* eslint-disable */
 ${tsCheck ? '' : '// @ts-nocheck'}
 // *******************************************************
 // *******************************************************
 // USUM SOFTWARE
 // GENERATED FILE, DO NOT MODIFY
 //
 // *******************************************************
 // *******************************************************
 // 💙
 
     export type Maybe<T> = T | null;

     type NonNullable<T> = Exclude<T, null | undefined>;

     type KeysMatching<T, V> = {
       [K in keyof T]-?: T[K] extends V ? K : never;
     }[keyof T];
     
     type KeysNotMatching<T, V> = {
       [K in keyof T]-?: T[K] extends V ? never : K;
     }[keyof T];
     
     type MatchingType = string | number | boolean | string[] | number[] | boolean[];
     
     type FilterMaybe<T> = { [k in keyof T]: NonNullable<T[k]> };
     
     type GenFieldsAll<T> = (
       | KeysMatching<T, MatchingType>
       | {
           [k in KeysNotMatching<T, MatchingType>]?: T[k] extends any[]
             ? GenFields<T[k][number]>
             : GenFields<T[k]>;
         }
     )[];
     
     export type GenFields<T> = GenFieldsAll<FilterMaybe<T>>;

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
