/**
 * DigiCitizen Seed Data
 * Contains comprehensive educational content for:
 * - 6 Modules (Digital Citizenship, Cybersecurity, Privacy, Cyberbullying, Digital Ethics, Fake News)
 * - 54 Quiz Questions (9 per module) with 4 options each, correct answers, and thorough explanations
 * - 5 Interactive Online Safety Scenarios with real-world consequences and educational takeaways
 * - 6 Achievement Badges
 */

export const INITIAL_CATEGORIES = [
  {
    id: 'cat-1',
    name: 'Digital Safety & Fundamentals',
    slug: 'fundamentals',
    description: 'Foundational literacy and safe practices in the modern internet age.',
    icon: 'Shield'
  },
  {
    id: 'cat-2',
    name: 'Cyber Threat Defense',
    slug: 'cybersecurity',
    description: 'Understanding attack vectors, social engineering, and protective hygiene.',
    icon: 'Lock'
  },
  {
    id: 'cat-3',
    name: 'Information Integrity',
    slug: 'integrity',
    description: 'Evaluating digital sources, misinformation, and ethical participation.',
    icon: 'FileCheck'
  }
];

export const INITIAL_MODULES = [
  {
    id: 'mod-1',
    category_id: 'cat-1',
    slug: 'digital-citizenship-fundamentals',
    title: 'Digital Citizenship Fundamentals',
    order_index: 1,
    estimated_time: '25 mins',
    icon: 'Compass',
    description: 'Master the core pillars of digital citizenship, digital footprint management, and responsible online behavior.',
    learning_objectives: [
      'Understand the definition and 9 core themes of digital citizenship.',
      'Analyze your permanent digital footprint and active vs. passive data trails.',
      'Cultivate positive digital communication and empathetic digital etiquette (Netiquette).',
      'Recognize your rights and responsibilities in global digital spaces.'
    ],
    content: `
# Digital Citizenship Fundamentals

### 1. Introduction: Living in a Connected World
Digital citizenship refers to the responsible, ethical, and safe use of digital technologies and the internet. In an era where work, education, civic engagement, and social connections happen online, digital citizenship is no longer optional—it is a core life competency.

A responsible digital citizen understands that digital actions carry real-world consequences, that digital rights correspond with personal duties, and that the internet should remain a safe, constructive space for everyone.

---

### 2. The Nine Elements of Digital Citizenship
Educational frameworks identify nine foundational dimensions:
1. **Digital Access:** Equitable distribution of technology and online opportunities.
2. **Digital Commerce:** Safe and informed buying, selling, and financial transactions.
3. **Digital Communication:** Constructive exchange of information across multiple platforms.
4. **Digital Literacy:** The ability to learn, evaluate, and critically judge information and tech tools.
5. **Digital Etiquette (Netiquette):** Adhering to standards of conduct and mutual respect online.
6. **Digital Law:** Legal rights and limits concerning copyright, privacy, and online crime.
7. **Digital Rights & Responsibilities:** Basic freedoms of expression paired with reporting duties.
8. **Digital Health & Wellness:** Physical ergonomics, screen time balance, and mental health boundaries.
9. **Digital Security:** Taking proactive precautions to safeguard personal data and equipment.

---

### 3. Your Digital Footprint: Active vs. Passive
Every interaction you make on the internet leaves an indelible digital footprint:
- **Active Digital Footprint:** The intentional data you create—social media posts, comments, photos uploaded, emails sent, and blog entries.
- **Passive Digital Footprint:** The data collected about you in the background without direct input—IP addresses, device fingerprinting, browsing history, cookies, and geo-location coordinates.

> **Real-World Case Study:** A prospective college applicant was denied admission after the admissions committee reviewed publicly accessible social media comments containing derogatory language posted three years earlier. Digital records rarely disappear; screenshots, web archives, and platform backups preserve your digital history.

---

### 4. Golden Rules of Netiquette
1. **Remember the Human:** Behind every screen, avatar, and username is a human being with emotions and dignity.
2. **Respect Other People’s Time and Bandwidth:** Do not forward spam, oversized attachments, or unnecessary chain messages.
3. **Make Yourself Look Good Online:** Strive for clarity, factual accuracy, and polite discourse.
4. **Forgive Other People’s Mistakes:** Point out minor oversights privately and constructively rather than publicly humiliating them.
5. **Maintain Context Sensitivity:** What is appropriate in a private video game chat room is unacceptable in an academic or workplace email.

---

### 5. Practical Safety Recommendations
- Regularly search your own name in search engines to audit your public persona.
- Review privacy settings on all active social media accounts at least quarterly.
- Keep personal identifiable information (PII) such as home address, phone numbers, and daily routines off public forums.
- Think before you post: Use the **THINK** test (Is it **T**rue? **H**elpful? **I**nspiring? **N**ecessary? **K**ind?).
    `
  },
  {
    id: 'mod-2',
    category_id: 'cat-2',
    slug: 'cybersecurity-awareness',
    title: 'Cybersecurity Awareness',
    order_index: 2,
    estimated_time: '30 mins',
    icon: 'ShieldAlert',
    description: 'Learn to identify phishing campaigns, malware, ransomware, social engineering tactics, and fundamental defense strategies.',
    learning_objectives: [
      'Identify phishing, spear-phishing, smishing, and vishing attack patterns.',
      'Understand different classes of malware: Trojans, spyware, keyloggers, and ransomware.',
      'Deploy multi-layered defense: Multi-Factor Authentication (MFA), patch hygiene, and safe network habits.',
      'Respond systematically to security breaches and suspicious incidents.'
    ],
    content: `
# Cybersecurity Awareness & Defense

### 1. The Anatomy of Cyber Threats
Cybersecurity is the practice of protecting systems, networks, software, and data from digital attacks. These cyberattacks usually aim to access, alter, or destroy sensitive information, extort money through ransomware, or interrupt normal operations.

---

### 2. Social Engineering: Hacking the Human
Social engineering exploits human psychology rather than software vulnerabilities. Attackers rely on emotion, urgency, fear, and curiosity to trick victims into bypassing security rules:
- **Phishing:** Mass email lures pretending to be trusted institutions (banks, delivery companies, streaming services) containing spoofed links or malicious attachments.
- **Spear Phishing:** Highly customized attacks targeting specific individuals using researched details (e.g., job titles, recent purchases).
- **Smishing & Vishing:** SMS phishing and Voice phishing (e.g., automated robocalls claiming your tax return is overdue).
- **Watering Hole Attack:** Compromising a niche website frequently visited by a target group to infect visitors.

---

### 3. Malware Ecosystem
- **Ransomware:** Encrypts user files with military-grade ciphers and demands cryptocurrency ransom for decryption keys.
- **Trojans:** Disguised as legitimate software (e.g., free games, cracked utilities) that secretly opens a backdoor for unauthorized remote control.
- **Keyloggers & Spyware:** Covertly records keystrokes, clipboard entries, and webcam feeds to harvest bank passwords and secret tokens.
- **Botnets:** Enslaved networks of infected devices coordinated to conduct distributed denial-of-service (DDoS) assaults.

---

### 4. Multi-Layered Defense Strategies
1. **Multi-Factor Authentication (MFA/2FA):** Always mandate a secondary verification method—preferably hardware security keys (FIDO2/WebAuthn) or time-based authenticator apps (TOTP) rather than SMS.
2. **Software Patching:** Enable automatic updates on operating systems, browsers, and applications. The majority of exploited vulnerabilities have had patches available for weeks before attacks occur.
3. **Zero Trust Principles:** Never trust, always verify. Verify explicit requests for credential updates or wire transfers through a verified out-of-band communication channel.
4. **Public Wi-Fi Hygiene:** Avoid logging into sensitive bank accounts on open, unencrypted public Wi-Fi networks without an encrypted VPN tunnel.

---

### 5. Incident Response Checklist
If you suspect you clicked a malicious link or infected your device:
1. Immediately disconnect the device from Wi-Fi and pull out the ethernet cable to halt lateral network propagation.
2. Change your primary credentials from a known clean device.
3. Notify IT administrators or security personnel immediately.
4. Run an offline scan with updated endpoint protection software.
    `
  },
  {
    id: 'mod-3',
    category_id: 'cat-1',
    slug: 'online-privacy-data-protection',
    title: 'Online Privacy and Data Protection',
    order_index: 3,
    estimated_time: '25 mins',
    icon: 'EyeOff',
    description: 'Demystify cookies, trackers, data broker economies, privacy regulations (GDPR/CCPA), and identity protection.',
    learning_objectives: [
      'Differentiate between first-party cookies, third-party tracking cookies, and device fingerprints.',
      'Understand how data brokers aggregate browsing patterns into behavioral advertising profiles.',
      'Exercise legal privacy rights granted under frameworks like GDPR and CCPA.',
      'Configure browser privacy extensions, encrypted communications, and password managers.'
    ],
    content: `
# Online Privacy and Data Protection

### 1. Privacy is a Fundamental Right
Online privacy is the level of privacy and security an individual or group enjoys while connected to the internet. It encompasses the protection of Personally Identifiable Information (PII) such as full names, social security numbers, medical histories, geolocation coordinates, and credit records.

---

### 2. How the Tracking Economy Operates
Modern web platforms often monetize user attention through hyper-targeted advertising:
- **First-Party vs. Third-Party Cookies:** First-party cookies remember your shopping cart and session logins. Third-party cookies belong to external advertisers tracking your journey across dozens of unrelated websites.
- **Browser Fingerprinting:** Even when cookies are cleared, websites can calculate a unique mathematical signature based on your screen resolution, installed fonts, GPU capabilities, operating system version, and browser plugins.
- **Data Brokers:** Specialized commercial entities that legally scour public records, purchase histories, and app telemetry to assemble detailed user dossiers sold to insurers, employers, and marketing firms.

---

### 3. Global Privacy Legislation
- **General Data Protection Regulation (GDPR):** European Union regulation enforcing the right to be forgotten, explicit consent for data gathering, and severe penalties for non-compliant organizations.
- **California Consumer Privacy Act (CCPA):** Provides California residents the right to opt-out of the sale of personal information and inspect stored profile data.

---

### 4. Practical Privacy Toolkit
1. **Password Managers:** Never reuse passwords across sites. Use an audited password manager (Bitwarden, 1Password) with strong master passphrases.
2. **Content Blockers:** Utilize open-source tracking blockers (e.g., uBlock Origin, Privacy Badger) to neutralize surveillance beacons.
3. **Encrypted Messaging:** Choose end-to-end encrypted messaging platforms with verifiable protocols (e.g., Signal) for private discussions.
4. **App Permissions Audit:** Regularly revoke unnecessary microphone, camera, contacts, and precise location permissions granted to mobile applications.
    `
  },
  {
    id: 'mod-4',
    category_id: 'cat-1',
    slug: 'cyberbullying-online-harassment',
    title: 'Cyberbullying and Online Harassment',
    order_index: 4,
    estimated_time: '20 mins',
    icon: 'HeartHandshake',
    description: 'Recognize various forms of online harassment, dox tactics, flaming, psychological impacts, and active upstander intervention.',
    learning_objectives: [
      'Identify behaviors categorized as cyberbullying, trolling, doxxing, and harassment.',
      'Understand the psychological and legal ramifications of digital abuse.',
      'Apply effective evidence collection and reporting protocols.',
      'Transition from passive bystander to active, empathetic upstander.'
    ],
    content: `
# Cyberbullying and Online Harassment

### 1. Understanding Cyberbullying
Cyberbullying is bullying that takes place over digital devices like cell phones, computers, and tablets. It can occur through SMS, Text, apps, or online in social media, forums, or gaming where people can view, participate in, or share content.

Unlike traditional face-to-face bullying, cyberbullying can occur 24/7, spreads virally across networks within minutes, and often allows perpetrators to hide behind pseudo-anonymous accounts.

---

### 2. Common Manifestations of Online Abuse
- **Harassment & Flaming:** Repeatedly sending offensive, rude, and insulting messages directly to a target or in group channels.
- **Doxxing (Dropping Docs):** Maliciously publishing private personal information (home address, phone number, workplace, family contacts) online to invite real-world harassment or violence.
- **Impersonation (Fraping):** Creating fake accounts or hijacking legitimate accounts to post derogatory remarks in someone else’s name.
- **Cyberstalking:** Systematic, persistent monitoring, surveillance, and threat delivery inducing reasonable fear of physical harm.
- **Exclusion:** Intentionally organizing social groups or gaming lobbies to publicly ostracize and demean specific individuals.

---

### 3. Legal and Psychological Consequences
Victims of prolonged cyberbullying frequently suffer from acute anxiety, depressive episodes, academic decline, insomnia, and in severe cases, suicidal ideation.

Globally, legal frameworks increasingly classify cyberbullying, non-consensual image sharing, and cyberstalking as criminal offenses resulting in school expulsion, employment termination, civil lawsuits, and criminal prosecution.

---

### 4. What To Do: The 4-Step Response Framework
1. **Do Not Retaliate:** Bullies seek emotional reactions. Engaging in reciprocal anger feeds their objective and can complicate institutional investigations.
2. **Document Everything:** Capture dated, full-screen screenshots including URLs, timestamps, sender handles, and message threads before the perpetrator deletes them.
3. **Block and Report:** Utilize the platform’s built-in moderation tools to block perpetrators and file formal abuse complaints.
4. **Seek Support:** Confide in a trusted mentor, counselor, parent, or campus security authority.

---

### 5. Being an Active Upstander
A bystander sees bullying and does nothing; an **upstander** intervenes safely:
- Reach out privately to the victim to offer empathy and emotional grounding.
- Publicly shift the conversation or dispute falsehoods constructively without entering a flaming war.
- Help report offending content collectively to platform safety teams.
    `
  },
  {
    id: 'mod-5',
    category_id: 'cat-3',
    slug: 'digital-ethics-intellectual-property',
    title: 'Digital Ethics and Intellectual Property',
    order_index: 5,
    estimated_time: '25 mins',
    icon: 'Scale',
    description: 'Explore copyright laws, Fair Use doctrine, Creative Commons licensing, open-source software, and ethical AI utilization.',
    learning_objectives: [
      'Navigate copyright, trademarks, patents, and intellectual property in digital spaces.',
      'Differentiate between commercial infringement, Fair Use, and public domain works.',
      'Apply Creative Commons (CC) licenses accurately to creative and academic work.',
      'Address emerging ethical questions in generative AI and digital provenance.'
    ],
    content: `
# Digital Ethics and Intellectual Property

### 1. The Foundations of Intellectual Property
Intellectual property (IP) refers to creations of the mind: inventions, literary and artistic works, designs, symbols, names, and images used in commerce.

In the digital world where content can be duplicated losslessly and distributed globally in milliseconds, honoring intellectual property is essential to protect creators and sustain innovation.

---

### 2. Copyright vs. Fair Use
- **Copyright:** Automatic legal protection granted to creators of original works from the moment of tangible expression. It grants exclusive rights to reproduce, distribute, display, and perform the work.
- **Fair Use Doctrine:** A legal exception permitting limited use of copyrighted material without permission for purposes such as criticism, news reporting, teaching, scholarship, or parody.
  * *The Four Factors of Fair Use:*
    1. Purpose and character of the use (commercial vs. non-profit educational/transformative).
    2. Nature of the copyrighted work.
    3. Amount and substantiality of the portion used.
    4. Effect of the use upon the potential market value of the original work.

---

### 3. Creative Commons (CC) Licenses
Creative Commons provides standardized copyright licenses enabling creators to grant permissions in advance:
- **CC BY (Attribution):** Others can distribute, remix, and build upon your work, even commercially, as long as credit is given.
- **CC BY-SA (ShareAlike):** Derivative works must be licensed under identical terms.
- **CC BY-NC (Non-Commercial):** The work cannot be utilized for commercial profit.
- **CC BY-ND (NoDerivatives):** The work may be shared, but must remain unedited and whole.
- **CC0 (Public Domain Dedication):** The creator waives all copyright worldwide.

---

### 4. Plagiarism in the Digital Era
Digital plagiarism involves copying code, text, artwork, or structural ideas from internet sources without transparent attribution. Academic and professional consequences include loss of credit, contract termination, and reputational ruin.

---

### 5. Ethical AI and Content Generation
As Generative AI tools (chatbots, image synthesizers, code generators) proliferate, digital citizens must address new ethical obligations:
- Disclose when AI assistance was utilized in research papers and published works.
- Verify machine-generated citations and code to prevent hallucinated vulnerabilities.
- Respect opt-out standards (e.g., Robots.txt directives) and training rights of artists.
    `
  },
  {
    id: 'mod-6',
    category_id: 'cat-3',
    slug: 'fake-news-and-misinformation',
    title: 'Fake News and Misinformation',
    order_index: 6,
    estimated_time: '25 mins',
    icon: 'AlertTriangle',
    description: 'Learn verification strategies, deepfake identification, lateral reading techniques, and cognitive bias awareness.',
    learning_objectives: [
      'Distinguish between Misinformation, Disinformation, and Malinformation.',
      'Perform Lateral Reading and reverse image verification like a professional fact-checker.',
      'Recognize cognitive biases (confirmation bias, emotional anchoring) exploited by bad actors.',
      'Identify deepfake synthetic media and manipulative editing techniques.'
    ],
    content: `
# Fake News and Misinformation

### 1. The Information Disorder Spectrum
Not all incorrect information is created equal. Scholars classify information disorder into three distinct categories:
1. **Misinformation:** False or inaccurate information shared by individuals who believe it to be true, without malicious intent (e.g., sharing an outdated health tip).
2. **Disinformation:** Deliberately fabricated falsehoods engineered and propagated to deceive, cause harm, or profit commercially/politically.
3. **Malinformation:** Genuine, truthful information leaked or weaponized out of context to inflict targeted harm (e.g., leaked private emails timed to destabilize an election).

---

### 2. The Mechanics of Viral Deception
Fake news spreads up to six times faster than verified truth on social networks. This phenomenon relies on:
- **Clickbait Headlines:** Emotionally provocative phrasing designed to trigger outrage, anxiety, or confirmation bias.
- **Algorithmic Amplification:** Social media algorithms optimize for user engagement (clicks, shares, comments), rewarding controversial content regardless of veracity.
- **Echo Chambers & Filter Bubbles:** Users are continuously served content that reaffirms their preexisting worldviews, immunizing them against contrary factual evidence.

---

### 3. Lateral Reading: The Fact-Checker’s Secret
Traditional readers read vertically—scrolling down an unfamiliar page to judge its author, design, and citations. Professional fact-checkers read **laterally**:
1. When landing on an unfamiliar claim, open multiple browser tabs immediately.
2. Search what other credible, independent news outlets and scientific journals say about the website and author.
3. Check fact-checking databases like Snopes, Politifact, and Reuters Fact Check.

---

### 4. Detecting Synthetic Media & Deepfakes
Deepfakes utilize deep generative neural networks to substitute faces or synthesize human voices with striking realism:
- Look for unnatural blinking patterns, irregular skin smoothing, or misalignment along jawlines.
- Examine lighting inconsistencies: Does the light source on the person's face match the reflections in their eyes and the environment?
- Inspect audio sync: Do speech acoustics exhibit unnatural cadence, robotic pitch clipping, or desynchronized lip movements?
- Perform Reverse Image Search (Google Lens, TinEye) to trace the original, unaltered footage.

---

### 5. Personal Verification Checklist (The CRAAP Test)
Before sharing any viral post, evaluate:
- **Currency:** Is the information current, or is an old story being recycled as breaking news?
- **Relevance:** Does the content directly address the issue, or divert attention via strawmen?
- **Authority:** Who authored the piece? What are their verifiable credentials and affiliations?
- **Accuracy:** Is evidence supported by peer-reviewed research or verifiable sources?
- **Purpose:** Is the page designed to educate, sell a product, provoke anger, or lobby for a partisan cause?
    `
  }
];

