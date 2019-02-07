
    export interface SolutionStep {
        exportProfit: number;
        importCost: number;
        batteryFillLevel: number;
        discargeRate: number;
        chargeRate: number;
        ps: number;
        pd: number[];
        pg: number;
        pposShift: number[];
        pnegShift: number[];
    }

    export interface SolverSolution {
        solutionSteps: SolutionStep[];
        totalExportProfit: number;
        totalImportCost: number;
        totalProfit: number;
    }



