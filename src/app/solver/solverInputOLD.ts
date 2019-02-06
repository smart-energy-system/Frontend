export class SolverInput {
    constructor(
      public startDate?: string,
      public endDate?: string,
      public exportPrice?: number,
      public batteryFillLevel?: number,
    ) {}
  }