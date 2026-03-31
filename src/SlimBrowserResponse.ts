/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type {
  TextContent,
  ImageContent,
} from '@modelcontextprotocol/sdk/types.js';

import type {BrowserContext} from './BrowserContext.js';
import {BrowserResponse} from './BrowserResponse.js';

export class SlimBrowserResponse extends BrowserResponse {
  override async handle(
    _toolName: string,
    _context: BrowserContext,
  ): Promise<{
    content: Array<TextContent | ImageContent>;
    structuredContent: object;
  }> {
    const text: TextContent = {
      type: 'text',
      text: this.responseLines.join('\n'),
    };
    return {
      content: [text],
      structuredContent: text,
    };
  }
}
