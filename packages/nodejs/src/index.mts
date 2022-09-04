/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license MIT
 * @copyright Masaru Yamagishi 2022
 */

import { hrtime } from "node:process";
import { BenchmarkSuite, buildCases, buildPayload, PureRandRandom } from "node-compression-benchmark-core";

function getCurrentNanoSec(): bigint {
    return hrtime.bigint();
}

const seedRand = 1349678;
const rand = new PureRandRandom(seedRand);
const payload = buildPayload(rand);

const report = await new BenchmarkSuite(buildCases(payload), getCurrentNanoSec, 100).run();

console.table(report.toObject());
