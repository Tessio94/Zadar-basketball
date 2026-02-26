<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Team>
 */
class TeamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company(),
            'short_name' => strtoupper($this->faker->lexify('???')),
            'city' => $this->faker->city(),
            'founded_year' => $this->faker->numberBetween(1980, 2020),
        ];
    }
}
