<?php

declare(strict_types=1);

namespace App\Http\Requests\Admin;

use App\Models\Game;
use App\Support\ArticleHtml;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class ArticleRequest extends FormRequest
{
    public function authorize(): bool
    {
        // These routes inherit the project's admin middleware / permission gate.
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255', Rule::unique('articles', 'title')->ignore($this->route('article'))],
            'slug' => ['required', 'string', 'max:255', Rule::unique('articles', 'slug')->ignore($this->route('article'))],
            'content' => ['required', 'string', 'max:' . ArticleHtml::MAX_LENGTH],
            'excerpt' => ['nullable', 'string', 'max:2000'],
            'status' => ['required', Rule::in(['published', 'draft'])],
            'published_at' => ['nullable', 'date'],
            'gallery_id' => ['nullable', 'integer', Rule::exists('galleries', 'id')],
            'main_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp,gif', 'max:2048'],
        ];
    }

    public function after(): array
    {
        return [function(Validator $validator): void {
            if ($validator->errors()->has('content')) {
                return;
            }
            try {
                $ids = app(ArticleHtml::class)->gameIds($this->string('content')->toString(), true);
                if (count($ids) !== Game::query()->whereIn('id', $ids)->count()) {
                    $validator->errors()->add('content', 'Jedna od umetnutih utakmica više ne postoji. Uklonite karticu ili odaberite drugu utakmicu.');
                }
            } catch (ValidationException $exception) {
                $validator->errors()->add('content', $exception->errors()['content'][0]);
            }
        }];
    }
}
