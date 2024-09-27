import { pbkdf2Sync, randomBytes } from 'node:crypto';

export function encrypt(password: string): { salt: string; hash: string } {
    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return { salt, hash };
}

export function decrypt(password: string, salt: string): string {
    const result = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString(
        'hex',
    );
    return result;
}

type User = {
    password: string;
    salt: string;
};

export function isMatch(checkPassword: string, user: User): boolean {
    if (!user) {
        return false;
    }
    const { password, salt } = user;
    const result = pbkdf2Sync(checkPassword, salt, 1000, 64, 'sha512').toString(
        'hex',
    );
    if (result === password) {
        return true;
    }

    return false;
}
