<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GameResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
         return [
            'round_number' => $this->round_number,
            'game_id' => $this->id,
            'home_score' => $this->home_score,
            'home_team' => $this->whenLoaded('homeTeam', fn() => [
                'name' => $this->homeTeam->name,
                'short_name' => $this->homeTeam->short_name,
                'logo' => $this->homeTeam->logo
            ]),
            'away_score' => $this->away_score,
            'away_team' => $this->whenLoaded('awayTeam', fn() => [
                'name' => $this->awayTeam->name,
                'short_name' => $this->awayTeam->short_name,
                'logo' => $this->awayTeam->logo
            ]),
        ];
    }
}
