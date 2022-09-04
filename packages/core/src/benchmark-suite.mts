/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license MIT
 * @copyright Masaru Yamagishi 2022
 */

export type BenchmarkFunction = {
    name: string,
    fn: () => Promise<number>,
}

export type BenchmarkFunctionReport = {
    name: string,
    totalNanoSec: bigint,
    averageNanoSec: bigint,
    medianNanoSec: bigint,
    averageSize: number,
    reports: BenchmarkReport[],
};

export type BenchmarkReport = {
    nanoSec: bigint,
    size: number,
};

/**
 * Benchmark suite
 */
export class BenchmarkSuite {
    public constructor(
        private readonly functions: BenchmarkFunction[],
        private readonly getCurrentNanoSec: () => bigint,
        private readonly cycles: number = 10,
    ) {
        if (this.cycles < 2) {
            throw new Error("cycles must be greater than 1");
        }
    }

    /**
     * Run benchmark
     */
    public async run(): Promise<BenchmarkResult> {
        const functionReports: BenchmarkFunctionReport[] = [];
        for (let i = 0; i < this.functions.length; i++) {
            let totalNanoSec = 0n;
            let totalSize = 0;
            let actualSize = 0;
            const func = this.functions[i];
            const reports: BenchmarkReport[] = [];
            for (let i = 0; i < this.cycles; i++) {
                const start = this.getCurrentNanoSec();
                const size = await func.fn();
                const end = this.getCurrentNanoSec();
                const nanoSec = (end - start);
                if (i === 0) {
                    // first case should be ignored
                    continue;
                }
                if (actualSize !== 0 && actualSize !== size) {
                    throw new Error(`Unmatched size actual=${actualSize} current=${size}`);
                }
                actualSize = size;
                reports.push({
                    nanoSec,
                    size,
                });
                totalNanoSec += nanoSec;
                totalSize += size;
            }
            functionReports.push({
                name: func.name,
                totalNanoSec,
                averageNanoSec: totalNanoSec / BigInt(this.cycles),
                medianNanoSec: reports[Math.floor(reports.length / 2)].nanoSec,
                averageSize: totalSize / this.cycles,
                reports,
            });
        }
        return new BenchmarkResult(functionReports, this.cycles);
    }
}

export type BenchmarkResultObject = {
    [name: string]: {
        averageNanoSec: bigint,
        medianNanoSec: bigint,
        averageSize: number,
    },
};

/**
 * Benchmark result
 */
export class BenchmarkResult {
    public constructor(
        public readonly reports: BenchmarkFunctionReport[],
        public readonly cycles: number,
    ) {
    }

    public toObject() {
        const results: BenchmarkResultObject = {};
        for (let i = 0; i < this.reports.length; i++) {
            const report = this.reports[i];
            results[report.name] = {
                averageNanoSec: report.averageNanoSec,
                medianNanoSec: report.medianNanoSec,
                averageSize: report.averageSize,
            };
        }

        return results;
    }
}
