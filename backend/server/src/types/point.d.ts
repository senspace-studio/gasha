export type PointCalcResponse = {
  special: {
    amount: bigint;
    points: bigint;
  };
  rare: {
    amount: bigint;
    points: bigint;
  };
  common: {
    amount: bigint;
    points: bigint;
  };
};
