<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Game;
use App\Models\Playoff;
use App\Models\Season;
use App\Models\TeamSeason;
use App\Services\AdminGameBoxscoreService;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class GameController extends Controller
{
    private const BASE = '/admin-panel/utakmice';

    public function index(Request $request)
    {
        $filters = $request->validate([
            'season_id' => ['nullable', 'integer', 'exists:seasons,id'],
            'status' => ['nullable', Rule::in(['scheduled', 'finished'])],
        ]);
        $games = Game::with(['season:id,name', 'homeTeam:id,name', 'awayTeam:id,name'])
            ->when($filters['season_id'] ?? null, fn ($q, $id) => $q->where('season_id', $id))
            ->when($filters['status'] ?? null, fn ($q, $status) => $q->where('status', $status))
            ->orderByDesc('game_date')->orderByDesc('id')->paginate(15)->withQueryString();
        $draftIds = DB::table('game_boxscore_drafts')->whereIn('game_id', $games->pluck('id'))->pluck('game_id');
        $games->through(fn (Game $game) => [
            ...$this->gameData($game), 'season_name' => $game->season->name,
            'home_name' => $game->homeTeam->name, 'away_name' => $game->awayTeam->name,
            'has_draft' => $draftIds->contains($game->id),
        ]);
        return Inertia::render('admin/utakmice/games', [
            'games' => $games, 'filters' => $filters,
            'seasons' => Season::orderByDesc('start_date')->get(['id', 'name']),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/utakmice/gameForm', $this->options() + ['game' => null, 'locked' => false]);
    }

    public function store(Request $request)
    {
        $data = $this->scheduleData($request);
        $game = DB::transaction(function () use ($data) {
            $game = new Game;
            // Explicit assignment also supports the existing model's limited fillable list.
            foreach ($data as $key => $value) {
                $game->setAttribute($key, $value);
            }
            $game->status = 'scheduled';
            $game->save();
            return $game;
        });
        return redirect(self::BASE.'/'.$game->id.'/boxscore')->with('success', 'Utakmica je dodana u raspored.');
    }

    public function edit(Game $game)
    {
        return Inertia::render('admin/utakmice/gameForm', $this->options() + [
            'game' => $this->gameData($game), 'locked' => $this->hasBoxscore($game),
        ]);
    }

    public function update(Request $request, Game $game)
    {
        $request->validate(['revision' => ['required', 'integer', 'min:0']]);
        DB::transaction(function () use ($request, $game): void {
            $game = Game::whereKey($game->id)->lockForUpdate()->firstOrFail();
            $this->checkRevision($game, $request);
            $data = $this->scheduleData($request, $game);
            if ($this->hasBoxscore($game)) {
                foreach (['season_id', 'home_team_id', 'away_team_id', 'playoff_id', 'playoff_round'] as $key) {
                    if ((string) $game->getAttribute($key) !== (string) $data[$key]) {
                        throw ValidationException::withMessages([$key => 'Nakon unosa zapisnika nije moguće mijenjati sezonu, ekipe ili fazu natjecanja.']);
                    }
                }
            }
            foreach ($data as $key => $value) {
                $game->setAttribute($key, $value);
            }
            $game->admin_revision++;
            $game->save();
        });
        return redirect(self::BASE.'/'.$game->id.'/edit')->with('success', 'Raspored je spremljen.');
    }

    public function boxscore(Game $game, AdminGameBoxscoreService $service)
    {
        $game->load(['homeTeam:id,name', 'awayTeam:id,name', 'season:id,name']);
        $draft = DB::table('game_boxscore_drafts')->where('game_id', $game->id)->first();
        $players = $draft ? json_decode($draft->players, true, 512, JSON_THROW_ON_ERROR)
            : $game->playerStats()->get()->map(fn ($row) => [
                'player_id' => $row->player_id, 'team_id' => $row->team_id,
                'is_starter' => (bool) $row->is_starter,
                ...array_map('intval', $row->only(AdminGameBoxscoreService::FIELDS)),
            ])->all();
        return Inertia::render('admin/utakmice/boxscore', [
            'game' => [...$this->gameData($game), 'home_name' => $game->homeTeam->name,
                'away_name' => $game->awayTeam->name, 'season_name' => $game->season->name],
            'roster' => $service->roster($game), 'players' => $players, 'hasDraft' => $draft !== null,
        ]);
    }

    public function saveBoxscore(Request $request, Game $game, AdminGameBoxscoreService $service)
    {
        $input = $request->validate([
            'revision' => ['required', 'integer', 'min:0'],
            'intent' => ['required', Rule::in(['draft', 'publish'])],
            'players' => ['present', 'array', 'max:100'],
        ]);
        DB::transaction(function () use ($request, $game, $input, $service): void {
            $game = Game::whereKey($game->id)->lockForUpdate()->firstOrFail();
            $this->checkRevision($game, $request);
            $publish = $input['intent'] === 'publish';
            if ($publish && CarbonImmutable::parse($game->game_date, config('app.timezone'))->isFuture()) {
                throw ValidationException::withMessages(['players' => 'Buduća utakmica ne može biti završena. Provjerite termin.']);
            }
            $rows = $service->validatePlayers($game, $input['players'], $publish);
            $service->save($game, $rows, $publish);
            $game->admin_revision++;
            $game->save();
        });
        return redirect(self::BASE.'/'.$game->id.'/boxscore')->with('success',
            $input['intent'] === 'publish' ? 'Rezultat i statistika su objavljeni.' : 'Nacrt je spremljen. Javni rezultati nisu promijenjeni.');
    }

    public function discardDraft(Request $request, Game $game)
    {
        $request->validate(['revision' => ['required', 'integer', 'min:0']]);
        DB::transaction(function () use ($request, $game): void {
            $game = Game::whereKey($game->id)->lockForUpdate()->firstOrFail();
            $this->checkRevision($game, $request);
            DB::table('game_boxscore_drafts')->where('game_id', $game->id)->delete();
            $game->admin_revision++;
            $game->save();
        });
        return redirect(self::BASE.'/'.$game->id.'/boxscore')->with('success', 'Nacrt je odbačen. Objavljeni podaci nisu promijenjeni.');
    }

    public function destroy(Request $request, Game $game)
    {
        $request->validate(['revision' => ['required', 'integer', 'min:0']]);
        DB::transaction(function () use ($request, $game): void {
            $game = Game::whereKey($game->id)->lockForUpdate()->firstOrFail();
            $this->checkRevision($game, $request);
            $game->delete(); // Existing foreign keys also delete stats; new draft FK cascades.
        });
        return redirect(self::BASE)->with('success', 'Utakmica i pripadajuća statistika su izbrisane.');
    }

    private function checkRevision(Game $game, Request $request): void
    {
        if ((int) $game->admin_revision !== $request->integer('revision')) {
            throw ValidationException::withMessages(['revision' => 'Utakmica je u međuvremenu izmijenjena. Otvorite je u novoj kartici i usporedite podatke prije ponovnog spremanja.']);
        }
    }

    private function hasBoxscore(Game $game): bool
    {
        return $game->status === 'finished' || $game->playerStats()->exists()
            || DB::table('game_boxscore_drafts')->where('game_id', $game->id)->exists();
    }

    private function options(): array
    {
        return [
            'seasons' => Season::orderByDesc('start_date')->get(['id', 'name', 'is_active']),
            'teams' => TeamSeason::with('team:id,name')->get()->map(fn ($row) => [
                'id' => $row->team_id, 'season_id' => $row->season_id, 'name' => $row->team->name,
            ])->values(),
            'playoffs' => Playoff::orderByDesc('id')->get(['id', 'season_id', 'name']),
            'timezone' => config('app.timezone'),
        ];
    }

    private function gameData(Game $game): array
    {
        return [
            ...$game->only(['id', 'season_id', 'home_team_id', 'away_team_id', 'playoff_id', 'playoff_round',
                'round_number', 'home_score', 'away_score', 'status']),
            // datetime-local is intentionally interpreted in the application's configured timezone.
            'game_date' => CarbonImmutable::parse($game->game_date)->format('Y-m-d\TH:i'),
            'revision' => (int) $game->admin_revision,
        ];
    }

    private function scheduleData(Request $request, ?Game $game = null): array
    {
        $data = $request->validate([
            'season_id' => ['required', 'integer', 'exists:seasons,id'],
            'home_team_id' => ['required', 'integer', 'exists:teams,id', 'different:away_team_id'],
            'away_team_id' => ['required', 'integer', 'exists:teams,id'],
            'game_date' => ['required', 'date_format:Y-m-d\TH:i'],
            'round_number' => ['required', 'integer', 'min:1', 'max:1000'],
            'playoff_id' => ['nullable', 'integer', 'exists:playoffs,id'],
            'playoff_round' => ['nullable', Rule::in(['quarterfinal', 'semifinal', 'final'])],
        ]);
        $data['playoff_id'] = $data['playoff_id'] ?? null;
        $data['playoff_round'] = $data['playoff_round'] ?? null;
        foreach (['home_team_id', 'away_team_id'] as $field) {
            // Historical games remain editable even if a team was removed from the season afterwards.
            $unchanged = $game && (int) $game->season_id === (int) $data['season_id']
                && (int) $game->getAttribute($field) === (int) $data[$field];
            if (!$unchanged && !TeamSeason::where('season_id', $data['season_id'])->where('team_id', $data[$field])->exists()) {
                throw ValidationException::withMessages([$field => 'Ekipa nije prijavljena u odabranu sezonu.']);
            }
        }
        if ($data['playoff_id'] && !Playoff::whereKey($data['playoff_id'])->where('season_id', $data['season_id'])->exists()) {
            throw ValidationException::withMessages(['playoff_id' => 'Doigravanje ne pripada odabranoj sezoni.']);
        }
        if ((bool) $data['playoff_id'] !== (bool) $data['playoff_round']) {
            throw ValidationException::withMessages(['playoff_round' => 'Odaberite doigravanje i fazu zajedno.']);
        }
        if ($game?->status === 'finished' && CarbonImmutable::parse($data['game_date'], config('app.timezone'))->isFuture()) {
            throw ValidationException::withMessages(['game_date' => 'Završenu utakmicu nije moguće premjestiti u budućnost.']);
        }
        $data['game_date'] = CarbonImmutable::createFromFormat('!Y-m-d\TH:i', $data['game_date'], config('app.timezone'))->format('Y-m-d H:i:s');
        return $data;
    }
}
