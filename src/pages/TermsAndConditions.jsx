import React, { useEffect } from "react";

const TermsAndConditions = () => {
  useEffect(() => {
    document.title = "Terms & Conditions – Infinity Allianze";
    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content = "Terms and Conditions for Infinity Allianze International PVT Ltd.";
    document.head.appendChild(meta);
    return () => document.head.removeChild(meta);
  }, []);

  return (
    <section className="legal-page">
      <h1>Terms &amp; Conditions</h1>
      <p><strong>Infinityallianze International PVT Ltd</strong> ("Company", "we", "our") provides these terms governing your use of our website and services.</p>
      <h2>Acceptance</h2>
      <p>By accessing or using the Infinity Allianze website, you acknowledge that you have read, understood, and agree to be bound by these Terms &amp; Conditions, including any future updates posted here.</p>
      <h2>Contact Information</h2>
      <ul>
        <li>Phone: 112303359</li>
        <li>Email: <a href="mailto:info@infinityallianze.com">info@infinityallianze.com</a></li>
      </ul>
      <h2>Use of Site</h2>
      <p>You agree not to misuse the site, to respect intellectual property, and to comply with applicable laws.</p>
      <h2>Limitation of Liability</h2>
      <p>The Company shall not be liable for any indirect, incidental, or consequential damages arising from the use of the site.</p>
      <h2>Changes to Terms</h2>
      <p>We may modify these terms at any time; the revised version will be posted on this page with an updated date.</p>
    </section>
  );
};

export default TermsAndConditions;
