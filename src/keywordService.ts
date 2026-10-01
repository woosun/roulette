export class KeywordService {
  async init(): Promise<void> {
    // The upstream implementation periodically fetches keyword sprites from
    // marblerouletteshop.com. This fork intentionally keeps marble rendering
    // local-only, so external keyword loading is disabled.
  }

  destroy(): void {}

  getSprite(_marbleName: string): CanvasImageSource | undefined {
    return undefined;
  }
}
