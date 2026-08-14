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

    Refresh 1 → video 1
    Refresh 2 → video 2
    Refresh 3 → video 3
    Refresh 4 → video 4
    Refresh 5 → video 1
    ...

    The index is saved in localStorage.
*/

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


/* Use current video */

let currentIndex =
    savedIndex;


/* Save NEXT video for next refresh */

localStorage.setItem(
    "starbucksVideoIndex",
    (
        currentIndex + 1
    ) % videos.length
);


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

    videoElement.muted = true;

    videoElement.playsInline = true;

    videoElement
        .play()
        .catch(() => {

            console.log(
                "Video autoplay waiting..."
            );

        });
}


/* Load first video */

loadVideo(
    videoOne,
    videos[currentIndex]
);


/* =========================================================
   PREPARE SECOND VIDEO
========================================================= */

let nextIndex =
    (
        currentIndex + 1
    ) % videos.length;


/* =========================================================
   CREATE DUST PARTICLES
========================================================= */

function createParticles() {

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
            Random starting
            position around screen
        */

        const startX =
            (
                Math.random() - .5
            ) * window.innerWidth;


        const startY =
            (
                Math.random() - .5
            ) * window.innerHeight;


        particle.style.left =
            "50%";

        particle.style.top =
            "50%";


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


        /*
            Random particle size
        */

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


/* Create particles */

createParticles();


/* =========================================================
   LOADING ANIMATION
========================================================= */

window.addEventListener(
    "load",
    () => {


        /* -----------------------------------------
           Step 1 — Logo appears
        ----------------------------------------- */

        setTimeout(
            () => {

                loadingLogo.classList.add(
                    "show"
                );

            },
            500
        );


        /* -----------------------------------------
           Step 2 — Brand appears
        ----------------------------------------- */

        setTimeout(
            () => {

                loadingBrand.classList.add(
                    "show"
                );

            },
            1300
        );


        /* -----------------------------------------
           Step 3 — Go homepage
        ----------------------------------------- */

        setTimeout(
            () => {

                loadingScreen.classList.add(
                    "hide"
                );


                homePage.classList.add(
                    "show"
                );


                /*
                    Start video again
                    when homepage appears.
                */

                videoOne
                    .play()
                    .catch(() => {});


            },
            3300
        );

    }
);


/* =========================================================
   VIDEO CHANGE SYSTEM
========================================================= */

/*
    This part is only needed if you want the
    next video to automatically play AFTER
    the current video ends.

    So:

    video1 → video2 → video3 → video4 → video1
*/


let activeVideo =
    videoOne;

let inactiveVideo =
    videoTwo;


function playNextVideo() {

    nextIndex =
        (
            currentIndex + 1
        ) % videos.length;


    loadVideo(
        inactiveVideo,
        videos[nextIndex]
    );


    /*
        Wait until the next video
        has loaded enough.
    */

    inactiveVideo.addEventListener(
        "canplay",
        function handleCanPlay() {

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


            /*
                Swap videos
            */

            const temp =
                activeVideo;

            activeVideo =
                inactiveVideo;

            inactiveVideo =
                temp;


            currentIndex =
                nextIndex;

        },
        {
            once: true
        }
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
   VIDEO ERROR HANDLING
========================================================= */

videoOne.addEventListener(
    "error",
    () => {

        console.error(
            "Cannot load:",
            videoOne.src
        );

    }
);


videoTwo.addEventListener(
    "error",
    () => {

        console.error(
            "Cannot load:",
            videoTwo.src
        );

    }
);


/* =========================================================
   RESPONSIVE PARTICLES
========================================================= */

window.addEventListener(
    "resize",
    () => {

        createParticles();

    }
);