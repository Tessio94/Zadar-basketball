{{-- The canonical homepage identifies the site name for search engines. --}}
@if (request()->routeIs('home'))
    @verbatim
    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://likarzadar.com/#website",
            "name": "Likar Zadar",
            "alternateName":  "LIKAR",
            "url": "https://likarzadar.com/"
        }
    </script>
    @endverbatim
@endif
