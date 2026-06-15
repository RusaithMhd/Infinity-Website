import React, { useEffect } from "react";

// Set page title and meta description

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy – Infinity Allianze";
    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content = "Privacy Policy for Infinity Allianze International PVT Ltd.";
    document.head.appendChild(meta);
    return () => document.head.removeChild(meta);
  }, []);

  return (
    <section className="legal-page">
      <h1>Privacy Policy</h1>
      <p><strong>Infinityallianze International PVT Ltd</strong> ("we", "our", "us") respects your privacy and is committed to protecting your personal data.</p>
      <h2>Contact Information</h2>
      <ul>
        <li>Phone: 112303359</li>
        <li>Email: <a href="mailto:info@infinityallianze.com">info@infinityallianze.com</a></li>
      </ul>
      <h2>Data Collection</h2>
      <p>We collect personal information you provide when you subscribe to our newsletter, contact us through the website, or use our services. This may include your name, email address, phone number, and any additional details you voluntarily share.</p>
      <h2>Use of Data</h2>
      <p>Your data is used to communicate with you, provide updates, and improve our services. We do not sell or share your personal information with third parties except as required by law.</p>
      <h2>Security</h2>
      <p>We implement appropriate technical and organizational measures to safeguard your data against unauthorized access, alteration, disclosure, or destruction.</p>
      <h2>Changes to This Policy</h2>
      <p>We may update this privacy policy from time to time. The latest version will be posted on this page with an updated revision date.</p>
    </section>
  );
};

export default PrivacyPolicy;
