/* =========================================================
   STARBUCKS EXPERIENCE
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const loadingScreen =
    document.getElementById("loadingScreen");

const loadingLogo =
    document.getElementById("loadingLogo");

const loadingBrand =
    document.querySelector(".loadingBrand");

const particles =
    document.getElementById("particles");

const videoOne =
    document.getElementById("backgroundVideo1");

const videoTwo =
    document.getElementById("backgroundVideo2");


/* =========================================================
   BACKGROUND VIDEOS
========================================================= */

const videos = [

    "images/video1.mp4",

    "images/video2.mp4",

    "images/video3.mp4",

    "images/video4.mp4"

];


/* =========================================================
   REFRESH VIDEO SYSTEM
========================================================= */

let savedIndex =
    parseInt(
        localStorage.getItem(
            "starbucksVideoIndex"
        )
    );


if (
    isNaN(savedIndex) ||
    savedIndex < 0 ||
    savedIndex >= videos.length
) {

    savedIndex = 0;

}


let currentIndex =
    savedIndex;


/* Save next video */

localStorage.setItem(
    "starbucksVideoIndex",
    (
        currentIndex + 1
    ) % videos.length
);


/* =========================================================
   VIDEO VARIABLES
========================================================= */

let activeVideo =
    videoOne;

let inactiveVideo =
    videoTwo;

let nextIndex =
    (
        currentIndex + 1
    ) % videos.length;


/* =========================================================
   LOAD VIDEO
========================================================= */

function loadVideo(
    videoElement,
    videoPath
) {

    videoElement.src =
        videoPath;

    videoElement.load();

    videoElement.muted =
        true;

    videoElement.playsInline =
        true;

}


/* =========================================================
   LOAD FIRST VIDEO
========================================================= */

loadVideo(
    videoOne,
    videos[currentIndex]
);


/* =========================================================
   PLAY VIDEO
========================================================= */

function startVideo() {

    activeVideo
        .play()
        .catch(() => {

            console.log(
                "Video autoplay waiting..."
            );

        });

}


/* =========================================================
   DUST PARTICLES
========================================================= */

function createParticles() {

    if (!particles) return;


    particles.innerHTML = "";


    const count =
        window.innerWidth <= 600
            ? 60
            : 120;


    for (
        let i = 0;
        i < count;
        i++
    ) {


        const particle =
            document.createElement("span");


        particle.classList.add(
            "particle"
        );


        particle.style.left =
            "50%";

        particle.style.top =
            "50%";


        const startX =
            (
                Math.random() - .5
            ) *
            window.innerWidth;


        const startY =
            (
                Math.random() - .5
            ) *
            window.innerHeight;


        particle.style.setProperty(
            "--startX",
            `${startX}px`
        );


        particle.style.setProperty(
            "--startY",
            `${startY}px`
        );


        particle.style.setProperty(
            "--duration",
            `${2.2 + Math.random() * 1.8}s`
        );


        particle.style.setProperty(
            "--delay",
            `${Math.random() * 1.1}s`
        );


        const size =
            1.5 +
            Math.random() * 3.5;


        particle.style.width =
            `${size}px`;

        particle.style.height =
            `${size}px`;


        particles.appendChild(
            particle
        );

    }

}


createParticles();


/* =========================================================
   LOADING ANIMATION
========================================================= */

window.addEventListener(
    "load",
    () => {


        /* LOGO */

        setTimeout(
            () => {

                if (loadingLogo) {

                    loadingLogo.classList.add(
                        "show"
                    );

                }

            },
            500
        );


        /* BRAND */

        setTimeout(
            () => {

                if (loadingBrand) {

                    loadingBrand.classList.add(
                        "show"
                    );

                }

            },
            1300
        );


        /* HIDE LOADING */

        setTimeout(
            () => {

                if (loadingScreen) {

                    loadingScreen.classList.add(
                        "hide"
                    );

                }


                startVideo();

            },
            3300
        );

    }
);


