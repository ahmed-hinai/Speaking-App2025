/***** PROMPTS — Units 1–8 (skip 7). Two prompts per level for rotation. *****/
const PROMPTS = {
  "1": { title: "Animals",
    targets: ["comparatives","contrasting ideas","signposting"],
    keywords: ["habitat","wildlife","species","predator","adapt","endangered"],
    prompts: {
      easy: [
        { text: "Compare two animals you know. Use one comparative and one contrast (e.g., however).",
          targets: ["comparatives","contrasting ideas"], minWords: 40 },
        { text: "Describe your favorite animal and give one example of how it survives.",
          targets: ["giving examples","signposting"], minWords: 40 }
      ],
      medium: [
        { text: "Explain how one animal is adapted to its environment. Use one signpost and one contrast.",
          targets: ["signposting","contrasting ideas"], minWords: 60 },
        { text: "Compare the habitats of two species and recommend one action to support each.",
          targets: ["comparatives","recommendations","signposting"], minWords: 60 }
      ],
      hard: [
        { text: "Evaluate two conservation strategies for an endangered species. Contrast them and make a recommendation.",
          targets: ["contrasting ideas","signposting","recommendations"], minWords: 80 },
        { text: "Argue which policy would most reduce habitat loss. Use cause & effect and signposting.",
          targets: ["cause & effect","signposting"], minWords: 80 }
      ]
    }
  },
  "2": { title: "The Environment",
    targets: ["cause & effect","giving examples","advantages & disadvantages"],
    keywords: ["pollution","recycling","renewable","emissions","waste","climate"],
    prompts: {
      easy: [
        { text: "Give one cause and one effect of air pollution in your city. Include 'because' or 'because of'.",
          targets: ["cause & effect"], minWords: 40 },
        { text: "Describe one simple way to reduce waste and give an example.",
          targets: ["giving examples","signposting"], minWords: 40 }
      ],
      medium: [
        { text: "Explain why recycling matters and discuss one advantage and one disadvantage.",
          targets: ["advantages & disadvantages","giving examples"], minWords: 60 },
        { text: "Compare two energy sources and say which is better for your area, using cause & effect.",
          targets: ["cause & effect","comparatives","recommendations"], minWords: 60 }
      ],
      hard: [
        { text: "Argue for a local policy to reduce emissions. Use at least two signposts and one contrast.",
          targets: ["signposting","contrasting ideas","cause & effect"], minWords: 80 },
        { text: "Evaluate the trade-offs of banning single-use plastics.",
          targets: ["advantages & disadvantages","contrasting ideas","signposting"], minWords: 80 }
      ]
    }
  },
  "3": { title: "Transport",
    targets: ["making suggestions","first conditional","comparatives","recommendations"],
    keywords: ["traffic","bus","metro","congestion","safety","cost"],
    prompts: {
      easy: [
        { text: "Make one suggestion to improve traffic near your school and explain why.",
          targets: ["making suggestions"], minWords: 40 },
        { text: "Compare two ways to travel to college and say which you prefer with a reason.",
          targets: ["comparatives","recommendations"], minWords: 40 }
      ],
      medium: [
        { text: "Use the first conditional to explain what will happen if your city adds more buses.",
          targets: ["first conditional","signposting"], minWords: 60 },
        { text: "Discuss safety vs. cost for public transport and make a recommendation.",
          targets: ["contrasting ideas","recommendations"], minWords: 60 }
      ],
      hard: [
        { text: "Evaluate whether your city should build a metro. Use at least two signposts and one conditional.",
          targets: ["signposting","first conditional","advantages & disadvantages"], minWords: 80 },
        { text: "Argue which option reduces congestion fastest: more buses or cycling lanes. Contrast and recommend.",
          targets: ["contrasting ideas","recommendations","comparatives"], minWords: 80 }
      ]
    }
  },
  "4": { title: "Customs & Traditions",
    targets: ["adverbs of frequency","dependent prepositions","signposting"],
    keywords: ["festival","family","tradition","celebrate","culture","meal"],
    prompts: {
      easy: [
        { text: "Describe a family custom. Use one adverb of frequency (e.g., usually, often).",
          targets: ["adverbs of frequency"], minWords: 40 },
        { text: "Explain why you are interested in a local festival. Include one dependent preposition.",
          targets: ["dependent prepositions"], minWords: 40 }
      ],
      medium: [
        { text: "Compare two holiday traditions and use one contrasting linker.",
          targets: ["contrasting ideas","adverbs of frequency"], minWords: 60 },
        { text: "Give one cause and effect related to a custom in your community.",
          targets: ["cause & effect","signposting"], minWords: 60 }
      ],
      hard: [
        { text: "Discuss how traditions change over time. Use at least two signposts and one dependent preposition.",
          targets: ["signposting","dependent prepositions","contrasting ideas"], minWords: 80 },
        { text: "Evaluate whether a specific tradition should be kept or changed. Argue your view with contrasts.",
          targets: ["contrasting ideas","signposting"], minWords: 80 }
      ]
    }
  },
  "5": { title: "Health & Fitness",
    targets: ["modals (advice/obligation)","giving examples","signposting"],
    keywords: ["exercise","diet","sleep","stress","hydration","routine"],
    prompts: {
      easy: [
        { text: "Give one piece of advice for staying healthy and an example.",
          targets: ["modals (advice/obligation)","giving examples"], minWords: 40 },
        { text: "Compare two forms of exercise and say which is better for beginners.",
          targets: ["comparatives","recommendations"], minWords: 40 }
      ],
      medium: [
        { text: "Explain how sleep affects fitness using cause & effect and one signpost word.",
          targets: ["cause & effect","signposting"], minWords: 60 },
        { text: "Recommend a weekly routine. Use at least two modals (should/must/have to).",
          targets: ["modals (advice/obligation)","signposting"], minWords: 60 }
      ],
      hard: [
        { text: "Evaluate two diet strategies and argue which is more sustainable. Include contrasts and examples.",
          targets: ["contrasting ideas","giving examples","signposting"], minWords: 80 },
        { text: "Propose a college wellness policy. Use modals for obligation and cause & effect.",
          targets: ["modals (advice/obligation)","cause & effect","signposting"], minWords: 80 }
      ]
    }
  },
  "6": { title: "Discovery & Invention",
    targets: ["signposting","giving examples","recommendations"],
    keywords: ["innovation","prototype","research","efficiency","technology","design"],
    prompts: {
      easy: [
        { text: "Describe a simple invention you like and give one example of how it helps people.",
          targets: ["giving examples"], minWords: 40 },
        { text: "Explain one problem a new app could solve and recommend one feature.",
          targets: ["recommendations","signposting"], minWords: 40 }
      ],
      medium: [
        { text: "Compare two technologies that solve the same problem and use one contrasting linker.",
          targets: ["contrasting ideas","comparatives"], minWords: 60 },
        { text: "Explain the cause and effect of adopting a new tool in class. Use signposting.",
          targets: ["cause & effect","signposting"], minWords: 60 }
      ],
      hard: [
        { text: "Argue which invention had the bigger impact in the last decade. Use two signposts and one example.",
          targets: ["signposting","giving examples","contrasting ideas"], minWords: 80 },
        { text: "Propose a research plan to test a prototype. Make recommendations and include one contrast.",
          targets: ["recommendations","contrasting ideas","signposting"], minWords: 80 }
      ]
    }
  },
