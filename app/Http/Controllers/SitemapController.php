<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use App\Services\SitemapService;

class SitemapController extends Controller
{
    public function index(SitemapService $sitemap): Response
    {
        return $this->xml('sitemapindex', 'sitemap', $sitemap->index());
    }

    public function show(SitemapService $sitemap, string $section, string $page): Response
    {
        return $this->xml('urlset', 'url', $sitemap->urls($section, (int) $page));
    }

    /** @param list<string> $locations */
    private function xml(string $root, string $entry, array $locations): Response
    {
        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<' . $root . ' xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

        foreach ($locations as $location) {
            $escaped = htmlspecialchars($location, ENT_XML1 | ENT_QUOTES, 'UTF-8');
            $xml .= "  <{$entry}><loc>{$escaped}</loc></{$entry}>\n";
        }

        $xml .= "</{$root}>\n";

        // Parent updated_at values do not cover changes to rosters, boxscores,
        // embedded games, etc. Omit optional lastmod rather than invent dates.
        return response($xml, 200, [
            'Content-Type' => 'application/xml; charset=UTF-8',
            'Cache-Control' => 'no-store',
        ]);
    }
}
