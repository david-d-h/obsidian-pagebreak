import {Editor, Plugin, Hotkey} from 'obsidian';

const DEFAULT_HOTKEY = {
	key: "Enter",
	modifiers: process.platform == "darwin" ? ["Mod", "Shift"] : ["Ctrl", "Shift"],
} as Hotkey;

export default class PageBreakPlugin extends Plugin {
	async onload() {
		this.addCommand({
			id: 'insert-page-break',
			name: 'pagebreak',
			repeatable: false,
			hotkeys: [DEFAULT_HOTKEY],
			editorCallback: (editor: Editor) => {
				const cursor = editor.getCursor();

				editor.replaceRange("<div style=\"page-break-after: always;\"></div>", cursor);

				editor.setCursor({
					line: cursor.line,
					ch: editor.getLine(cursor.line).length,
				});
			}
		});
	}
}
