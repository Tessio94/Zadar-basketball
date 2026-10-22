# Games administration

Copy these files into your Laravel project, preserving the folder paths. This package adds **Admin → Utakmice** and connects the dashboard's **Dodaj utakmice** button.

## Install

1. Copy the new controller, service, migration, React pages/components, and feature test.
2. Merge the included `routes/web.php`, `resources/js/components/app-sidebar.tsx`, and dashboard `addOptions.tsx` if you have changed those files since the uploaded project. Only the game routes and game links are new; an integration diff is included for these three existing files.
3. Run:

```sh
php artisan migrate
php artisan optimize:clear
npm run build
php artisan test tests/Feature/Admin/GameManagementTest.php
```

Use your project's isolated testing database for tests (its supplied phpunit.xml uses in-memory SQLite). Never point the test environment at your real league database.

**Do not run migrate:fresh or reseed.** The migration preserves existing games. No additional npm packages, model changes, or public-page replacements are required. New links use ordinary URLs; generated Wayfinder actions are not required by the new pages.

## Workflow

1. **Nova utakmica:** choose season, home team, away team, date/time and round. Only teams registered in the chosen season are offered. It starts as `scheduled` and opens its boxscore page. You may return later to enter results.
2. **Zapisnik:** the editor loads both teams' players from `team_seasons` / `team_season_players`, including season-specific jersey numbers. Mark **Nastup** for participants and **Starter** for the starting lineup. Players without Nastup are omitted from `player_game_stats`, avoiding false appearances.
3. Enter whole minutes, 2P/3P/FT makes and attempts, offensive/defensive rebounds, assists, steals, blocks, turnovers, fouls and plus/minus. Each input has an accessible player-and-stat label. The table scrolls horizontally and keeps the player column visible; Tab moves through inputs.
4. **Spremi nacrt:** saves an incomplete, private draft. The public game score, player statistics and standings stay unchanged. Reopen it to continue.
5. **Završi i objavi:** validates both teams and publishes all player statistics, calculated team scores and `finished` status in one database transaction. The public pages continue reading the existing tables. A future game cannot be published as finished.
6. For an already finished game, **Objavi ispravak** replaces the published boxscore with the edited version. A draft correction leaves the old published version visible until publication.
7. **Odbaci nacrt** removes the private draft and restores the published stats (or an empty editor for an unplayed game). **Izbriši** on the list removes the game, its stats and its draft after confirmation.

## Team statistics and calculations

Team statistics are calculated from the checked players and shown live in each table footer. They are deliberately not entered a second time or stored as duplicate totals.

- Points: `2 × fg2_made + 3 × fg3_made + ft_made`.
- Rebounds: offensive + defensive rebounds.
- EFF matches the formula in the uploaded LeagueSeeder: points + rebounds + assists + steals + blocks − turnovers. Missed shots are not subtracted in that existing formula.
- Shooting percentages use total makes / total attempts, not the average of player percentages. Zero attempts display an em dash.
- The team `+/−` footer is the sum of player plus/minus, not the game's score difference.
- The server recomputes points and EFF; submitted values cannot override them.
- Official team-only rebounds, team-only turnovers, period scores, overtime breakdowns and technical-foul attribution are not separate fields in your existing schema. This implementation covers all current player stat fields and their team sums.
- Minutes remain whole numbers because your current database column is an integer.

Your previously added public GameBoxscoreService / teamTotals implementation can keep reading the published `player_game_stats` rows. This package does not overwrite it or the public GameController.

## Rules and data integrity

- Both teams must belong to the selected season, and a team cannot play itself.
- Playoff scheduling uses existing `playoffs` records belonging to the selected season and the same stage values: `quarterfinal`, `semifinal`, `final`. It does not create a playoff tournament or automatically advance/schedule winners.
- Makes cannot exceed attempts; counting stats cannot be negative. Plus/minus can be negative. At most five starters per team; exactly five is not forced, allowing incomplete historical records.
- Publication requires at least one included player on each side and a non-tied score. Drafts may be empty or incomplete but entered values must still be valid.
- A player can appear only once per game. Season/team membership is checked on the server. Previously published participants remain editable if the season roster later changes. A removed, draft-only participant must be excluded or restored to that roster before saving.
- Once a draft or published boxscore exists, season, teams and competition phase are locked to protect its meaning. Date and round remain editable. Discard a draft to unlock a game that has never been published.
- `admin_revision` plus a database row lock prevents these admin endpoints from silently overwriting an intervening edit. Stale changes remain in the form with an explanation to compare against a fresh tab. Other future writers of games must participate in the same revision protocol to get this protection.
- Drafts are stored in a separate `game_boxscore_drafts` table, never in the publicly serialized Game attributes or player statistics.
- Routes stay inside your existing `auth` / `verified` admin group. This preserves the project's current access model; it does not introduce a new administrator role.

## Dates

The schedule's datetime input uses `config('app.timezone')`, displayed directly below it. The existing game_date column has no timezone. This package does not silently convert old records or change the application's timezone. If the app currently uses UTC, enter UTC times; changing the entire app to Europe/Zagreb requires reviewing how existing dates were stored.

## Included files

- `app/Http/Controllers/Admin/GameController.php`: list, schedule CRUD, editor, draft/publish/discard actions.
- `app/Services/AdminGameBoxscoreService.php`: roster, validation, calculations and persistence.
- `database/migrations/2026_10_22_120000_add_game_admin_editing.php`: revision column and private draft table.
- `resources/js/pages/admin/utakmice/`: listing, scheduling form and boxscore page.
- `resources/js/components/admin/games/`: editor tables, shared types/calculations and admin shell.
- Three integration files and `integration.patch` for routes/navigation.
- `tests/Feature/Admin/GameManagementTest.php`: Laravel integration coverage.

## Validation performed

- PHP syntax parsing for all delivered PHP files.
- ESLint checks for the new components/pages, including React Hooks rules.
- Strict TypeScript check for new pages/components against React 19 and Inertia 2.3.7, with existing layout wrappers stubbed.
- React/jsdom interaction tests with the real Inertia useForm: participant and starter toggles, live scores/percentages, draft and publish payloads, new-revision refresh, unsaved-change warning, and season/team/playoff selection.
- PHP 8.4 execution of the actual service logic for calculation, roster/shot/final-score checks, private drafts and publication writes, with Laravel Validator/database adapters stubbed.

The included Laravel feature suite, a full project build, PostgreSQL transactions and rendered browser appearance could not be executed here because the workspace has no native PHP/Composer installation or installed project vendor dependencies. Run the commands above in your local project before deploying.
