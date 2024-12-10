const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';

export function generateId(prefix: string): string {
    if (!prefix || typeof prefix !== 'string') {
        throw new Error('Prefix must be a non-empty string');
    }

    const randomPart = Array.from(
        { length: 24 },
        () => characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('');

    return `${prefix}_${randomPart}`;
}