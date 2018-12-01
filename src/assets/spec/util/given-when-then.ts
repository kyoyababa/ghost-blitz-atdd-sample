export const Given = (context: string, fn: () => void) => describe(context, fn);
export const When = (context: string, fn: () => void) => describe(context, fn);
export const Then = (context: string, fn: () => void) => it(context, fn);
