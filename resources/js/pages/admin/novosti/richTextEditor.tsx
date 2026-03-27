import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

export default function RichTextEditor({
    value,
    onChange,
}: {
    value: string;
    onChange: (content: string) => void;
}) {
    const editorRef = useRef(null);

    const apikey = import.meta.env.VITE_TINYMCE_API_KEY;

    return (
        <Editor
            id="content"
            textareaName="content"
            apiKey={apikey}
            onInit={(_evt, editor) => (editorRef.current = editor)}
            value={value}
            onEditorChange={(content) => onChange(content)}
            init={{
                height: 500,
                menubar: false,
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
                    'code',
                    'fullscreen',
                    'insertdatetime',
                    'media',
                    'table',
                    'preview',
                    'help',
                    'wordcount',
                ],
                toolbar:
                    'undo redo | blocks | ' +
                    'bold italic forecolor code | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | table link image |' +
                    'removeformat | help',
                content_style:
                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                image_caption: true,
                image_list: [
                    {
                        title: 'Luka Bolić',
                        value: '/images/articles/article1.jpg',
                    },
                    {
                        title: 'Dinko Kamber',
                        value: '/images/articles/article2.jpg',
                    },
                ],
                image_uploadtab: true,
                // images_upload_base_path: '/admin/novosti/upload-image',
                images_upload_url: '/admin/novosti/upload-image',
                automatic_uploads: true,
                file_picker_types: 'image',
                // images_upload_handler: async (blobInfo) => {
                //     const formData = new FormData();
                //     formData.append('file', blobInfo.blob());

                //     const response = await fetch(
                //         '/admin/novosti/upload-image',
                //         {
                //             method: 'POST',
                //             headers: {
                //                 'X-CSRF-TOKEN':
                //                     document
                //                         .querySelector(
                //                             'meta[name="csrf-token"]',
                //                         )
                //                         ?.getAttribute('content') || '',
                //             },
                //             body: formData,
                //         },
                //     );

                //     const json = await response.json();
                //     return json.location;
                // },
            }}
        />
    );
}
