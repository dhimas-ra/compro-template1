// ======================================================
// CONFIG
// ======================================================

const API_URL =
  "https://script.google.com/macros/s/AKfycbxdw5Ti-sXqnkuOqAsfhb1nLqsDgsnsqyYaWDmh1DxmryKmkKOHPBNQimCM-ojQthWDXQ/exec";

// ======================================================
// LOAD WEBSITE
// ======================================================

document.addEventListener("DOMContentLoaded", init);

async function init() {
  try {
    const response = await fetch(API_URL);

    const data = await response.json();

    console.log(data);

    renderSetting(data.setting);
    renderAbout(data.setting);
    renderServices(data.services);
    renderPortfolio(data.portfolio);
    renderClients(data.clients);
    console.log(data.testimonials);
    renderTestimonials(data.testimonials);
    initContactForm();
  } catch (err) {
    console.error(err);
  }
}

// ======================================================
// SETTING
// ======================================================

function renderSetting(setting) {
  // ===========================
  // HEADER
  // ===========================

  const logo = document.getElementById("company_logo");

  if (logo) {
    logo.textContent = setting.company_name;

    logo.href = "#home";
  }

  const foot = document.getElementById("company_foot");

  if (foot) {
    foot.textContent = setting.company_name;
  }
  // ===========================
  // HERO
  // ===========================

  // const companyName = document.getElementById("company_name");

  // if (companyName) companyName.textContent = setting.company_name;

  // const desc = document.getElementById("deskripsi_singkat");

  // if (desc) desc.textContent = setting.deskripsi_singkat;

  // Banner
  document.getElementById("company_name").textContent =
    setting.company_name || "";

  document.getElementById("deskripsi_singkat").textContent =
    setting.deskripsi_singkat || "";

  // ===========================
  // HERO IMAGE
  // ===========================

  // const slider1 = document.getElementById("slider-img1");

  // if (slider1 && setting.slider_img1) slider1.src = setting.slider_img1;

  // const slider2 = document.getElementById("slider-img2");

  // if (slider2 && setting.slider_img2) slider2.src = setting.slider_img2;

  // const slider3 = document.getElementById("slider-img3");

  // if (slider3 && setting.slider_img3) slider3.src = setting.slider_img3;

  // Slider Image 1
  if (setting.slider_img1) {
    document.getElementById("slider-img1").src = setting.slider_img1;
  }

  // Slider Image 2
  if (setting.slider_img2) {
    document.getElementById("slider-img2").src = setting.slider_img2;
  }

  // ===========================
  // ABOUT
  // ===========================

  document.getElementById("about_desc").textContent = setting.about_desc || "";

  // const aboutTitle = document.getElementById("about_title");

  // if (aboutTitle) aboutTitle.textContent = setting.about_title;

  // const aboutDesc = document.getElementById("about_desc");

  // if (aboutDesc) aboutDesc.innerHTML = setting.about_desc;

  // ===========================
  // SERVICES
  // ===========================

  document.getElementById("services_desc").textContent =
    setting.services_desc || "";

  // const servicesTitle = document.getElementById("services_title");
  // if (servicesTitle) {
  //   servicesTitle.textContent = setting.services_title;
  // }

  // const servicesDesc = document.getElementById("services_desc");
  // if (servicesDesc) {
  //   servicesDesc.innerHTML = setting.services_desc;
  // }

  // ===========================
  // PORTFOLIO
  // ===========================

  document.getElementById("portfolio_desc").textContent =
    setting.portfolio_desc || "";

  // const portfolioTitle = document.getElementById("portfolio_title");

  // if (portfolioTitle) portfolioTitle.textContent = setting.portfolio_title;

  // const portfolioDesc = document.getElementById("portfolio_desc");

  // if (portfolioDesc) portfolioDesc.innerHTML = setting.portfolio_desc;

  // ===========================
  // CLIENTS
  // ===========================

  document.getElementById("clients_desc").textContent =
    setting.clients_desc || "";

  // const clientsTitle = document.getElementById("clients_title");

  // if (clientsTitle) clientsTitle.textContent = setting.clients_title;

  // const clientsDesc = document.getElementById("clients_desc");

  // if (clientsDesc) clientsDesc.innerHTML = setting.clients_desc;

  // ===========================
  // TESTIMONIAL
  // ===========================

  document.getElementById("testimonial_desc").textContent =
    setting.testimonial_desc || "";

  // const ratingTitle = document.getElementById("rating_title");

  // if (ratingTitle) ratingTitle.textContent = setting.rating_title;

  // const ratingDesc = document.getElementById("rating_desc");

  // if (ratingDesc) ratingDesc.innerHTML = setting.rating_desc;

  document.getElementById("contact_desc").textContent =
    setting.contact_desc || "";

  document.getElementById("phone").textContent = setting.phone || "";

  document.getElementById("email").textContent = setting.email || "";

  document.getElementById("address").textContent = setting.address || "";
}

