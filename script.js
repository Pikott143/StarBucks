/* =====================================================
   STARBUCKS EXPERIENCE
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

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



/* =====================================================
   BACKGROUND VIDEOS
===================================================== */

const videos = [

    "images/video1.mp4",
    "images/video2.mp4",
    "images/video3.mp4",
    "images/video4.mp4"

];



/* =====================================================
   REFRESH VIDEO SYSTEM
===================================================== */

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


/*
    Save next video.

    Refresh:
    1 → video1
    2 → video2
    3 → video3
    4 → video4
    5 → video1
*/

localStorage.setItem(
    "starbucksVideoIndex",
    (
        currentIndex + 1
    ) % videos.length
);



/* =====================================================
   VIDEO VARIABLES
===================================================== */

let activeVideo =
    videoOne;

let inactiveVideo =
    videoTwo;


let nextIndex =
    (
        currentIndex + 1
    ) % videos.length;



/* =====================================================
   LOAD VIDEO
===================================================== */

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



/* =====================================================
   FIRST VIDEO
===================================================== */

loadVideo(
    videoOne,
    videos[currentIndex]
);



/* =====================================================
   DUST PARTICLES
===================================================== */

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


        particle.style.left =
            "50%";

        particle.style.top =
            "50%";


        const startX =
            (
                Math.random() - .5
            ) * window.innerWidth;


        const startY =
            (
                Math.random() - .5
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



/* =====================================================
   LOADING ANIMATION
===================================================== */

window.addEventListener(
    "load",
    () => {


        /*
            Logo
        */

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



        /*
            Brand
        */

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



        /*
            Homepage
        */

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


                if (activeVideo) {

                    activeVideo
                        .play()
                        .catch(() => {});

                }

            },
            3300
        );

    }
);



/* =====================================================
   NEXT VIDEO
===================================================== */

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



/* =====================================================
   VIDEO ENDED
===================================================== */

videoOne.addEventListener(
    "ended",
    playNextVideo
);


videoTwo.addEventListener(
    "ended",
    playNextVideo
);



/* =====================================================
   VIDEO ERROR
===================================================== */

videoOne.addEventListener(
    "error",
    () => {

        console.error(
            "Cannot load video:",
            videos[currentIndex]
        );

    }
);


videoTwo.addEventListener(
    "error",
    () => {

        console.error(
            "Cannot load next video."
        );

    }
);



/* =====================================================
   SUMMER CLUB SCROLL ANIMATION
===================================================== */

const summerSection =
    document.querySelector(
        ".summer-section"
    );


const summerCard =
    document.querySelector(
        ".summer-card"
    );


const summerText =
    document.querySelector(
        ".summer-text"
    );



function updateSummerAnimation() {


    if (
        !summerSection ||
        !summerCard ||
        !summerText
    ) {

        return;

    }


    const rect =
        summerSection.getBoundingClientRect();


    const sectionHeight =
        summerSection.offsetHeight;


    const viewportHeight =
        window.innerHeight;


    /*
        Total scroll distance
    */

    const scrollDistance =
        sectionHeight -
        viewportHeight;


    /*
        Calculate progress.

        0 = beginning
        1 = end
    */

    let progress =
        -rect.top /
        scrollDistance;


    progress =
        Math.max(
            0,
            Math.min(
                1,
                progress
            )
        );



    /* =================================================
       CARD MOVEMENT
    ================================================= */


    /*
        Card slowly moves upward.
    */

    const cardY =
        progress * -90;


    /*
        Slight scale down.
    */

    const cardScale =
        1 -
        progress * .12;


    summerCard.style.transform =
        `
        translateY(${cardY}px)
        scale(${cardScale})
        `;



    /* =================================================
       TEXT REVEAL
    ================================================= */

    /*
        Text starts appearing
        at 35%.
    */

    const textStart =
        .35;


    const textEnd =
        .65;


    let textProgress =
        (
            progress -
            textStart
        ) /
        (
            textEnd -
            textStart
        );


    textProgress =
        Math.max(
            0,
            Math.min(
                1,
                textProgress
            )
        );



    /*
        Text comes from below.
    */

    const textY =
        80 -
        (
            80 *
            textProgress
        );


    summerText.style.opacity =
        textProgress;


    summerText.style.transform =
        `
        translateY(${textY}px)
        `;

}



/* =====================================================
   SCROLL EVENT
===================================================== */

window.addEventListener(
    "scroll",
    updateSummerAnimation,
    {
        passive: true
    }
);



/* =====================================================
   INITIALIZE
===================================================== */

updateSummerAnimation();



/* =====================================================
   RESIZE
===================================================== */

window.addEventListener(
    "resize",
    () => {

        createParticles();

        updateSummerAnimation();

    }
);