export const INITIAL_QUIZZES = [
  { id: 'quiz-1', module_id: 'mod-1', title: 'Digital Citizenship Fundamentals Quiz', passing_score: 70 },
  { id: 'quiz-2', module_id: 'mod-2', title: 'Cybersecurity Awareness Quiz', passing_score: 70 },
  { id: 'quiz-3', module_id: 'mod-3', title: 'Online Privacy & Data Protection Quiz', passing_score: 70 },
  { id: 'quiz-4', module_id: 'mod-4', title: 'Cyberbullying & Online Harassment Quiz', passing_score: 70 },
  { id: 'quiz-5', module_id: 'mod-5', title: 'Digital Ethics & Intellectual Property Quiz', passing_score: 70 },
  { id: 'quiz-6', module_id: 'mod-6', title: 'Fake News & Misinformation Quiz', passing_score: 70 }
];

export const INITIAL_QUESTIONS = [
  // ==================== MODULE 1: Digital Citizenship (9 Questions) ====================
  {
    id: 'q1-1',
    quiz_id: 'quiz-1',
    order_index: 1,
    question_text: 'What constitutes an individual\'s "passive" digital footprint?',
    explanation: 'A passive digital footprint consists of data collected behind the scenes without the user\'s direct active input, such as IP addresses, browsing habits, and device telemetry.',
    options: [
      { id: 'opt-1-1-a', text: 'Photos and videos you intentionally upload to Instagram', is_correct: false },
      { id: 'opt-1-1-b', text: 'Background data collected automatically like your IP address and browsing telemetry', is_correct: true },
      { id: 'opt-1-1-c', text: 'Comments you leave on public discussion boards', is_correct: false },
      { id: 'opt-1-1-d', text: 'Emails you draft and send to colleagues', is_correct: false }
    ]
  },
  {
    id: 'q1-2',
    quiz_id: 'quiz-1',
    order_index: 2,
    question_text: 'In the 9 elements of digital citizenship, what does "Digital Literacy" primarily emphasize?',
    explanation: 'Digital Literacy encompasses the cognitive and technical ability to learn, navigate, evaluate, and critically judge information and digital tools.',
    options: [
      { id: 'opt-1-2-a', text: 'Purchasing the newest flagship smartphone every year', is_correct: false },
      { id: 'opt-1-2-b', text: 'The ability to learn, evaluate, and critically judge digital tools and content', is_correct: true },
      { id: 'opt-1-2-c', text: 'Restricting personal internet usage to under 15 minutes daily', is_correct: false },
      { id: 'opt-1-2-d', text: 'Replacing all printed textbooks with e-readers', is_correct: false }
    ]
  },
  {
    id: 'q1-3',
    quiz_id: 'quiz-1',
    order_index: 3,
    question_text: 'According to established Netiquette standards, what should you do if someone makes a minor grammatical error in an email thread?',
    explanation: 'Polite Netiquette dictates that minor oversights should either be overlooked or addressed privately and kindly rather than through public ridicule.',
    options: [
      { id: 'opt-1-3-a', text: 'Reply-all immediately highlighting their mistake in bold capital letters', is_correct: false },
      { id: 'opt-1-3-b', text: 'Ignore it or address it politely in a private message if clarification is necessary', is_correct: true },
      { id: 'opt-1-3-c', text: 'Forward the message to human resources for disciplinary action', is_correct: false },
      { id: 'opt-1-3-d', text: 'Post a screenshot on social media to mock their mistake', is_correct: false }
    ]
  },
  {
    id: 'q1-4',
    quiz_id: 'quiz-1',
    order_index: 4,
    question_text: 'What does the acronym "THINK" stand for before posting online?',
    explanation: 'The THINK acronym prompts users to evaluate if a post is True, Helpful, Inspiring, Necessary, and Kind.',
    options: [
      { id: 'opt-1-4-a', text: 'True, Helpful, Inspiring, Necessary, Kind', is_correct: true },
      { id: 'opt-1-4-b', text: 'Timely, Honest, Interesting, New, Known', is_correct: false },
      { id: 'opt-1-4-c', text: 'Technological, Hyperlinked, Indexed, Networked, Keyed', is_correct: false },
      { id: 'opt-1-4-d', text: 'Tactical, Humorous, Instant, Noteworthy, Knowledgeable', is_correct: false }
    ]
  },
  {
    id: 'q1-5',
    quiz_id: 'quiz-1',
    order_index: 5,
    question_text: 'Why is it critical to understand that digital content is rarely truly deleted?',
    explanation: 'Content posted online can be cached, archived by crawlers (such as the Wayback Machine), or screenshotted by viewers, persisting indefinitely.',
    options: [
      { id: 'opt-1-5-a', text: 'Because servers always lose data after 24 hours', is_correct: false },
      { id: 'opt-1-5-b', text: 'Because search engines, web archives, and screenshots create permanent historical records', is_correct: true },
      { id: 'opt-1-5-c', text: 'Because cloud storage companies sell your deleted photos to television networks', is_correct: false },
      { id: 'opt-1-5-d', text: 'Because mobile operating systems cannot erase flash memory', is_correct: false }
    ]
  },
  {
    id: 'q1-6',
    quiz_id: 'quiz-1',
    order_index: 6,
    question_text: 'Which of the following represents an active digital footprint action?',
    explanation: 'Publishing a blog post or submitting a product review requires intentional human action, generating an active footprint.',
    options: [
      { id: 'opt-1-6-a', text: 'An ad network tracking your scroll speed across an article', is_correct: false },
      { id: 'opt-1-6-b', text: 'A web server logging your browser user-agent header', is_correct: false },
      { id: 'opt-1-6-c', text: 'Publishing a product review and video on an e-commerce platform', is_correct: true },
      { id: 'opt-1-6-d', text: 'Your ISP recording DNS lookup timestamps', is_correct: false }
    ]
  },
  {
    id: 'q1-7',
    quiz_id: 'quiz-1',
    order_index: 7,
    question_text: 'What does "Digital Wellness" address within the digital citizenship framework?',
    explanation: 'Digital wellness focuses on maintaining physical health (ergonomics, eye protection) and psychological balance against screen addiction and digital burnout.',
    options: [
      { id: 'opt-1-7-a', text: 'Cleaning your monitor screen with disinfectant spray', is_correct: false },
      { id: 'opt-1-7-b', text: 'Maintaining balanced physical ergonomics, screen boundaries, and psychological health', is_correct: true },
      { id: 'opt-1-7-c', text: 'Installing an antivirus program on your tablet', is_correct: false },
      { id: 'opt-1-7-d', text: 'Upgrading your internet router to Wi-Fi 7', is_correct: false }
    ]
  },
  {
    id: 'q1-8',
    quiz_id: 'quiz-1',
    order_index: 8,
    question_text: 'What is the primary responsibility paired with having the right to free expression online?',
    explanation: 'Responsible digital citizenship pairs freedom of speech with the duty to avoid defamation, harassment, hate speech, and intentionally harmful falsehoods.',
    options: [
      { id: 'opt-1-8-a', text: 'Refraining from defaming others, inciting violence, or spreading malicious falsehoods', is_correct: true },
      { id: 'opt-1-8-b', text: 'Posting only content approved by governmental censors', is_correct: false },
      { id: 'opt-1-8-c', text: 'Making sure your account always has more followers than competitors', is_correct: false },
      { id: 'opt-1-8-d', text: 'Never criticizing commercial products in public reviews', is_correct: false }
    ]
  },
  {
    id: 'q1-9',
    quiz_id: 'quiz-1',
    order_index: 9,
    question_text: 'How often should a responsible digital citizen review their personal security and privacy settings on active platforms?',
    explanation: 'Quarterly reviews (every 3 months) ensure newly introduced platform features and changed policy defaults do not inadvertently expose your private data.',
    options: [
      { id: 'opt-1-9-a', text: 'Never, because privacy settings never change automatically', is_correct: false },
      { id: 'opt-1-9-b', text: 'At least quarterly (every 3-4 months) or whenever platform policies update', is_correct: true },
      { id: 'opt-1-9-c', text: 'Once every ten years', is_correct: false },
      { id: 'opt-1-9-d', text: 'Only when you receive an alert that your account was compromised', is_correct: false }
    ]
  },

  // ==================== MODULE 2: Cybersecurity Awareness (9 Questions) ====================
  {
    id: 'q2-1',
    quiz_id: 'quiz-2',
    order_index: 1,
    question_text: 'What distinguishes "Spear Phishing" from generic phishing campaigns?',
    explanation: 'Spear phishing involves thorough reconnaissance on a specific individual or organization to craft a customized, highly convincing attack lure.',
    options: [
      { id: 'opt-2-1-a', text: 'It uses spear-shaped attachment icons', is_correct: false },
      { id: 'opt-2-1-b', text: 'It targets a specific person using pre-researched personal or corporate information', is_correct: true },
      { id: 'opt-2-1-c', text: 'It only targets oceanography researchers', is_correct: false },
      { id: 'opt-2-1-d', text: 'It is conducted solely through telephone audio recordings', is_correct: false }
    ]
  },
  {
    id: 'q2-2',
    quiz_id: 'quiz-2',
    order_index: 2,
    question_text: 'Which multi-factor authentication (MFA) method is considered the most secure against real-time phishing proxy attacks?',
    explanation: 'FIDO2/WebAuthn hardware security keys bind authentication to the legitimate domain origin, rendering man-in-the-middle phishing proxies ineffective.',
    options: [
      { id: 'opt-2-2-a', text: 'SMS one-time text codes', is_correct: false },
      { id: 'opt-2-2-b', text: 'FIDO2 / WebAuthn hardware security keys', is_correct: true },
      { id: 'opt-2-2-c', text: 'Security questions regarding your mother’s maiden name', is_correct: false },
      { id: 'opt-2-2-d', text: 'Email confirmation links', is_correct: false }
    ]
  },
  {
    id: 'q2-3',
    quiz_id: 'quiz-2',
    order_index: 3,
    question_text: 'What is the primary operational objective of Ransomware?',
    explanation: 'Ransomware encrypts the victim\'s files and system partitions, extorting money (usually in cryptocurrency) in exchange for the decryption tool.',
    options: [
      { id: 'opt-2-3-a', text: 'Encrypting victim data and demanding financial payment for decryption keys', is_correct: true },
      { id: 'opt-2-3-b', text: 'Displaying harmless humorous pop-ups on the desktop', is_correct: false },
      { id: 'opt-2-3-c', text: 'Speeding up CPU clocks to overheat hardware', is_correct: false },
      { id: 'opt-2-3-d', text: 'Deleting obsolete temporary internet files to free up disk space', is_correct: false }
    ]
  },
  {
    id: 'q2-4',
    quiz_id: 'quiz-2',
    order_index: 4,
    question_text: 'You receive an urgent email from your "CEO" demanding an immediate gift card purchase or wire transfer. What is this scenario called?',
    explanation: 'This is Business Email Compromise (BEC) / CEO Fraud, a classic social engineering tactic relying on urgency, authority, and intimidation.',
    options: [
      { id: 'opt-2-4-a', text: 'Business Email Compromise (BEC) or CEO Fraud', is_correct: true },
      { id: 'opt-2-4-b', text: 'SQL Injection attack', is_correct: false },
      { id: 'opt-2-4-c', text: 'Buffer Overflow vulnerability', is_correct: false },
      { id: 'opt-2-4-d', text: 'Cross-site scripting (XSS)', is_correct: false }
    ]
  },
  {
    id: 'q2-5',
    quiz_id: 'quiz-2',
    order_index: 5,
    question_text: 'Why is keeping software patched considered one of the highest-leverage security habits?',
    explanation: 'Software updates regularly patch known vulnerabilities that threat actors actively weaponize into automated scanning exploits.',
    options: [
      { id: 'opt-2-5-a', text: 'It makes computer icons change color', is_correct: false },
      { id: 'opt-2-5-b', text: 'It remediates known security vulnerabilities before threat actors can exploit them', is_correct: true },
      { id: 'opt-2-5-c', text: 'It guarantees that hardware never overheats', is_correct: false },
      { id: 'opt-2-5-d', text: 'It removes the need for passwords completely', is_correct: false }
    ]
  },
  {
    id: 'q2-6',
    quiz_id: 'quiz-2',
    order_index: 6,
    question_text: 'What does a "Trojan" malware program do?',
    explanation: 'A Trojan disguises itself as harmless or desirable software (e.g., game, utility) to trick the user into installing it, while harboring a hidden malicious payload.',
    options: [
      { id: 'opt-2-6-a', text: 'Replicates automatically across networks without user execution', is_correct: false },
      { id: 'opt-2-6-b', text: 'Masquerades as legitimate software while concealing covert malicious capabilities', is_correct: true },
      { id: 'opt-2-6-c', text: 'Directly burns the motherboard circuitry', is_correct: false },
      { id: 'opt-2-6-d', text: 'Encrypts internet router Wi-Fi signals', is_correct: false }
    ]
  },
  {
    id: 'q2-7',
    quiz_id: 'quiz-2',
    order_index: 7,
    question_text: 'What is the danger of using unencrypted public Wi-Fi without a trusted VPN?',
    explanation: 'Adversaries on the same unencrypted local network can intercept unencrypted packets or execute man-in-the-middle attacks to redirect traffic.',
    options: [
      { id: 'opt-2-7-a', text: 'Your device battery drains three times faster', is_correct: false },
      { id: 'opt-2-7-b', text: 'Attackers on the same local subnet may eavesdrop on unencrypted traffic or stage MITM attacks', is_correct: true },
      { id: 'opt-2-7-c', text: 'Public Wi-Fi deletes your saved documents automatically', is_correct: false },
      { id: 'opt-2-7-d', text: 'The internet speed is capped at 56 kbps', is_correct: false }
    ]
  },
  {
    id: 'q2-8',
    quiz_id: 'quiz-2',
    order_index: 8,
    question_text: 'What is the very first technical step you should take if you suspect your computer was infected by malware?',
    explanation: 'Isolating the endpoint from network interfaces (Wi-Fi, ethernet) immediately blocks malware from communicating with command-and-control servers or spreading laterally.',
    options: [
      { id: 'opt-2-8-a', text: 'Disconnect from all network connections (unplug ethernet, disable Wi-Fi)', is_correct: true },
      { id: 'opt-2-8-b', text: 'Send an email to everyone in your address book', is_correct: false },
      { id: 'opt-2-8-c', text: 'Immediately restart the computer 5 times', is_correct: false },
      { id: 'opt-2-8-d', text: 'Delete the Recycle Bin icon from your desktop', is_correct: false }
    ]
  },
  {
    id: 'q2-9',
    quiz_id: 'quiz-2',
    order_index: 9,
    question_text: 'What does "Smishing" refer to in the context of social engineering attacks?',
    explanation: 'Smishing is the convergence of "SMS" and "phishing", delivering malicious links or fraud prompts via mobile text messaging.',
    options: [
      { id: 'opt-2-9-a', text: 'Phishing attempts conducted via SMS / text messages', is_correct: true },
      { id: 'opt-2-9-b', text: 'Crushing physical hard drives with hydraulic presses', is_correct: false },
      { id: 'opt-2-9-c', text: 'Flooding email inboxes with large video attachments', is_correct: false },
      { id: 'opt-2-9-d', text: 'Intercepting radio frequencies using satellite dishes', is_correct: false }
    ]
  },

  // ==================== MODULE 3: Online Privacy & Data Protection (9 Questions) ====================
  {
    id: 'q3-1',
    quiz_id: 'quiz-3',
    order_index: 1,
    question_text: 'What constitutes Personally Identifiable Information (PII)?',
    explanation: 'PII is any data that can directly identify, contact, or locate an individual, such as full name, SSN, biometric scans, or address.',
    options: [
      { id: 'opt-3-1-a', text: 'Information that can be used alone or combined with other data to identify an individual', is_correct: true },
      { id: 'opt-3-1-b', text: 'General weather forecasts for a metropolitan city', is_correct: false },
      { id: 'opt-3-1-c', text: 'The stock market index price at market close', is_correct: false },
      { id: 'opt-3-1-d', text: 'Publicly published Wikipedia articles', is_correct: false }
    ]
  },
  {
    id: 'q3-2',
    quiz_id: 'quiz-3',
    order_index: 2,
    question_text: 'What is the functional difference between first-party and third-party cookies?',
    explanation: 'First-party cookies are set by the website you visit directly for functionality, whereas third-party cookies originate from external domains (advertisers) to track you across disparate sites.',
    options: [
      { id: 'opt-3-2-a', text: 'First-party cookies expire after 5 seconds; third-party cookies never expire', is_correct: false },
      { id: 'opt-3-2-b', text: 'First-party cookies are set by the site you visit; third-party cookies are set by external trackers across multiple websites', is_correct: true },
      { id: 'opt-3-2-c', text: 'First-party cookies only work on mobile devices; third-party cookies work on desktop', is_correct: false },
      { id: 'opt-3-2-d', text: 'First-party cookies are illegal under GDPR; third-party cookies are mandatory', is_correct: false }
    ]
  },
  {
    id: 'q3-3',
    quiz_id: 'quiz-3',
    order_index: 3,
    question_text: 'How does "Browser Fingerprinting" track users without using HTTP cookies?',
    explanation: 'Browser fingerprinting aggregates distinct system configurations (fonts, canvas rendering, extensions, GPU, timezone) into a unique signature with high entropy.',
    options: [
      { id: 'opt-3-3-a', text: 'By requiring physical biometric thumbprints on the glass screen', is_correct: false },
      { id: 'opt-3-3-b', text: 'By collecting subtle hardware, font, screen, and browser configuration parameters into a unique signature', is_correct: true },
      { id: 'opt-3-3-c', text: 'By reading the serial number stamped on the laptop chassis', is_correct: false },
      { id: 'opt-3-3-d', text: 'By analyzing the ambient microphone background noise', is_correct: false }
    ]
  },
  {
    id: 'q3-4',
    quiz_id: 'quiz-3',
    order_index: 4,
    question_text: 'What major landmark right does the EU General Data Protection Regulation (GDPR) give citizens regarding their stored data?',
    explanation: 'GDPR Article 17 provides the "Right to Erasure" (commonly known as the Right to be Forgotten), requiring data controllers to delete personal data upon request.',
    options: [
      { id: 'opt-3-4-a', text: 'The right to free monthly internet access', is_correct: false },
      { id: 'opt-3-4-b', text: 'The right to erasure (commonly known as the Right to be Forgotten)', is_correct: true },
      { id: 'opt-3-4-c', text: 'The right to hack into companies that spam you', is_correct: false },
      { id: 'opt-3-4-d', text: 'The right to demand free smartphones from manufacturers', is_correct: false }
    ]
  },
  {
    id: 'q3-5',
    quiz_id: 'quiz-3',
    order_index: 5,
    question_text: 'What role do "Data Brokers" play in the internet ecosystem?',
    explanation: 'Data brokers aggregate consumer data from public records, retail transactions, and online tracking to compile and monetize individual user profiles.',
    options: [
      { id: 'opt-3-5-a', text: 'They manufacture physical server racks for data centers', is_correct: false },
      { id: 'opt-3-5-b', text: 'They aggregate, analyze, and sell personal demographic and behavioral data to third parties', is_correct: true },
      { id: 'opt-3-5-c', text: 'They provide free fiber-optic cabling to schools', is_correct: false },
      { id: 'opt-3-5-d', text: 'They regulate cryptocurrency transactions globally', is_correct: false }
    ]
  },
  {
    id: 'q3-6',
    quiz_id: 'quiz-3',
    order_index: 6,
    question_text: 'Why is reusing the same password across multiple online accounts dangerous?',
    explanation: 'Credential stuffing attacks allow hackers to take leaked credentials from one compromised website and automatically test them on hundreds of other major services.',
    options: [
      { id: 'opt-3-6-a', text: 'It creates extra heat on the keyboard', is_correct: false },
      { id: 'opt-3-6-b', text: 'A single breach at one site allows attackers to access all your accounts via credential stuffing', is_correct: true },
      { id: 'opt-3-6-c', text: 'Web browsers refuse to save the same password twice', is_correct: false },
      { id: 'opt-3-6-d', text: 'It slows down your home Wi-Fi download speed', is_correct: false }
    ]
  },
  {
    id: 'q3-7',
    quiz_id: 'quiz-3',
    order_index: 7,
    question_text: 'What does "End-to-End Encryption" (E2EE) ensure for messaging participants?',
    explanation: 'E2EE encrypts messages on the sender\'s device so only the intended recipient holding the private key can decrypt it; intermediary servers and telecommunication providers cannot read the plaintext.',
    options: [
      { id: 'opt-3-7-a', text: 'Only the sender and recipient can decrypt and read messages; service providers cannot inspect content', is_correct: true },
      { id: 'opt-3-7-b', text: 'Messages can be read by anyone on the local Wi-Fi router', is_correct: false },
      { id: 'opt-3-7-c', text: 'Messages are automatically translated into 50 languages', is_correct: false },
      { id: 'opt-3-7-d', text: 'Messages cannot be deleted from the phone once delivered', is_correct: false }
    ]
  },
  {
    id: 'q3-8',
    quiz_id: 'quiz-3',
    order_index: 8,
    question_text: 'Which mobile permission should you be most cautious about granting to a basic flashlight or calculator app?',
    explanation: 'A basic flashlight or calculator has zero technical requirement for contacts, location, or microphone access; granting these permits covert surveillance.',
    options: [
      { id: 'opt-3-8-a', text: 'Access to flash hardware', is_correct: false },
      { id: 'opt-3-8-b', text: 'Contacts, precise location coordinates, and microphone access', is_correct: true },
      { id: 'opt-3-8-c', text: 'Vibration feedback permission', is_correct: false },
      { id: 'opt-3-8-d', text: 'Dark mode display permission', is_correct: false }
    ]
  },
  {
    id: 'q3-9',
    quiz_id: 'quiz-3',
    order_index: 9,
    question_text: 'What is the primary benefit of using a trusted open-source password manager?',
    explanation: 'Password managers generate and securely store unique, complex 20+ character passwords for every website, protected by zero-knowledge encryption.',
    options: [
      { id: 'opt-3-9-a', text: 'It allows you to use "123456" everywhere safely', is_correct: false },
      { id: 'opt-3-9-b', text: 'It generates and securely stores unique, complex passwords for every service under a zero-knowledge master key', is_correct: true },
      { id: 'opt-3-9-c', text: 'It shares all your credentials with social media friends', is_correct: false },
      { id: 'opt-3-9-d', text: 'It automatically enters credit card details without your consent', is_correct: false }
    ]
  },

  // ==================== MODULE 4: Cyberbullying & Online Harassment (9 Questions) ====================
  {
    id: 'q4-1',
    quiz_id: 'quiz-4',
    order_index: 1,
    question_text: 'What does the cyber-harassment term "Doxxing" refer to?',
    explanation: 'Doxxing refers to discovering and maliciously broadcasting an individual\'s private personally identifying details (address, phone, employer) to encourage harassment.',
    options: [
      { id: 'opt-4-1-a', text: 'Publishing someone\'s private home address, phone number, or personal documents online maliciously', is_correct: true },
      { id: 'opt-4-1-b', text: 'Sending formatted Word documents via email', is_correct: false },
      { id: 'opt-4-1-c', text: 'Playing video games cooperatively with classmates', is_correct: false },
      { id: 'opt-4-1-d', text: 'Updating privacy terms of service on a website', is_correct: false }
    ]
  },
  {
    id: 'q4-2',
    quiz_id: 'quiz-4',
    order_index: 2,
    question_text: 'What is the key difference between a "Bystander" and an "Upstander"?',
    explanation: 'A bystander observes abuse passively without acting; an upstander takes proactive, empathetic, and safe action to support the victim and address the harm.',
    options: [
      { id: 'opt-4-2-a', text: 'A bystander stands up physically, while an upstander sits down', is_correct: false },
      { id: 'opt-4-2-b', text: 'A bystander observes harassment passively, while an upstander takes positive action to support the victim and disrupt abuse', is_correct: true },
      { id: 'opt-4-2-c', text: 'A bystander reports abuse to police; an upstander joins the harassment', is_correct: false },
      { id: 'opt-4-2-d', text: 'There is no functional difference between the two terms', is_correct: false }
    ]
  },
  {
    id: 'q4-3',
    quiz_id: 'quiz-4',
    order_index: 3,
    question_text: 'Why is retaliating with angry insults against an online troll or bully generally counterproductive?',
    explanation: 'Trolls seek emotional provocation; escalating with counter-aggression fuels further harassment and can complicate administrative or legal investigations.',
    options: [
      { id: 'opt-4-3-a', text: 'It gives the bully the emotional reaction they desire and risks violating platform rules yourself', is_correct: true },
      { id: 'opt-4-3-b', text: 'It instantly uninstalls your browser', is_correct: false },
      { id: 'opt-4-3-c', text: 'It makes the bully permanently apologize immediately', is_correct: false },
      { id: 'opt-4-3-d', text: 'It deletes the troll’s social media profile automatically', is_correct: false }
    ]
  },
  {
    id: 'q4-4',
    quiz_id: 'quiz-4',
    order_index: 4,
    question_text: 'When collecting evidence of online harassment, what details must be included in screenshots?',
    explanation: 'Legally actionable evidence requires complete context: full URLs, sender profile usernames, timestamps, dates, and unedited conversation threads.',
    options: [
      { id: 'opt-4-4-a', text: 'Only single emoji reactions cropped tightly', is_correct: false },
      { id: 'opt-4-4-b', text: 'Timestamps, sender handles/URLs, date stamps, and full uncropped message context', is_correct: true },
      { id: 'opt-4-4-c', text: 'Photographs of your keyboard and mouse', is_correct: false },
      { id: 'opt-4-4-d', text: 'Hand-drawn sketches of what the sender looks like', is_correct: false }
    ]
  },
  {
    id: 'q4-5',
    quiz_id: 'quiz-4',
    order_index: 5,
    question_text: 'What is "Fraping" or online impersonation harassment?',
    explanation: 'Impersonation involves taking over someone\'s account or creating fake profiles in their likeness to post defamatory, offensive statements in their name.',
    options: [
      { id: 'opt-4-5-a', text: 'Gaining unauthorized access to someone’s profile or making a fake clone to post damaging remarks as them', is_correct: true },
      { id: 'opt-4-5-b', text: 'Ordering frappe coffee drinks online', is_correct: false },
      { id: 'opt-4-5-c', text: 'Streaming video games on Twitch', is_correct: false },
      { id: 'opt-4-5-d', text: 'Deleting your own social media profile', is_correct: false }
    ]
  },
  {
    id: 'q4-6',
    quiz_id: 'quiz-4',
    order_index: 6,
    question_text: 'Which factor makes cyberbullying uniquely pernicious compared to traditional schoolyard bullying?',
    explanation: 'Digital abuse is ubiquitous—it follows victims 24/7 into private homes, can spread virally to hundreds of peers in seconds, and can be conducted anonymously.',
    options: [
      { id: 'opt-4-4-a', text: 'It only occurs between 9 AM and 3 PM', is_correct: false },
      { id: 'opt-4-6-b', text: 'It can persist 24/7, cross geographic boundaries, spread virally, and allow anonymous attacks', is_correct: true },
      { id: 'opt-4-6-c', text: 'It only affects people who own desktop computers', is_correct: false },
      { id: 'opt-4-6-d', text: 'It can be permanently cured by turning the monitor brightness down', is_correct: false }
    ]
  },
  {
    id: 'q4-7',
    quiz_id: 'quiz-4',
    order_index: 7,
    question_text: 'If a peer confides in you that they are receiving targeted death threats online, what is the best immediate action?',
    explanation: 'Credible threats of physical violence must be documented and escalated immediately to parents, school authorities, or law enforcement.',
    options: [
      { id: 'opt-4-7-a', text: 'Tell them to keep it a secret and ignore it', is_correct: false },
      { id: 'opt-4-7-b', text: 'Help them preserve evidence and immediately escalate to trusted adults, campus authorities, or law enforcement', is_correct: true },
      { id: 'opt-4-7-c', text: 'Challenge the sender to a physical fight after school', is_correct: false },
      { id: 'opt-4-7-d', text: 'Delete their social media app so they can never see it again', is_correct: false }
    ]
  },
  {
    id: 'q4-8',
    quiz_id: 'quiz-4',
    order_index: 8,
    question_text: 'What does "Flaming" mean in online forums and communities?',
    explanation: 'Flaming is the hostile and insulting interaction between internet users, often involving profanity, slurs, and personal insults.',
    options: [
      { id: 'opt-4-8-a', text: 'Posting constructive book reviews', is_correct: false },
      { id: 'opt-4-8-b', text: 'Hostile, aggressive, and profanity-laced personal attacks in online discussions', is_correct: true },
      { id: 'opt-4-8-c', text: 'Setting fire emojis under popular music videos', is_correct: false },
      { id: 'opt-4-8-d', text: 'Upvoting popular questions on discussion sites', is_correct: false }
    ]
  },
  {
    id: 'q4-9',
    quiz_id: 'quiz-4',
    order_index: 9,
    question_text: 'What is a constructive way to support a victim of cyberbullying without endangering your own safety?',
    explanation: 'Reaching out privately communicates human solidarity and empathy, breaking the victim\'s psychological isolation without escalating public drama.',
    options: [
      { id: 'opt-4-9-a', text: 'Send a private supportive message letting them know they are not alone and help them report the behavior', is_correct: true },
      { id: 'opt-4-9-b', text: 'Dox the bully’s family members in revenge', is_correct: false },
      { id: 'opt-4-9-c', text: 'Like and share the bully’s comments so they become less angry', is_correct: false },
      { id: 'opt-4-9-d', text: 'Block the victim so you don’t have to see their pain', is_correct: false }
    ]
  },

  // ==================== MODULE 5: Digital Ethics & Intellectual Property (9 Questions) ====================
  {
    id: 'q5-1',
    quiz_id: 'quiz-5',
    order_index: 1,
    question_text: 'When does copyright protection legally attach to an original creative work?',
    explanation: 'Under international copyright law (Berne Convention), copyright is automatically secured the moment the work is created and fixed in a tangible medium.',
    options: [
      { id: 'opt-5-1-a', text: 'Only after paying a \$500 filing fee to the federal government', is_correct: false },
      { id: 'opt-5-1-b', text: 'Automatically from the moment the original work is fixed in a tangible medium of expression', is_correct: true },
      { id: 'opt-5-1-c', text: 'Only after the creator receives 1,000 views on YouTube', is_correct: false },
      { id: 'opt-5-1-d', text: 'Only when stamped with a physical wax notary seal', is_correct: false }
    ]
  },
  {
    id: 'q5-2',
    quiz_id: 'quiz-2',
    order_index: 2,
    question_text: 'Which of the following scenarios is most likely protected under the "Fair Use" doctrine?',
    explanation: 'Quoting a short excerpt of a copyrighted book or paper within a scholarly review or critique is a textbook transformative Fair Use scenario.',
    options: [
      { id: 'opt-5-2-a', text: 'Uploading a full Hollywood movie to your website for streaming because it is educational', is_correct: false },
      { id: 'opt-5-2-b', text: 'Quoting a brief paragraph from a published book to critique and analyze it in an academic essay', is_correct: true },
      { id: 'opt-5-2-c', text: 'Downloading copyrighted pop songs to sell on custom flash drives at a local flea market', is_correct: false },
      { id: 'opt-5-2-d', text: 'Reprinting an entire novel in a student newspaper without permission', is_correct: false }
    ]
  },
  {
    id: 'q5-3',
    quiz_id: 'quiz-5',
    order_index: 3,
    question_text: 'What does a "Creative Commons CC BY" license grant to the public?',
    explanation: 'CC BY permits others to distribute, remix, adapt, and build upon the work—even commercially—as long as proper attribution credit is provided.',
    options: [
      { id: 'opt-5-3-a', text: 'Full reuse, adaptation, and commercial rights as long as the original creator receives proper attribution', is_correct: true },
      { id: 'opt-5-3-b', text: 'The right to delete the creator’s name and claim ownership', is_correct: false },
      { id: 'opt-5-3-c', text: 'Strictly non-commercial viewing on weekends only', is_correct: false },
      { id: 'opt-5-3-d', text: 'Immediate transfer of all patent rights to the user', is_correct: false }
    ]
  },
  {
    id: 'q5-4',
    quiz_id: 'quiz-5',
    order_index: 4,
    question_text: 'What does the "ShareAlike" (SA) provision in a Creative Commons license require?',
    explanation: 'ShareAlike mandates that if you remix, transform, or build upon the material, you must distribute your contributions under the same exact license as the original.',
    options: [
      { id: 'opt-5-4-a', text: 'You must share the file on at least three social networks', is_correct: false },
      { id: 'opt-5-4-b', text: 'Any derivative works created must be licensed under the same identical terms as the original', is_correct: true },
      { id: 'opt-5-4-c', text: 'You must give 50% of your business profits to the author', is_correct: false },
      { id: 'opt-5-4-d', text: 'You cannot share the file with anyone outside your household', is_correct: false }
    ]
  },
  {
    id: 'q5-5',
    quiz_id: 'quiz-5',
    order_index: 5,
    question_text: 'Why is copying source code from a GitHub repository without checking its license ethically and legally problematic?',
    explanation: 'Even public GitHub code without an explicit open-source license remains copyrighted; copying it into proprietary or academic software can violate copyright or GPL terms.',
    options: [
      { id: 'opt-5-5-a', text: 'Because code on GitHub is automatically encrypted by Git', is_correct: false },
      { id: 'opt-5-5-b', text: 'Public visibility does not imply permission; copyright restricts unauthorized copying unless an open-source license explicitly allows it', is_correct: true },
      { id: 'opt-5-5-c', text: 'Because GitHub bans users who read open repositories', is_correct: false },
      { id: 'opt-5-5-d', text: 'Because source code is strictly protected by international patent treaties only', is_correct: false }
    ]
  },
  {
    id: 'q5-6',
    quiz_id: 'quiz-5',
    order_index: 6,
    question_text: 'What does "Public Domain" mean regarding creative and literary works?',
    explanation: 'Works in the public domain are no longer restricted by copyright (e.g. copyright expired or waived via CC0) and can be freely used by anyone without permission.',
    options: [
      { id: 'opt-5-6-a', text: 'Works owned exclusively by government intelligence agencies', is_correct: false },
      { id: 'opt-5-6-b', text: 'Works whose copyright has expired or been waived, free for anyone to use without restriction or permission', is_correct: true },
      { id: 'opt-5-6-c', text: 'Works published exclusively on city billboards', is_correct: false },
      { id: 'opt-5-6-d', text: 'Websites that require a public library card to access', is_correct: false }
    ]
  },
  {
    id: 'q5-7',
    quiz_id: 'quiz-5',
    order_index: 7,
    question_text: 'What is the ethical responsibility of a student using Generative AI (e.g., ChatGPT) to write an essay?',
    explanation: 'Academic integrity and digital ethics mandate transparent disclosure of AI assistance and independent verification of generated assertions.',
    options: [
      { id: 'opt-5-7-a', text: 'Pretending they wrote every single word manually and claiming full authorship', is_correct: false },
      { id: 'opt-5-7-b', text: 'Transparently disclosing AI utilization in line with institution guidelines and independently verifying all facts and citations', is_correct: true },
      { id: 'opt-5-7-c', text: 'Submitting the raw prompt screen recording as the final thesis paper', is_correct: false },
      { id: 'opt-5-7-d', text: 'Never citing any sources because AI already knows everything', is_correct: false }
    ]
  },
  {
    id: 'q5-8',
    quiz_id: 'quiz-5',
    order_index: 8,
    question_text: 'Which of the following is considered an act of "Digital Plagiarism"?',
    explanation: 'Submitting another person\'s writing, art, or code as your own without transparent attribution constitutes digital plagiarism.',
    options: [
      { id: 'opt-5-8-a', text: 'Taking another creator\'s digital artwork or essay and submitting it as your own original creation', is_correct: true },
      { id: 'opt-5-8-b', text: 'Linking to a reputable news website in a footnote', is_correct: false },
      { id: 'opt-5-8-c', text: 'Purchasing a digital font license for commercial typography', is_correct: false },
      { id: 'opt-5-8-d', text: 'Forking an MIT-licensed open-source project and retaining the copyright notice', is_correct: false }
    ]
  },
  {
    id: 'q5-9',
    quiz_id: 'quiz-5',
    order_index: 9,
    question_text: 'What does the "Creative Commons CC0" symbol signify?',
    explanation: 'CC0 enables creators to dedicate their work to the public domain worldwide, waiving all copyright and related rights.',
    options: [
      { id: 'opt-5-9-a', text: 'Zero copies may ever be made of this work', is_correct: false },
      { id: 'opt-5-9-b', text: 'Universal Public Domain Dedication, waiving all copyright protections globally', is_correct: true },
      { id: 'opt-5-9-c', text: 'The work costs zero dollars but cannot be viewed online', is_correct: false },
      { id: 'opt-5-9-d', text: 'The work was written entirely by an automated zero-parameter script', is_correct: false }
    ]
  },

  // ==================== MODULE 6: Fake News and Misinformation (9 Questions) ====================
  {
    id: 'q6-1',
    quiz_id: 'quiz-6',
    order_index: 1,
    question_text: 'What is the precise definition of "Disinformation"?',
    explanation: 'Disinformation is false information that is knowingly and deliberately engineered and distributed to deceive, mislead, or cause harm.',
    options: [
      { id: 'opt-6-1-a', text: 'Accidental mistakes made by honest journalists correcting typos', is_correct: false },
      { id: 'opt-6-1-b', text: 'Deliberately fabricated information created and spread with malicious intent to deceive', is_correct: true },
      { id: 'opt-6-1-c', text: 'Humorous satirical cartoons labeled as comedy', is_correct: false },
      { id: 'opt-6-1-d', text: 'Factual information that happens to be unpopular', is_correct: false }
    ]
  },
  {
    id: 'q6-2',
    quiz_id: 'quiz-6',
    order_index: 2,
    question_text: 'What is "Lateral Reading", as practiced by professional fact-checkers?',
    explanation: 'Rather than reading vertically down a suspicious page, fact-checkers open separate tabs to investigate what external, independent sources say about that site and claim.',
    options: [
      { id: 'opt-6-2-a', text: 'Reading text upside down to check for typographical printing errors', is_correct: false },
      { id: 'opt-6-2-b', text: 'Leaving the original page to open new tabs and investigate what independent sources report about the claim and author', is_correct: true },
      { id: 'opt-6-2-c', text: 'Reading the last paragraph of an article first', is_correct: false },
      { id: 'opt-6-2-d', text: 'Reading on a widescreen monitor placed horizontally', is_correct: false }
    ]
  },
  {
    id: 'q6-3',
    quiz_id: 'quiz-6',
    order_index: 3,
    question_text: 'What psychological phenomenon leads people to readily accept information that validates their existing beliefs?',
    explanation: 'Confirmation bias is the tendency to search for, interpret, favor, and recall information in a way that confirms preexisting convictions.',
    options: [
      { id: 'opt-6-3-a', text: 'Confirmation Bias', is_correct: true },
      { id: 'opt-6-3-b', text: 'The Dunning-Kruger Effect', is_correct: false },
      { id: 'opt-6-3-c', text: 'Bystander Apathy', is_correct: false },
      { id: 'opt-6-3-d', text: 'Cognitive Cache Miss', is_correct: false }
    ]
  },
  {
    id: 'q6-4',
    quiz_id: 'quiz-6',
    order_index: 4,
    question_text: 'Which visual artifact is a common telltale sign of an AI-generated Deepfake video?',
    explanation: 'Deepfakes often struggle with intricate facial geometry, resulting in abnormal eye blinking rates, lighting mismatches, and boundary blur around hair and jaws.',
    options: [
      { id: 'opt-6-4-a', text: 'The video plays in 4K resolution', is_correct: false },
      { id: 'opt-6-4-b', text: 'Unnatural blinking patterns, inconsistent lighting reflections in eyes, and facial edge blurring', is_correct: true },
      { id: 'opt-6-4-c', text: 'The background contains trees and clouds', is_correct: false },
      { id: 'opt-6-4-d', text: 'The video has English subtitles enabled', is_correct: false }
    ]
  },
  {
    id: 'q6-5',
    quiz_id: 'quiz-6',
    order_index: 5,
    question_text: 'What does "Malinformation" refer to in the information disorder framework?',
    explanation: 'Malinformation is genuine, factual information shared out of context or leaked with targeted intent to cause harm.',
    options: [
      { id: 'opt-6-5-a', text: 'Genuine factual information weaponized or published out of context specifically to cause harm', is_correct: true },
      { id: 'opt-6-5-b', text: 'Computer viruses that corrupt PDF files', is_correct: false },
      { id: 'opt-6-5-c', text: 'Software code written in outdated languages', is_correct: false },
      { id: 'opt-6-5-d', text: 'Science fiction movie scripts', is_correct: false }
    ]
  },
  {
    id: 'q6-6',
    quiz_id: 'quiz-6',
    order_index: 6,
    question_text: 'How do social media algorithms inadvertently fuel the rapid spread of misinformation?',
    explanation: 'Algorithms maximize user engagement (dwell time, clicks, comments, outrage shares), which emotionally charged falsehoods excel at generating.',
    options: [
      { id: 'opt-6-6-a', text: 'By prioritizing high-engagement content (controversy, outrage) regardless of factual accuracy', is_correct: true },
      { id: 'opt-6-6-b', text: 'By checking every post with an encyclopedia before showing it to users', is_correct: false },
      { id: 'opt-6-6-c', text: 'By automatically banning accounts that post on weekends', is_correct: false },
      { id: 'opt-6-6-d', text: 'By charging users \$1 for every verified fact they view', is_correct: false }
    ]
  },
  {
    id: 'q6-7',
    quiz_id: 'quiz-6',
    order_index: 7,
    question_text: 'What is the purpose of performing a "Reverse Image Search" when evaluating viral news?',
    explanation: 'Reverse image searching locates the earliest known appearances of an image, revealing if an old photo from years ago is being recycled as breaking news.',
    options: [
      { id: 'opt-6-7-a', text: 'To flip an image upside down for artistic framing', is_correct: false },
      { id: 'opt-6-7-b', text: 'To discover the original origin, date, and context of an image to detect out-of-context reuse', is_correct: true },
      { id: 'opt-6-7-c', text: 'To convert JPG files into audio podcasts', is_correct: false },
      { id: 'opt-6-7-d', text: 'To increase the color saturation of photographs', is_correct: false }
    ]
  },
  {
    id: 'q6-8',
    quiz_id: 'quiz-6',
    order_index: 8,
    question_text: 'In the CRAAP test for evaluating online information, what does the first "A" stand for?',
    explanation: 'In the CRAAP test (Currency, Relevance, Authority, Accuracy, Purpose), Authority asks who the author or publisher is and what credentials they hold.',
    options: [
      { id: 'opt-6-8-a', text: 'Algorithms', is_correct: false },
      { id: 'opt-6-8-b', text: 'Authority (credentials, qualifications, and reputation of the author/source)', is_correct: true },
      { id: 'opt-6-8-c', text: 'Artificial Intelligence', is_correct: false },
      { id: 'opt-6-8-d', text: 'Advertising revenue', is_correct: false }
    ]
  },
  {
    id: 'q6-9',
    quiz_id: 'quiz-6',
    order_index: 9,
    question_text: 'What should you do before hitting "Share" or "Retweet" on a sensational, emotionally shocking breaking news claim?',
    explanation: 'Pause and verify through lateral reading and accredited fact-checking agencies before amplifying potential disinformation.',
    options: [
      { id: 'opt-6-9-a', text: 'Immediately share it with all contacts so you are the first person to break the story', is_correct: false },
      { id: 'opt-6-9-b', text: 'Pause, evaluate the emotional trigger, and verify the claim across independent credible sources', is_correct: true },
      { id: 'opt-6-9-c', text: 'Add three exclamation marks to ensure people take it seriously', is_correct: false },
      { id: 'opt-6-9-d', text: 'Delete your internet browser permanently', is_correct: false }
    ]
  }
];

