// генерируем случайную строку из 32 символов в шестнадцатеричном формате
export const randomId = (): string =>
    [...crypto.getRandomValues(new Uint8Array(16))]
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');