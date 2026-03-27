export const MAIN_CATEGORIES = [
  { id: 1, hindi: "मिस्त्री और तकनीकी", english: "Technical & Repair", icon: "Wrench", color: "bg-blue-500" },
  { id: 2, hindi: "खेती और मशीनरी", english: "Agriculture & Machinery", icon: "Tractor", color: "bg-emerald-500" },
  { id: 3, hindi: "गाड़ी और ट्रांसपोर्ट", english: "Transport & Travel", icon: "Truck", color: "bg-orange-500" },
  { id: 4, hindi: "दुकान और व्यापार", english: "Shops & Retail", icon: "Store", color: "bg-purple-500" },
  { id: 5, hindi: "फंक्शन और इवेंट", english: "Events & Catering", icon: "PartyPopper", color: "bg-pink-500" },
  { id: 6, hindi: "डिजिटल और सरकारी सेवा", english: "Digital & Office", icon: "Monitor", color: "bg-cyan-500" },
  { id: 7, hindi: "घरेलू और व्यक्तिगत सेवा", english: "Personal Services", icon: "User", color: "bg-indigo-500" },
  { id: 8, hindi: "स्वास्थ्य और मेडिकल", english: "Health & Medical", icon: "HeartPulse", color: "bg-red-500" },
  { id: 9, hindi: "शिक्षा और प्रशिक्षण", english: "Education & Training", icon: "GraduationCap", color: "bg-amber-500" },
  { id: 10, hindi: "निर्माण और ठेकेदार", english: "Construction & Contractor", icon: "HardHat", color: "bg-slate-600" },
  { id: 11, hindi: "पशुपालन और अन्य व्यवसाय", english: "Animal & Allied Services", icon: "PawPrint", color: "bg-lime-600" },
  { id: 12, hindi: "पानी और सफाई सेवा", english: "Water & Sanitation", icon: "Droplets", color: "bg-sky-500" },
  { id: 13, hindi: "किराया और सर्विस", english: "Rental Services", icon: "Key", color: "bg-rose-500" },
  { id: 14, hindi: "फूड और होटल", english: "Food & Hospitality", icon: "Coffee", color: "bg-yellow-600" },
  { id: 15, hindi: "स्थानीय रोजगार / मजदूरी", english: "Daily Jobs & Labour", icon: "Briefcase", color: "bg-teal-600" }
] as const;

