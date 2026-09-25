import useFancybox from '@/hooks/use-fancybox';

export default function ArticleContent({ content }: { content: string }) {
    const [fancyboxRef] = useFancybox({
        infinite: false,
    });

    const html = prepareArticleContent(content);

    return (
        <div
            ref={fancyboxRef}
            className="article-content mb-15 flex flex-col justify-start gap-6 font-text text-xl text-slate-100"
            dangerouslySetInnerHTML={{
                __html: html,
            }}
        />
    );
}

function prepareArticleContent(content: string) {
    const parser = new DOMParser();
    const document = parser.parseFromString(content, 'text/html');

    document.querySelectorAll('img').forEach((img) => {
        img.setAttribute('data-fancybox', 'article');

        const alt = img.getAttribute('alt');

        if (alt) {
            img.setAttribute('data-caption', alt);
        }

        img.style.cursor = 'zoom-in';
    });

    return document.body.innerHTML;
}
