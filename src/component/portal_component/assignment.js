import { useState, useEffect, useCallback, useRef } from "react";

const CORRECT_PIN = "2024";
const EXAM_DURATION = 90 * 60;

const topicMeta = {
  network: { label: "Computer Networks", color: "#0ea5e9", light: "#e0f2fe" },
  ecommerce: { label: "E-Commerce", color: "#10b981", light: "#d1fae5" },
  cashless: { label: "Cashless Society", color: "#8b5cf6", light: "#ede9fe" },
  transaction: { label: "Transaction Cards", color: "#f59e0b", light: "#fef3c7" },
  elearning: { label: "E-Learning", color: "#ef4444", light: "#fee2e2" },
};

const diffMeta = {
  easy: { label: "Easy", color: "#10b981", bg: "#d1fae5", border: "#6ee7b7" },
  medium: { label: "Medium", color: "#f59e0b", bg: "#fef3c7", border: "#fcd34d" },
  hard: { label: "Hard", color: "#ef4444", bg: "#fee2e2", border: "#fca5a5" },
};

const mcqQuestions = [
  // NETWORKS (8 questions)
  {
    id: 1, topic: "network", difficulty: "easy",
    question: "A school in Accra connects all its computers within one building to share a single printer and internet connection. What type of network best describes this setup?",
    options: ["Wide Area Network (WAN)", "Local Area Network (LAN)", "Metropolitan Area Network (MAN)", "Personal Area Network (PAN)"],
    answer: 1,
    explanation: "A LAN (Local Area Network) connects devices within a limited geographic area such as a school building, enabling resource sharing like printers and internet."
  },
  {
    id: 2, topic: "network", difficulty: "easy",
    question: "Kofi wants to connect his laptop to his home Wi-Fi without using any cables. Which networking technology allows him to do this?",
    options: ["Bluetooth", "Ethernet", "Wireless LAN (Wi-Fi)", "Fibre Optics"],
    answer: 2,
    explanation: "Wireless LAN (Wi-Fi) allows devices to connect to a network without physical cables using radio waves transmitted by a wireless router."
  },
  {
    id: 3, topic: "network", difficulty: "medium",
    question: "A bank in Ghana has branches in Accra, Kumasi, and Tamale, all connected through a private network. What type of network is this?",
    options: ["LAN", "PAN", "WAN", "VLAN"],
    answer: 2,
    explanation: "A WAN (Wide Area Network) spans large geographical areas, connecting multiple sites across cities or countries, as used by banks with multiple branches."
  },
  {
    id: 4, topic: "network", difficulty: "medium",
    question: "A network device receives data packets and forwards them only to the specific device they are addressed to, improving network efficiency. What is this device?",
    options: ["Hub", "Repeater", "Switch", "Modem"],
    answer: 2,
    explanation: "A switch intelligently forwards data only to the intended recipient device using MAC addresses, unlike a hub which broadcasts to all devices."
  },
  {
    id: 5, topic: "network", difficulty: "medium",
    question: "Students at a JHS in Ghana cannot access certain educational websites because the school's network blocks them. What network tool is the school most likely using?",
    options: ["Router", "Firewall", "Switch", "Access Point"],
    answer: 1,
    explanation: "A firewall monitors and controls incoming and outgoing network traffic based on security rules, allowing schools to block access to inappropriate or non-educational websites."
  },
  {
    id: 6, topic: "network", difficulty: "hard",
    question: "Ama's school uses a network where each computer connects to a central device. If that central device fails, all computers lose connectivity. What network topology is described?",
    options: ["Bus Topology", "Ring Topology", "Mesh Topology", "Star Topology"],
    answer: 3,
    explanation: "Star topology connects all devices to a central hub or switch. If the central device fails, all connections are lost — this is its main disadvantage."
  },
  {
    id: 7, topic: "network", difficulty: "hard",
    question: "A company wants to allow remote workers in different countries to securely access its internal network over the internet as if they were in the office. Which technology should they use?",
    options: ["FTP", "VPN", "HTTP", "DNS"],
    answer: 1,
    explanation: "A VPN (Virtual Private Network) creates an encrypted tunnel over the internet, allowing remote users to securely access a private network from anywhere."
  },
  {
    id: 8, topic: "network", difficulty: "hard",
    question: "When you type 'www.ghana.gov.gh' into your browser, a service translates this human-readable address into an IP address. What service performs this function?",
    options: ["DHCP", "FTP", "DNS", "SMTP"],
    answer: 2,
    explanation: "DNS (Domain Name System) translates human-readable domain names like 'www.ghana.gov.gh' into numerical IP addresses that computers use to identify each other."
  },

  // E-COMMERCE (8 questions)
  {
    id: 9, topic: "ecommerce", difficulty: "easy",
    question: "Abena wants to buy a new school bag from a website without visiting any physical store. She selects the bag, adds it to a cart, and pays online. What is Abena engaging in?",
    options: ["E-banking", "E-learning", "E-commerce", "E-mail"],
    answer: 2,
    explanation: "E-commerce (electronic commerce) refers to buying and selling goods and services over the internet, which is exactly what Abena is doing."
  },
  {
    id: 10, topic: "ecommerce", difficulty: "easy",
    question: "A Ghanaian trader sells handmade kente cloth to customers in the UK through an online marketplace. This is an example of which e-commerce model?",
    options: ["B2B (Business to Business)", "C2C (Consumer to Consumer)", "B2C (Business to Consumer)", "C2B (Consumer to Business)"],
    answer: 2,
    explanation: "B2C (Business to Consumer) e-commerce involves businesses selling products directly to individual consumers, as the trader sells to UK customers."
  },
  {
    id: 11, topic: "ecommerce", difficulty: "medium",
    question: "After shopping on Jumia Ghana, a customer notices that the website remembers her previous purchases and suggests related products. What technology makes this possible?",
    options: ["Firewall", "Cookies and data analytics", "Antivirus software", "DNS"],
    answer: 1,
    explanation: "E-commerce sites use cookies and data analytics to track user behaviour, store preferences, and provide personalised product recommendations."
  },
  {
    id: 12, topic: "ecommerce", difficulty: "medium",
    question: "A student wants to verify that an online shopping website is secure before entering his credit card details. Which indicator in the browser confirms the site uses encryption?",
    options: ["The website has many product images", "The URL begins with 'https://' and shows a padlock icon", "The site loads quickly", "The site has a contact page"],
    answer: 1,
    explanation: "HTTPS and the padlock icon indicate that the website uses SSL/TLS encryption to protect data transmitted between the browser and server."
  },
  {
    id: 13, topic: "ecommerce", difficulty: "medium",
    question: "A business sells products to other businesses exclusively through an online portal for bulk orders. What type of e-commerce model is this?",
    options: ["B2C", "C2C", "B2B", "G2C"],
    answer: 2,
    explanation: "B2B (Business to Business) e-commerce involves transactions between businesses, such as a wholesaler selling in bulk to retailers through an online portal."
  },
  {
    id: 14, topic: "ecommerce", difficulty: "hard",
    question: "Kwame receives an email claiming he won a prize and asking him to click a link to claim it by providing his banking details. What type of cybercrime is this?",
    options: ["Hacking", "Phishing", "Spamming", "Identity theft"],
    answer: 1,
    explanation: "Phishing is a fraudulent attempt to obtain sensitive information by disguising as a trustworthy source via email, tricking victims into revealing personal or financial data."
  },
  {
    id: 15, topic: "ecommerce", difficulty: "hard",
    question: "An e-commerce company processes thousands of transactions daily. To protect customer payment data, they must comply with industry security standards. Which standard specifically governs payment card data security?",
    options: ["ISO 9001", "PCI DSS", "GDPR", "SSL Certificate"],
    answer: 1,
    explanation: "PCI DSS (Payment Card Industry Data Security Standard) is the global standard that all businesses handling payment card data must comply with to protect cardholders."
  },
  {
    id: 16, topic: "ecommerce", difficulty: "hard",
    question: "A customer places an order on an e-commerce site, but the seller has listed an item they do not actually have in stock. The customer only discovers this after payment. Which e-commerce challenge does this represent?",
    options: ["Poor website design", "Inventory management failure", "Slow internet connection", "Lack of customer reviews"],
    answer: 1,
    explanation: "Poor inventory management in e-commerce leads to overselling — accepting orders for items out of stock — causing customer dissatisfaction and operational problems."
  },

  // CASHLESS SOCIETY (8 questions)
  {
    id: 17, topic: "cashless", difficulty: "easy",
    question: "Esi pays for her market items by tapping her phone on the seller's payment terminal. She did not use physical cash or a card. What payment method is Esi using?",
    options: ["Bank transfer", "Mobile money", "Cheque payment", "Barter"],
    answer: 1,
    explanation: "Mobile money allows users to pay for goods and services using their mobile phone, without needing physical cash or a bank card."
  },
  {
    id: 18, topic: "cashless", difficulty: "easy",
    question: "In a cashless society, most transactions are done electronically. Which of the following is NOT an example of a cashless payment method?",
    options: ["Mobile money transfer", "Credit card payment", "Paying with coins", "Online bank transfer"],
    answer: 2,
    explanation: "Paying with coins is a physical cash transaction. Cashless payments are made electronically through digital means such as cards, mobile money, or bank transfers."
  },
  {
    id: 19, topic: "cashless", difficulty: "medium",
    question: "A trader in Kumasi uses MTN Mobile Money to receive payments from customers. Which of the following best describes an advantage of this system for the trader?",
    options: ["It requires no electricity to operate", "It reduces the risk of carrying large amounts of cash", "It works without a mobile network", "It is free to use at all times"],
    answer: 1,
    explanation: "Mobile money reduces the need to carry physical cash, lowering the risk of theft and making it safer for traders to receive and store payments."
  },
  {
    id: 20, topic: "cashless", difficulty: "medium",
    question: "A country transitioning to a cashless economy finds that rural communities are excluded from the new payment systems. What is the most likely reason for this exclusion?",
    options: ["Rural people prefer not to use technology", "Lack of reliable internet and mobile network coverage", "Rural areas have too many banks", "Mobile phones are too cheap in rural areas"],
    answer: 1,
    explanation: "Digital financial inclusion depends on network infrastructure. Rural areas often lack reliable mobile and internet coverage, preventing residents from using digital payment systems."
  },
  {
    id: 21, topic: "cashless", difficulty: "medium",
    question: "The Ghana government implements GhIPSS (Ghana Interbank Payment and Settlement Systems) to promote cashless transactions. What is the PRIMARY purpose of GhIPSS?",
    options: ["To print new banknotes", "To manage and settle electronic payments between banks", "To control foreign exchange rates", "To register businesses online"],
    answer: 1,
    explanation: "GhIPSS provides the infrastructure for electronic payments, including interbank transfers, mobile money interoperability, and payment card settlement in Ghana."
  },
  {
    id: 22, topic: "cashless", difficulty: "hard",
    question: "A government wants to move toward a fully cashless economy to reduce corruption. Critics argue this approach could harm certain groups. Which argument against a fully cashless society is most valid?",
    options: ["Cashless payments are always slower than cash", "It excludes those without bank accounts or digital access, deepening inequality", "Digital transactions cannot be tracked", "Cashless systems always increase government spending"],
    answer: 1,
    explanation: "A fully cashless society can exclude the unbanked population and those without access to digital technology, particularly the elderly, rural communities, and the poor."
  },
  {
    id: 23, topic: "cashless", difficulty: "hard",
    question: "When Akosua sends money through mobile money, the transaction data is stored electronically. Which major concern about cashless transactions does this raise?",
    options: ["Transaction speed is too fast", "Data privacy and security of personal financial information", "Money loses its value electronically", "Transactions cannot cross borders"],
    answer: 1,
    explanation: "Electronic financial transactions create digital records that can be vulnerable to hacking, surveillance, and misuse — raising significant data privacy and cybersecurity concerns."
  },
  {
    id: 24, topic: "cashless", difficulty: "hard",
    question: "Two banks in Ghana want their customers to be able to transfer money to each other seamlessly, even though they use different mobile money platforms. What feature of modern payment systems enables this?",
    options: ["Cloud storage", "Interoperability", "Blockchain only", "Physical ATM networks"],
    answer: 1,
    explanation: "Interoperability allows different payment platforms and financial institutions to communicate and process transactions with each other, enabling cross-platform money transfers."
  },

  // TRANSACTION CARDS (8 questions)
  {
    id: 25, topic: "transaction", difficulty: "easy",
    question: "Yaw uses a card that automatically deducts money from his bank account immediately when he makes a purchase. What type of card is this?",
    options: ["Credit card", "Loyalty card", "Debit card", "Gift card"],
    answer: 2,
    explanation: "A debit card is directly linked to a bank account and deducts money immediately when a transaction is made, unlike a credit card which allows borrowing."
  },
  {
    id: 26, topic: "transaction", difficulty: "easy",
    question: "Adwoa receives a card from her bank that allows her to spend money she does not currently have, with an agreement to repay later with interest. What is this card called?",
    options: ["Debit card", "ATM card", "Credit card", "Prepaid card"],
    answer: 2,
    explanation: "A credit card allows cardholders to borrow money up to a set limit from the bank, which must be repaid, usually with interest if not paid by the due date."
  },
  {
    id: 27, topic: "transaction", difficulty: "medium",
    question: "A shopper's debit card information is stolen and used for unauthorized purchases online. Which security feature, if enabled, would have BEST prevented this fraud?",
    options: ["A longer card number", "Two-factor authentication (2FA) for online transactions", "A more colourful card design", "Higher credit limit"],
    answer: 1,
    explanation: "Two-factor authentication (2FA) adds a second layer of verification (like a one-time password sent to your phone), making it much harder for thieves to use stolen card details."
  },
  {
    id: 28, topic: "transaction", difficulty: "medium",
    question: "Kojo notices that his card has a small metallic square embedded in it, which he inserts into payment machines instead of swiping. What is this technology called?",
    options: ["Magnetic stripe", "NFC chip", "EMV chip", "QR code"],
    answer: 2,
    explanation: "An EMV chip (Europay, Mastercard, Visa) is a microchip embedded in payment cards that generates a unique code for each transaction, providing better security than magnetic stripes."
  },
  {
    id: 29, topic: "transaction", difficulty: "medium",
    question: "A student is given a prepaid card loaded with GH₵200 by her parents for school shopping. What is the key limitation of this type of card?",
    options: ["It cannot be used at any shop", "She can only spend up to the loaded amount", "It expires after one transaction", "It requires a bank account to use"],
    answer: 1,
    explanation: "A prepaid card has a fixed, preloaded amount. Once the balance is spent, the card cannot be used until it is reloaded — there is no overdraft facility."
  },
  {
    id: 30, topic: "transaction", difficulty: "hard",
    question: "A customer taps her card on a payment terminal without inserting it or entering a PIN for a small purchase. Which technology is being used in this contactless payment?",
    options: ["Bluetooth", "NFC (Near Field Communication)", "QR Code scanning", "RFID long-range communication"],
    answer: 1,
    explanation: "NFC (Near Field Communication) enables contactless payments by allowing data exchange between two devices within a few centimetres, used for tap-and-go card transactions."
  },
  {
    id: 31, topic: "transaction", difficulty: "hard",
    question: "A bank issues cards that collect loyalty points for every purchase made. A customer accumulates points and redeems them for discounts. What dual function does this card serve?",
    options: ["Credit and debit functions", "Payment and loyalty rewards functions", "ATM and savings functions", "Prepaid and credit functions"],
    answer: 1,
    explanation: "Some modern cards combine payment functionality with loyalty programme features, incentivising spending by rewarding customers with points redeemable for discounts or gifts."
  },
  {
    id: 32, topic: "transaction", difficulty: "hard",
    question: "During an online transaction, a card is used without physically presenting it. The system requests the card number, expiry date, and CVV. What does CVV stand for and why is it important?",
    options: ["Central Verification Value — confirms the user's identity at a branch", "Card Verification Value — provides additional security for card-not-present transactions", "Credit Validity Voucher — extends credit limits automatically", "Customer Value Verification — tracks customer loyalty points"],
    answer: 1,
    explanation: "CVV (Card Verification Value) is a 3 or 4-digit security code on the card. It proves the buyer physically possesses the card during online transactions where the card cannot be physically presented."
  },

  // E-LEARNING (8 questions)
  {
    id: 33, topic: "elearning", difficulty: "easy",
    question: "During COVID-19 school closures in Ghana, many students continued their lessons through videos, quizzes, and assignments sent over the internet. What type of learning is this?",
    options: ["Traditional learning", "Distance learning only", "E-learning", "Correspondence learning"],
    answer: 2,
    explanation: "E-learning involves using electronic technologies — particularly the internet — to deliver educational content, allowing learning to occur outside of a physical classroom."
  },
  {
    id: 34, topic: "elearning", difficulty: "easy",
    question: "A JHS student in Ghana accesses free lessons on Khan Academy using her tablet. What platform is she using?",
    options: ["A social media platform", "An online learning management system (LMS)", "A gaming platform", "An email service"],
    answer: 1,
    explanation: "Khan Academy is a Learning Management System (LMS) — an online platform that delivers structured educational content including videos, practice exercises, and progress tracking."
  },
  {
    id: 35, topic: "elearning", difficulty: "medium",
    question: "A teacher creates an online quiz that automatically marks students' answers and sends results to their emails instantly. Which advantage of e-learning does this demonstrate?",
    options: ["E-learning requires more physical resources", "Immediate automated feedback and efficiency", "E-learning is always more expensive", "Students must be physically present"],
    answer: 1,
    explanation: "Automated assessment and immediate feedback is a key advantage of e-learning — it saves time, reduces the marking workload, and allows students to identify errors quickly."
  },
  {
    id: 36, topic: "elearning", difficulty: "medium",
    question: "A student in a remote village in Northern Ghana cannot access e-learning platforms because her area has no electricity or internet. What is the MAIN barrier to e-learning she faces?",
    options: ["Lack of interest in learning", "Digital divide — lack of infrastructure and access", "Too many e-learning platforms to choose from", "E-learning is only for university students"],
    answer: 1,
    explanation: "The digital divide refers to the gap between those with and without access to digital technology. Lack of electricity, internet, and devices are the primary barriers to e-learning in rural Ghana."
  },
  {
    id: 37, topic: "elearning", difficulty: "medium",
    question: "An e-learning platform tracks which topics a student struggles with and automatically recommends additional practice on those topics. What is this feature called?",
    options: ["Social learning", "Gamification", "Adaptive learning", "Blended learning"],
    answer: 2,
    explanation: "Adaptive learning uses algorithms to analyse student performance and personalise the learning experience by adjusting content and difficulty based on individual progress and weaknesses."
  },
  {
    id: 38, topic: "elearning", difficulty: "hard",
    question: "A school implements a 'blended learning' approach. What does blended learning mean in the context of e-learning?",
    options: ["Learning that involves only video content", "A combination of traditional face-to-face instruction with online digital learning", "Learning done entirely through mobile phones", "A learning approach that blends multiple subjects together"],
    answer: 1,
    explanation: "Blended learning combines traditional classroom teaching with online digital components, giving students both in-person interaction and the flexibility of self-paced digital resources."
  },
  {
    id: 39, topic: "elearning", difficulty: "hard",
    question: "A student is concerned that a teacher cannot verify whether she actually did her own online assignment or used AI tools to complete it. What major challenge of e-learning does this represent?",
    options: ["Slow internet speed", "Academic integrity and assessment validity challenges", "Lack of good e-learning platforms", "High cost of online education"],
    answer: 1,
    explanation: "Academic integrity is a critical challenge in e-learning — it is difficult to ensure that students complete assessments independently, as remote settings are harder to supervise than physical classrooms."
  },
  {
    id: 40, topic: "elearning", difficulty: "hard",
    question: "A government programme uses television broadcasts, radio lessons, and SMS-based quizzes to deliver education to students in areas with no internet. What term describes this broad approach?",
    options: ["Virtual reality learning", "Technology-enhanced learning (TEL) using multiple delivery channels", "Social media learning", "Synchronous online learning"],
    answer: 1,
    explanation: "Technology-enhanced learning encompasses multiple delivery methods — including TV, radio, SMS, and the internet — to reach students regardless of their level of digital access."
  },
];

