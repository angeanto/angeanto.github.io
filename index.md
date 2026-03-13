---
layout: single
classes: wide
---

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

<style>
/* Page width */
.page,
.page__content,
.initial-content {
  max-width: 100% !important;
}

/* Main hero */
.hero-personal {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2.25rem;
  padding: 1.4rem 0 0.8rem 0;
}

/* Left column */
.hero-personal__text {
  flex: 1 1 62%;
  min-width: 0;
}

.hero-personal__text h1 {
  font-size: clamp(2rem, 3vw, 2.8rem);
  line-height: 1.05;
  margin: 0 0 0.8rem 0;
}

.hero-personal__text p {
  font-size: 0.86rem;
  line-height: 1.55;
  margin: 0 0 0.75rem 0;
}

.hero-personal__text p strong {
  font-weight: 700;
}

/* Right image */
.hero-personal__image {
  flex: 0 0 150px;
  margin-top: 0.15rem;
}

.hero-personal__image img {
  width: 100%;
  height: auto;
  border-radius: 18px;
  display: block;
}

/* Subscribe + links share same width and alignment */
.subscribe-wrap,
.hero-links-wrap {
  width: 100%;
  max-width: 500px;
}

.subscribe-wrap {
  margin-top: 0.9rem;
}

.hero-links-wrap {
  margin-top: 0.75rem;
}

/* Force MailerLite block to align nicely */
.ml-embedded {
  width: 100%;
}

.ml-embedded,
.ml-form-embedContainer,
.ml-form-embedWrapper,
.ml-form-align-center {
  max-width: 100% !important;
}

/* Links grid */
.hero-links {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.45rem;
  width: 100%;
}

.hero-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  min-height: 40px;
  font-size: 0.8rem;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  border: 1px solid #d1d5db;
  padding: 0.5rem 0.55rem;
  border-radius: 8px;
  background: #f9fafb;
  color: #374151;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.hero-links a:hover {
  background: #2563eb;
  border-color: #2563eb;
  color: #ffffff;
  transform: translateY(-1px);
}

.hero-links .fa-linkedin {
  color: #0077B5;
}

.hero-links .fa-whatsapp {
  color: #25D366;
}

.hero-links .fa-spotify {
  color: #1DB954;
}

.hero-links .fa-envelope {
  color: #ff6719;
}

/* Tablet */
@media (max-width: 980px) {
  .hero-personal {
    gap: 1.5rem;
    padding-top: 1rem;
  }

  .hero-personal__image {
    flex: 0 0 130px;
  }

  .hero-links {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Mobile */
@media (max-width: 900px) {
  .hero-personal {
    flex-direction: column;
    gap: 1rem;
    padding-top: 0.8rem;
  }

  .hero-personal__text {
    width: 100%;
  }

  .hero-personal__image {
    order: -1;
    flex: 0 0 auto;
    width: 120px;
    margin: 0 auto 0.25rem auto;
  }

  .subscribe-wrap,
  .hero-links-wrap {
    max-width: 100%;
  }

  .hero-links {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .hero-links a {
    font-size: 0.78rem;
    min-height: 38px;
  }
}

/* Very small screens */
@media (max-width: 520px) {
  .hero-personal__text h1 {
    font-size: 1.8rem;
  }

  .hero-personal__text p {
    font-size: 0.84rem;
    line-height: 1.5;
  }

  .hero-links {
    grid-template-columns: 1fr;
  }
}

.subscribe-wrap {
  margin-top: 0.9rem;
  max-width: 420px;
  margin-left: auto;
  margin-right: auto;
}

.ml-embedded {
  width: 100%;
  display: block;
}

.hero-links-wrap {
  margin-top: 0.75rem;
  max-width: 420px;
  margin-left: auto;
  margin-right: auto;
}

</style>

<div class="hero-personal">
  <div class="hero-personal__text">
    <h1>Hello, this is Antonis</h1>

    <p>
      🚀 Sharing insights about <strong>data analytics</strong>, <strong>business intelligence</strong>, and how data actually works inside modern companies.
    </p>

    <p>
      🔔 If you are interested in data, analytics, or building a career in this space, you can <strong>subscribe</strong> below to receive new content.
    </p>

    <p>
      👨🏻‍💻 Worked across <strong>fintech, e-commerce, insurance, cybersecurity and consulting</strong>, taking on both lead and contributor roles that gave me a broad understanding of how data supports real business decisions.
    </p>

    <p>
      🎓 Created a <strong>university course</strong> focused on modern data analytics in corporate environments with <strong>80+</strong> participants. <strong>Teaching</strong>, <strong>mentoring</strong>, and <strong>data solutions</strong> have become a core part of my work.
    </p>

    <div class="subscribe-wrap">
      <div class="ml-embedded" data-form="veywtM"></div>
    </div>

    <div class="hero-links-wrap">
      <div class="hero-links">
        <a href="https://www.linkedin.com/in/antonios-angelakis-249899101/" target="_blank">
          <i class="fab fa-linkedin"></i> LinkedIn
        </a>

        <a href="https://chat.whatsapp.com/HG2tVZMzYAD4O9YLcm0Svr?mode=gi_t" target="_blank">
          <i class="fab fa-whatsapp"></i> Community
        </a>

        <a href="https://antonisangelakis.substack.com/" target="_blank">
          <i class="fas fa-envelope"></i> Substack
        </a>

        <a href="https://open.spotify.com/show/4yPdUxVgB8v7PoqnBvUulH?si=fc4ac3c448ba43a2" target="_blank">
          <i class="fab fa-spotify"></i> Podcast
        </a>

        <a href="https://kedivim-apply.ihu.gr/en/progs/prog-428" target="_blank">
          <i class="fas fa-graduation-cap"></i> Course
        </a>

        <a href="/mentoring/">
          <i class="fas fa-brain"></i> Mentoring
        </a>
      </div>
    </div>
  </div>

  <div class="hero-personal__image">
    <img src="/assets/images/me/antonis-speaking.webp" alt="Antonis speaking at an event">
  </div>
</div>