export const INITIAL_SCENARIOS = [
  {
    id: 'scen-1',
    title: 'Suspicious Urgent Email from Payroll Department',
    category: 'Cybersecurity Awareness',
    description: 'You receive an alarming email at 4:55 PM on Friday claiming your direct deposit failed.',
    context_story: `You are finishing work on Friday afternoon when an email arrives in your inbox titled:
**"URGENT: Direct Deposit Error — Action Required Within 2 Hours or Salary Withheld"**

The email has a company logo, but the sender address is **payroll-support@internal-company-portal.net** (your actual company domain is **company.org**).
The email states:
> *"Due to a recent banking system migration, your monthly payroll deposit could not be processed. Click the link below immediately to verify your routing number and Social Security Number. Failure to do so by 6:00 PM will delay your compensation by 30 business days."*

What do you do?`,
    options: [
      {
        id: 'opt-s1-a',
        text: 'Click the link immediately and submit your bank details so your paycheck is not delayed.',
        is_recommended: false,
        points: 0,
        consequence: 'Critical Security Breach! You fell for an urgent phishing lure. The spoofed domain captured your banking credentials and SSN.',
        safety_lesson: 'Attackers manufacture artificial urgency (e.g., Friday late afternoon) and catastrophic threats (salary withholding) to bypass rational skepticism.'
      },
      {
        id: 'opt-s1-b',
        text: 'Do not click the link. Inspect the sender domain, check with HR through your known internal phone/chat, and report the message to IT security.',
        is_recommended: true,
        points: 50,
        consequence: 'Threat Neutralized! IT confirms it was a phishing simulation and commends your vigilant detection of the deceptive domain.',
        safety_lesson: 'Always verify unexpected requests involving credentials or financial details through independent, verified out-of-band communication.'
      },
      {
        id: 'opt-s1-c',
        text: 'Reply to the email asking "Is this legitimate?" with your contact phone number.',
        is_recommended: false,
        points: 10,
        consequence: 'Incomplete response. Replying to a phishing email confirms your email is active and invites further targeted social engineering attacks.',
        safety_lesson: 'Never reply to suspected phishing emails. Contact the verified organization using verified corporate directories.'
      }
    ]
  },
  {
    id: 'scen-2',
    title: 'Group Chat Cyberbullying and Exclusion',
    category: 'Cyberbullying & Online Harassment',
    description: 'A classmate is being ruthlessly mocked and targeted with altered photos in a large class group chat.',
    context_story: `In a 45-person class WhatsApp study group, two popular students begin posting unflattering, meme-edited photos of a shy classmate named Leo. 
The captions mock his clothes and family background. Several other students begin responding with laughing emojis and compounding insults.

Leo has stopped responding and appears deeply distressed. You are a member of the group chat.

How do you handle this situation?`,
    options: [
      {
        id: 'opt-s2-a',
        text: 'Send a laughing emoji so the bullies do not turn their focus onto you next.',
        is_recommended: false,
        points: 0,
        consequence: 'Harm Amplified. By participating, you validated the abuse, signaled peer approval to the bullies, and compounded Leo\'s psychological distress.',
        safety_lesson: 'Laughing or liking abusive posts normalizes cyberbullying and causes acute harm. Fear of social exclusion does not justify complicity.'
      },
      {
        id: 'opt-s2-b',
        text: 'Stay completely silent and ignore the notifications to stay out of drama.',
        is_recommended: false,
        points: 15,
        consequence: 'Passive Bystander. While you did not participate, your silence allowed the harassment to continue unchecked.',
        safety_lesson: 'Silence is often interpreted by perpetrators as tacit agreement. Upstanders take safe, constructive action.'
      },
      {
        id: 'opt-s2-c',
        text: 'Take screenshots for documentation, state in the chat that mocking peers is unacceptable, and reach out to Leo privately with empathy and support.',
        is_recommended: true,
        points: 50,
        consequence: 'Exemplary Upstander Action! Your intervention broke the bystander effect, three other students backed you up, and Leo felt supported and heard.',
        safety_lesson: 'Documenting evidence, setting a firm respectful boundary in public, and extending private solidarity are the gold standards of upstander intervention.'
      }
    ]
  },
  {
    id: 'scen-3',
    title: 'Unknown Person Requesting Personal Verification Info',
    category: 'Online Privacy & Social Engineering',
    description: 'A stranger on Discord or Instagram offers you a \$200 gaming gift card if you "help them test an app".',
    context_story: `You receive a direct message on Discord from a user with an attractive anime avatar and a friendly bio:
> *"Hey! I\'m developing an indie gaming platform and giving away \$200 Steam/Amazon gift cards to 10 testers today. Can I send you the activation code? I just need your phone number and the 6-digit confirmation code Google or Steam texts you so I can link your beta account."*

Shortly after, a real SMS arrives on your phone containing:
> *"142-894 is your Steam Guard / Google Account recovery code. Do not share this with anyone."*

How do you proceed?`,
    options: [
      {
        id: 'opt-s3-a',
        text: 'Send the 6-digit code to the stranger so you can claim the \$200 gift card.',
        is_recommended: false,
        points: 0,
        consequence: 'Account Hijacked! You just handed the attacker the two-factor authentication recovery code to hijack your primary account.',
        safety_lesson: 'Legitimate services never ask you to forward verification codes. Never disclose one-time SMS verification tokens to anyone.'
      },
      {
        id: 'opt-s3-b',
        text: 'Recognize the account takeover attempt, never share the verification code, block the user, and report the account for fraud.',
        is_recommended: true,
        points: 50,
        consequence: 'Account Protected! You successfully thwarted an account takeover / 2FA interception trap.',
        safety_lesson: 'The lure of "free money or gift cards" is the oldest trick in social engineering. Keep one-time verification tokens strictly private.'
      },
      {
        id: 'opt-s3-c',
        text: 'Ask the stranger to send \$50 first as proof of legitimacy before sharing the SMS code.',
        is_recommended: false,
        points: 10,
        consequence: 'Dangerous Gamble. You are negotiating with an adversary who is seconds away from locking you out of your digital life.',
        safety_lesson: 'Never engage or negotiate with scammers attempting credential theft.'
      }
    ]
  },
  {
    id: 'scen-4',
    title: 'Viral Breaking News Shared in Family Chat',
    category: 'Fake News and Misinformation',
    description: 'A relative shares a panicked forward claiming a local tap water contamination emergency.',
    context_story: `On your family group chat, your favorite uncle forwards a frantic message:
> *"🚨 ATTENTION EVERYONE: Please stop drinking tap water immediately! A chemical tanker spill has contaminated the central city reservoir with dangerous toxins. Hospitals are overflowing. Share this with everyone you love right now! This was confirmed by Dr. Johnathan Miller from Central Clinic."*

The message contains no links, only exclamation marks and urgency. Multiple relatives reply with panicky comments and talk about hoarding bottled water.

What is the most responsible way to react?`,
    options: [
      {
        id: 'opt-s4-a',
        text: 'Forward the message to your other friend groups immediately just in case it might be true.',
        is_recommended: false,
        points: 0,
        consequence: 'Panic Spreader! You amplified an unverified hoax, causing unnecessary fear and run-on grocery stores.',
        safety_lesson: 'Sharing unverified claims "just in case" is how dangerous misinformation spreads virally during emergencies.'
      },
      {
        id: 'opt-s4-b',
        text: 'Perform lateral reading: check municipal water authority websites, local emergency services, and local journalism before replying with verified facts.',
        is_recommended: true,
        points: 50,
        consequence: 'Truth Restored! You discover the local water department released a statement 10 minutes ago confirming the water is completely safe and debunking the rumor. You share the official link kindly.',
        safety_lesson: 'Verify against authoritative emergency channels before reacting or sharing. Kind, source-backed debunking prevents mass panic.'
      },
      {
        id: 'opt-s4-c',
        text: 'Post an angry reply calling your uncle foolish and uneducated in front of the entire family.',
        is_recommended: false,
        points: 15,
        consequence: 'Defensive Backlash. Insulting family members causes emotional defensiveness and rarely convinces people of facts.',
        safety_lesson: 'Correcting misinformation works best with calm, respectful empathy and direct links to credible, independent evidence.'
      }
    ]
  },
  {
    id: 'scen-5',
    title: 'Suspicious Online Marketplace Payment Request',
    category: 'Digital Commerce & Financial Safety',
    description: 'You are selling a used laptop for \$400 on Facebook Marketplace or Craigslist.',
    context_story: `You list an older laptop for \$400. Within 20 minutes, a buyer messages you:
> *"I love this laptop and want to buy it for my cousin who is in college. I will pay you an extra \$100 for your trouble (\$500 total). However, I am currently out of town on military deployment, so I will send payment via Zelle/PayPal business. My courier service will pick it up once payment is sent."*

Five minutes later, you receive an email from **service@zelle-payment-confirmation-gateway.com** stating:
> *"You received a pending payment of \$500.00. However, the sender has a Business account. To release the funds, you must first send \$150 to the courier via cryptocurrency or gift card to upgrade your account status."*

How should you respond?`,
    options: [
      {
        id: 'opt-s5-a',
        text: 'Pay the \$150 fee immediately because you will still make a net \$350 profit once the funds unlock.',
        is_recommended: false,
        points: 0,
        consequence: 'Defrauded! You fell for the classic "Advance Fee / Overpayment" scam. There was never any payment or buyer.',
        safety_lesson: 'Legitimate payment processors never require sellers to send money via gift cards or crypto to "unlock" received funds.'
      },
      {
        id: 'opt-s5-b',
        text: 'Recognize the classic overpayment courier scam. Refuse the transaction, report the profile on the marketplace, and sell locally in cash in a public place.',
        is_recommended: true,
        points: 50,
        consequence: 'Scam Averted! You saved your \$400 laptop and \$150 in cash by spotting the synthetic payment gateway spoof.',
        safety_lesson: 'Overpayment offers, third-party courier pickups, and demands for "upgrade fees" are hallmark markers of online marketplace fraud.'
      },
      {
        id: 'opt-s5-c',
        text: 'Hand the laptop to the courier when they arrive and hope the email clears later.',
        is_recommended: false,
        points: 0,
        consequence: 'Total Loss! You lost both the laptop and received zero dollars.',
        safety_lesson: 'Never release merchandise until funds are visibly settled inside your official banking or payment app (not just an email receipt).'
      }
    ]
  }
];

