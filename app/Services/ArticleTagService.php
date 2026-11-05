<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Tag;
use App\Models\Article;
use Illuminate\Validation\ValidationException;

class ArticleTagService
{
    public const MAX_TAGS = 10;

    public const MAX_LENGTH = 60;

    /** @return list<string> */
    public function parse(string $input): array
    {
        $names = [];
        foreach (explode(',', $input) as $part) {
            $name = trim(preg_replace('/\s+/u', ' ', $part) ?? $part);
            if ($name === '') {
                continue;
            }
            if (mb_strlen($name) > self::MAX_LENGTH) {
                throw ValidationException::withMessages(['tags_input' => 'Svaka oznaka može imati najviše 60 znakova.']);
            }
            $names[mb_strtolower($name)] ??= $name;
        }
        if (count($names) > self::MAX_TAGS) {
            throw ValidationException::withMessages(['tags_input' => 'Članak može imati najviše 10 oznaka.']);
        }

        return array_values($names);
    }

    /** Caller includes the article write and tag sync in one transaction. */
    public function sync(Article $article, string $input): void
    {
        $ids = [];
        foreach ($this->parse($input) as $name) {
            $tag = Tag::firstOrCreate(['normalized_name' => mb_strtolower($name)], ['name' => $name]);
            $ids[] = $tag->id;
        }
        $article->tags()->sync($ids);
    }
}
