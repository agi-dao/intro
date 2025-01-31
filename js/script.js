



document.addEventListener("DOMContentLoaded", function(){

    
    window.addEventListener("load", () => {
        initSmoothScrolling();
        ScrollTrigger.refresh(); ///Recalculate ScrollTrigger after load
    });
    
    const initSmoothScrolling = () => {
        
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        const lenis = new Lenis({
            duration: isMobile ? 0.5 : 2,       // Shorter duration for faster snapping on mobile
            lerp: isMobile ? 0.02 : 0.1,          // Minimal smoothing for sticky behavior
            smoothTouch: true,                    // Enable smooth touch scrolling
            smoothWheel: !isMobile,               // Only apply smooth wheel scroll on desktop
            smooth: true,
            direction: 'vertical',
            gestureDirection: 'vertical',
            touchMultiplier: isMobile ? 1 : 1,
        });

        // Animation frame loop for Lenis
        function raf(time) {
            lenis.raf(time);         // Update Lenis
            ScrollTrigger.update();  // Sync ScrollTrigger
            requestAnimationFrame(raf);  // Keep the loop running
        }

        requestAnimationFrame(raf);

        // Sync Lenis scroll with GSAP's ScrollTrigger
        lenis.on('scroll', () => {
            ScrollTrigger.update();
        });
    };

    
    


    //const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); // Detect mobile
    const isMobile = window.innerWidth <= 768;


    

    gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);

    const parallaxSections_Ad = document.querySelectorAll('.parallax-bg');
    parallaxSections_Ad.forEach(parallaxBg => {
        gsap.to(parallaxBg, {
        scale: 1.1, // Move the background upwards
        ease: 'none',
        scrollTrigger: {
            trigger: parallaxBg.closest('div'),
            start: 'top bottom', // Start animation when the section enters the viewport
            end: 'bottom top',   // End animation when the section leaves the viewport
            scrub: true,         // Sync animation with scroll
        },
        });
    });






        
    const lenis = new Lenis({
        smooth: true,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const scrollLinks = document.querySelectorAll('.scrollLink');

    if (scrollLinks.length === 0) {
        return;
    }

    scrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
          e.preventDefault(); // Prevent default anchor behavior
      
          const targetId = this.getAttribute('data-target'); // Get the target section ID
          const offSet = parseInt(this.getAttribute('data-offset'), 10) || 0; // Convert offset to a number (default to 0 if null)
          const targetElement = document.querySelector(targetId); // Get the target element
      
          if (targetId && targetElement) {
            lenis.scrollTo(targetElement, {
              offset: offSet, // Pass the numeric offset
              duration: 2, // Smooth scroll duration
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
            });
          }
        });
      });
      


        

    let timelineHome = gsap.timeline({
        scrollTrigger: {
            trigger: "#About", // Trigger when this container comes into view
            start: "top 20%",             // Start at the top of the viewport
            end: "+=4000", // Define the scrollable area
            scrub: 3,                     // Smooth scrub based on scroll
            pin: true,                    // Pin the section during the animation
            /*snap: { snapTo: "labels", duration: 0.5, delay: 0.1, ease: "power1.inOut" },*/
            onUpdate: (self) => {
                // Adjust scrub speed based on scroll direction
                if (self.direction === -1) { // Scrolling up
                    self.animation.timeScale(0.5); // Speed up the animation when scrolling up
                } else { // Scrolling down
                    self.animation.timeScale(0.5); // Default speed when scrolling down
                }
            },
        }
    });




    /*
    if(isMobile){
        timelineHome
        .fromTo(
            "section.Below .twopart > div video", 
            { opacity:1 },    // Start with invisible and scaled down
            { opacity:0.25, duration: 10, ease: "power4.inOut" }, // Fade in and scale up
            "Zero"
        )
    }*/

    timelineHome
    .fromTo(
        ".step1b", 
        { opacity:1, top: isMobile ? 0 : 100 },    // Start with invisible and scaled down
        { opacity:1, top: isMobile ? 0 : 100 , duration: 30, ease: "power4.inOut" }, // Fade in and scale up
        "uno"
    )

    timelineHome.addLabel("st2b").fromTo(
        ".step2b", 
        { opacity:0, top:-100 },    // Start with invisible and scaled down
        { opacity:1, top: isMobile ? 0 : 100  , duration: 30, ease: "power4.inOut" }, // Fade in and scale up
        "dos"
    ).to('.step1b', { opacity:0, top:150, duration: 20 }, "st2b")
        
    timelineHome.addLabel("st3b").fromTo(
        ".step3b", 
        { opacity:0, top:-100 },    // Start with invisible and scaled down
        { opacity:1, top: isMobile ? 0 : 100  , duration: 30, ease: "power4.inOut" }, // Fade in and scale up
        "tres"
    ).to('.step2b', { opacity:0, top:150, duration: 20 }, "st3b")

    timelineHome.addLabel("st4b").fromTo(
        ".step4b", 
        { opacity:0, top:-100 },    // Start with invisible and scaled down
        { opacity:1, top: isMobile ? 0 : 100  , duration: 30, ease: "power4.inOut" }, // Fade in and scale up
        "quatr"
    ).to('.step3b', { opacity:0, top:150, duration: 20 }, "st4b")

    /*
    timelineHome.addLabel("st4b").fromTo(
        ".step4b", 
        { opacity:0, },    // Start with invisible and scaled down
        { opacity:0, duration: 30, ease: "power4.inOut" }, // Fade in and scale up
        "quatr"
    )

    if(isMobile){
        timelineHome
            .fromTo(
            "section.Below .twopart > div video", 
            { opacity:0.25 },    // Start with invisible and scaled down
            { opacity:1, duration: 10, ease: "power4.inOut" }, // Fade in and scale up
        )
    }





    if(!isMobile){
        gsap.to(".techs", {
            y: "-35%", // Move upward as you scroll
            ease: "none", // Linear movement for smooth scrolling
            scrollTrigger: {
                trigger: ".Below",
                start: "top 100%", // Start when the section enters the viewport
                endTrigger: ".Features .twopart > div h3", // End when the section leaves the viewport
                end: "bottom top", // Precise end point
                scrub: 1, // Smoothens animation progress over time (value sets duration for scroll scrubbing)
                onUpdate: (self) => {
                    // Optional: Log progress for debugging
                    //console.log("Progress:", self.progress.toFixed(2));
                },
            },
        });
    }*/




    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Toggle class based on visibility
            entry.target.classList.toggle('in-viewport', entry.isIntersecting);

            // Set transition duration and delay from data attributes
            const velocity = entry.target.getAttribute('data-velocity') || '0.9s';
            const delay = entry.target.getAttribute('data-delay') || '0s';

            entry.target.style.transitionDuration = velocity;
            entry.target.style.transitionDelay = delay;
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.observe').forEach(element => elementObserver.observe(element));







});