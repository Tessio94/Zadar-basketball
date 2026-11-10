import type { Editor } from 'tinymce';
import {
    gameEmbedDescription,
    gameEmbedDisplay,
} from '@/lib/article-game-widget';

const selector = 'div[data-likar-widget="game"]';

/** Edit one widget without changing other occurrences of the same game. */
export function registerGameDisplayControl(
    editor: Editor,
    onChange: (content: string) => void,
) {
    editor.ui.registry.addButton('likarGameDisplay', {
        text: 'Prikaz utakmice',
        tooltip: 'Promijeni prikaz odabrane kartice utakmice',
        onSetup(api) {
            api.setEnabled(
                Boolean(
                    editor.dom.getParent(editor.selection.getNode(), selector),
                ),
            );
            const subscription = editor.selection.selectorChangedWithUnbind(
                selector,
                (active) => api.setEnabled(active),
            );
            return () => subscription.unbind();
        },
        onAction() {
            const widget = editor.dom.getParent<HTMLElement>(
                editor.selection.getNode(),
                selector,
            );
            if (!widget) return;

            editor.windowManager.open({
                title: 'Prikaz utakmice',
                initialData: {
                    display: gameEmbedDisplay(
                        widget.getAttribute('data-game-display'),
                    ),
                },
                body: {
                    type: 'panel',
                    items: [
                        {
                            type: 'selectbox',
                            name: 'display',
                            label: 'Što prikazati u ovom članku?',
                            items: [
                                {
                                    text: 'Najava — uvijek VS',
                                    value: 'preview',
                                },
                                {
                                    text: 'Rezultat i strijelci',
                                    value: 'results',
                                },
                            ],
                        },
                        {
                            type: 'htmlpanel',
                            html: '<p>Najava ostaje bez rezultata, četvrtina i strijelaca i nakon utakmice. Druga opcija automatski prikazuje uneseni rezultat i statistiku.</p>',
                        },
                    ],
                },
                buttons: [
                    { type: 'cancel', text: 'Odustani' },
                    { type: 'submit', text: 'Primijeni', primary: true },
                ],
                onSubmit(dialog) {
                    if (widget.isConnected) {
                        const display = gameEmbedDisplay(
                            dialog.getData().display,
                        );
                        editor.undoManager.transact(() => {
                            editor.dom.setAttrib(
                                widget,
                                'data-game-display',
                                display,
                            );
                            let description = widget.querySelector('p');
                            if (!description) {
                                description = editor
                                    .getDoc()
                                    .createElement('p');
                                widget.appendChild(description);
                            }
                            description.textContent =
                                gameEmbedDescription(display);
                        });
                        onChange(editor.getContent());
                    }
                    dialog.close();
                },
            });
        },
    });
    editor.ui.registry.addContextToolbar('likarGameOptions', {
        predicate: (node) => node.matches(selector),
        items: 'likarGameDisplay',
        position: 'node',
        scope: 'node',
    });
}
