import type { GameEmbedDisplay } from '@/types/articles';

/** Older widgets have no mode attribute and retain their automatic results. */
export function gameEmbedDisplay(value: unknown): GameEmbedDisplay {
    return value === 'preview' ? 'preview' : 'results';
}

export function gameEmbedDescription(display: GameEmbedDisplay): string {
    return display === 'preview'
        ? 'Najava: uvijek prikazuje VS, bez rezultata, četvrtina i strijelaca, čak i nakon odigrane utakmice.'
        : 'Rezultat i strijelci: rezultat, četvrtine i poeni igrača ažuriraju se nakon unosa zapisnika.';
}
