/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { zod } from '../third_party/index.js';
import { ToolCategory } from './categories.js';
import { definePageTool } from './ToolDefinition.js';

export const printPage = definePageTool({
    name: 'print_page',
    description: 'Saves the current page as a PDF file.',
    annotations: {
        category: ToolCategory.DEBUGGING,
        readOnlyHint: true,
    },
    schema: {
        filePath: zod.string().describe('The path where the PDF should be saved.'),
    },
    handler: async (request, response, context) => {
        const page = request.page;
        const pdfData = await page.pptrPage.pdf({
            format: 'A4',
            printBackground: true,
        });

        const { filename } = await context.saveFile(pdfData, request.params.filePath);
        response.appendResponseLine(`Saved PDF to ${filename}.`);
    },
});
