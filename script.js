/* ==================================================
   ELEMENTS
================================================== */

const loadingScreen =
    document.getElementById("loadingScreen");

const loadingLogo =
    document.getElementById("loadingLogo");

const homePage =
    document.getElementById("homePage");

const particles =
    document.getElementById("particles");

const backgroundVideo =
    document.getElementById("backgroundVideo");


/* ==================================================
   LOADING DUST PARTICLES
================================================== */

function createDust() {

    const particleCount = 180;

    for (let i = 0; i < particleCount; i++) {

        const particle =
            document.createElement("span");

        particle.classList.add("particle");


        /* Random size */

        const size =
            Math.random();

        if (size < .25) {

            particle.classList.add("small");

        } else if (size > .80) {

            particle.classList.add("large");
        }


        /*
            Random starting position
            around the whole screen
        */

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.top =
            Math.random() * 100 + "%";


        /*
            Random movement
            creates dust-like motion
        */

        const startX =
            (Math.random() - .5) * 400;

        const startY =
            (Math.random() - .5) * 400;

        const midX =
            (Math.random() - .5) * 160;

        const midY =
            (Math.random() - .5) * 160;

        const endX =
            (Math.random() - .5) * 70;

        const endY =
            (Math.random() - .5) * 70;

        const finalX =
            (Math.random() - .5) * 300;

        const finalY =
            (Math.random() - .5) * 300;


        particle.style.setProperty(
            "--startX",
            `${startX}px`
        );

        particle.style.setProperty(
            "--startY",
            `${startY}px`
        );

        particle.style.setProperty(
            "--midX",
            `${midX}px`
        );

        particle.style.setProperty(
            "--midY",
            `${midY}px`
        );

        particle.style.setProperty(
            "--endX",
            `${endX}px`
        );

        particle.style.setProperty(
            "--endY",
            `${endY}px`
        );

        particle.style.setProperty(
            "--finalX",
            `${finalX}px`
        );

        particle.style.setProperty(
            "--finalY",
            `${finalY}px`
        );


        /*
            Random animation speed
        */

        const duration =
            2.5 + Math.random() * 2;

        particle.style.setProperty(
            "--duration",
            `${duration}s`
        );


        /*
            Random delay
        */

        particle.style.animationDelay =
            Math.random() * 1.5 + "s";


        particles.appendChild(particle);
    }
}


createDust();


/* ==================================================
   FOUR BACKGROUND VIDEOS
================================================== */

const videos = [

    "images/video1.mp4",

    "images/video2.mp4",

    "images/video3.mp4",

    "images/video4.mp4"

];


/* ==================================================
   SELECT VIDEO FOR THIS REFRESH
================================================== */

/*
    localStorage remembers which video
    was used last time.

    Example:

    Refresh 1 → video1
    Refresh 2 → video2
    Refresh 3 → video3
    Refresh 4 → video4
    Refresh 5 → video1
*/

let lastVideo =
    Number(
        localStorage.getItem(
            "coffeeLastVideo"
        )
    );


/*
    If there is no previous video,
    start at video 1.
*/

if (
    Number.isNaN(lastVideo) ||
    lastVideo < 0 ||
    lastVideo >= videos.length
) {

    lastVideo = -1;
}


/* Get next video */

const currentVideo =
    (lastVideo + 1) % videos.length;


/* Save it */

localStorage.setItem(
    "coffeeLastVideo",
    currentVideo
);


/* ==================================================
   LOAD SELECTED VIDEO
================================================== */

backgroundVideo.src =
    videos[currentVideo];

backgroundVideo.load();


/* ==================================================
   PLAY VIDEO
================================================== */

backgroundVideo.addEventListener(
    "canplay",
    () => {

        backgroundVideo
            .play()
            .catch(() => {});

    },
    { once: true }
);


/* ==================================================
   PAGE LOADING
================================================== */

window.addEventListener(
    "load",
    () => {

        /*
            Give particles time
            to start forming.
        */

        setTimeout(() => {

            loadingLogo.classList.add("show");

        }, 900);


        /*
            After the dust/logo animation,
            go to homepage.
        */

        setTimeout(() => {

            loadingScreen.classList.add("hide");

            homePage.classList.add("show");

        }, 3900);

    }
);