/* =====================================================
   LOADING ELEMENTS
===================================================== */

const loadingScreen =
    document.getElementById("loadingScreen");

const loadingLogo =
    document.getElementById("loadingLogo");

const loadingLogoWrap =
    document.querySelector(".loadingLogoWrap");

const dustCanvas =
    document.getElementById("dustCanvas");

const ctx =
    dustCanvas.getContext("2d");

const homePage =
    document.getElementById("homePage");



/* =====================================================
   DUST SETTINGS
===================================================== */

let particles = [];

let canvasWidth = 0;
let canvasHeight = 0;

let logoPoints = [];

let animationStart = null;

const PARTICLE_COUNT = 900;



/* =====================================================
   CANVAS SIZE
===================================================== */

function resizeCanvas() {

    const dpr =
        window.devicePixelRatio || 1;

    canvasWidth =
        window.innerWidth;

    canvasHeight =
        window.innerHeight;


    dustCanvas.width =
        canvasWidth * dpr;

    dustCanvas.height =
        canvasHeight * dpr;


    dustCanvas.style.width =
        canvasWidth + "px";

    dustCanvas.style.height =
        canvasHeight + "px";


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );
}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);



/* =====================================================
   GET LOGO SHAPE
===================================================== */

function createLogoPoints() {

    const image =
        new Image();

    image.src =
        loadingLogo.src;


    image.onload = () => {

        const size = 180;

        const offscreen =
            document.createElement(
                "canvas"
            );

        offscreen.width = size;
        offscreen.height = size;

        const offCtx =
            offscreen.getContext(
                "2d"
            );


        offCtx.clearRect(
            0,
            0,
            size,
            size
        );


        offCtx.drawImage(
            image,
            0,
            0,
            size,
            size
        );


        const imageData =
            offCtx.getImageData(
                0,
                0,
                size,
                size
            );


        const data =
            imageData.data;


        logoPoints = [];


        for (
            let y = 0;
            y < size;
            y += 3
        ) {

            for (
                let x = 0;
                x < size;
                x += 3
            ) {

                const index =
                    (y * size + x) * 4;


                const alpha =
                    data[index + 3];


                /*
                    Only use visible
                    parts of the logo.
                */

                if (alpha > 80) {

                    const px =
                        canvasWidth / 2
                        - size / 2
                        + x;

                    const py =
                        canvasHeight / 2
                        - size / 2
                        + y;


                    logoPoints.push({
                        x: px,
                        y: py
                    });
                }
            }
        }


        createParticles();

        startDustAnimation();
    };
}



/* =====================================================
   CREATE PARTICLES
===================================================== */

function createParticles() {

    particles = [];


    for (
        let i = 0;
        i < PARTICLE_COUNT;
        i++
    ) {

        let target;


        if (logoPoints.length > 0) {

            target =
                logoPoints[
                    Math.floor(
                        Math.random()
                        * logoPoints.length
                    )
                ];

        } else {

            target = {
                x: canvasWidth / 2,
                y: canvasHeight / 2
            };
        }


        /*
            Start far away from logo.
        */

        const angle =
            Math.random()
            * Math.PI
            * 2;


        const distance =
            180
            + Math.random() * 500;


        const startX =
            target.x
            + Math.cos(angle)
            * distance;


        const startY =
            target.y
            + Math.sin(angle)
            * distance;


        particles.push({

            x: startX,

            y: startY,

            targetX: target.x,

            targetY: target.y,

            size:
                Math.random()
                * 2.2
                + .5,

            delay:
                Math.random()
                * 900,

            duration:
                1600
                + Math.random()
                * 1000,

            alpha:
                .3
                + Math.random()
                * .7

        });
    }
}



/* =====================================================
   DUST ANIMATION
===================================================== */

function startDustAnimation() {

    animationStart =
        performance.now();


    requestAnimationFrame(
        animateDust
    );
}


