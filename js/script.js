// Mobile hamburger menu
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
}

// Accordion functionality
const accordionButtons = document.querySelectorAll(".accordion-button");

accordionButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const content = button.nextElementSibling;

        const isExpanded = button.getAttribute("aria-expanded") === "true";

        button.setAttribute("aria-expanded", !isExpanded);

        content.hidden = isExpanded;

    });

});

// Interactive Cape Town Map
const mapElement = document.getElementById("map");

if (mapElement && typeof L !== "undefined") {

    // Create the map centred on Cape Town
    const map = L.map("map").setView([-33.9249, 18.4241], 11);

    // Load OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

}
// Image Gallery Lightbox
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("image-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");

// Open the lightbox when a gallery image is clicked
galleryItems.forEach(function (item) {

    item.addEventListener("click", function () {

        const image = item.querySelector("img");

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxCaption.textContent = image.alt;

        lightbox.showModal();

    });

});

// Close the lightbox
if (lightboxClose && lightbox) {

    lightboxClose.addEventListener("click", function () {
        lightbox.close();
    });

}

// Services Search Functionality
const serviceSearch = document.getElementById("service-search");
const searchMessage = document.getElementById("search-message");

if (serviceSearch && searchMessage) {

    const serviceCards = document.querySelectorAll(".service-card");

    serviceSearch.addEventListener("input", function () {

        const searchTerm = serviceSearch.value.toLowerCase().trim();
        let visibleCount = 0;

        serviceCards.forEach(function (card) {

            const cardText = card.textContent.toLowerCase();

            if (cardText.includes(searchTerm)) {
                card.style.display = "";
                visibleCount++;
            } else {
                card.style.display = "none";
            }

        });

        if (searchTerm === "") {
            searchMessage.textContent = "";
        } else if (visibleCount === 0) {
            searchMessage.textContent = "No matching services found.";
        } else {
            searchMessage.textContent = visibleCount + " service(s) found.";
        }

    });
// Form validation and AJAX submission

const FORM_ENDPOINT =
    "https://formsubmit.co/ajax/ubuntucommunitycarecentre@gmail.com";

async function submitWebsiteForm(form, feedback, subject) {

    if (!form.reportValidity()) {
        feedback.textContent = "Please correct the highlighted fields.";
        return;
    }

    const button = form.querySelector('button[type="submit"]');

    const formData = Object.fromEntries(
        new FormData(form).entries()
    );

    formData._subject = subject;
    formData._replyto = formData.email;

    feedback.textContent = "Sending your message...";
    button.disabled = true;

    try {
        const response = await fetch(FORM_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (!response.ok ||
            !(result.success === true ||
              result.success === "true")) {
            throw new Error("Submission failed.");
        }

        feedback.textContent =
            "Thank you! Your message has been submitted successfully.";

        form.reset();

    } catch (error) {

        feedback.textContent =
            "Your message could not be sent. Please try again.";

        feedback.classList.add("error");

    } finally {
        button.disabled = false;
    }
}


// Enquiry form
const enquiryForm = document.getElementById("enquiry-form");

if (enquiryForm) {

    const feedback =
        document.getElementById("enquiry-feedback");

    enquiryForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const type =
            document.getElementById("enquiry-type").value;

        submitWebsiteForm(
            enquiryForm,
            feedback,
            "Ubuntu Centre - " + type + " enquiry"
        );
    });
}


// Contact form
const contactForm = document.getElementById("contact-form");

if (contactForm) {

    const feedback =
        document.getElementById("contact-feedback");

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        submitWebsiteForm(
            contactForm,
            feedback,
            "Ubuntu Centre - General Contact Message"
        );
    });
}
}


