/** Shape of the SEO content held in each feature's content.ts file. */
export interface Faq {
  q: string;
  a: string;
}

export interface ToolContent {
  /** Full page title used in metadata and the H1 area. */
  seoTitle: string;
  howTo: string[];
  explanationTitle: string;
  explanation: string[];
  faqs: Faq[];
}
