/* ==========================================================
   Daily Utility Hub
   Main JavaScript
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /*==========================================================
        NAVBAR SCROLL EFFECT
    ==========================================================*/

    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 20) {

            header.style.boxShadow = "0 8px 30px rgba(0,0,0,.08)";

        } else {

            header.style.boxShadow = "none";

        }

    });


    /*==========================================================
        MOBILE MENU
    ==========================================================*/

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            menuBtn.innerHTML = navLinks.classList.contains("active")
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';

        });

    }


    /*==========================================================
        TOOL SEARCH
    ==========================================================*/

    const searchInput = document.querySelector(".search-box input");
    const toolCards = document.querySelectorAll(".tool-card");

    if (searchInput) {

        searchInput.addEventListener("keyup", function () {

            const value = this.value.toLowerCase();

            toolCards.forEach(card => {

                const title = card.querySelector("h3").textContent.toLowerCase();
                const desc = card.querySelector("p").textContent.toLowerCase();

                if (title.includes(value) || desc.includes(value)) {

                    card.style.display = "block";

                } else {

                    card.style.display = "none";

                }

            });

        });

    }


    /*==========================================================
        SCROLL TO TOP
    ==========================================================*/

    const scrollBtn = document.getElementById("scrollTop");

    if (scrollBtn) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 400) {

                scrollBtn.classList.add("active");

            } else {

                scrollBtn.classList.remove("active");

            }

        });

        scrollBtn.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }


    /*==========================================================
        SMOOTH SCROLL
    ==========================================================*/

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                e.preventDefault();

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });


    /*==========================================================
        ACTIVE NAVIGATION
    ==========================================================*/

    const navItems = document.querySelectorAll(".nav-links a");

    navItems.forEach(item => {

        item.addEventListener("click", () => {

            navItems.forEach(nav => nav.classList.remove("active"));

            item.classList.add("active");

        });

    });


    /*==========================================================
        FADE IN ON SCROLL
    ==========================================================*/

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: 0.15

    });

    document.querySelectorAll(".fade-in").forEach(element => {

        observer.observe(element);

    });


    /*==========================================================
        THEME BUTTON (Placeholder)
    ==========================================================*/

    const themeBtn = document.querySelector(".theme-btn");

    if (themeBtn) {

        themeBtn.addEventListener("click", () => {

            alert("Dark mode coming soon!");

        });

    }

});