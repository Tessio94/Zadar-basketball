export default function Footer() {
    return (
        <footer className="relative z-10 overflow-hidden border-t border-likar1 bg-likar2 bg-[url(/snow4.jpg)] bg-cover bg-no-repeat px-10 py-5">
            <div className="mx-auto flex w-fit flex-col items-center justify-center gap-5 rounded-4xl border border-slate-100/30 bg-likar4/50 p-3">
                <a href="#">
                    <img
                        src="/logo.png"
                        className="h-30 w-30"
                        alt="Likar Krombacher"
                    />
                </a>
                <div className="flex flex-col items-center gap-4">
                    <p className="font-text text-lg text-slate-100">
                        Zadar, Hrvatska 23000
                    </p>
                    <p className="font-text text-lg text-slate-100">
                        email: <span>likarzadar@gmail.com</span>
                    </p>
                </div>
                <div className="flex items-center gap-5 rounded-4xl bg-likar2/80 px-5 py-2">
                    <a
                        href="https://www.instagram.com/ivan_radicev/"
                        target="_blank"
                        className="group text-pink-600"
                    >
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 512 512"
                            className="h-9 w-9 rounded-xl p-1 transition-all duration-300 group-hover:scale-120"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M336 96c21.2 0 41.3 8.4 56.5 23.5S416 154.8 416 176v160c0 21.2-8.4 41.3-23.5 56.5S357.2 416 336 416H176c-21.2 0-41.3-8.4-56.5-23.5S96 357.2 96 336V176c0-21.2 8.4-41.3 23.5-56.5S154.8 96 176 96h160m0-32H176c-61.6 0-112 50.4-112 112v160c0 61.6 50.4 112 112 112h160c61.6 0 112-50.4 112-112V176c0-61.6-50.4-112-112-112z"></path>
                            <path d="M360 176c-13.3 0-24-10.7-24-24s10.7-24 24-24c13.2 0 24 10.7 24 24s-10.8 24-24 24zM256 192c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64m0-32c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96z"></path>
                        </svg>
                    </a>
                    <a
                        href="https://web.facebook.com/RadicevIvan/?locale=hr_HR&amp;_rdc=1&amp;_rdr#"
                        target="_blank"
                        className="group text-blue-600"
                    >
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 512 512"
                            className="h-9 w-9 rounded-xl p-1 transition-all duration-300 group-hover:scale-120"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M426.8 64H85.2C73.5 64 64 73.5 64 85.2v341.6c0 11.7 9.5 21.2 21.2 21.2H256V296h-45.9v-56H256v-41.4c0-49.6 34.4-76.6 78.7-76.6 21.2 0 44 1.6 49.3 2.3v51.8h-35.3c-24.1 0-28.7 11.4-28.7 28.2V240h57.4l-7.5 56H320v152h106.8c11.7 0 21.2-9.5 21.2-21.2V85.2c0-11.7-9.5-21.2-21.2-21.2z"></path>
                        </svg>
                    </a>
                    <a
                        href="https://www.youtube.com/@ivanradicev7934"
                        target="_blank"
                        className="group text-red-600"
                    >
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 512 512"
                            className="h-9 w-9 rounded-xl p-1 transition-all duration-300 group-hover:scale-120"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M508.6 148.8c0-45-33.1-81.2-74-81.2C379.2 65 322.7 64 265 64h-18c-57.6 0-114.2 1-169.6 3.6C36.6 67.6 3.5 104 3.5 149 1 184.6-.1 220.2 0 255.8c-.1 35.6 1 71.2 3.4 106.9 0 45 33.1 81.5 73.9 81.5 58.2 2.7 117.9 3.9 178.6 3.8 60.8.2 120.3-1 178.6-3.8 40.9 0 74-36.5 74-81.5 2.4-35.7 3.5-71.3 3.4-107 .2-35.6-.9-71.2-3.3-106.9zM207 353.9V157.4l145 98.2-145 98.3z"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
}
