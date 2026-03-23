<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $title = $this->faker->sentence(6, true);

        return [
            //
            'title' => $title,
            'slug' => Str::slug($title),
            'content' => $this->faker->text(),
            'excerpt' => $this->faker->optional()->sentence(20),
            'status' => $this->faker->randomElement(['draft', 'published']),
            'published_at' => $this->faker->optional()->dateTime(),
            'main_image' => '/images/articles/article' . $this->faker->numberBetween(1, 20) . '.jpg',
            'meta_title' => $this->faker->optional()->sentence(6),
            'meta_description' => $this->faker->optional()->sentence(15),
            'created_at' => now(),
            'updated_at' => now(),

        ];
    }
}