function animateDust(timestamp) {

    if (!animationStart) {

        animationStart =
            timestamp;
    }


    const elapsed =
        timestamp
        - animationStart;


    ctx.clearRect(
        0,
        0,
        canvasWidth,
        canvasHeight
    );


    particles.forEach(
        particle => {

            const localTime =
                elapsed
                - particle.delay;


            let progress =
                localTime
                / particle.duration;


            progress =
                Math.max(
                    0,
                    Math.min(
                        1,
                        progress
                    )
                );


            /*
                Smooth easing
            */

            const eased =
                1
                - Math.pow(
                    1 - progress,
                    3
                );


            particle.x =
                particle.x
                + (
                    particle.targetX
                    - particle.x
                )
                * eased
                * .08;


            particle.y =
                particle.y
                + (
                    particle.targetY
                    - particle.y
                )
                * eased
                * .08;


            /*
                Fade in particles
            */

            let alpha =
                particle.alpha;


            if (progress < .15) {

                alpha *=
                    progress / .15;
            }


            if (progress > .88) {

                alpha *=
                    (1 - progress)
                    / .12;
            }


            /*
                Draw particle
            */

            ctx.beginPath();


            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(
                    255,
                    255,
                    255,
                    ${alpha}
                )`;


            ctx.shadowBlur = 6;

            ctx.shadowColor =
                "rgba(255,255,255,.5)";


            ctx.fill();
        }
    );


    ctx.shadowBlur = 0;


    /*
        Continue animation
    */

    if (elapsed < 3200) {

        requestAnimationFrame(
            animateDust
        );
    }
}



/* =====================================================
   START LOADING
===================================================== */

window.addEventListener(
    "load",
    () => {

        /*
            Prepare dust logo
        */

        createLogoPoints();


        /*
            Show actual logo
            after particles assemble.
        */

        setTimeout(
            () => {

                loadingLogoWrap.classList.add(
                    "show"
                );

            },
            2600
        );


        /*
            Hide loading screen
        */

        setTimeout(
            () => {

                loadingScreen.classList.add(
                    "hide"
                );


                homePage.classList.add(
                    "show"
                );

            },
            4000
        );

    }
);



/* =====================================================
   MULTIPLE BACKGROUND VIDEOS
===================================================== */

const videos = [

    "images/video1.mp4",

    "images/video2.mp4",

    "images/video3.mp4",

    "images/video4.mp4"

];


const videoOne =
    document.getElementById(
        "backgroundVideo1"
    );


const videoTwo =
    document.getElementById(
        "backgroundVideo2"
    );


let currentVideo = 0;

let activeVideo =
    videoOne;

let nextVideo =
    videoTwo;

let isChanging =
    false;



/* =====================================================
   LOAD VIDEO
===================================================== */

function loadVideo(
    videoElement,
    index
) {

    videoElement.src =
        videos[index];

    videoElement.load();

    videoElement.currentTime = 0;

    videoElement.play()
        .catch(() => {});
}



/* =====================================================
   FIRST VIDEO
===================================================== */

loadVideo(
    videoOne,
    0
);


videoOne.classList.add(
    "active"
);



/* =====================================================
   CHANGE VIDEO
===================================================== */

function changeVideo() {

    if (isChanging) {

        return;
    }


    isChanging = true;


    /*
        Move to next video
    */

    currentVideo++;


    if (
        currentVideo
        >= videos.length
    ) {

        currentVideo = 0;
    }


    /*
        Load next video
    */

    loadVideo(
        nextVideo,
        currentVideo
    );


    /*
        Wait until loaded
    */

    nextVideo.addEventListener(
        "canplay",
        switchVideos,
        {
            once: true
        }
    );
}



/* =====================================================
   SWITCH VIDEOS
===================================================== */

function switchVideos() {

    /*
        Fade in next
    */

    nextVideo.classList.add(
        "active"
    );


    /*
        Fade out old
    */

    activeVideo.classList.remove(
        "active"
    );


    /*
        Swap references
    */

    const temporary =
        activeVideo;


    activeVideo =
        nextVideo;


    nextVideo =
        temporary;


    isChanging = false;
}



/* =====================================================
   VIDEO ENDED
===================================================== */

videoOne.addEventListener(
    "ended",
    changeVideo
);


videoTwo.addEventListener(
    "ended",
    changeVideo
);



/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton =
    document.getElementById(
        "menuButton"
    );


const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );


const closeMenu =
    document.getElementById(
        "closeMenu"
    );



/* OPEN */

menuButton.addEventListener(
    "click",
    () => {

        mobileMenu.classList.add(
            "open"
        );

    }
);



/* CLOSE */

closeMenu.addEventListener(
    "click",
    () => {

        mobileMenu.classList.remove(
            "open"
        );

    }
);



/* CLOSE AFTER LINK CLICK */

const mobileLinks =
    mobileMenu.querySelectorAll(
        "a"
    );


mobileLinks.forEach(
    link => {

        link.addEventListener(
            "click",
            () => {

                mobileMenu.classList.remove(
                    "open"
                );

            }
        );

    }
);