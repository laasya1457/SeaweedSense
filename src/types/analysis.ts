export interface AnalysisResult {
  isReady: boolean;
  waitTime?: string;
  colorPercentages: {
    ready: number;
    notReady: number;
  };
}