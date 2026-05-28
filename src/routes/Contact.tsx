import ContactForm from "../components/contact/ContactForm";

export default function Contact() {
  return (
    <section className="container contact-page">
      <div className="contact-grid">
        {/* LEFT: Intro + contact info */}
        <div className="contact-intro">
          <span className="eyebrow">Contact sales</span>
          <h1>
            Let's see if <em>TalentPortal</em> fits your team.
          </h1>
          <p>
            Tell us a bit about your team and we'll get back same-day with next steps — usually a 20-minute
            screen-share where we set you up with a sandbox.
          </p>

          <div className="response-card">
            <span className="pulse" />
            <div>
              <div className="text">Sales is online right now</div>
              <div className="sub">Avg. response: 38 minutes during business hours</div>
            </div>
          </div>

          {/* <div className="contact-info-list">
            <div className="info-item">
              <div className="info-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="12" height="10" rx="1" />
                  <path d="M2 4l6 5 6-5" />
                </svg>
              </div>
              <div>
                <div className="info-label">Email</div>
                <div className="info-value">
                  <a href="mailto:sales@talentportal.io">sales@talentportal.io</a>
                </div>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 3c0 6 4 10 10 10v-3l-3-1-2 2c-2-1-3.5-2.5-4.5-4.5l2-2-1-3z" />
                </svg>
              </div>
              <div>
                <div className="info-label">Phone</div>
                <div className="info-value">
                  <a href="tel:+14155550110">+1 (415) 555-0110</a>
                </div>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 14s5-4.5 5-9a5 5 0 10-10 0c0 4.5 5 9 5 9z" />
                  <circle cx="8" cy="5.5" r="1.8" />
                </svg>
              </div>
              <div>
                <div className="info-label">HQ</div>
                <div className="info-value">
                  548 Market Street, Suite 28215<br />
                  San Francisco, CA 94104 · USA
                </div>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="8" r="6" />
                  <path d="M8 5v3l2 2" />
                </svg>
              </div>
              <div>
                <div className="info-label">Hours</div>
                <div className="info-value">Mon–Fri · 8:00 AM – 6:00 PM PT</div>
              </div>
            </div>
          </div> */}
        </div>

        {/* RIGHT: Form */}
        <div className="contact-form-card">
          <ContactForm />
        </div>
      </div>

      {/* Alt contact options */}
      <div className="alt-contact">
        <div className="alt-contact-grid">
          <a className="alt-card" href="#scheduler">
            <div className="alt-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="3" width="14" height="11" rx="1.5" />
                <path d="M2 7h14" />
              </svg>
            </div>
            <h4>Book a calendar slot</h4>
            <p>Pick a 20-min window that works for you.</p>
            <span className="arrow">Open scheduler →</span>
          </a>
          <a className="alt-card" href="#chat">
            <div className="alt-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 9c0-2 2-4 6-4s6 2 6 4-2 4-6 4l-3 2v-2c-2-.5-3-1.6-3-4z" />
              </svg>
            </div>
            <h4>Chat with us</h4>
            <p>Live chat with a real human, 8–6 PT.</p>
            <span className="arrow">Start chat →</span>
          </a>
          <a className="alt-card" href="#support">
            <div className="alt-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 2v14M2 9h14" />
              </svg>
            </div>
            <h4>Existing customer?</h4>
            <p>For support, use the in-app help menu.</p>
            <span className="arrow">Open support →</span>
          </a>
        </div>
      </div>
    </section>
  );
}
