import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ContactForm.css";
import { getGlassStyle } from "../../styles/glassStyle";

const CONTACT_EMAIL = "sushantsrivastava198@gmail.com";

const copy = {
  en: {
    cta: "✉️ Write to Me",
    close: "Close",
    name: "Your name",
    subject: "Subject",
    message: "Message",
    send: "Send Email",
    hint:
      "Opens your email app with this pre-filled - nothing is sent from here.",
  },
  no: {
    cta: "✉️ Skriv til meg",
    close: "Lukk",
    name: "Navnet ditt",
    subject: "Emne",
    message: "Melding",
    send: "Send e-post",
    hint:
      "Åpner e-postappen din med dette forhåndsutfylt - ingenting sendes herfra.",
  },
};

export default function ContactForm({ theme, language }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const t = copy[language] || copy.en;

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = name ? `${message}\n\n— ${name}` : message;
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="contact-form-wrap">
      <button
        type="button"
        className="contact-form-toggle"
        style={{
          backgroundColor: open ? theme.body : theme.text,
          color: open ? theme.text : theme.body,
          border: `solid 1px ${theme.text}`,
        }}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? t.close : t.cta}
      </button>

      <AnimatePresence>
        {open && (
          <motion.form
            className="contact-form"
            style={getGlassStyle(theme)}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <input
              type="text"
              className="contact-form-input"
              placeholder={t.name}
              style={{ color: theme.text, borderColor: theme.secondaryText }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="contact-form-input"
              placeholder={t.subject}
              style={{ color: theme.text, borderColor: theme.secondaryText }}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
            <textarea
              className="contact-form-input contact-form-textarea"
              placeholder={t.message}
              style={{ color: theme.text, borderColor: theme.secondaryText }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              required
            />
            <motion.button
              type="submit"
              className="contact-form-send"
              style={{ backgroundColor: theme.text, color: theme.body }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              {t.send}
            </motion.button>
            <p
              className="contact-form-hint"
              style={{ color: theme.secondaryText }}
            >
              {t.hint}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
