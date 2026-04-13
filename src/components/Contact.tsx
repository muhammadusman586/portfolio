import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle, XCircle } from 'lucide-react';
import TerminalWindow from './TerminalWindow';

const contactInfo = [
  {
    key: 'EMAIL',
    value: 'muhammadusmanramzan586@gmail.com',
    link: 'mailto:muhammadusmanramzan586@gmail.com',
    external: false,
  },
  {
    key: 'PHONE',
    value: '+92 300 9830142',
    link: 'tel:+923009830142',
    external: false,
  },
  {
    key: 'LOCATION',
    value: 'Lahore, Punjab, Pakistan',
    link: 'https://maps.google.com/?q=Lahore,Pakistan',
    external: true,
  },
  {
    key: 'GITHUB',
    value: 'github.com/muhammadusman586',
    link: 'https://github.com/muhammadusman586',
    external: true,
  },
  {
    key: 'LINKEDIN',
    value: 'linkedin.com/in/muhammad-usman-ramzan',
    link: 'https://linkedin.com/in/muhammad-usman-ramzan-a97105247',
    external: true,
  },
];

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      await emailjs.sendForm(
        'service_ip9n0e7',
        'template_d1u3qzb',
        formRef.current,
        'Czzp5xYYvbGvfYqIq'
      );
      setSubmitStatus('success');
      formRef.current.reset();
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="space-y-2"
        >
          <div className="font-mono text-xs text-muted flex items-center gap-2">
            <span className="text-accent">$</span>
            <span>./CONTACT.sh</span>
          </div>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold text-body">
            <span className="text-accent">#</span> get_in_touch
          </h2>
          <p className="text-muted text-sm max-w-xl">
            Have a question or want to build something together? Drop a line below — I
            reply to every message.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TerminalWindow
            title="CONTACT.sh"
            motionProps={{
              initial: { opacity: 0, y: 20 },
              animate: inView ? { opacity: 1, y: 0 } : {},
              transition: { duration: 0.5, delay: 0.15 },
            }}
          >
            <pre className="text-sm leading-7 whitespace-pre-wrap">
              <span className="json-comment">#!/bin/bash</span>
              {'\n'}
              <span className="json-comment"># contact — maintained by usman</span>
              {'\n\n'}
              {contactInfo.map((info) => (
                <span key={info.key} className="block">
                  <span className="text-muted">{info.key}</span>
                  <span className="json-punc">=</span>
                  <span className="json-string">&quot;</span>
                  <a
                    href={info.link}
                    target={info.external ? '_blank' : undefined}
                    rel={info.external ? 'noopener noreferrer' : undefined}
                    className="json-string underline decoration-transparent hover:decoration-accent underline-offset-2 transition-colors"
                  >
                    {info.value}
                  </a>
                  <span className="json-string">&quot;</span>
                </span>
              ))}
              {'\n'}
              <span className="text-muted">echo </span>
              <span className="json-string">
                &quot;
                <span className="text-accent animate-pulse-dot">●</span>{' '}
                available for collaboration
                &quot;
              </span>
            </pre>
          </TerminalWindow>

          <TerminalWindow
            title="send_message.sh"
            prompt="echo $MESSAGE | mail -s &quot;hello&quot;"
            motionProps={{
              initial: { opacity: 0, y: 20 },
              animate: inView ? { opacity: 1, y: 0 } : {},
              transition: { duration: 0.5, delay: 0.3 },
            }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <Field label="name" name="name" placeholder="// your name" />
              <Field
                label="email"
                name="email"
                type="email"
                placeholder="// your@email.com"
              />
              <Field
                label="message"
                name="message"
                placeholder="// what are you building?"
                textarea
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-bg font-medium hover:bg-accent-dim transition-colors focus-ring disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="font-mono">[▌] sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <span className="font-mono">./send_message.sh</span>
                  </>
                )}
              </button>

              {submitStatus && (
                <div
                  className={`flex items-center gap-2 font-mono text-sm ${
                    submitStatus === 'success' ? 'text-accent' : 'text-term-red'
                  }`}
                >
                  {submitStatus === 'success' ? (
                    <>
                      <CheckCircle size={16} />
                      <span>✓ message delivered — I&apos;ll reply soon</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={16} />
                      <span>✗ send failed — please retry</span>
                    </>
                  )}
                </div>
              )}
            </form>
          </TerminalWindow>
        </div>
      </div>
    </section>
  );
};

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
};

const Field = ({ label, name, type = 'text', placeholder, textarea }: FieldProps) => (
  <label className="block">
    <span className="block font-mono text-xs text-muted mb-1.5">
      <span className="text-accent">$</span> {label}
    </span>
    {textarea ? (
      <textarea name={name} id={name} rows={4} required placeholder={placeholder} />
    ) : (
      <input type={type} name={name} id={name} required placeholder={placeholder} />
    )}
  </label>
);

export default Contact;
