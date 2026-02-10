import { __stringifySets } from 'src/helpers/test-helpers/stringify-sets';

export const __log__ = <T>(object: T, name: string, post = '') => {
    // eslint-disable-next-line no-console
    console.debug(`const ${name} = ${__stringifySets(object)} ${post}`);
};
