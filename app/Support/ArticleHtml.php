<?php

declare(strict_types=1);

namespace App\Support;

use DOMXPath;
use DOMDocument;
use HTMLPurifier;
use HTMLPurifier_Config;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\ValidationException;

class ArticleHtml
{
    public const MAX_LENGTH = 200000;

    public function sanitize(string $html): string
    {
        File::ensureDirectoryExists(storage_path('framework/cache/htmlpurifier'));
        $config = HTMLPurifier_Config::createDefault();
        $config->set('Core.Encoding', 'UTF-8');
        $config->set('Cache.SerializerPath', storage_path('framework/cache/htmlpurifier'));
        $config->set('HTML.DefinitionID', 'likar-article-v1');
        $config->set('HTML.DefinitionRev', 1);
        $config->set('URI.AllowedSchemes', ['http' => true, 'https' => true, 'mailto' => true]);
        $config->set('HTML.TargetBlank', true);
        if ($definition = $config->maybeGetRawHTMLDefinition()) {
            $definition->addAttribute('div', 'data-likar-widget', 'Enum#game');
            $definition->addAttribute('div', 'data-game-id', 'Number');
            $definition->addAttribute('div', 'contenteditable', 'Enum#false');
            $definition->addElement('figure', 'Block', 'Flow', 'Common');
            $definition->addElement('figcaption', 'Block', 'Flow', 'Common');
        }

        return (new HTMLPurifier($config))->purify($html);
    }

    /** @return list<int> */
    public function gameIds(string $html, bool $strict = false): array
    {
        $document = new DOMDocument();
        $previous = libxml_use_internal_errors(true);
        try {
            $document->loadHTML('<?xml encoding="UTF-8"><html><body>' . $html . '</body></html>', LIBXML_NONET);
            $nodes = (new DOMXPath($document))->query('//div[@data-likar-widget="game"]');
            $ids = [];
            foreach ($nodes as $node) {
                $id = filter_var($node->getAttribute('data-game-id'), FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
                if ($id === false) {
                    if ($strict) {
                        throw ValidationException::withMessages(['content' => 'Kartica utakmice nema ispravan ID. Uklonite je i ponovno umetnite.']);
                    }

                    continue;
                }
                $ids[] = $id;
            }
            if ($strict && count($ids) > 20) {
                throw ValidationException::withMessages(['content' => 'U članak možete umetnuti najviše 20 kartica utakmica.']);
            }

            return array_values(array_unique(array_slice($ids, 0, 20)));
        } finally {
            libxml_clear_errors();
            libxml_use_internal_errors($previous);
        }
    }
}