// ======================================================
// ABOUT
// ======================================================

function renderAbout(setting) {
  // ===== Images =====
  document.querySelectorAll(".about-img1").forEach((img) => {
    img.src = setting.about_img1 || "";
  });

  document.querySelectorAll(".about-img2").forEach((img) => {
    img.src = setting.about_img2 || "";
  });

  
  // ===== VISI =====
  document.getElementById("visi_title").childNodes[0].textContent =
    setting.visi_title || "";

  document.getElementById("visi_desc").textContent = setting.visi_desc || "";

  // ===== MISI =====
  document.getElementById("misi_title").childNodes[0].textContent =
    setting.misi_title || "";

  document.getElementById("misi_desc").textContent = setting.misi_desc || "";

}

// ======================================================
// SERVICES
// ======================================================

function renderServices(services) {
  const card = document.getElementById("services_container");

  if (!card) return;

  card.innerHTML = "";

  services.forEach((item) => {
    // const card = document.createElement("article");
    // card.className = `service-card ${item.class || ""}`;

    // card.style.animationDelay = `${index * 0.15}s`;

    card.innerHTML += `
            <article class="service-card">
                <div class="card-icon">
                  <figure>
                    <img src="${item.image}" alt="${item.ser_title}">
                </figure>
              </div>

              
                  <h4>${item.ser_title}</h4>

            <p>${item.description_ser}</p>
              
            <a href="${item.link || "#contact"}" class="card-btn">
                ${item.button || "Learn More"}
            </a>
            
            </article>          
              
        `;

    // container.appendChild(card);
  });
}

// ======================================================
// PORTFOLIO
// ======================================================

function renderPortfolio(portfolio) {
  const container = document.getElementById("portfolio_container");

  if (!container) return;

  container.innerHTML = "";

  portfolio.forEach((item) => {
    container.innerHTML += `
            <article class="portfolio-item">

                <figure>
                    <img src="${item.image}" alt="${item.por_title}">
                </figure>

                <div class="info">

                    <h4>${item.por_title}</h4>

                    <p>${item.description_por}</p>

                    <a href="${item.link}">View Project</a>

                </div>

            </article>
        `;
  });
}

// ======================================================
// CLIENTS
// ======================================================

function renderClients(clients) {
  const container = document.getElementById("clients_container");

  if (!container) return;

  let html = "";

  // Original
  clients.forEach((client) => {
    html += `
            <div class="cslide">
                <img src="${client.logo}" alt="${client.name}">
            </div>
        `;
  });

  // Duplicate supaya infinite slider tetap jalan
  clients.forEach((client) => {
    html += `
            <div class="cslide">
                <img src="${client.logo}" alt="${client.name}">
            </div>
        `;
  });

  container.innerHTML = html;
}

// ======================================================
// TESTIMONIAL
// ======================================================

function renderTestimonials(testimonials) {
  const container = document.getElementById("rating_container");

  if (!container) return;

  let html = "";

  testimonials.forEach((item) => {
    // Dibuat di sini
    const stars =
      "★".repeat(Number(item.rating)) + "☆".repeat(5 - Number(item.rating));

    html += `
            <div class="rating-card">

                <div class="stars">
                    ${stars}
                </div>

                <p>
                    "${item.review}"
                </p>

                <h4>
                    ${item.name}
                </h4>

            </div>
        `;
  });

  container.innerHTML = html;
}

// ======================================================
// CONTACT FORM
// ======================================================

function initContactForm() {
  const form = document.getElementById("contactForm");

  if (!form) return;

  form.addEventListener("submit", sendContact);
}

async function sendContact(e) {
  e.preventDefault();

  const name = document.getElementById("contact_name").value;

  const email = document.getElementById("contact_email").value;

  const title = document.getElementById("contact_title").value;

  const message = document.getElementById("contact_message").value;

  try {
    const response = await fetch(API_URL, {
      method: "POST",

      body: JSON.stringify({
        action: "contact",

        name: name,

        email: email,

        title: title,

        message: message,
      }),
    });

    const result = await response.json();

    if (result.success) {
      alert("Pesan berhasil dikirim!");

      document.getElementById("contactForm").reset();
    } else {
      alert("Gagal mengirim.");
    }
  } catch (error) {
    console.error(error);

    alert("Terjadi kesalahan.");
  }
}
