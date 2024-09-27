// tr -dc A-Za-z0-9 </dev/urandom | head -c 64; echo
import jwt from 'jsonwebtoken';

const privateKey =
    process.env.JWT_SECRET_KEY ||
    'M4sMjJwsw7lkj4Hn184hNgwddPL1u7qhYcn63T3dknI0KrgEkPtEmJWmG88O8XcZ';

export function generateToken(data: any): any {
    const token = jwt.sign(data, privateKey, {
        expiresIn: 60 * 60,
    });
    return token;
}

export function verifyToken(token: string): jwt.JwtPayload | string | unknown {
    try {
        const decode = jwt.verify(token, privateKey);
        return decode;
    } catch (err) {
        return err;
    }
}

export function decodeToken(token: any): any {
    try {
        let decode,
            err = jwt.decode(token.split(' ')[1]);
        if (err) {
            return err;
        }
        return decode;
    } catch (err) {
        return err;
    }
}
