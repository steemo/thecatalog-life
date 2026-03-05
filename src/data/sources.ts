/**
 * Academic Sources & References
 * Created by: Tiko Abousteit
 * Date: 5 March 2026
 *
 * Description:
 *     Comprehensive list of Islamic, psychological, medical, and sociological
 *     sources that form the intellectual foundation of The Catalog.
 *     Each source is mapped to the specific days it informs.
 */

import type { BilingualText } from '@/types/catalog';

export interface Source {
  id: string;
  category: 'islamic' | 'psychology' | 'medical' | 'sociology';
  title: BilingualText;
  author: BilingualText;
  year?: number;
  description: BilingualText;
  usedInDays: number[];
  keyInsight: BilingualText;
}

export const catalogSources: Source[] = [
  // Islamic References
  {
    id: 'ghazali-ihya',
    category: 'islamic',
    title: {
      arabic: 'إحياء علوم الدين',
      english: 'Revival of the Religious Sciences',
    },
    author: {
      arabic: 'الإمام الغزالي',
      english: 'Imam Al-Ghazali',
    },
    year: 1058,
    description: {
      arabic: 'المرجع الأساسي لفهم أسرار العبادات وتحويلها من حركات جسدية إلى "روح" وقلب حي',
      english: 'The primary reference for understanding the secrets of worship and transforming them from physical movements to "spirit" and a living heart',
    },
    usedInDays: [8, 9, 10, 16, 17],
    keyInsight: {
      arabic: 'العبادة ليست حركات جسدية فقط، بل هي تطهير للقلب والروح وتحقيق الخشوع',
      english: 'Worship is not merely physical movements, but purification of the heart and soul and achieving reverence',
    },
  },
  {
    id: 'ibn-taymiyyah-uboodiyyah',
    category: 'islamic',
    title: {
      arabic: 'العبودية',
      english: 'Servitude to Allah',
    },
    author: {
      arabic: 'الإمام ابن تيمية',
      english: 'Imam Ibn Taymiyyah',
    },
    year: 1328,
    description: {
      arabic: 'شرح عميق لمعنى العبودية الحقيقية: من لم يكن عبداً لله، كان عبداً لغيره',
      english: 'Deep explanation of true servitude: whoever is not a servant of Allah becomes a servant of something else',
    },
    usedInDays: [5, 6],
    keyInsight: {
      arabic: 'تحطيم أصنام كلام الناس والفلوس والشهرة - الحرية الحقيقية في العبودية لله وحده',
      english: 'Breaking idols of people\'s words, money, and fame - true freedom is in servitude to Allah alone',
    },
  },
  {
    id: 'shatibi-muwafaqat',
    category: 'islamic',
    title: {
      arabic: 'الموافقات',
      english: 'Concordance (Objectives of Islamic Law)',
    },
    author: {
      arabic: 'الإمام الشاطبي',
      english: 'Imam Al-Shatibi',
    },
    year: 1388,
    description: {
      arabic: 'مؤسس علم "مقاصد الشريعة" - فهم أن الدين جاء لحفظ الكليات الخمس: الدين، النفس، العقل، النسل، المال',
      english: 'Founder of the science of "Objectives of Islamic Law" - understanding that religion came to preserve five essentials: religion, life, intellect, lineage, and wealth',
    },
    usedInDays: [4, 11, 12, 13, 14, 15, 18, 19, 20],
    keyInsight: {
      arabic: 'كل ركن من أركان الإسلام يحقق مقصداً من المقاصد الخمس - الدين نظام متكامل لحماية الإنسان',
      english: 'Each pillar of Islam achieves one of the five objectives - religion is an integrated system to protect humanity',
    },
  },
  {
    id: 'ghazali-asma',
    category: 'islamic',
    title: {
      arabic: 'المقصد الأسنى في شرح أسماء الله الحسنى',
      english: 'The Finest Aim in Explaining Allah\'s Beautiful Names',
    },
    author: {
      arabic: 'الإمام الغزالي',
      english: 'Imam Al-Ghazali',
    },
    year: 1058,
    description: {
      arabic: 'شرح دقيق للفرق بين "المغفرة" و"العفو" - العفو هو مسح كامل للبيانات، كأنك لم تفعل الذنب أصلاً',
      english: 'Precise explanation of the difference between "forgiveness" and "pardon" - pardon is complete data erasure, as if you never committed the sin',
    },
    usedInDays: [21],
    keyInsight: {
      arabic: 'العفو هو أعظم علاج نفسي لـ "عقدة الذنب" - ليلة القدر فرصة للمسح الكامل والبدء من الصفر',
      english: 'Pardon is the greatest psychological treatment for "guilt complex" - Laylat al-Qadr is an opportunity for complete erasure and starting fresh',
    },
  },
  {
    id: 'hadith-collection',
    category: 'islamic',
    title: {
      arabic: 'الأحاديث النبوية الصحيحة',
      english: 'Authentic Prophetic Hadith Collections',
    },
    author: {
      arabic: 'صحيح البخاري، صحيح مسلم، سنن أبي داود',
      english: 'Sahih Al-Bukhari, Sahih Muslim, Sunan Abu Dawud',
    },
    description: {
      arabic: 'جميع الأحاديث المذكورة في الكتالوج (أرحنا بها يا بلال، اليد العليا، من لم يدع قول الزور، من أحب أن يبسط له في رزقه) هي أحاديث صحيحة',
      english: 'All hadith mentioned in The Catalog (Comfort us with it O Bilal, the upper hand, whoever does not abandon false speech, whoever loves to have his provision expanded) are authentic',
    },
    usedInDays: [1, 2, 3, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    keyInsight: {
      arabic: 'السنة النبوية هي التطبيق العملي للقرآن - كل يوم في الكتالوج مدعوم بحديث صحيح',
      english: 'The Prophetic Sunnah is the practical application of the Quran - every day in The Catalog is supported by authentic hadith',
    },
  },

  // Psychology & Behavioral Science References
  {
    id: 'brene-brown-vulnerability',
    category: 'psychology',
    title: {
      arabic: 'قوة الضعف',
      english: 'The Power of Vulnerability',
    },
    author: {
      arabic: 'بريني براون (Brené Brown)',
      english: 'Brené Brown',
    },
    year: 2012,
    description: {
      arabic: 'نظرية عالمة النفس الأمريكية عن قوة الضعف والشفافية - الاعتراف بالضعف هو أساس الشجاعة والاتصال الحقيقي',
      english: 'American psychologist\'s theory on the power of vulnerability and authenticity - acknowledging weakness is the foundation of courage and genuine connection',
    },
    usedInDays: [14],
    keyInsight: {
      arabic: 'الدعاء والعلاج النفسي والتعبير عن الضعف - الاعتراف بحاجتك لله هو أقوى شكل من أشكال القوة',
      english: 'Supplication, psychological healing, and expressing vulnerability - acknowledging your need for Allah is the strongest form of strength',
    },
  },
  {
    id: 'covey-abundance-mindset',
    category: 'psychology',
    title: {
      arabic: 'عقلية الندرة وعقلية الوفرة',
      english: 'Scarcity vs. Abundance Mindset',
    },
    author: {
      arabic: 'ستيفن كوفي (Stephen Covey)',
      english: 'Stephen Covey',
    },
    year: 1989,
    description: {
      arabic: 'من كتاب "العادات السبع للأشخاص الأكثر فعالية" - الفرق بين من يرى الحياة كمجموع ثابت ومن يرى فيها فرصاً لا نهائية',
      english: 'From "The 7 Habits of Highly Effective People" - the difference between those who see life as a fixed sum and those who see infinite opportunities',
    },
    usedInDays: [18],
    keyInsight: {
      arabic: 'الزكاة وفك التعلق بالمال - من يعطي يشعر بالوفرة، ومن يبخل يشعر بالندرة',
      english: 'Zakat and detachment from money - those who give feel abundance, those who withhold feel scarcity',
    },
  },
  {
    id: 'covey-circle-of-control',
    category: 'psychology',
    title: {
      arabic: 'دائرة التحكم',
      english: 'Circle of Control',
    },
    author: {
      arabic: 'ستيفن كوفي والفلسفة الرواقية (Stoicism)',
      english: 'Stephen Covey and Stoic Philosophy',
    },
    year: 1989,
    description: {
      arabic: 'تقسيم الحياة إلى ما تتحكم فيه وما لا تتحكم فيه - التركيز على ما بيدك وترك ما ليس بيدك',
      english: 'Dividing life into what you control and what you don\'t - focusing on what\'s in your hands and letting go of what isn\'t',
    },
    usedInDays: [7],
    keyInsight: {
      arabic: 'القضاء والقدر لعلاج الـ Overthinking - الاستسلام لما لا تتحكم فيه هو الطريق للسلام النفسي',
      english: 'Divine decree and fate to treat overthinking - surrendering to what you don\'t control is the path to peace',
    },
  },
  {
    id: 'lembke-dopamine-nation',
    category: 'psychology',
    title: {
      arabic: 'أمة الدوبامين',
      english: 'Dopamine Nation',
    },
    author: {
      arabic: 'د. آنا ليمبكي (Dr. Anna Lembke)',
      english: 'Dr. Anna Lembke',
    },
    year: 2021,
    description: {
      arabic: 'طبيبة الإدمان في جامعة ستانفورد تشرح كيف يؤثر الدوبامين على سلوكنا والحاجة للصيام عن المحفزات',
      english: 'Stanford addiction specialist explains how dopamine affects our behavior and the need to fast from stimulation',
    },
    usedInDays: [17],
    keyInsight: {
      arabic: 'صيام الجوارح - الصيام عن الدوبامين يعيد توازن الدماغ والسعادة الحقيقية',
      english: 'Fasting of the limbs - dopamine detox rebalances the brain and restores genuine happiness',
    },
  },

  // Medical & Biological Sciences References
  {
    id: 'ohsumi-autophagy',
    category: 'medical',
    title: {
      arabic: 'الالتهام الذاتي (Autophagy)',
      english: 'Autophagy - Cellular Self-Eating',
    },
    author: {
      arabic: 'يوشينوري أوسومي (Yoshinori Ohsumi) - جائزة نوبل 2016',
      english: 'Yoshinori Ohsumi - Nobel Prize 2016',
    },
    year: 2016,
    description: {
      arabic: 'اكتشاف حائز على جائزة نوبل يثبت أن صيام الخلايا يخليها تأكل البروتينات التالفة وتقي من الشيخوخة والسرطان',
      english: 'Nobel Prize-winning discovery proving that cellular fasting causes cells to eat damaged proteins and prevent aging and cancer',
    },
    usedInDays: [16],
    keyInsight: {
      arabic: 'الصيام - ليس فقط روحي بل علمي: الخلايا تنظف نفسها وتتجدد',
      english: 'Fasting - not just spiritual but scientific: cells clean themselves and regenerate',
    },
  },
  {
    id: 'luks-helpers-high',
    category: 'medical',
    title: {
      arabic: 'نشوة المساعدة',
      english: 'Helper\'s High',
    },
    author: {
      arabic: 'آلان لوكس (Allan Luks)',
      english: 'Allan Luks',
    },
    year: 1991,
    description: {
      arabic: 'مصطلح طبي يشرح إفراز هرمونات (الدوبامين، الأوكسيتوسين، السيروتونين) عند مساعدة الآخرين',
      english: 'Medical term explaining the release of hormones (dopamine, oxytocin, serotonin) when helping others',
    },
    usedInDays: [19],
    keyInsight: {
      arabic: 'سيكولوجية العطاء - مساعدة الآخرين تفرز هرمونات السعادة الحقيقية',
      english: 'Psychology of giving - helping others releases genuine happiness hormones',
    },
  },
  {
    id: 'rizzolatti-mirror-neurons',
    category: 'medical',
    title: {
      arabic: 'الخلايا العصبية المرآتية',
      english: 'Mirror Neurons',
    },
    author: {
      arabic: 'جياكومو ريتزولاتي (Giacomo Rizzolatti)',
      english: 'Giacomo Rizzolatti',
    },
    year: 1992,
    description: {
      arabic: 'اكتشاف يفسر كيف تنتقل الابتسامة والعاطفة للآخرين - الدماغ يعكس ما يراه',
      english: 'Discovery explaining how smiles and emotions transfer to others - the brain mirrors what it sees',
    },
    usedInDays: [19],
    keyInsight: {
      arabic: 'التبسم صدقة - الابتسامة الحقيقية تنتقل عصبياً وتريح من أمامك',
      english: 'Smiling is charity - genuine smiles transfer neurologically and comfort those around you',
    },
  },
  {
    id: 'mammalian-dive-reflex',
    category: 'medical',
    title: {
      arabic: 'الجهاز العصبي الباراسمبثاوي',
      english: 'Parasympathetic Nervous System & Mammalian Dive Reflex',
    },
    author: {
      arabic: 'علم الفسيولوجيا العصبية',
      english: 'Neurophysiology',
    },
    description: {
      arabic: 'علاقة المية الباردة على الوجه والأطراف بتهدئة ضربات القلب والتوتر - استجابة بيولوجية قديمة',
      english: 'Relationship between cold water on face and limbs calming heart rate and stress - ancient biological response',
    },
    usedInDays: [8],
    keyInsight: {
      arabic: 'الوضوء - ليس فقط تطهير جسدي بل تهدئة عصبية وتنشيط الجهاز الباراسمبثاوي',
      english: 'Ablution - not just physical cleansing but nervous system calming and parasympathetic activation',
    },
  },

  // Sociology & Productivity References
  {
    id: 'harvard-adult-development',
    category: 'sociology',
    title: {
      arabic: 'دراسة هارفارد لتطور البالغين',
      english: 'Harvard Study of Adult Development',
    },
    author: {
      arabic: 'د. روبرت والدينجر (Dr. Robert Waldinger)',
      english: 'Dr. Robert Waldinger',
    },
    year: 1938,
    description: {
      arabic: 'أطول دراسة في تاريخ البشرية (80 سنة) تثبت أن جودة العلاقات هي السر الوحيد لطول العمر والسعادة',
      english: 'Longest study in human history (80 years) proving that relationship quality is the only secret to longevity and happiness',
    },
    usedInDays: [20],
    keyInsight: {
      arabic: 'صلة الرحم - العلاقات الحقيقية هي أساس السعادة والصحة والعمر الطويل',
      english: 'Kinship ties - genuine relationships are the foundation of happiness, health, and longevity',
    },
  },
  {
    id: 'chronobiology-circadian',
    category: 'sociology',
    title: {
      arabic: 'الساعة البيولوجية',
      english: 'Circadian Rhythm & Chronobiology',
    },
    author: {
      arabic: 'علم الكرونوبيولوجي (Chronobiology)',
      english: 'Chronobiology Science',
    },
    description: {
      arabic: 'ارتباط نشاط المخ بهرمون الكورتيزول الفجر والانهيار في نص اليوم - توقيت الصلاة يتزامن مع ذروة الطاقة',
      english: 'Connection between brain activity and cortisol at dawn and midday slump - prayer timing aligns with energy peaks',
    },
    usedInDays: [10],
    keyInsight: {
      arabic: 'مواقيت الصلاة - ليست عشوائية بل متزامنة مع ذروات الطاقة البيولوجية',
      english: 'Prayer times - not random but synchronized with biological energy peaks',
    },
  },
  {
    id: 'newport-deep-work',
    category: 'sociology',
    title: {
      arabic: 'العمل العميق',
      english: 'Deep Work',
    },
    author: {
      arabic: 'كال نيوبورت (Cal Newport)',
      english: 'Cal Newport',
    },
    year: 2016,
    description: {
      arabic: 'نظام الـ Time Blocking - تقسيم اليوم إلى كتل زمنية مركزة للعمل العميق والإنتاجية',
      english: 'Time Blocking system - dividing the day into focused time blocks for deep work and productivity',
    },
    usedInDays: [10],
    keyInsight: {
      arabic: 'ربط الصلاة بإدارة الوقت - الصلاة تقسم اليوم إلى كتل زمنية طبيعية للتركيز والإنتاجية',
      english: 'Linking prayer to time management - prayer naturally divides the day into focused time blocks',
    },
  },
];

export const sourcesByCategory = {
  islamic: catalogSources.filter((s) => s.category === 'islamic'),
  psychology: catalogSources.filter((s) => s.category === 'psychology'),
  medical: catalogSources.filter((s) => s.category === 'medical'),
  sociology: catalogSources.filter((s) => s.category === 'sociology'),
};

export const getCategoryLabel = (category: string, language: 'ar' | 'en'): string => {
  const labels = {
    islamic: { ar: 'المصادر الدينية والتراثية', en: 'Islamic References' },
    psychology: { ar: 'المصادر النفسية والسلوكية', en: 'Psychology & Behavioral Science' },
    medical: { ar: 'المصادر الطبية والبيولوجية', en: 'Medical & Biological Sciences' },
    sociology: { ar: 'المصادر الاجتماعية وإدارة الوقت', en: 'Sociology & Productivity' },
  };
  return labels[category as keyof typeof labels]?.[language === 'ar' ? 'ar' : 'en'] || category;
};

export const getCategoryIcon = (category: string): string => {
  const icons = {
    islamic: '📖',
    psychology: '🧠',
    medical: '⚕️',
    sociology: '👥',
  };
  return icons[category as keyof typeof icons] || '📚';
};
