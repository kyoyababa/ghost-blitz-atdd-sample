export function Given(context: string, fn: () => void) { describe(`Given: ${context}`, fn); }
export function When(context: string, fn: () => void) { describe(`When: ${context}`, fn); }
export function Then(context: string, fn: () => void) { it(`Then: ${context}`, fn); }
