import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { useRef, useState } from 'react';
import type { Editor as TinyEditor } from 'tinymce';
import GamePicker from '@/components/admin/game-picker';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { registerGameDisplayControl } from '@/lib/article-game-editor';
import { gameEmbedDescription } from '@/lib/article-game-widget';
import type { GameEmbedDisplay } from '@/types/articles';
import type { GameOption } from '@/types/games';

type RichTextEditorProps = {
    value: string;
    onChange: (content: string) => void;
};

export default function RichTextEditor({
    value,
    onChange,
}: RichTextEditorProps) {
    const editorRef = useRef<TinyEditor | null>(null);
    const bookmarkRef = useRef<ReturnType<
        TinyEditor['selection']['getBookmark']
    > | null>(null);
    const [pickerOpen, setPickerOpen] = useState(false);
    const [display, setDisplay] = useState<GameEmbedDisplay>('preview');
    const pendingGameRef = useRef<{
        game: GameOption;
        display: GameEmbedDisplay;
    } | null>(null);

    function chooseGame(game: GameOption) {
        pendingGameRef.current = { game, display };
        setPickerOpen(false);
    }

    // Restore the editor cursor after the modal releases its focus trap.
    function finishPicking(event: Event) {
        event.preventDefault();
        const editor = editorRef.current;
        if (!editor || editor.removed) return;
        editor.focus();
        if (bookmarkRef.current)
            editor.selection.moveToBookmark(bookmarkRef.current);
        bookmarkRef.current = null;
        const pending = pendingGameRef.current;
        pendingGameRef.current = null;
        if (!pending) return;
        const { game, display: selectedDisplay } = pending;
        const label = editor.dom.encode(game.label);
        const description = editor.dom.encode(
            gameEmbedDescription(selectedDisplay),
        );
        editor.undoManager.transact(() => {
            editor.insertContent(
                `<div class="mceNonEditable likar-game-widget" contenteditable="false" data-likar-widget="game" data-game-id="${game.id}" data-game-display="${selectedDisplay}"><strong>Utakmica · ${label}</strong><p>${description}</p></div><p></p>`,
            );
        });
        onChange(editor.getContent());
    }

    return (
        <>
            <Editor
                id="content"
                textareaName="content"
                apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                cloudChannel="8"
                onInit={(_event, editor) => {
                    editorRef.current = editor;
                }}
                value={value}
                onEditorChange={onChange}
                init={{
                    height: 600,
                    menubar: false,
                    relative_urls: false,
                    remove_script_host: false,
                    convert_urls: false,
                    plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'code',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table',
                        'preview',
                        'help',
                        'wordcount',
                    ],
                    toolbar:
                        'undo redo | blocks | bold italic forecolor code | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table link image | likarGame likarGameDisplay | removeformat | help',
                    noneditable_class: 'mceNonEditable',
                    extended_valid_elements:
                        'div[id|class|style|title|dir|lang|align|contenteditable|data-likar-widget|data-game-id|data-game-display]',
                    content_style:
                        'body{font-family:Arial,sans-serif;font-size:16px;line-height:1.6}.likar-game-widget{padding:20px;border:1px solid #d97706;border-radius:12px;background:#0f172a;color:#f8fafc;margin:20px 0}.likar-game-widget p{color:#cbd5e1;font-size:13px;margin-bottom:0}',
                    setup(editor) {
                        registerGameDisplayControl(editor, onChange);
                        editor.ui.registry.addButton('likarGame', {
                            text: 'Utakmica',
                            tooltip: 'Umetni najavu ili rezultat utakmice',
                            onAction() {
                                bookmarkRef.current =
                                    editor.selection.getBookmark(2, true);
                                setDisplay('preview');
                                setPickerOpen(true);
                            },
                        });
                    },
                    image_caption: true,
                    automatic_uploads: true,
                    file_picker_types: 'image',
                    images_upload_handler: async (blobInfo) => {
                        const formData = new FormData();
                        formData.append(
                            'file',
                            blobInfo.blob(),
                            blobInfo.filename(),
                        );
                        try {
                            const response = await axios.post<{
                                location: string;
                            }>('/admin-panel/novosti/upload-image', formData);
                            if (typeof response.data.location !== 'string')
                                throw new Error('Missing image URL');
                            return response.data.location;
                        } catch {
                            throw new Error(
                                'Slika nije učitana. Provjerite format i veličinu (najviše 5 MB).',
                            );
                        }
                    },
                }}
            />
            <Dialog open={pickerOpen} onOpenChange={setPickerOpen}>
                <DialogContent
                    className="sm:max-w-xl"
                    onCloseAutoFocus={finishPicking}
                >
                    <DialogHeader>
                        <DialogTitle>Umetni utakmicu</DialogTitle>
                        <DialogDescription>
                            Odaberite utakmicu. Kartica će se umetnuti na mjesto
                            pokazivača u tekstu.
                        </DialogDescription>
                    </DialogHeader>
                    <fieldset className="space-y-2 rounded-lg border p-3">
                        <legend className="px-1 text-sm font-semibold">
                            Prikaz kartice
                        </legend>
                        <label className="flex cursor-pointer items-center gap-2 text-sm">
                            <input
                                type="radio"
                                name="game-display"
                                value="preview"
                                checked={display === 'preview'}
                                onChange={() => setDisplay('preview')}
                                className="accent-likar3"
                            />
                            Najava — uvijek VS
                        </label>
                        <label className="flex cursor-pointer items-center gap-2 text-sm">
                            <input
                                type="radio"
                                name="game-display"
                                value="results"
                                checked={display === 'results'}
                                onChange={() => setDisplay('results')}
                                className="accent-likar3"
                            />
                            Rezultat i strijelci
                        </label>
                        <p className="text-xs leading-relaxed text-muted-foreground">
                            {gameEmbedDescription(display)}
                        </p>
                    </fieldset>
                    {pickerOpen && <GamePicker onSelect={chooseGame} />}
                </DialogContent>
            </Dialog>
        </>
    );
}
