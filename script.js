document.addEventListener('DOMContentLoaded', () => {
    // Data for dynamic sections
    const servicesData = [
        {
            title: "Custom Tailoring",
            description: "Bespoke suits, shirts, and formal wear tailored to your exact measurements",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-amber-600">
                      <path d="M4.4 14.6l7.6-7.6 1.4 1.4-7.6 7.6-1.4-1.4z"/>
                      <path d="M12 10V4H4"/>
                      <path d="M10 12v8h8"/>
                      <path d="M18.6 5.4l-1.4-1.4L14 8 15.4 9.4 18.6 5.4z"/>
                      <path d="M5.4 18.6L4 20l1.4 1.4L9.4 18l-1.4-1.4z"/>
                   </svg>`,
            price: "Starting from $200",
        },
        {
            title: "Alterations",
            description: "Professional alterations for all types of clothing - hemming, taking in, letting out",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-amber-600"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07L9.5 5.5"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07L13.5 18.5"/></svg>`, // Using a common 'Shirt' icon from a general icon set
            price: "Starting from $15",
        },
        {
            title: "Formal Wear",
            description: "Wedding suits, tuxedos, and special occasion attire",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-amber-600"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
            price: "Starting from $300",
        },
        {
            title: "Repairs",
            description: "Expert clothing repairs, zipper replacement, and restoration services",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-amber-600"><circle cx="12" cy="12" r="10"/><path d="M11 15h2a3 3 0 1 0-3-3V7a3 3 0 1 0-3 3h2"/><path d="M12 7v6"/><path d="M15 7v3a3 3 0 1 1-3 3h-2"/></svg>`,
            price: "Starting from $10",
        },
    ];

    const galleryImagesData = [
        { src: "/placeholder.svg?height=300&width=400", alt: "Custom suit fitting" },
        { src: "/placeholder.svg?height=300&width=400", alt: "Tailoring workspace" },
        { src: "/placeholder.svg?height=300&width=400", alt: "Finished alterations" },
        { src: "/placeholder.svg?height=300&width=400", alt: "Wedding suit" },
        { src: "/placeholder.svg?height=300&width=400", alt: "Professional alterations" },
        { src: "/placeholder.svg?height=300&width=400", alt: "Custom shirts" },
    ];

    // Populate Services Section
    const servicesContainer = document.getElementById('services-container');
    if (servicesContainer) {
        servicesData.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'card hover:shadow-lg transition-shadow';
            serviceCard.innerHTML = `
                <div class="card-content p-6">
                    <div class="bg-amber-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        ${service.icon}
                    </div>
                    <h3 class="font-semibold text-slate-900 mb-2">${service.title}</h3>
                    <p class="text-slate-600 text-sm mb-4">${service.description}</p>
                    <p class="font-semibold text-amber-600">${service.price}</p>
                </div>
            `;
            servicesContainer.appendChild(serviceCard);
        });
    }

    // Populate Gallery Section
    const galleryContainer = document.getElementById('gallery-container');
    if (galleryContainer) {
        galleryImagesData.forEach(image => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'relative group overflow-hidden rounded-lg';
            galleryItem.innerHTML = `
                <img
                    src="${image.src}"
                    alt="${image.alt}"
                    width="400"
                    height="300"
                    class="w-full h-64 object-cover transition-transform group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                    <p class="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        ${image.alt}
                    </p>
                </div>
            `;
            galleryContainer.appendChild(galleryItem);
        });
    }

    // Set current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});
