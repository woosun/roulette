export class KeywordService {
  async init(): Promise<void> {
    // This fork intentionally keeps marble rendering local-only, so external
    // keyword and sprite loading is disabled.
  }

  destroy(): void {}

  getSprite(_marbleName: string): CanvasImageSource | undefined {
    return undefined;
  }
}
