/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license MIT
 * @copyright Masaru Yamagishi 2022
 */

import type { RandomGenerator } from "pure-rand";
import prand from "pure-rand";

export interface Random {
    /**
     * seed with new phrase
     */
    seed(seedNumber: number|null): void;

    /**
     * get random int
     */
    nextInt(min: number, max: number): number;

    /**
     * get random float
     */
    nextFloat(min: number, max: number): number;
}

/**
 * @link https://github.com/dubzzz/pure-rand
 */
export class PureRandRandom implements Random {
    private gen: RandomGenerator;

    public constructor(seedNumber: number|null = null) {
        this.gen = prand.mersenne(seedNumber ?? Math.random());
    }

    /**
     * @inheritDoc
     */
    public seed(seedNumber: number|null): void {
        this.gen = prand.mersenne(seedNumber ?? Math.random());
    }

    /**
     * @inheritDoc
     */
    public nextInt(min: number = this.gen.min(), max: number = this.gen.max()): number {
        return Math.round(this.nextFloat(min, max));
    }

    /**
     * @inheritDoc
     */
    public nextFloat(min: number = this.gen.min(), max: number = this.gen.max()): number {
        return (this.next() / this.gen.max() * max) + min;
    }

    /**
     * generate and get next random number
     */
    private next(): number {
        const [num, nextGen] = this.gen.next();
        this.gen = nextGen;
        return num;
    }
}
