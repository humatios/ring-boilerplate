import { customAlphabet } from 'nanoid';

const ALPHABET: string =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
const DEFAULT_SIZE: number = 10;

export function generateId(
    size: number = DEFAULT_SIZE,
    alphabet: string = ALPHABET,
) {
    const nanoid = customAlphabet(alphabet, size);
    return nanoid();
}