export const CATEGORIES = [
  // 1. मिस्त्री और तकनीकी (Technical & Repair)
  "बिजली मिस्त्री (Electrician)",
  "नल मिस्त्री (Plumber)",
  "राजमिस्त्री/मकान बनाने वाला (Mason)",
  "बढ़ई/लकड़ी का काम (Carpenter)",
  "लोहार/वेल्डिंग (Welder)",
  "पेंटर/पुताई वाला (Painter)",
  "बाइक मैकेनिक (Two-Wheeler Mechanic)",
  "कार/जीप मैकेनिक (Four-Wheeler Mechanic)",
  "ट्रैक्टर मैकेनिक (Tractor Mechanic)",
  "पंप/मोटर सुधारने वाला (Pump Mechanic)",
  "फ्रिज/एसी/वाशिंग मशीन रिपेयर (Electronics Repair)",
  "साइकिल मिस्त्री (Cycle Repair)",
  "जनरेटर मैकेनिक (Generator Mechanic)",

  // 2. खेती और मशीनरी (Agriculture & Machinery)
  "खेत मजदूर (Farm Labour)",
  "जेसीबी ऑपरेटर (JCB Operator)",
  "ट्रैक्टर ड्राइवर (Tractor Driver)",
  "हार्वेस्टर/थ्रेशर ऑपरेटर (Harvester/Thresher)",
  "कंबाइन मशीन ऑपरेटर (Combine Operator)",
  "माली/नर्सरी (Gardener)",
  "डेयरी/दूध कलेक्शन (Dairy/Milk Center)",
  "पशु डॉक्टर/सहायक (Vet/AI Worker)",
  "खाद-बीज भंडार (Seeds & Fertilizer)",
  "पशु आहार/खल-चूरी स्टोर (Cattle Feed Store)",
  "बोरवेल मशीन (Borewell Service)",

  // 3. गाड़ी और ट्रांसपोर्ट (Transport & Travel)
  "टैक्सी/कार ड्राइवर (Taxi Driver)",
  "बस/ट्रक ड्राइवर (Heavy Driver)",
  "ऑटो/ई-रिक्शा ड्राइवर (Auto/E-Rickshaw)",
  "पिकअप/छोटा हाथी (Loading Vehicle)",
  "एम्बुलेंस सेवा (Ambulance)",
  "टूर और ट्रेवल्स (Tour & Travels)",
  "क्रेन/रिकवरी सर्विस (Crane Service)",

  // 4. दुकान और व्यापार (Shops & Retail)
  "किराना स्टोर (General Store/Grocery)",
  "मेडिकल स्टोर (Pharmacy)",
  "मोबाइल दुकान/रिपेयर (Mobile Shop)",
  "खाद-बीज दुकान (Agri Shop)",
  "कपड़े की दुकान (Clothing Store)",
  "जूते-चप्पल की दुकान (Footwear Shop)",
  "हार्डवेयर/बिल्डिंग मटेरियल (Hardware Store)",
  "बर्तन की दुकान (Utensils Shop)",
  "ज्वैलरी/सुनार (Goldsmith)",
  "चश्मे की दुकान (Opticals)",
  "स्टेशनरी/किताबों की दुकान (Book Store)",
  "इलेक्ट्रॉनिक शोरूम (Electronics Shop)",
  "फर्नीचर हाउस (Furniture Store)",

  // 5. फंक्शन और इवेंट (Events & Catering)
  "हलवाई/कुक (Main Cook/Halwai)",
  "टेंट हाउस/डेकोरेशन (Tent House)",
  "डीजे/साउंड सिस्टम (DJ & Sound)",
  "बैंड बाजा/ढोल (Brass Band)",
  "फोटोग्राफर/वीडियो मेकर (Photographer)",
  "ब्यूटी पार्लर/मेकअप (Beauty Parlor)",
  "मेहंदी आर्टिस्ट (Mehndi Artist)",
  "फूल सजावट (Flower Decorator)",
  "केटरिंग सर्विस (Catering)",

  // 6. डिजिटल और सरकारी सेवा (Digital & Office)
  "ई-मित्र/सीएससी/जन सेवा केंद्र (CSC Center)",
  "फोटोकॉपी/टाइपिंग/ऑनलाइन फॉर्म (Cyber Cafe)",
  "बैंक बीसी/आधार पैसे निकालना (Banking Agent)",
  "बीमा/एलआईसी एजेंट (Insurance Agent)",
  "वकील/नोटरी (Lawyer)",
  "प्रॉपर्टी डीलर (Property Dealer)",

  // 7. घरेलू और व्यक्तिगत सेवा (Personal Services)
  "दर्जी/सिलाई-कढ़ाई (Tailor)",
  "नाई/सैलून (Barber/Hair Salon)",
  "धोबी/प्रेस वाला (Laundry)",
  "ट्यूशन/प्राइवेट टीचर (Teacher/Tutor)",
  "सफाई कर्मचारी (Cleaner)",
  "गार्ड/वॉचमैन (Security Guard)",
  "बावर्ची/टिफिन सर्विस (Tiffin Service)",
  "आटा चक्की (Flour Mill)",

  // 8. स्वास्थ्य और मेडिकल (Health & Medical)
  "प्राइवेट डॉक्टर/क्लिनिक (Private Doctor/Clinic)",
  "नर्स/ANM (Nurse/ANM)",
  "कंपाउंडर (Compounder)",
  "पैथोलॉजी/लैब टेस्ट (Pathology/Lab Test)",
  "आयुर्वेद/होम्योपैथी डॉक्टर (Ayurveda/Homeopathy)",

  // 9. शिक्षा और प्रशिक्षण (Education & Training)
  "स्कूल/कोचिंग सेंटर (School/Coaching Center)",
  "कंप्यूटर क्लास (Computer Class)",
  "स्किल ट्रेनिंग (सिलाई, ITI, आदि) (Skill Training)",
  "ड्राइविंग स्कूल (Driving School)",

  // 10. निर्माण और ठेकेदार (Construction & Contractor)
  "बिल्डिंग ठेकेदार (Building Contractor)",
  "रोड/नाली निर्माण (Road/Drainage Construction)",
  "टाइल/मार्बल मिस्त्री (Tile/Marble Mason)",
  "POP/False Ceiling (POP/False Ceiling)",
  "ड्रिलिंग/कटिंग सर्विस (Drilling/Cutting Service)",

  // 11. पशुपालन और अन्य व्यवसाय (Animal & Allied Services)
  "मुर्गी पालन (Poultry)",
  "मछली पालन (Fisheries)",
  "बकरी पालन (Goat Farming)",
  "मधुमक्खी पालन (Beekeeping)",

  // 12. पानी और सफाई सेवा (Water & Sanitation)
  "पानी टैंकर (Water Tanker)",
  "सेप्टिक टैंक सफाई (Septic Tank Cleaning)",
  "कूड़ा उठाने वाली सेवा (Garbage Collection)",
  "ड्रेनेज सफाई (Drainage Cleaning)",

  // 13. किराया और सर्विस (Rental Services)
  "JCB/ट्रैक्टर किराया (JCB/Tractor Rental)",
  "शादी का सामान किराया (Wedding Items Rental)",
  "जनरेटर किराया (Generator Rental)",
  "स्पीकर/माइका किराया (Speaker/Mic Rental)",

  // 14. फूड और होटल (Food & Hospitality)
  "ढाबा/रेस्टोरेंट (Dhaba/Restaurant)",
  "चाय की दुकान (Tea Shop)",
  "मिठाई की दुकान (Sweet Shop)",
  "होटल/लॉज (Hotel/Lodge)",

  // 15. स्थानीय रोजगार / मजदूरी (Daily Jobs & Labour)
  "दिहाड़ी मजदूर (Daily Labour)",
  "लोडिंग/अनलोडिंग (Loading/Unloading)",
  "खेत में अस्थायी काम (Temporary Farm Work)"
] as const;

export type Category = typeof CATEGORIES[number] | typeof MAIN_CATEGORIES[number]['english'] | string;