const theoryQuestions = [
  {
    id: 1, topic: "network", marks: 5,
    question: "Explain FOUR differences between a Local Area Network (LAN) and a Wide Area Network (WAN). Give one real-life example of each. [5 marks]",
    modelAnswer: `A Local Area Network (LAN) covers a small geographic area such as a single building or campus, whereas a Wide Area Network (WAN) covers a large geographic area such as multiple cities or countries. LANs are typically owned and managed by a single organisation, while WANs are usually managed by telecommunication providers or multiple organisations. LANs offer faster data transfer speeds (usually 100Mbps–10Gbps) compared to WANs, which are slower due to long-distance transmission. LANs are less expensive to set up and maintain than WANs. Real-life examples: a school computer lab network is a LAN; the internet connecting banks across Ghana and the UK is a WAN.`,
    rubric: [
      { marks: 5, description: "4 clear differences stated with accurate explanation AND correct real-life example for both LAN and WAN." },
      { marks: 4, description: "4 differences stated correctly but examples lack detail, OR 3 differences with both good examples." },
      { marks: 3, description: "3 differences correctly stated with at least one example, OR 4 differences with no examples." },
      { marks: 2, description: "2 differences correctly stated, examples missing or incorrect." },
      { marks: 1, description: "Only 1 difference stated, very limited understanding shown." },
      { marks: 0, description: "No relevant answer or completely incorrect." }
    ]
  },
  {
    id: 2, topic: "network", marks: 5,
    question: "Describe the role of a ROUTER in a computer network. Explain how it differs from a SWITCH, and give TWO advantages of using a router. [5 marks]",
    modelAnswer: `A router is a network device that connects different networks together and directs data packets between them using IP addresses. It determines the best path for data to travel from source to destination, connecting a local network to the internet via an ISP. A switch, in contrast, operates within a single network and forwards data only to the specific device it is addressed to using MAC addresses — it does not connect to external networks. Two advantages of a router: (1) it connects multiple networks including the internet, enabling internet access for all devices on the local network; (2) it provides network security features such as NAT (Network Address Translation) and firewall capabilities that protect the internal network from external threats.`,
    rubric: [
      { marks: 5, description: "Clear role of router explained, accurate and complete difference from switch stated, TWO valid advantages with explanation." },
      { marks: 4, description: "Role and difference correctly stated, only one advantage fully explained OR second advantage lacks detail." },
      { marks: 3, description: "Role of router stated correctly, partial or unclear difference from switch, at least one advantage mentioned." },
      { marks: 2, description: "Basic definition of router given, difference unclear, limited or no advantages." },
      { marks: 1, description: "Very basic understanding, mostly incorrect comparisons." },
      { marks: 0, description: "No relevant answer." }
    ]
  },
  {
    id: 3, topic: "ecommerce", marks: 5,
    question: "A small Ghanaian business owner wants to start selling her products online. Describe THREE benefits and TWO challenges she might face when using e-commerce. [5 marks]",
    modelAnswer: `Benefits: (1) Wider market reach — she can sell to customers across Ghana and internationally, beyond her local area. (2) Lower operating costs — no need to rent a physical shop, reducing overhead expenses. (3) 24/7 availability — the online store is accessible at any time, allowing sales even outside working hours. Challenges: (1) Cybersecurity risks — her online store and customer payment data could be vulnerable to hacking and fraud, requiring investment in security measures. (2) Trust and digital literacy — potential customers, especially in Ghana, may be reluctant to pay online due to fear of fraud, and she may lack the technical skills to manage an online store effectively.`,
    rubric: [
      { marks: 5, description: "THREE benefits and TWO challenges all clearly explained with relevant context/examples." },
      { marks: 4, description: "THREE benefits and TWO challenges stated but one explanation lacks depth or context." },
      { marks: 3, description: "TWO benefits and TWO challenges stated, OR THREE benefits with only ONE challenge, reasonably explained." },
      { marks: 2, description: "TWO benefits OR TWO challenges stated with some explanation." },
      { marks: 1, description: "Only one point stated with minimal explanation." },
      { marks: 0, description: "No relevant answer." }
    ]
  },
  {
    id: 4, topic: "ecommerce", marks: 5,
    question: "Explain the term 'phishing' as used in e-commerce. Describe TWO ways a customer can protect themselves from phishing attacks when shopping online. [5 marks]",
    modelAnswer: `Phishing is a type of cybercrime where criminals send fraudulent emails, messages, or create fake websites that impersonate legitimate businesses or organisations to trick users into revealing sensitive information such as passwords, credit card numbers, or bank account details. The attacker disguises the communication to appear genuine, creating urgency to prompt a quick, unthinking response. Two protective measures: (1) Verify website authenticity — always check that the website URL begins with 'https://' and look for the padlock icon before entering personal or payment details; avoid clicking links in unsolicited emails, and instead type the website address directly into the browser. (2) Use two-factor authentication (2FA) — enable 2FA on online shopping and banking accounts so that even if login credentials are stolen, an additional verification step prevents unauthorised access.`,
    rubric: [
      { marks: 5, description: "Clear, accurate definition of phishing with mechanism explained AND two protective measures clearly described with practical detail." },
      { marks: 4, description: "Accurate definition, two measures stated but one lacks practical detail." },
      { marks: 3, description: "Accurate definition with only one well-explained protection, OR vague definition with two measures." },
      { marks: 2, description: "Partial definition, only one protection mentioned." },
      { marks: 1, description: "Very basic understanding, definition mostly incorrect." },
      { marks: 0, description: "No relevant answer." }
    ]
  },
  {
    id: 5, topic: "cashless", marks: 5,
    question: "Define the term 'cashless society'. Discuss THREE advantages and TWO disadvantages of moving toward a cashless economy in Ghana. [5 marks]",
    modelAnswer: `A cashless society is one in which financial transactions are conducted electronically rather than with physical notes and coins. Payment is made using methods such as mobile money, debit/credit cards, bank transfers, or digital wallets. Advantages: (1) Reduced crime — less physical cash means reduced risk of armed robbery and theft from individuals and businesses. (2) Convenience and speed — electronic payments can be made instantly from anywhere, reducing the need to carry cash or visit banks. (3) Financial inclusion — mobile money enables people without traditional bank accounts to access financial services using only a mobile phone. Disadvantages: (1) Digital exclusion — people in rural areas without internet access, electricity, or smartphones cannot participate in a cashless economy. (2) Cybersecurity risks — electronic financial systems are vulnerable to hacking, fraud, and data breaches, putting users' money and personal information at risk.`,
    rubric: [
      { marks: 5, description: "Accurate definition, THREE advantages and TWO disadvantages all clearly explained in Ghanaian context." },
      { marks: 4, description: "Accurate definition, three advantages and two disadvantages stated, one lacking depth." },
      { marks: 3, description: "Definition correct, two advantages and two disadvantages, OR three advantages with one disadvantage." },
      { marks: 2, description: "Definition given, only two points (mix of advantages/disadvantages)." },
      { marks: 1, description: "Vague definition, only one advantage or disadvantage." },
      { marks: 0, description: "No relevant answer." }
    ]
  },
  {
    id: 6, topic: "cashless", marks: 5,
    question: "Explain how Mobile Money (MoMo) works in Ghana. Describe the process a trader would follow to receive payment from a customer using MTN Mobile Money. [5 marks]",
    modelAnswer: `Mobile Money (MoMo) is a digital financial service that allows users to store, send, receive, and pay for goods using a mobile phone number as a virtual account, without requiring a traditional bank account. Users register with a mobile money provider (such as MTN, Vodafone, or AirtelTigo) at an agent or online, link a phone number to a mobile wallet, and deposit cash through registered agents. To receive payment: (1) The trader provides the customer with their registered mobile money phone number. (2) The customer dials the mobile money shortcode (e.g. *170# for MTN), selects 'Send Money', and enters the trader's number, the amount, and their PIN to confirm. (3) The mobile money platform processes the transaction and transfers the amount from the customer's wallet to the trader's wallet instantly. (4) Both parties receive an SMS confirmation of the successful transaction. The trader can then withdraw cash at any MoMo agent or use the balance for further transactions.`,
    rubric: [
      { marks: 5, description: "Clear explanation of how MoMo works AND accurate step-by-step process for the trader receiving payment, with all key steps covered." },
      { marks: 4, description: "Good explanation of MoMo and process described but one step is missing or unclear." },
      { marks: 3, description: "General explanation of MoMo correct, process partially described (at least 3 steps)." },
      { marks: 2, description: "Basic understanding of MoMo, only 1-2 steps of the process described." },
      { marks: 1, description: "Very vague understanding, little relevant detail." },
      { marks: 0, description: "No relevant answer." }
    ]
  },
  {
    id: 7, topic: "transaction", marks: 5,
    question: "Distinguish between a DEBIT card and a CREDIT card. State TWO advantages and ONE disadvantage of using a credit card. [5 marks]",
    modelAnswer: `A debit card is directly linked to the cardholder's bank account and deducts funds immediately upon each transaction — the user can only spend money they already have. A credit card, however, allows the cardholder to borrow money from the issuing bank up to a pre-approved credit limit, with the obligation to repay the borrowed amount at a later date, often with interest if not repaid in full by the due date. Advantages of a credit card: (1) Enables purchases when funds are temporarily unavailable — users can buy now and pay later, providing financial flexibility for emergencies or large purchases. (2) Builds credit history — responsible use of a credit card helps establish a good credit score, making it easier to obtain loans in the future. Disadvantage: High interest and debt risk — if the balance is not paid in full each month, high interest charges accumulate, potentially leading to significant debt.`,
    rubric: [
      { marks: 5, description: "Clear and accurate distinction between debit and credit cards, TWO advantages and ONE disadvantage of credit card fully explained." },
      { marks: 4, description: "Accurate distinction, two advantages stated, disadvantage missing or vague." },
      { marks: 3, description: "Distinction partially correct, at least one advantage and one disadvantage mentioned." },
      { marks: 2, description: "Only definition of one card type, very limited advantages/disadvantages." },
      { marks: 1, description: "Minimal understanding, mostly incorrect." },
      { marks: 0, description: "No relevant answer." }
    ]
  },
  {
    id: 8, topic: "transaction", marks: 5,
    question: "Explain what an ATM (Automated Teller Machine) is and describe the steps a customer would take to withdraw money from an ATM using a bank card. [5 marks]",
    modelAnswer: `An ATM (Automated Teller Machine) is an electronic banking device that allows bank customers to perform basic financial transactions without visiting a bank branch or interacting with a human teller. ATMs are available 24 hours a day and can be found in public locations. Steps to withdraw money: (1) Insert the bank card (debit or ATM card) into the card slot of the ATM. (2) The ATM reads the card data from the EMV chip or magnetic stripe. (3) Enter your Personal Identification Number (PIN) using the keypad — this authenticates your identity. (4) Select 'Withdrawal' from the on-screen menu. (5) Choose the account to withdraw from (e.g. savings or current account). (6) Enter the amount you wish to withdraw. (7) Confirm the transaction. The ATM verifies that sufficient funds are available in the account. (8) The ATM dispenses the cash and prints a receipt (optional). (9) Remove your card when prompted.`,
    rubric: [
      { marks: 5, description: "Accurate definition of ATM and all steps of withdrawal process clearly and correctly described in the right sequence." },
      { marks: 4, description: "Good definition, at least 6 steps correctly described in order." },
      { marks: 3, description: "Accurate definition, at least 4 steps described, possibly with minor sequence errors." },
      { marks: 2, description: "Basic definition, only 2-3 steps described." },
      { marks: 1, description: "Vague definition, 1 step mentioned." },
      { marks: 0, description: "No relevant answer." }
    ]
  },
  {
    id: 9, topic: "transaction", marks: 5,
    question: "What is meant by 'contactless payment'? Explain the technology behind it and give TWO examples of contactless payment methods used in Ghana today. [5 marks]",
    modelAnswer: `Contactless payment is a method of making secure financial transactions by tapping or waving a payment card, mobile phone, or wearable device near a payment terminal without physically inserting the card or entering a PIN (for small amounts). The technology behind contactless payments is NFC (Near Field Communication) — a short-range wireless communication technology that allows two devices to exchange data when brought within a few centimetres of each other. The payment card or phone contains an NFC chip and antenna; when held close to the merchant's NFC-enabled terminal, the chip transmits encrypted payment data to complete the transaction. Two examples in Ghana: (1) Contactless bank card payments at supermarkets like Shoprite or Melcom using Visa or Mastercard contactless cards. (2) Mobile money tap-to-pay using smartphones with NFC, where the mobile wallet app communicates with the payment terminal.`,
    rubric: [
      { marks: 5, description: "Accurate definition of contactless payment, clear and correct explanation of NFC technology, TWO relevant Ghanaian examples given." },
      { marks: 4, description: "Good definition, NFC explained, only one relevant example OR second example lacks local context." },
      { marks: 3, description: "Definition correct, technology vaguely explained, at least one example." },
      { marks: 2, description: "Basic definition only, technology not explained." },
      { marks: 1, description: "Very vague understanding." },
      { marks: 0, description: "No relevant answer." }
    ]
  },
  {
    id: 10, topic: "elearning", marks: 5,
    question: "Define e-learning and explain how it has benefited secondary school students in Ghana, giving THREE specific benefits. [5 marks]",
    modelAnswer: `E-learning is the use of electronic technologies, particularly the internet and digital devices, to deliver, access, and manage educational content and instruction outside of or in addition to a traditional classroom setting. Benefits for Ghanaian secondary school students: (1) Continued learning during disruptions — during events like the COVID-19 pandemic, e-learning platforms and TV/radio lessons allowed students to continue studying even when schools were physically closed, preventing complete loss of academic time. (2) Access to quality resources — students can access free, high-quality educational materials from global platforms such as Khan Academy, YouTube educational channels, and the Ghana Education Service's e-learning portal, supplementing limited local textbooks. (3) Self-paced learning — students can replay video lessons, revisit concepts they do not understand, and learn at their own pace, which is particularly beneficial for students who need more time with difficult subjects or who have other responsibilities.`,
    rubric: [
      { marks: 5, description: "Accurate definition of e-learning, THREE benefits clearly explained with specific reference to Ghanaian secondary school context." },
      { marks: 4, description: "Accurate definition, three benefits stated but one lacks depth or specific context." },
      { marks: 3, description: "Definition correct, two benefits well explained OR three benefits without Ghanaian context." },
      { marks: 2, description: "Definition given, only one benefit explained." },
      { marks: 1, description: "Vague definition, minimal benefit mentioned." },
      { marks: 0, description: "No relevant answer." }
    ]
  },
  {
    id: 11, topic: "elearning", marks: 5,
    question: "Compare SYNCHRONOUS e-learning and ASYNCHRONOUS e-learning. Give ONE advantage and ONE disadvantage of each. [5 marks]",
    modelAnswer: `Synchronous e-learning occurs in real time, where the teacher and students interact simultaneously online at a scheduled time using tools like Zoom, Google Meet, or Microsoft Teams video calls. Asynchronous e-learning does not require participants to be online at the same time — students access pre-recorded videos, assignments, and materials at their own convenience. Synchronous advantages: allows real-time questions, immediate teacher feedback, and social interaction between students. Synchronous disadvantages: requires all participants to be available at the same time and depends on stable internet connectivity for everyone simultaneously. Asynchronous advantages: students can learn at their own pace and schedule, making it flexible for those with other commitments or unreliable internet. Asynchronous disadvantages: lack of immediate feedback and real-time interaction can lead to feelings of isolation and reduced motivation.`,
    rubric: [
      { marks: 5, description: "Clear and accurate explanation of both types, one advantage and one disadvantage of EACH type, all four points well developed." },
      { marks: 4, description: "Both types correctly defined, three of the four advantage/disadvantage points well explained." },
      { marks: 3, description: "Both types explained, at least one advantage and one disadvantage mentioned (may be for same type)." },
      { marks: 2, description: "Only one type explained with one advantage or disadvantage." },
      { marks: 1, description: "Very basic, one type vaguely defined." },
      { marks: 0, description: "No relevant answer." }
    ]
  },
  {
    id: 12, topic: "network", marks: 5,
    question: "Describe FOUR safety and security measures that should be taken when using the internet for school research. Explain why each measure is important. [5 marks]",
    modelAnswer: `(1) Use strong, unique passwords — a strong password with a mix of letters, numbers, and symbols prevents unauthorised access to school accounts and personal information. This is important because weak passwords are easily guessed or cracked by cybercriminals. (2) Only access trusted, reputable websites — for research, use recognised educational websites (e.g. BBC, Wikipedia, government sites, academic journals) and check that URLs begin with 'https://'. This prevents accessing sites containing malware, misinformation, or inappropriate content. (3) Never share personal information online — avoid sharing your full name, address, school, or photos on public websites or with strangers. Personal information can be used for identity theft or cyberbullying. (4) Keep antivirus software updated — install and regularly update antivirus software on your device to detect and remove malware, viruses, and spyware that could compromise your data or damage your device.`,
    rubric: [
      { marks: 5, description: "FOUR measures each clearly stated AND each importance/reason accurately explained." },
      { marks: 4, description: "Four measures stated, three importances well explained." },
      { marks: 3, description: "Three measures with reasons, OR four measures without reasons." },
      { marks: 2, description: "Two measures with some explanation." },
      { marks: 1, description: "One measure mentioned." },
      { marks: 0, description: "No relevant answer." }
    ]
  },
  {
    id: 13, topic: "ecommerce", marks: 5,
    question: "Explain the difference between B2C and C2C e-commerce models. Give ONE example of each operating in Ghana and explain why they are important to the Ghanaian economy. [5 marks]",
    modelAnswer: `B2C (Business-to-Consumer) e-commerce involves businesses selling products or services directly to individual consumers through online platforms. C2C (Consumer-to-Consumer) e-commerce involves individual consumers selling directly to other consumers, typically through an online marketplace or platform that facilitates the transaction. Example in Ghana: B2C — Jumia Ghana (www.jumia.com.gh) is a business that sells electronics, fashion, and household items directly to Ghanaian consumers online. C2C — Tonaton.com is a platform where individual Ghanaians sell second-hand goods, personal items, and services to other individuals. Importance to the Ghanaian economy: B2C creates employment, supports formal business growth, and provides consumers with wider product choices. C2C enables individuals to generate income from unused goods, promotes recycling and sustainability, and provides affordable products for lower-income consumers.`,
    rubric: [
      { marks: 5, description: "Accurate distinction of B2C and C2C, correct Ghanaian example for each, economic importance clearly stated for both." },
      { marks: 4, description: "Both models correctly explained, one example correct, economic importance partially addressed." },
      { marks: 3, description: "Both models defined, at least one example, economic importance mentioned for one." },
      { marks: 2, description: "Only one model explained with example." },
      { marks: 1, description: "Vague understanding, no examples." },
      { marks: 0, description: "No relevant answer." }
    ]
  },
  {
    id: 14, topic: "cashless", marks: 5,
    question: "The Ghanaian government is encouraging a shift toward a cashless economy. Discuss whether you think a fully cashless economy is achievable in Ghana, giving THREE reasons to support your argument. [5 marks]",
    modelAnswer: `A fully cashless economy faces significant challenges in Ghana that make complete elimination of cash difficult in the near future, though progress is possible. Reasons why it is challenging: (1) Digital divide and infrastructure gaps — a large portion of Ghana's population, especially in rural areas, lacks reliable electricity, internet connectivity, and smartphone access essential for digital payments. Without these, millions cannot participate in a cashless system. (2) High proportion of informal economy — a large segment of Ghana's economy operates informally, with market traders, artisans, and agricultural workers relying on cash for daily transactions. Transitioning these sectors requires significant education, infrastructure, and trust-building. (3) Low financial literacy and mistrust of digital systems — many Ghanaians, particularly older populations and those with limited education, are unfamiliar with digital payment systems and mistrust electronic money due to experiences of fraud and system failures. However, initiatives like GhIPSS, mobile money growth, and government digital payments offer promising progress toward a predominantly cashless — if not fully cashless — economy.`,
    rubric: [
      { marks: 5, description: "Clear position stated, THREE valid and well-developed reasons given with specific reference to Ghanaian context." },
      { marks: 4, description: "Clear position, three reasons given but one lacks depth or Ghanaian specificity." },
      { marks: 3, description: "Position stated, two well-reasoned points relevant to Ghana." },
      { marks: 2, description: "Vague position, only one reason developed." },
      { marks: 1, description: "Very general answer, no Ghanaian context." },
      { marks: 0, description: "No relevant answer." }
    ]
  },
  {
    id: 15, topic: "transaction", marks: 5,
    question: "Explain what is meant by 'card fraud'. Describe THREE measures that banks and cardholders can take to prevent card fraud. [5 marks]",
    modelAnswer: `Card fraud refers to the unauthorised use of a debit, credit, or ATM card (or card details) to make purchases, withdraw cash, or conduct other financial transactions without the knowledge or consent of the legitimate cardholder. Fraudsters may steal physical cards, clone card data from magnetic stripes ('skimming'), use phishing to obtain card details, or use stolen card numbers for online transactions. Preventive measures: (1) Banks: Implement real-time transaction monitoring and anomaly detection systems that flag and block unusual transactions (e.g. large overseas purchases if the customer is in Ghana); alert customers via SMS for every transaction. (2) Cardholders: Never share card details, PIN, or CVV number with anyone, including people claiming to be bank staff; memorise the PIN and never write it on the card. (3) Cardholders: Enable transaction notifications via SMS/email and immediately report any unfamiliar transactions to the bank; regularly check bank statements for unauthorised entries.`,
    rubric: [
      { marks: 5, description: "Accurate definition of card fraud, THREE prevention measures clearly explained (may be mix of bank and cardholder), all practical and relevant." },
      { marks: 4, description: "Accurate definition, three measures stated but one lacks detail." },
      { marks: 3, description: "Good definition, two clear preventive measures." },
      { marks: 2, description: "Definition given, only one preventive measure." },
      { marks: 1, description: "Very vague definition, no clear preventive measures." },
      { marks: 0, description: "No relevant answer." }
    ]
  },
  {
    id: 16, topic: "network", marks: 5,
    question: "Explain what a FIREWALL is and describe how it protects a school network. Give TWO types of threats a firewall helps prevent. [5 marks]",
    modelAnswer: `A firewall is a network security system — either hardware, software, or both — that monitors and controls incoming and outgoing network traffic based on predetermined security rules. It acts as a barrier between a trusted internal network (such as a school's LAN) and untrusted external networks (such as the internet). How it protects a school network: The school's IT administrator configures rules in the firewall that specify what types of traffic are allowed or blocked. For example, the firewall can block access to social media websites, gaming sites, or inappropriate content, ensuring students only access approved educational resources. It can also prevent unauthorised external users from accessing the school's internal systems and data. Two threats it helps prevent: (1) Malware and viruses — a firewall can block traffic from websites or sources known to distribute malware, preventing malicious software from being downloaded onto school computers. (2) Unauthorised network access / hacking — it blocks unsolicited external connection attempts, preventing hackers from remotely accessing the school's network, data, or student records.`,
    rubric: [
      { marks: 5, description: "Accurate definition of firewall, clear explanation of school network protection, TWO specific and accurate threats described." },
      { marks: 4, description: "Accurate definition, school protection explained, one threat well described." },
      { marks: 3, description: "Definition correct, protection partially explained, at least one threat mentioned." },
      { marks: 2, description: "Basic definition, threats mentioned without explanation." },
      { marks: 1, description: "Very vague understanding." },
      { marks: 0, description: "No relevant answer." }
    ]
  },
  {
    id: 17, topic: "elearning", marks: 5,
    question: "A JHS teacher in Ghana wants to use e-learning to support her students who have limited internet access at home. Suggest FOUR practical strategies she could use to ensure all students can access learning. [5 marks]",
    modelAnswer: `(1) TV and Radio-based lessons — the teacher can broadcast or direct students to educational programmes on GTV Schools or on the radio, which are accessible even without internet and reach students in areas with electricity only or even without it. (2) Download and offline resources — the teacher can prepare video lessons, PDF notes, and worksheets that students download at school (where internet is available) and take home on USB drives or printed copies, allowing learning without home internet. (3) SMS-based quizzes and reminders — using simple mobile phones (without internet), the teacher can send quiz questions via SMS and receive responses, keeping students engaged using basic mobile connectivity. (4) Blended learning approach — combining face-to-face classroom sessions with digital tasks ensures that the core teaching happens in the classroom, while digital platforms supplement learning for students who have access, rather than relying entirely on home internet access for all content delivery.`,
    rubric: [
      { marks: 5, description: "FOUR practical, contextually appropriate strategies all clearly described with reasoning." },
      { marks: 4, description: "Four strategies stated but one lacks sufficient detail or practical application." },
      { marks: 3, description: "Three practical strategies clearly described." },
      { marks: 2, description: "Two strategies mentioned." },
      { marks: 1, description: "One strategy mentioned." },
      { marks: 0, description: "No relevant answer." }
    ]
  },
  {
    id: 18, topic: "ecommerce", marks: 5,
    question: "Describe the key steps involved in a typical online shopping transaction, from the point a customer visits an e-commerce website to receiving the purchased item. [5 marks]",
    modelAnswer: `(1) Browsing and product selection — the customer visits the e-commerce website (e.g. Jumia.com.gh), uses the search or category features to find the desired product, and clicks to view product details, images, reviews, and price. (2) Adding to cart and account login — the customer adds the item to their virtual shopping cart and logs in to their account (or creates one), which stores delivery address and payment preferences. (3) Checkout and delivery details — the customer proceeds to checkout, reviews the cart, confirms the delivery address, selects a delivery method, and reviews the total cost including any shipping fees. (4) Payment — the customer selects a payment method (e.g. credit/debit card, mobile money, cash on delivery), enters payment details on the secure payment page (verified by HTTPS), and submits the order. The payment is processed and confirmed. (5) Order confirmation and fulfilment — the customer receives an order confirmation email/SMS with a reference number. The seller picks, packs, and dispatches the item. (6) Delivery and receipt — the item is delivered to the specified address. The customer receives notification (SMS/email) and signs for/collects the parcel. Some platforms allow tracking of the delivery in real time.`,
    rubric: [
      { marks: 5, description: "All major steps (browsing, cart, checkout, payment, confirmation, delivery) clearly described in logical sequence." },
      { marks: 4, description: "At least five steps described correctly with minor omission or sequence issue." },
      { marks: 3, description: "At least four steps described correctly." },
      { marks: 2, description: "Two to three steps described." },
      { marks: 1, description: "Only one step mentioned." },
      { marks: 0, description: "No relevant answer." }
    ]
  },
  {
    id: 19, topic: "cashless", marks: 5,
    question: "Explain the term 'digital wallet'. Describe how a digital wallet works and give TWO examples of digital wallets available in Ghana. [5 marks]",
    modelAnswer: `A digital wallet (also called an e-wallet) is a software-based application or electronic device that stores a user's payment information, bank details, and loyalty card information digitally, allowing them to make electronic transactions without carrying physical cash or cards. How it works: The user downloads and sets up the digital wallet app on their smartphone, then links it to a payment source (bank account, credit/debit card, or preloads it with funds). When making a payment, the user opens the app, selects the payment amount, and either: taps the phone on an NFC-enabled terminal for contactless payment, scans a QR code displayed by the merchant, or uses the app to initiate a bank transfer. The app uses encryption and security measures (PIN, fingerprint, or face recognition) to authenticate the user and protect transactions. Two examples in Ghana: (1) MTN Mobile Money (MoMo) — allows users to send money, pay bills, buy airtime, and shop using their mobile phone number as a wallet. (2) Zeepay / Hubtel Pay — digital wallet platforms that allow Ghanaians to make mobile payments, receive international remittances, and transact with merchants.`,
    rubric: [
      { marks: 5, description: "Accurate definition of digital wallet, clear working process described, TWO correct Ghanaian examples given." },
      { marks: 4, description: "Good definition, working process described, one example correct." },
      { marks: 3, description: "Definition correct, basic working process, at least one example." },
      { marks: 2, description: "Definition given, no process described." },
      { marks: 1, description: "Very vague definition only." },
      { marks: 0, description: "No relevant answer." }
    ]
  },
  {
    id: 20, topic: "network", marks: 5,
    question: "ICT students at a JHS in Ghana are asked to set up a small computer lab network. Describe the key HARDWARE components they would need and explain the role of each component. [5 marks]",
    modelAnswer: `(1) Computers/Workstations — the end-user devices (desktop computers or laptops) that connect to the network and are used by students for learning and accessing shared resources. (2) Network Interface Card (NIC) — a hardware component installed in each computer that enables it to physically connect to the network, either via an Ethernet cable (wired NIC) or wirelessly (wireless NIC/Wi-Fi adapter). (3) Switch — a central network device that connects all computers in the lab using cables, receiving data from one computer and forwarding it only to the correct destination device, enabling efficient communication between computers and shared resources. (4) Router — connects the school's LAN (the computer lab network) to the internet via the ISP, directing traffic between the local network and external internet connections. (5) Cables (Ethernet/UTP cables) — physical wired connections that link computers to the switch, providing stable and fast data transmission. (6) Server (optional but important) — a central computer that manages shared resources such as a printer, file storage, and internet access for all workstations in the lab.`,
    rubric: [
      { marks: 5, description: "At least FOUR hardware components identified and the role of each accurately explained." },
      { marks: 4, description: "Four components identified, three roles clearly explained." },
      { marks: 3, description: "Three components identified with roles explained." },
      { marks: 2, description: "Two components with some explanation of roles." },
      { marks: 1, description: "Only one component mentioned." },
      { marks: 0, description: "No relevant answer." }
    ]
  },
];

