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

const homePage =
    document.getElementById("homePage");

const particles =
    document.getElementById("particles");

const videoOne =
    document.getElementById("backgroundVideo1");

const videoTwo =
    document.getElementById("backgroundVideo2");


/* =========================================================
   BACKGROUND MUSIC
========================================================= */

/*
   Folder structure:

   StarBucks/
   │
   ├── music/
   │   └── music/1.mp3
   │
   ├── images/
   ├── index.html
   ├── script.js
   └── style.css
*/

const backgroundMusic =
    new Audio("music/1.mp3");

backgroundMusic.loop = true;
backgroundMusic.volume = 0.35;
backgroundMusic.preload = "auto";


/* =========================================================
   START MUSIC
========================================================= */

function startMusic() {

    if (!backgroundMusic) return;

    backgroundMusic
        .play()
        .then(() => {

            console.log(
                "🎵 Background music is playing!"
            );

        })
        .catch((error) => {

            console.log(
                "🔇 Autoplay blocked by browser.",
                error
            );

        });
}


/* =========================================================
   MUSIC FALLBACK
========================================================= */

/*
   Chrome/Edge may block unmuted autoplay.

   If that happens, the music will start
   when the user first clicks/touches/presses
   a key.
*/

function startMusicFromInteraction() {

    if (
        backgroundMusic.paused
    ) {

        backgroundMusic
            .play()
            .then(() => {

                console.log(
                    "🎵 Music started after user interaction!"
                );

            })
            .catch(() => {});

    }

    document.removeEventListener(
        "click",
        startMusicFromInteraction
    );

    document.removeEventListener(
        "pointerdown",
        startMusicFromInteraction
    );

    document.removeEventListener(
        "keydown",
        startMusicFromInteraction
    );

    document.removeEventListener(
        "touchstart",
        startMusicFromInteraction
    );
}


document.addEventListener(
    "click",
    startMusicFromInteraction
);

document.addEventListener(
    "pointerdown",
    startMusicFromInteraction
);

document.addEventListener(
    "keydown",
    startMusicFromInteraction
);

document.addEventListener(
    "touchstart",
    startMusicFromInteraction
);


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

/*
   Every refresh changes the video:

   Refresh 1 → video1
   Refresh 2 → video2
   Refresh 3 → video3
   Refresh 4 → video4
   Refresh 5 → video1
*/

let savedIndex =
    parseInt(
        localStorage.getItem(
            "starbucksVideoIndex"
        )
    );


/* Check saved index */

if (
    isNaN(savedIndex) ||
    savedIndex < 0 ||
    savedIndex >= videos.length
) {

    savedIndex = 0;

}


/* Current video */

let currentIndex =
    savedIndex;


/* Save next video for next refresh */

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


/* =========================================================
   NEXT VIDEO
========================================================= */

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

    if (!videoElement) return;

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
   CREATE DUST PARTICLES
========================================================= */

function createParticles() {

    if (!particles) return;

    particles.innerHTML = "";


    const particleCount =
        window.innerWidth <= 600
            ? 60
            : 120;


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const particle =
            document.createElement("span");


        particle.classList.add(
            "particle"
        );


        /*
           Start from center
           then spread outward.
        */

        particle.style.left =
            "50%";

        particle.style.top =
            "50%";


        const startX =
            (
                Math.random() - 0.5
            ) * window.innerWidth;


        const startY =
            (
                Math.random() - 0.5
            ) * window.innerHeight;


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


        /* -----------------------------------------
           STEP 1
           Logo appears
        ----------------------------------------- */

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


        /* -----------------------------------------
           STEP 2
           Brand appears
        ----------------------------------------- */

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


        /* -----------------------------------------
           STEP 3
           Homepage appears
        ----------------------------------------- */

        setTimeout(
            () => {

                if (loadingScreen) {

                    loadingScreen.classList.add(
                        "hide"
                    );

                }


                if (homePage) {

                    homePage.classList.add(
                        "show"
                    );

                }


                /* Start background video */

                if (activeVideo) {

                    activeVideo
                        .play()
                        .catch(() => {});

                }


                /* =================================
                   START MUSIC
                ================================= */

                startMusic();

            },
            3300
        );

    }
);


/* =========================================================
   VIDEO CHANGE SYSTEM
========================================================= */

/*
   After one video ends:

   video1 → video2
   video2 → video3
   video3 → video4
   video4 → video1
*/

function playNextVideo() {

    nextIndex =
        (
            currentIndex + 1
        ) % videos.length;


    /* Load next video */

    loadVideo(
        inactiveVideo,
        videos[nextIndex]
    );


    /* Wait until video can play */

    const handleCanPlay =
        () => {

            inactiveVideo.removeEventListener(
                "canplay",
                handleCanPlay
            );


            /* Show next video */

            inactiveVideo.classList.add(
                "active"
            );


            /* Hide current video */

            activeVideo.classList.remove(
                "active"
            );


            /* Play next video */

            inactiveVideo
                .play()
                .catch(() => {});


            /* Swap video elements */

            const temp =
                activeVideo;


            activeVideo =
                inactiveVideo;


            inactiveVideo =
                temp;


            /* Update index */

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

if (videoOne) {

    videoOne.addEventListener(
        "ended",
        () => {

            playNextVideo();

        }
    );

}


if (videoTwo) {

    videoTwo.addEventListener(
        "ended",
        () => {

            playNextVideo();

        }
    );

}


/* =========================================================
   VIDEO ERROR
========================================================= */

if (videoOne) {

    videoOne.addEventListener(
        "error",
        () => {

            console.error(
                "Cannot load video:",
                videoOne.src
            );

        }
    );

}


if (videoTwo) {

    videoTwo.addEventListener(
        "error",
        () => {

            console.error(
                "Cannot load video:",
                videoTwo.src
            );

        }
    );

}


/* =========================================================
   RESPONSIVE PARTICLES
========================================================= */

window.addEventListener(
    "resize",
    () => {

        createParticles();

    }
);


/* =========================================================
   PAGE EXIT
========================================================= */

window.addEventListener(
    "beforeunload",
    () => {

        if (backgroundMusic) {

            backgroundMusic.pause();

        }

    }
);