/* =========================================================
   NEXT VIDEO
========================================================= */

function playNextVideo() {


    nextIndex =
        (
            currentIndex + 1
        ) % videos.length;


    loadVideo(
        inactiveVideo,
        videos[nextIndex]
    );


    const handleCanPlay =
        () => {


            inactiveVideo.removeEventListener(
                "canplay",
                handleCanPlay
            );


            inactiveVideo.classList.add(
                "active"
            );


            activeVideo.classList.remove(
                "active"
            );


            inactiveVideo
                .play()
                .catch(() => {});


            const temp =
                activeVideo;


            activeVideo =
                inactiveVideo;


            inactiveVideo =
                temp;


            currentIndex =
                nextIndex;

        };


    inactiveVideo.addEventListener(
        "canplay",
        handleCanPlay
    );

}


/* =========================================================
   VIDEO ENDED
========================================================= */

videoOne.addEventListener(
    "ended",
    () => {

        playNextVideo();

    }
);


videoTwo.addEventListener(
    "ended",
    () => {

        playNextVideo();

    }
);


/* =========================================================
   VIDEO ERROR
========================================================= */

videoOne.addEventListener(
    "error",
    () => {

        console.error(
            "Cannot load video 1"
        );

    }
);


videoTwo.addEventListener(
    "error",
    () => {

        console.error(
            "Cannot load video 2"
        );

    }
);


/* =========================================================
   RESIZE PARTICLES
========================================================= */

window.addEventListener(
    "resize",
    () => {

        createParticles();

    }
);


/* =========================================================
   SUMMER IMAGE ANIMATION
========================================================= */

const summerSection =
    document.getElementById("summer");


const summerImage =
    document.querySelector(
        ".summerImageWrapper"
    );


const summerContent =
    document.querySelector(
        ".summerContent"
    );


const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        if (summerImage) {

                            summerImage.style.animation =
                                "summerImageIn 1.2s cubic-bezier(.2,.8,.2,1) forwards";

                        }

                    }

                }
            );

        },

        {
            threshold: .35
        }

    );


if (summerSection) {

    observer.observe(
        summerSection
    );

}


/* =========================================================
   MADE FOR SUMMER CARD REVEAL
========================================================= */

const gallerySection =
    document.getElementById(
        "summerGallery"
    );


const galleryCards =
    document.querySelectorAll(
        ".summerCard"
    );


const galleryObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        galleryCards.forEach(
                            (card, index) => {

                                setTimeout(
                                    () => {

                                        card.classList.add(
                                            "visible"
                                        );

                                    },
                                    index * 150
                                );

                            }
                        );

                    }

                }
            );

        },

        {
            threshold: .2
        }

    );


if (gallerySection) {

    galleryObserver.observe(
        gallerySection
    );

}


/* =========================================================
   CARD CLICK EFFECT
========================================================= */

galleryCards.forEach(
    (card) => {

        card.addEventListener(
            "click",
            () => {

                card.classList.toggle(
                    "selected"
                );

            }
        );

    }
); 

/* =========================================================
   FLOATING MUSIC PLAYER
========================================================= */

const music =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");


let musicPlaying = false;


/* =========================================================
   MUSIC BUTTON
========================================================= */

musicButton.addEventListener(
    "click",
    async () => {

        if (!musicPlaying) {

            try {

                await music.play();

                musicPlaying = true;

                musicButton.classList.add(
                    "playing"
                );

                musicButton.setAttribute(
                    "aria-label",
                    "Pause music"
                );

                musicButton.setAttribute(
                    "title",
                    "Pause music"
                );

            } catch (error) {

                console.log(
                    "Music could not start:",
                    error
                );

            }

        } else {

            music.pause();

            musicPlaying = false;

            musicButton.classList.remove(
                "playing"
            );

            musicButton.setAttribute(
                "aria-label",
                "Play music"
            );

            musicButton.setAttribute(
                "title",
                "Play music"
            );

        }

    }
);