export const INITIAL_BADGES = [
  {
    id: 'badge-1',
    code: 'first_login',
    title: 'First Login',
    description: 'Took the first step into the DigiCitizen digital citizenship community.',
    icon: 'LogIn',
    criteria: 'Sign in to DigiCitizen for the first time.',
    points_reward: 20
  },
  {
    id: 'badge-2',
    code: 'first_module_completed',
    title: 'First Module Completed',
    description: 'Completed your first comprehensive digital citizenship awareness module.',
    icon: 'BookOpenCheck',
    criteria: 'Mark any learning module as completed.',
    points_reward: 50
  },
  {
    id: 'badge-3',
    code: 'cyber_learner',
    title: 'Cybersecurity Learner',
    description: 'Acquired foundational literacy in cyber threats, malware, and social engineering.',
    icon: 'Shield',
    criteria: 'Complete the Cybersecurity Awareness module.',
    points_reward: 75
  },
  {
    id: 'badge-4',
    code: 'privacy_protector',
    title: 'Privacy Protector',
    description: 'Mastered data sovereignty, tracking countermeasures, and identity hygiene.',
    icon: 'Lock',
    criteria: 'Complete the Online Privacy and Data Protection module and score 80%+ on its quiz.',
    points_reward: 100
  },
  {
    id: 'badge-5',
    code: 'quiz_master',
    title: 'Quiz Master',
    description: 'Passed all six module assessment quizzes with flying colors.',
    icon: 'Award',
    criteria: 'Pass all 6 learning module quizzes with a score of 70% or higher.',
    points_reward: 150
  },
  {
    id: 'badge-6',
    code: 'digital_citizen_champion',
    title: 'Digital Citizen Champion',
    description: 'Achieved mastery across all modules, quizzes, scenarios, and security assessments.',
    icon: 'Crown',
    criteria: 'Complete all 6 modules, pass all quizzes, complete all safety scenarios, and earn certificate.',
    points_reward: 250
  }
];
