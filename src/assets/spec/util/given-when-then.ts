export const Given = (context: string, fn: () => void) => describe(`Given: ${context}`, fn);
export const When = (context: string, fn: () => void) => describe(`When: ${context}`, fn);
export const Then = (context: string, fn: () => void) => it(`Then: ${context}`, fn);
