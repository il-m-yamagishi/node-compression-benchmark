/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license MIT
 * @copyright Masaru Yamagishi 2022
 */

import { BenchmarkFunction } from "./benchmark-suite.mjs";

export function buildUniversalCases(payload: any): BenchmarkFunction[] {
    return [
        {
            name: "JSON(raw)",
            fn: async function (): Promise<number> {
                const p = JSON.stringify(payload);
                return Promise.resolve(p.length);
            },
        },
    ];
}
