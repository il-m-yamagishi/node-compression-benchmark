/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license MIT
 * @copyright Masaru Yamagishi 2022
 */

import { Random } from "./random.mjs";

type ObjectInstance = {
    id: string,
    position: {
        x: number,
        y: number,
        z: number,
    },
    rotationQuaternion: {
        x: number,
        y: number,
        z: number,
        w: number,
    },
}

type Player = ObjectInstance & {
    hp: number,
}

/**
 * Build dummy payload
 */
export function buildPayload(rand: Random, playerCount = 200) {
    const payload: ObjectInstance[] = [];

    for (let i = 0; i < playerCount; i++) {
        payload.push({
            id: `somerandomname${i}`,
            hp: rand.nextInt(1, 1000),
            position: {
                x: rand.nextFloat(-500.0, 500.0),
                y: rand.nextFloat(0.0, 100.0),
                z: rand.nextFloat(-500.0, 500.0),
            },
            rotationQuaternion: {
                x: rand.nextFloat(-Math.PI, Math.PI),
                y: rand.nextFloat(-Math.PI, Math.PI),
                z: rand.nextFloat(-Math.PI, Math.PI),
                w: rand.nextFloat(-Math.PI, Math.PI),
            },
        } as Player);
    }

    return payload;
}