export default function AssignmentHub() {
  const [phase, setPhase] = useState("pin"); // pin, intro, exam-mcq, exam-theory, results
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);
  const [timerActive, setTimerActive] = useState(false);
  const [currentMcq, setCurrentMcq] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState({});
  const [mcqSubmitted, setMcqSubmitted] = useState(false);
  const [showMcqExplanation, setShowMcqExplanation] = useState({});
  const [theoryAnswers, setTheoryAnswers] = useState({});
  const [theorySelfMarks, setTheorySelfMarks] = useState({});
  const [adaptiveDifficulty, setAdaptiveDifficulty] = useState("easy");
  const [weakTopics, setWeakTopics] = useState([]);
  const [results, setResults] = useState(null);
  const timerRef = useRef(null);

  const orderedMcqs = [...mcqQuestions].sort((a, b) => {
    const order = { easy: 0, medium: 1, hard: 2 };
    return order[a.difficulty] - order[b.difficulty];
  });

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            setTimerActive(false);
            handleFinishExam();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [timerActive]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const timerColor = timeLeft < 300 ? "#ef4444" : timeLeft < 900 ? "#f59e0b" : "#10b981";

  const handlePin = () => {
    if (pinInput === CORRECT_PIN) {
      setPhase("intro");
      setPinError("");
    } else {
      setPinError("Incorrect PIN. Please try again.");
      setPinInput("");
    }
  };

  const startExam = () => {
    setPhase("exam-mcq");
    setTimerActive(true);
  };

  const handleMcqSelect = (qIdx, optIdx) => {
    if (mcqSubmitted) return;
    setMcqAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const submitMcqs = () => {
    setMcqSubmitted(true);
    // Compute weak topics
    const topicStats = {};
    orderedMcqs.forEach((q, idx) => {
      if (!topicStats[q.topic]) topicStats[q.topic] = { correct: 0, total: 0 };
      topicStats[q.topic].total++;
      if (mcqAnswers[idx] === q.answer) topicStats[q.topic].correct++;
    });
    const weak = Object.entries(topicStats)
      .filter(([, s]) => s.correct / s.total < 0.6)
      .map(([t]) => t);
    setWeakTopics(weak);
    // Adaptive difficulty based on first 10 questions
    const first10Correct = orderedMcqs.slice(0, 10).filter((q, i) => mcqAnswers[i] === q.answer).length;
    if (first10Correct >= 8) setAdaptiveDifficulty("hard");
    else if (first10Correct >= 5) setAdaptiveDifficulty("medium");
    else setAdaptiveDifficulty("easy");
    setPhase("exam-theory");
  };

  const handleFinishExam = useCallback(() => {
    clearInterval(timerRef.current);
    setTimerActive(false);
    // Calculate MCQ score
    const mcqScore = orderedMcqs.reduce((acc, q, i) => acc + (mcqAnswers[i] === q.answer ? 1 : 0), 0);
    const theoryScore = Object.values(theorySelfMarks).reduce((a, b) => a + (Number(b) || 0), 0);
    const topicStats = {};
    orderedMcqs.forEach((q, idx) => {
      if (!topicStats[q.topic]) topicStats[q.topic] = { correct: 0, total: 0 };
      topicStats[q.topic].total++;
      if (mcqAnswers[idx] === q.answer) topicStats[q.topic].correct++;
    });
    const weak = Object.entries(topicStats).filter(([, s]) => s.correct / s.total < 0.6).map(([t]) => t);
    setWeakTopics(weak);
    setResults({ mcqScore, theoryScore, topicStats, total: mcqScore + theoryScore, maxTotal: 40 + 100 });
    setPhase("results");
  }, [mcqAnswers, theorySelfMarks, orderedMcqs]);

  const mcqCorrect = mcqSubmitted
    ? orderedMcqs.reduce((a, q, i) => a + (mcqAnswers[i] === q.answer ? 1 : 0), 0)
    : null;

  const s = {
    root: { fontFamily: "'Georgia', 'Times New Roman', serif", minHeight: "100vh", background: "#f8f7f4", color: "#1a1a2e" },
    header: { background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", color: "#fff", padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 12px rgba(0,0,0,0.3)" },
    headerTitle: { margin: 0, fontSize: "22px", fontWeight: "bold", letterSpacing: "0.5px" },
    headerSub: { margin: "4px 0 0", fontSize: "13px", opacity: 0.75, fontFamily: "'Georgia', serif" },
    timer: { background: "rgba(255,255,255,0.1)", border: `2px solid ${timerColor}`, borderRadius: "8px", padding: "8px 16px", fontFamily: "'Courier New', monospace", fontSize: "22px", fontWeight: "bold", color: timerColor, minWidth: "90px", textAlign: "center" },
    container: { maxWidth: "820px", margin: "0 auto", padding: "32px 20px" },
    card: { background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", padding: "32px", marginBottom: "24px" },
    pinWrap: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)" },
    pinCard: { background: "#fff", borderRadius: "16px", padding: "48px 40px", width: "100%", maxWidth: "400px", textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" },
    pinTitle: { fontSize: "26px", fontWeight: "bold", color: "#1a1a2e", marginBottom: "8px" },
    pinSub: { color: "#64748b", fontSize: "14px", marginBottom: "32px" },
    pinInput: { width: "100%", padding: "14px 16px", fontSize: "20px", letterSpacing: "8px", textAlign: "center", border: "2px solid #e2e8f0", borderRadius: "8px", outline: "none", fontFamily: "monospace", boxSizing: "border-box" },
    btn: { background: "#1a1a2e", color: "#fff", border: "none", padding: "14px 32px", borderRadius: "8px", fontSize: "15px", fontWeight: "bold", cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.5px" },
    btnSecondary: { background: "#f1f5f9", color: "#1a1a2e", border: "1px solid #e2e8f0", padding: "10px 24px", borderRadius: "8px", fontSize: "14px", cursor: "pointer", fontFamily: "inherit" },
    btnGreen: { background: "#10b981", color: "#fff", border: "none", padding: "14px 32px", borderRadius: "8px", fontSize: "15px", fontWeight: "bold", cursor: "pointer", fontFamily: "inherit" },
    btnDanger: { background: "#ef4444", color: "#fff", border: "none", padding: "14px 32px", borderRadius: "8px", fontSize: "15px", fontWeight: "bold", cursor: "pointer", fontFamily: "inherit" },
    error: { color: "#ef4444", fontSize: "14px", marginTop: "12px" },
    sectionTitle: { fontSize: "20px", fontWeight: "bold", color: "#1a1a2e", marginBottom: "4px" },
    sectionSub: { color: "#64748b", fontSize: "14px", marginBottom: "24px" },
    qCard: { background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "28px", marginBottom: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" },
    qNum: { fontSize: "12px", fontWeight: "bold", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" },
    qText: { fontSize: "16px", lineHeight: 1.7, color: "#1a1a2e", marginBottom: "20px" },
    optionBtn: (isSelected, isCorrect, isWrong, submitted) => ({
      display: "block", width: "100%", textAlign: "left", padding: "12px 16px", marginBottom: "10px",
      borderRadius: "8px", cursor: submitted ? "default" : "pointer", fontFamily: "inherit", fontSize: "14px",
      border: submitted
        ? isCorrect ? "2px solid #10b981" : isWrong ? "2px solid #ef4444" : "1px solid #e2e8f0"
        : isSelected ? "2px solid #1a1a2e" : "1px solid #e2e8f0",
      background: submitted
        ? isCorrect ? "#d1fae5" : isWrong ? "#fee2e2" : "#f8fafc"
        : isSelected ? "#f0f4ff" : "#f8fafc",
      color: "#1a1a2e", transition: "all 0.2s"
    }),
    badge: (topic) => ({
      display: "inline-block", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "bold",
      background: topicMeta[topic]?.light || "#f1f5f9", color: topicMeta[topic]?.color || "#64748b",
      border: `1px solid ${topicMeta[topic]?.color || "#e2e8f0"}`, marginRight: "8px"
    }),
    diffBadge: (diff) => ({
      display: "inline-block", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "bold",
      background: diffMeta[diff]?.bg || "#f1f5f9", color: diffMeta[diff]?.color || "#64748b",
      border: `1px solid ${diffMeta[diff]?.border || "#e2e8f0"}`
    }),
    explanationBox: { background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", padding: "14px 16px", marginTop: "12px", fontSize: "14px", color: "#166534", lineHeight: 1.6 },
    wrongBox: { background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "8px", padding: "14px 16px", marginTop: "12px", fontSize: "14px", color: "#7c2d12", lineHeight: 1.6 },
    theoryInput: { width: "100%", minHeight: "120px", padding: "12px 14px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", lineHeight: 1.6, fontFamily: "inherit", boxSizing: "border-box", resize: "vertical", outline: "none" },
    modelBox: { background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: "8px", padding: "16px", marginTop: "12px", fontSize: "14px", lineHeight: 1.7, color: "#0c4a6e" },
    rubricTable: { width: "100%", borderCollapse: "collapse", marginTop: "12px", fontSize: "13px" },
    markSelect: { padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "14px", fontFamily: "inherit", background: "#fff", cursor: "pointer", outline: "none" },
    weakBox: { background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "10px", padding: "16px 20px", marginBottom: "20px" },
    navRow: { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "24px", flexWrap: "wrap", gap: "12px" },
    progressBar: { height: "6px", borderRadius: "3px", background: "#e2e8f0", overflow: "hidden", marginBottom: "8px" },
    progressFill: (pct, color = "#1a1a2e") => ({ height: "100%", width: `${pct}%`, background: color, borderRadius: "3px", transition: "width 0.4s" }),
    statCard: { background: "#f8fafc", borderRadius: "10px", padding: "16px 20px", textAlign: "center", border: "1px solid #e2e8f0" },
    statNum: { fontSize: "32px", fontWeight: "bold", color: "#1a1a2e" },
    statLabel: { fontSize: "13px", color: "#64748b", marginTop: "4px" },
    divider: { border: "none", borderTop: "1px solid #e2e8f0", margin: "24px 0" },
    introGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginTop: "24px" },
    introFeatureCard: (color, bg) => ({ background: bg, border: `1px solid ${color}30`, borderRadius: "10px", padding: "16px", borderLeft: `3px solid ${color}` }),
  };

  // PIN SCREEN
  if (phase === "pin") {
    return (
      <div style={s.pinWrap}>
        <div style={s.pinCard}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>🎓</div>
          <div style={s.pinTitle}>BECE ICT Examination</div>
          <div style={s.pinSub}>Ghana Education Service · Junior High School<br />Enter your exam PIN to begin</div>
          <input
            style={s.pinInput}
            type="password"
            maxLength={6}
            value={pinInput}
            onChange={e => setPinInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handlePin()}
            placeholder="••••"
            autoFocus
          />
          {pinError && <div style={s.error}>{pinError}</div>}
          <div style={{ marginTop: "24px" }}>
            <button style={s.btn} onClick={handlePin}>Enter Examination</button>
          </div>
          <div style={{ marginTop: "16px", fontSize: "12px", color: "#94a3b8" }}>PIN: 2024 (demo)</div>
        </div>
      </div>
    );
  }

  // INTRO SCREEN
  if (phase === "intro") {
    return (
      <div style={s.root}>
        <div style={s.header}>
          <div>
            <h1 style={s.headerTitle}>BECE ICT Examination</h1>
            <p style={s.headerSub}>Ghana Education Service · Junior High School 3</p>
          </div>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textAlign: "right" }}>
            <div>Duration: 90 minutes</div>
            <div>Total Marks: 140</div>
          </div>
        </div>
        <div style={s.container}>
          <div style={s.card}>
            <h2 style={{ ...s.sectionTitle, fontSize: "22px" }}>Examination Instructions</h2>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>
              This examination tests your knowledge and understanding of ICT concepts covered in the Junior High School curriculum.
              Read all questions carefully before answering. This is a timed examination — manage your time wisely.
            </p>
            <hr style={s.divider} />
            <div style={s.introGrid}>
              {[
                { label: "Section A — Objectives", desc: "40 multiple-choice questions. Select the best answer. 1 mark each.", color: "#0ea5e9", bg: "#e0f2fe" },
                { label: "Section B — Theory", desc: "20 structured questions. Write your answer, then self-mark using the model answer and rubric provided.", color: "#8b5cf6", bg: "#ede9fe" },
                { label: "Time Allowed", desc: "90 minutes total. The timer starts when you click Begin. The exam auto-submits when time expires.", color: "#f59e0b", bg: "#fef3c7" },
                { label: "Topics Covered", desc: "Computer Networks · E-Commerce · Cashless Society · Transaction Cards · E-Learning", color: "#10b981", bg: "#d1fae5" },
              ].map((f, i) => (
                <div key={i} style={s.introFeatureCard(f.color, f.bg)}>
                  <div style={{ fontWeight: "bold", color: f.color, fontSize: "14px", marginBottom: "6px" }}>{f.label}</div>
                  <div style={{ fontSize: "13px", color: "#475569", lineHeight: 1.5 }}>{f.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "32px", padding: "16px 20px", background: "#fef9c3", borderRadius: "8px", border: "1px solid #fde047", fontSize: "14px", color: "#713f12" }}>
              <strong>Important:</strong> Ensure you have a reliable internet connection and sufficient time before beginning. Do not refresh the page during the examination.
            </div>
            <div style={{ marginTop: "28px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <button style={s.btnGreen} onClick={startExam}>Begin Examination</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // MCQ EXAM SCREEN
  if (phase === "exam-mcq") {
    const q = orderedMcqs[currentMcq];
    const answered = Object.keys(mcqAnswers).length;
    const pct = Math.round((answered / orderedMcqs.length) * 100);

    return (
      <div style={s.root}>
        <div style={s.header}>
          <div>
            <h1 style={s.headerTitle}>Section A — Objective Questions</h1>
            <p style={s.headerSub}>Question {currentMcq + 1} of {orderedMcqs.length} · {answered} answered</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
            <div style={s.timer}>{formatTime(timeLeft)}</div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)" }}>TIME REMAINING</div>
          </div>
        </div>
        <div style={s.container}>
          {/* Progress */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#64748b", marginBottom: "6px" }}>
              <span>Progress</span><span>{pct}% complete</span>
            </div>
            <div style={s.progressBar}><div style={s.progressFill(pct)} /></div>
            <div style={{ display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" }}>
              {Object.entries(topicMeta).map(([t, m]) => (
                <span key={t} style={s.badge(t)}>{m.label}</span>
              ))}
            </div>
          </div>

          {/* Question Card */}
          <div style={s.qCard}>
            <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
              <span style={s.badge(q.topic)}>{topicMeta[q.topic].label}</span>
              <span style={s.diffBadge(q.difficulty)}>{diffMeta[q.difficulty].label}</span>
              {adaptiveDifficulty === q.difficulty && (
                <span style={{ fontSize: "11px", color: "#8b5cf6", background: "#ede9fe", borderRadius: "20px", padding: "3px 10px", border: "1px solid #c4b5fd" }}>
                  Adaptive Level
                </span>
              )}
            </div>
            <div style={s.qNum}>Question {currentMcq + 1}</div>
            <div style={s.qText}>{q.question}</div>
            <div>
              {q.options.map((opt, idx) => {
                const isSelected = mcqAnswers[currentMcq] === idx;
                const isCorrect = mcqSubmitted && idx === q.answer;
                const isWrong = mcqSubmitted && isSelected && idx !== q.answer;
                return (
                  <button key={idx} style={s.optionBtn(isSelected, isCorrect, isWrong, mcqSubmitted)}
                    onClick={() => handleMcqSelect(currentMcq, idx)}>
                    <span style={{ fontWeight: "bold", marginRight: "10px", color: "#94a3b8" }}>
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    {opt}
                    {mcqSubmitted && isCorrect && <span style={{ float: "right", color: "#10b981" }}>✓ Correct</span>}
                    {mcqSubmitted && isWrong && <span style={{ float: "right", color: "#ef4444" }}>✗ Wrong</span>}
                  </button>
                );
              })}
            </div>
            {mcqSubmitted && (
              <div>
                <button style={{ ...s.btnSecondary, marginTop: "8px", fontSize: "13px" }}
                  onClick={() => setShowMcqExplanation(p => ({ ...p, [currentMcq]: !p[currentMcq] }))}>
                  {showMcqExplanation[currentMcq] ? "Hide" : "Show"} Explanation
                </button>
                {showMcqExplanation[currentMcq] && (
                  mcqAnswers[currentMcq] === q.answer
                    ? <div style={s.explanationBox}><strong>✓ Correct!</strong> {q.explanation}</div>
                    : <div style={s.wrongBox}><strong>✗ Incorrect.</strong> The correct answer is <strong>{String.fromCharCode(65 + q.answer)}: {q.options[q.answer]}</strong>. {q.explanation}</div>
                )}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div style={s.navRow}>
            <button style={s.btnSecondary} disabled={currentMcq === 0} onClick={() => setCurrentMcq(c => c - 1)}>
              ← Previous
            </button>
            <div style={{ fontSize: "13px", color: "#64748b" }}>
              {answered} / {orderedMcqs.length} answered
            </div>
            {currentMcq < orderedMcqs.length - 1 ? (
              <button style={s.btn} onClick={() => setCurrentMcq(c => c + 1)}>Next →</button>
            ) : (
              !mcqSubmitted ? (
                <button style={s.btnGreen} onClick={submitMcqs}>
                  Submit Objectives & Continue
                </button>
              ) : (
                <button style={s.btn} onClick={() => setPhase("exam-theory")}>
                  Proceed to Theory →
                </button>
              )
            )}
          </div>

          {/* Question Map */}
          <div style={{ ...s.card, marginTop: "28px" }}>
            <div style={{ fontSize: "14px", fontWeight: "bold", color: "#1a1a2e", marginBottom: "12px" }}>Question Navigator</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {orderedMcqs.map((_, i) => (
                <button key={i} onClick={() => setCurrentMcq(i)}
                  style={{
                    width: "32px", height: "32px", borderRadius: "6px", fontSize: "12px", fontWeight: "bold",
                    cursor: "pointer", border: i === currentMcq ? "2px solid #1a1a2e" : "1px solid #e2e8f0",
                    background: mcqSubmitted
                      ? mcqAnswers[i] === orderedMcqs[i].answer ? "#d1fae5" : mcqAnswers[i] !== undefined ? "#fee2e2" : "#f8fafc"
                      : mcqAnswers[i] !== undefined ? "#f0f4ff" : "#f8fafc",
                    color: "#1a1a2e"
                  }}>
                  {i + 1}
                </button>
              ))}
            </div>
            {mcqSubmitted && (
              <div style={{ marginTop: "14px", fontSize: "13px", color: "#475569" }}>
                Objective Score: <strong style={{ color: "#1a1a2e" }}>{mcqCorrect} / {orderedMcqs.length}</strong>
                {weakTopics.length > 0 && (
                  <div style={s.weakBox}>
                    <div style={{ fontWeight: "bold", color: "#92400e", marginBottom: "6px" }}>⚠ Weak Topics Detected</div>
                    {weakTopics.map(t => (
                      <span key={t} style={{ ...s.badge(t), marginBottom: "4px" }}>
                        {topicMeta[t].label} — needs more practice
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // THEORY EXAM SCREEN
  if (phase === "exam-theory") {
    const theoryScore = Object.values(theorySelfMarks).reduce((a, b) => a + (Number(b) || 0), 0);
    const maxTheory = theoryQuestions.reduce((a, q) => a + q.marks, 0);

    return (
      <div style={s.root}>
        <div style={s.header}>
          <div>
            <h1 style={s.headerTitle}>Section B — Theory Questions</h1>
            <p style={s.headerSub}>Write your answers, view model answers, then self-mark each question</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
            <div style={s.timer}>{formatTime(timeLeft)}</div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)" }}>TIME REMAINING</div>
          </div>
        </div>
        <div style={s.container}>
          {weakTopics.length > 0 && (
            <div style={s.weakBox}>
              <strong style={{ color: "#92400e" }}>Revision Focus:</strong>{" "}
              Your objective results suggest you should pay extra attention to:{" "}
              {weakTopics.map(t => <span key={t} style={s.badge(t)}>{topicMeta[t].label}</span>)}
            </div>
          )}

          {/* MCQ Summary */}
          <div style={{ ...s.card, background: "#f0f9ff", border: "1px solid #bae6fd" }}>
            <div style={{ fontSize: "14px", fontWeight: "bold", color: "#0c4a6e" }}>
              Section A Score: {mcqCorrect !== null ? mcqCorrect : 0} / {orderedMcqs.length} marks
            </div>
          </div>

          {theoryQuestions.map((q, idx) => {
            const [showModel, setShowModel] = useState(false);
            return (
              <div key={q.id} style={s.qCard}>
                <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap", alignItems: "center" }}>
                  <span style={s.badge(q.topic)}>{topicMeta[q.topic].label}</span>
                  <span style={{ fontSize: "12px", color: "#64748b", fontWeight: "bold" }}>[{q.marks} marks]</span>
                </div>
                <div style={s.qNum}>Theory Question {idx + 1}</div>
                <div style={{ ...s.qText, fontStyle: "italic", borderLeft: "3px solid #e2e8f0", paddingLeft: "14px" }}>
                  {q.question}
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "bold", color: "#475569", marginBottom: "6px" }}>
                    Your Answer:
                  </label>
                  <textarea
                    style={s.theoryInput}
                    placeholder="Write your answer here..."
                    value={theoryAnswers[idx] || ""}
                    onChange={e => setTheoryAnswers(p => ({ ...p, [idx]: e.target.value }))}
                  />
                </div>

                <button style={{ ...s.btnSecondary, marginBottom: "12px" }}
                  onClick={() => setShowModel(v => !v)}>
                  {showModel ? "Hide" : "View"} Model Answer & Rubric
                </button>

                {showModel && (
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "bold", color: "#0c4a6e", marginBottom: "6px" }}>Model Answer:</div>
                    <div style={s.modelBox}>{q.modelAnswer}</div>
                    <div style={{ fontSize: "13px", fontWeight: "bold", color: "#1a1a2e", marginTop: "16px", marginBottom: "8px" }}>Marking Rubric:</div>
                    <table style={s.rubricTable}>
                      <thead>
                        <tr style={{ background: "#f1f5f9" }}>
                          <th style={{ padding: "8px 12px", textAlign: "left", border: "1px solid #e2e8f0", fontSize: "12px" }}>Marks</th>
                          <th style={{ padding: "8px 12px", textAlign: "left", border: "1px solid #e2e8f0", fontSize: "12px" }}>Criteria</th>
                        </tr>
                      </thead>
                      <tbody>
                        {q.rubric.map((r, ri) => (
                          <tr key={ri} style={{ background: ri % 2 === 0 ? "#fff" : "#f8fafc" }}>
                            <td style={{ padding: "8px 12px", border: "1px solid #e2e8f0", fontWeight: "bold", color: "#1a1a2e", fontSize: "13px", whiteSpace: "nowrap" }}>
                              {r.marks}
                            </td>
                            <td style={{ padding: "8px 12px", border: "1px solid #e2e8f0", color: "#475569", fontSize: "13px", lineHeight: 1.5 }}>
                              {r.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "12px", background: "#f8fafc", borderRadius: "8px", padding: "12px 16px", border: "1px solid #e2e8f0" }}>
                  <label style={{ fontSize: "14px", fontWeight: "bold", color: "#1a1a2e" }}>Self-Mark:</label>
                  <select style={s.markSelect} value={theorySelfMarks[idx] ?? ""}
                    onChange={e => setTheorySelfMarks(p => ({ ...p, [idx]: Number(e.target.value) }))}>
                    <option value="">Select marks</option>
                    {[...Array(q.marks + 1)].map((_, m) => (
                      <option key={m} value={m}>{m} / {q.marks}</option>
                    ))}
                  </select>
                  {theorySelfMarks[idx] !== undefined && (
                    <span style={{
                      fontSize: "13px", fontWeight: "bold", padding: "4px 12px", borderRadius: "20px",
                      background: theorySelfMarks[idx] >= q.marks * 0.8 ? "#d1fae5" : theorySelfMarks[idx] >= q.marks * 0.5 ? "#fef3c7" : "#fee2e2",
                      color: theorySelfMarks[idx] >= q.marks * 0.8 ? "#065f46" : theorySelfMarks[idx] >= q.marks * 0.5 ? "#92400e" : "#7f1d1d"
                    }}>
                      {theorySelfMarks[idx] >= q.marks * 0.8 ? "Excellent" : theorySelfMarks[idx] >= q.marks * 0.5 ? "Fair" : "Needs Work"}
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          <div style={{ ...s.card, background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
            <div style={{ fontSize: "15px", fontWeight: "bold", color: "#065f46", marginBottom: "4px" }}>
              Theory Self-Mark Running Total: {theoryScore} / {maxTheory}
            </div>
            <div style={{ fontSize: "13px", color: "#166534" }}>
              {Object.keys(theorySelfMarks).length} of {theoryQuestions.length} questions marked
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
            <button style={s.btnDanger} onClick={handleFinishExam}>
              Finish Examination & View Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  // RESULTS SCREEN
  if (phase === "results" && results) {
    const { mcqScore, theoryScore, topicStats, total, maxTotal } = results;
    const pct = Math.round((total / maxTotal) * 100);
    const grade = pct >= 80 ? "A" : pct >= 70 ? "B" : pct >= 60 ? "C" : pct >= 50 ? "D" : "F";
    const gradeColor = pct >= 80 ? "#10b981" : pct >= 70 ? "#0ea5e9" : pct >= 60 ? "#f59e0b" : pct >= 50 ? "#f97316" : "#ef4444";

    return (
      <div style={s.root}>
        <div style={s.header}>
          <div>
            <h1 style={s.headerTitle}>Examination Results</h1>
            <p style={s.headerSub}>BECE ICT · Ghana Education Service</p>
          </div>
          <button style={{ ...s.btnSecondary, background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }}
            onClick={() => { setPhase("pin"); setPinInput(""); setMcqAnswers({}); setMcqSubmitted(false); setTheoryAnswers({}); setTheorySelfMarks({}); setTimeLeft(EXAM_DURATION); setCurrentMcq(0); setShowMcqExplanation({}); }}>
            Restart
          </button>
        </div>
        <div style={s.container}>
          {/* Grade Card */}
          <div style={{ ...s.card, textAlign: "center", borderTop: `4px solid ${gradeColor}` }}>
            <div style={{ fontSize: "72px", fontWeight: "bold", color: gradeColor, lineHeight: 1 }}>{grade}</div>
            <div style={{ fontSize: "20px", color: "#1a1a2e", fontWeight: "bold", marginTop: "8px" }}>{total} / {maxTotal} marks</div>
            <div style={{ fontSize: "15px", color: "#64748b", marginTop: "4px" }}>{pct}% overall</div>
            <div style={{ ...s.progressBar, maxWidth: "320px", margin: "16px auto 0", height: "10px" }}>
              <div style={s.progressFill(pct, gradeColor)} />
            </div>
          </div>

          {/* Score Breakdown */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "24px" }}>
            <div style={s.statCard}>
              <div style={s.statNum}>{mcqScore}</div>
              <div style={s.statLabel}>Section A Score</div>
              <div style={{ fontSize: "12px", color: "#94a3b8" }}>out of {orderedMcqs.length}</div>
            </div>
            <div style={s.statCard}>
              <div style={s.statNum}>{theoryScore}</div>
              <div style={s.statLabel}>Section B Score</div>
              <div style={{ fontSize: "12px", color: "#94a3b8" }}>out of 100</div>
            </div>
            <div style={{ ...s.statCard, background: `${gradeColor}15`, border: `1px solid ${gradeColor}40` }}>
              <div style={{ ...s.statNum, color: gradeColor }}>{pct}%</div>
              <div style={s.statLabel}>Final Percentage</div>
              <div style={{ fontSize: "12px", color: "#94a3b8" }}>Grade {grade}</div>
            </div>
          </div>

          {/* Topic Performance */}
          <div style={s.card}>
            <h3 style={{ ...s.sectionTitle, marginBottom: "20px" }}>Performance by Topic</h3>
            {Object.entries(topicStats).map(([topic, stat]) => {
              const tPct = Math.round((stat.correct / stat.total) * 100);
              const tColor = tPct >= 70 ? "#10b981" : tPct >= 50 ? "#f59e0b" : "#ef4444";
              const isWeak = weakTopics.includes(topic);
              return (
                <div key={topic} style={{ marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={s.badge(topic)}>{topicMeta[topic].label}</span>
                      {isWeak && <span style={{ fontSize: "12px", color: "#f59e0b", background: "#fef3c7", padding: "2px 8px", borderRadius: "20px", border: "1px solid #fcd34d" }}>Needs Practice</span>}
                    </div>
                    <span style={{ fontSize: "13px", fontWeight: "bold", color: tColor }}>{stat.correct}/{stat.total} ({tPct}%)</span>
                  </div>
                  <div style={{ ...s.progressBar, height: "8px" }}>
                    <div style={s.progressFill(tPct, tColor)} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Weak Topics Recommendations */}
          {weakTopics.length > 0 && (
            <div style={s.card}>
              <h3 style={{ ...s.sectionTitle, color: "#92400e" }}>📚 Study Recommendations</h3>
              <p style={{ color: "#78350f", fontSize: "14px", lineHeight: 1.6 }}>
                Based on your performance, focus your revision on the following topics before your BECE examination:
              </p>
              <ul style={{ margin: "12px 0", paddingLeft: "20px" }}>
                {weakTopics.map(t => (
                  <li key={t} style={{ marginBottom: "10px", color: "#475569", fontSize: "14px", lineHeight: 1.6 }}>
                    <strong style={{ color: topicMeta[t].color }}>{topicMeta[t].label}</strong> —{" "}
                    {t === "network" && "Revise network types (LAN, WAN, MAN), network devices (router, switch, firewall), and topologies."}
                    {t === "ecommerce" && "Revise e-commerce models (B2B, B2C, C2C), online security (HTTPS, phishing), and digital transactions."}
                    {t === "cashless" && "Revise cashless payment methods, advantages and disadvantages, mobile money, and GhIPSS."}
                    {t === "transaction" && "Revise card types (debit, credit, prepaid), card security (CVV, EMV chip), ATM operations, and NFC."}
                    {t === "elearning" && "Revise e-learning types (synchronous/asynchronous), LMS platforms, adaptive learning, and digital divide."}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Adaptive Difficulty Note */}
          <div style={{ ...s.card, background: "#f0f9ff", border: "1px solid #bae6fd" }}>
            <h3 style={{ color: "#0c4a6e", fontSize: "15px", marginBottom: "8px" }}>Adaptive Difficulty Assessment</h3>
            <p style={{ color: "#0369a1", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
              Based on your performance in the first 10 questions, the system determined your adaptive level as{" "}
              <strong style={{ color: diffMeta[adaptiveDifficulty].color }}>
                {diffMeta[adaptiveDifficulty].label}
              </strong>.{" "}
              {adaptiveDifficulty === "easy" && "Focus on building strong foundational knowledge across all topics before attempting more challenging questions."}
              {adaptiveDifficulty === "medium" && "You have a good foundation. Work on applying concepts to real-world scenarios and deepen your understanding."}
              {adaptiveDifficulty === "hard" && "Excellent performance! You are well-prepared for challenging exam questions. Continue practising application-based problems."}
            </p>
          </div>

          <div style={{ textAlign: "center", marginTop: "8px" }}>
            <button style={s.btn} onClick={() => { setPhase("pin"); setPinInput(""); setMcqAnswers({}); setMcqSubmitted(false); setTheoryAnswers({}); setTheorySelfMarks({}); setTimeLeft(EXAM_DURATION); setCurrentMcq(0); setShowMcqExplanation({}); setWeakTopics([]); setResults(null); }}>
              Take Exam Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
