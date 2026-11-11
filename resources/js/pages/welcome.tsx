import Info from '@/components/myComponents/stranice/naslovnica/info';
import Intro from '@/components/myComponents/stranice/naslovnica/intro';
import Landing from '@/components/myComponents/stranice/naslovnica/landing';
import Seo from '@/components/seo';

export default function Welcome() {
    return (
        <>
            <Seo
                title="LIKAR Zadar | Liga košarkaških amatera i rekreativaca"
                description="LIKAR Zadar — Liga košarkaških amatera i rekreativaca. Pratite raspored utakmica, rezultate, poredak, statistiku i novosti iz lige."
                url="/"
            />
            <Landing />
            <Intro />
            <Info />
        </>
    );
}
