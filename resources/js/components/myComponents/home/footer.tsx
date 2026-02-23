export default function Footer() {
    return (
        <footer className="relative z-10 overflow-hidden bg-likar2 px-10 py-5">
            <div className="mx-auto flex w-fit flex-col items-center justify-center gap-5 rounded-4xl border border-slate-100/30 bg-likar2/20 p-3">
                <img
                    src="/logo.png"
                    className="h-30 w-30"
                    alt="Likar Krombacher"
                />
                <div className="flex flex-col items-center gap-4">
                    <p className="text-lg text-slate-100">
                        Zadar, Hrvatska 23000
                    </p>
                    <p className="text-lg text-slate-100">
                        email: <span>likarzadar@gmail.com</span>
                    </p>
                </div>
                <div className="flex items-center gap-5 rounded-4xl bg-likar2/80 px-5 py-2">
                    <a
                        href="https://wa.me/385989648532"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group text-green-400"
                    >
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 512 512"
                            className="h-9 w-9 rounded-xl p-1 transition-all duration-300 group-hover:scale-120"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M260.062 32C138.605 32 40.134 129.701 40.134 250.232c0 41.23 11.532 79.79 31.559 112.687L32 480l121.764-38.682c31.508 17.285 67.745 27.146 106.298 27.146C381.535 468.464 480 370.749 480 250.232 480 129.701 381.535 32 260.062 32zm109.362 301.11c-5.174 12.827-28.574 24.533-38.899 25.072-10.314.547-10.608 7.994-66.84-16.434-56.225-24.434-90.052-83.844-92.719-87.67-2.669-3.812-21.78-31.047-20.749-58.455 1.038-27.413 16.047-40.346 21.404-45.725 5.351-5.387 11.486-6.352 15.232-6.413 4.428-.072 7.296-.132 10.573-.011 3.274.124 8.192-.685 12.45 10.639 4.256 11.323 14.443 39.153 15.746 41.989 1.302 2.839 2.108 6.126.102 9.771-2.012 3.653-3.042 5.935-5.961 9.083-2.935 3.148-6.174 7.042-8.792 9.449-2.92 2.665-5.97 5.572-2.9 11.269 3.068 5.693 13.653 24.356 29.779 39.736 20.725 19.771 38.598 26.329 44.098 29.317 5.515 3.004 8.806 2.67 12.226-.929 3.404-3.599 14.639-15.746 18.596-21.169 3.955-5.438 7.661-4.373 12.742-2.329 5.078 2.052 32.157 16.556 37.673 19.551 5.51 2.989 9.193 4.529 10.51 6.9 1.317 2.38.901 13.531-4.271 26.359z"></path>
                        </svg>
                    </a>
                    <a
                        href="https://www.instagram.com/ivan_radicev/"
                        target="_blank"
                        className="group text-pink-600"
                    >
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
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
                            stroke-width="0"
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
                            stroke-width="0"
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
