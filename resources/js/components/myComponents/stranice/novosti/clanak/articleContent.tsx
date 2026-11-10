import parse, { Element, attributesToProps } from 'html-react-parser';
import ArticleGameCard from '@/components/articles/article-game-card';
import useFancybox from '@/hooks/use-fancybox';
import { gameEmbedDisplay } from '@/lib/article-game-widget';
import { lightboxCaption } from '@/lib/article-media';
import type { GameSummary } from '@/types/games';

const lightboxOptions = { Carousel: { infinite: false } };

type ArticleContentProps = {
    /** HTML is sanitized by ArticleHtml on the server, including legacy articles. */
    content: string;
    embeddedGames?: GameSummary[];
};

export default function ArticleContent({
    content,
    embeddedGames = [],
}: ArticleContentProps) {
    const [fancyboxRef] = useFancybox(lightboxOptions);
    const games = new Map(embeddedGames.map((game) => [game.id, game]));

    return (
        <div
            ref={fancyboxRef}
            className="article-content min-w-0 space-y-6 font-text text-lg leading-relaxed text-slate-100 [&>blockquote]:border-l-2 [&>blockquote]:border-likar3 [&>blockquote]:pl-5 [&>h2]:font-heading [&>h2]:text-3xl [&>h3]:font-heading [&>h3]:text-2xl [&>ol]:list-decimal [&>ol]:pl-6 [&>ul]:list-disc [&>ul]:pl-6"
        >
            {parse(content, {
                replace(node) {
                    if (!(node instanceof Element)) return;
                    if (
                        node.name === 'div' &&
                        node.attribs['data-likar-widget'] === 'game'
                    ) {
                        const game = games.get(
                            Number(node.attribs['data-game-id']),
                        );
                        return game ? (
                            <ArticleGameCard
                                game={game}
                                display={gameEmbedDisplay(
                                    node.attribs['data-game-display'],
                                )}
                            />
                        ) : (
                            <p className="rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-400">
                                Ova utakmica više nije dostupna.
                            </p>
                        );
                    }
                    if (node.name === 'img') {
                        return (
                            <img
                                {...attributesToProps(node.attribs)}
                                alt={node.attribs.alt ?? ''}
                                data-fancybox="article-content"
                                data-caption={lightboxCaption(
                                    node.attribs.alt ?? '',
                                )}
                                loading="lazy"
                                className="h-auto max-w-full cursor-zoom-in rounded-xl"
                            />
                        );
                    }
                },
            })}
        </div>
    );
}
