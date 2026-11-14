import type { GuidePost } from "@/lib/guides";

export const guide: GuidePost = {
  slug: "macro-calculator",
  keyword: "macro calculator",
  title: "Macro Calculator: How to Split Your Calories Into Protein, Carbs and Fat",
  metaTitle: "Macro Calculator Guide: Set Protein, Carbs and Fat",
  metaDescription: "Learn how a macro calculator splits calories into protein, carbs and fat, with clear worked examples for fat loss, maintenance and muscle gain goals today.",
  excerpt: "Calories decide whether your weight moves. Macros decide what that change looks like. Here is how to set protein, carbs and fat with real numbers.",
  category: "Health",
  toolSlug: "macro-calculator",
  updatedAt: "2026-11-14",
  intro: [
    "Two people can eat exactly 2,000 calories a day and get very different results. One loses fat and keeps her strength in the gym. The other feels hungry all day, loses muscle along with fat, and gives up by week three. The total was the same. The split was not. That split, how many of your calories come from protein, carbohydrate and fat, is what a macro calculator works out, and it is often the missing piece for people who already have a calorie target but no plan for hitting it well.",
    "Start with your own numbers in the free [macro calculator](/calculators/macro-calculator), then use this guide to understand and adjust what it gives you. A good macro target does three jobs at once: it protects muscle while you diet, it leaves you enough carbohydrate to train and think clearly, and it includes enough fat for hormones, joints and meals that actually taste like food. None of that happens by accident if you just chase a calorie number and let the macros fall where they may.",
    "Below you will find the full method in the order a coach would use it: calories first, protein second, fat third, and carbohydrate with whatever is left. There are two complete worked examples, one for fat loss and one for muscle gain, plus the adjustments to make when progress stalls. This is general information only. Macro estimates are starting points, they vary from person to person, and a registered dietitian can help you set a personal target if you have a medical condition, a history of disordered eating, or needs tied to pregnancy, diabetes or kidney disease.",
  ],
  keyPoints: [
    "Set calories first from your TDEE, then split them. Macros without a calorie target are just percentages of nothing.",
    "Protein comes first: about 1.6 to 2.2 grams per kilogram of body weight daily covers most active people and dieters.",
    "Fat usually lands at 0.6 to 1.0 grams per kilogram, or roughly 20 to 35 percent of calories for most people.",
    "Carbohydrate fills the calories that remain after protein and fat, at 4 calories per gram like protein. Fat has 9 per gram.",
    "Judge a macro split after two to three weeks of honest tracking, then adjust by small steps, not weekly overhauls.",
  ],
  sections: [
    {
      heading: "What macros are, and why calories alone are not enough",
      paragraphs: [
        "Macro is short for macronutrient, the three nutrients you eat in large amounts. Protein builds and repairs muscle, skin, enzymes and immune tissue, at 4 calories per gram. Carbohydrate is the main fuel for hard training and daily activity, also at 4 calories per gram. Fat supports hormone production, helps you absorb vitamins A, D, E and K, and provides 9 calories per gram, which is why fatty foods add up fast.",
        "Calories still rule weight change. Eat above your total daily energy expenditure and you gain weight, eat below it and you lose weight, no matter how clean the split looks on paper. Macros decide the quality of that change. In a deficit, higher protein helps you keep lean muscle, so more of the weight you lose comes from fat. Enough carbohydrate keeps training performance up, and enough fat keeps you full and keeps a diet livable. Think of it like a paycheck: the calorie target is the size of the paycheck, and the macro split is the budget. That is why the [TDEE calculator guide](/guides/tdee-calculator) and this guide work as a pair.",
      ],
    },
    {
      heading: "Step one: set your calorie target from TDEE",
      paragraphs: [
        "Every macro calculation starts with calories, and every calorie estimate starts with your basal metabolic rate, the energy you burn at complete rest. CalcVerse uses the Mifflin St Jeor equation. For men it is 10 times weight in kilograms, plus 6.25 times height in centimeters, minus 5 times age, plus 5. For women it is the same first three terms, minus 161. That gives you BMR. Multiply BMR by an activity factor and you get TDEE, your maintenance calories.",
        "The activity multipliers are 1.2 for sedentary, 1.375 for lightly active, 1.55 for moderately active, 1.725 for very active and 1.9 for athlete level training. Pick the level that describes your normal week, including your job and daily steps, not your best week. A desk worker who lifts three evenings a week is usually lightly to moderately active, and choosing too high a multiplier is the most common reason a plan starts 400 calories too generous. Our [TDEE guide](/guides/tdee-calculator) has the full method. Once you have maintenance, set the goal: for fat loss subtract about 300 to 500 calories a day, for muscle gain add about 200 to 300, and for maintenance stay close to TDEE.",
      ],
      table: {
        caption: "From BMR to a calorie target",
        headers: ["Activity level", "Multiplier", "Typical week"],
        rows: [
          ["Sedentary", "1.2", "Desk job, under 5,000 steps a day"],
          ["Lightly active", "1.375", "Light training 1 to 3 days a week"],
          ["Moderately active", "1.55", "Training 3 to 5 days a week"],
          ["Very active", "1.725", "Hard training 6 to 7 days a week, physical work"],
          ["Athlete level", "1.9", "Twice daily training or heavy labor"],
        ],
      },
    },
    {
      heading: "Step two: protein first, fat second, carbs fill the rest",
      paragraphs: [
        "Protein is set first because it has the clearest target and the biggest effect on results. The minimum recommended intake is 0.8 grams per kilogram per day, but that minimum prevents deficiency in sedentary people, not support for training or dieting. A practical target is 1.6 to 2.2 grams per kilogram per day, with the top end suiting lean dieters. Older adults often benefit from the upper half of that range too, since muscle becomes harder to keep with age.",
        "Fat comes next, at 0.6 to 1.0 grams per kilogram per day, or about 20 to 35 percent of total calories. Going far below that can leave meals unsatisfying and may interfere with hormone production. Going far above it costs 9 calories per gram, usually taken from carbohydrate your training then misses. Carbohydrate takes whatever calories remain, by design: it is the flexible fuel tank, expanding in a muscle gain phase and shrinking in a fat loss phase. To finish the math, multiply protein grams by 4 and fat grams by 9, subtract both from your target, and divide what is left by 4 to get carb grams. Aim for roughly 25 to 38 grams of fiber a day alongside. Our [protein calculator guide](/guides/protein-calculator) goes deeper on protein alone.",
      ],
      steps: [
        "Find your maintenance calories with Mifflin St Jeor and an honest activity multiplier, then adjust for your goal.",
        "Set protein at 1.6 to 2.2 grams per kilogram. Multiply by 4 to get protein calories.",
        "Set fat at 0.6 to 1.0 grams per kilogram, or 20 to 35 percent of calories. Multiply by 9 for fat calories.",
        "Subtract protein and fat calories from your target. Divide the remainder by 4 to get carbohydrate grams.",
        "Round each number to something you can hit, within about 10 grams, and test it for two to three weeks.",
      ],
    },
    {
      heading: "Worked example one: fat loss for a 180 lb office worker",
      paragraphs: [
        "Meet Daniel, 34 years old, 180 pounds (about 82 kilograms), 5 feet 10 inches tall, working at a desk and lifting three evenings a week. His Mifflin St Jeor BMR is 10 times 82, plus 6.25 times 178 centimeters, minus 5 times 34, plus 5, about 1,768 calories. He walks around 7,000 steps a day, so moderately active at 1.55 is fair. His TDEE is about 2,740 calories. For steady fat loss he subtracts 450, giving a target of roughly 2,300 calories a day.",
        "Protein comes first. Daniel is dieting and lifting, so he uses 2.0 grams per kilogram: 82 times 2.0 is 164 grams, rounded to 165 grams, worth 660 calories. Fat comes next at about 0.8 grams per kilogram, 65 grams, worth 585 calories. Together they use 1,245 calories. That leaves 1,055 calories for carbohydrate, divided by 4 to give about 264 grams. His final split is 2,300 calories with 165 grams protein, 65 grams fat and 264 grams carbs. On a plate, that might be eggs and Greek yogurt with oats at breakfast, a chicken and rice bowl at lunch, a banana and a protein shake before training, and lean beef, potatoes and salad at dinner. A macro split only works if ordinary food you already like can fill it.",
      ],
    },
    {
      heading: "Worked example two: muscle gain for a 145 lb trainee",
      paragraphs: [
        "Now meet Maya, 27 years old, 145 pounds (about 66 kilograms), 5 feet 5 inches tall, training four days a week. Her BMR by Mifflin St Jeor is 10 times 66, plus 6.25 times 165, minus 5 times 27, minus 161, about 1,395 calories. At a moderately active multiplier of 1.55 her TDEE is roughly 2,163 calories. She wants to gain muscle slowly, so she adds 250 calories for a target of about 2,400 calories a day.",
        "For protein, 1.8 grams per kilogram is plenty in a surplus: 66 times 1.8 is about 119 grams, rounded to 120 grams, worth 480 calories. Maya sets fat a little higher at 0.9 grams per kilogram, about 60 grams, worth 540 calories. Protein and fat together use 1,020 calories, leaving 1,380 for carbohydrate, which is 345 grams. Her split is 2,400 calories with 120 grams protein, 60 grams fat and 345 grams carbs. Notice that Daniel, dieting at a heavier body weight, eats more protein than Maya does while gaining. In a deficit your body is more tempted to burn muscle for fuel, so protein goes up. In a surplus, moderate protein does the job, while the extra carbohydrate fuels hard sessions. If you track lifts as well as food, our [one rep max guide](/guides/one-rep-max-calculator) shows how to judge whether the surplus is turning into strength.",
      ],
    },
    {
      heading: "Popular macro splits, and how to choose between them",
      paragraphs: [
        "Ready made percentage splits are a decent starting shortcut. A balanced 40 percent carbohydrate, 30 percent protein, 30 percent fat split suits many general fitness goals. A high protein split for dieting might run 35 to 40 percent protein. A lower carbohydrate approach might put fat at 35 to 40 percent, which some people find easier for appetite control. Endurance athletes often flip the pattern, with carbohydrate at 50 to 60 percent for high training volumes.",
        "Percentages have one weakness: they ignore body weight. Thirty percent protein at 1,600 calories is 120 grams, which may be low for a 200 pound lifter, while the same percentage at 3,200 calories is 240 grams, more than almost anyone needs. That is why this guide sets protein and fat in grams per kilogram first and lets percentages fall out at the end. Use a preset split if it lands your protein in the right gram range. If it does not, trust the grams, not the preset. Adherence over three months beats precision over three days: pick the split you can picture yourself eating on a normal Wednesday.",
      ],
      table: {
        caption: "Common macro splits compared at 2,400 calories a day",
        headers: ["Approach", "Protein", "Carbs", "Fat", "Best fit"],
        rows: [
          ["Balanced", "180 g (30%)", "240 g (40%)", "80 g (30%)", "General fitness"],
          ["High protein dieting", "220 g (37%)", "205 g (34%)", "75 g (28%)", "Fat loss while lifting"],
          ["Lower carb, higher fat", "180 g (30%)", "165 g (28%)", "113 g (42%)", "Appetite control"],
          ["Endurance focused", "150 g (25%)", "330 g (55%)", "53 g (20%)", "Running, cycling, high volume"],
        ],
      },
    },
    {
      heading: "Adjusting your macros when progress stalls",
      paragraphs: [
        "No calculator knows your exact metabolism or true activity. Treat the first split as a two to three week experiment. Weigh yourself three to four mornings a week, take the weekly average, and compare averages, not single days. Daily weight jumps of two or three pounds from water, salt and food in transit are normal and mean nothing. If your weekly average moves at the pace you wanted, change nothing.",
        "If fat loss stalls for two full weeks with honest tracking, first check the quiet leaks: cooking oils, sauces, weekend meals, liquid calories and untracked snacks can add 300 calories a day without a single binge. If tracking is truly tight, trim 100 to 200 calories, mostly from carbohydrate or fat while protein stays put, and test again for two weeks. If weight drops faster than about one percent of body weight per week, add 100 to 200 calories back. Muscle gain works in reverse: no gain after three weeks means add about 150 calories, mostly carbohydrate. Training and rest days can use the same targets. Revisit the [macro calculator](/calculators/macro-calculator) whenever your weight changes by about 10 pounds.",
      ],
    },
    {
      heading: "Common mistakes that quietly break a good split",
      paragraphs: [
        "The first mistake is setting protein from a percentage and ending up far too low. The second is dieting on very low fat, then wondering why hunger is relentless and food tastes like cardboard. The third is counting net carbs on some foods and total carbs on others, mixing systems until the numbers mean nothing. Pick total carbohydrate, the method this calculator uses. The fourth is forgetting drinks: a sweetened coffee, juice and two glasses of wine can total 500 calories with almost no protein.",
        "A fifth mistake is treating the target as a pass or fail test each day. A better standard is landing within about 10 grams of protein and 100 calories of your target on most days, and hitting protein even on messy days. Protein is the priority macro. Fat and carbohydrate can trade places within your calorie total with little effect, which gives you flexibility at social meals. Finally, remember that these numbers are general information, not personal medical advice. Conditions such as diabetes, kidney disease or a history of eating disorders change what a sensible target looks like, so talk to your doctor or a registered dietitian if any of that applies to you. For everyone else, browse the [guides hub](/guides) for companion topics, run your numbers, and let your own trend make the final call.",
      ],
      bullets: [
        "Hit protein first every day, then fit fat and carbs around it.",
        "Weigh food raw where the label expects raw weights, and count oils and sauces.",
        "Use weekly average weight, never a single morning, to judge the split.",
        "Change one variable at a time, by 100 to 200 calories, and give it two weeks.",
        "Recalculate after every 10 pounds of weight change.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is a good macro split for losing fat?",
      a: "For most lifters, protein at about 2.0 to 2.2 grams per kilogram of body weight, fat at 20 to 30 percent of calories, and carbohydrate filling the rest works well in a deficit of 300 to 500 calories. At 2,000 calories that often looks like 160 grams protein, 60 grams fat and about 205 grams carbs. The exact split matters less than hitting the calorie and protein targets consistently.",
    },
    {
      q: "Should my macros change on rest days?",
      a: "For most people, no. Keeping the same protein, fat and carbohydrate targets every day is simpler and works just as well, because your body recovers and rebuilds on rest days too. If you prefer, you can shift a little carbohydrate from rest days to training days while keeping weekly totals the same, but treat that as a comfort tweak, not a requirement.",
    },
    {
      q: "How accurate is a macro calculator?",
      a: "It is an estimate built on the Mifflin St Jeor equation and standard activity multipliers, and individual results can vary by roughly 10 percent either way. That is normal for every calculator, not a flaw in this one. Use the result as a starting point, track your weight trend for two to three weeks, and adjust by 100 to 200 calories based on what actually happens.",
    },
    {
      q: "Do I need to hit my macros exactly every day?",
      a: "No. Aim to land within about 10 grams of your protein target and close to your calorie total on most days, and judge the week as a whole. Fat and carbohydrate can swap for each other inside the calorie budget with little effect. Perfection is not required and chasing it is a common reason people quit tracking altogether.",
    },
    {
      q: "Is a low carb or a low fat split better?",
      a: "Research comparing the two at equal calories and protein generally finds similar fat loss. The better split is the one you can stick to: people who feel hungry on low fat do well keeping fat moderate and trimming carbs, while people who love bread, rice and fruit do better the other way. Protein and total calories do most of the work either way.",
    },
    {
      q: "How much protein do I really need in my macro split?",
      a: "Active people and dieters generally do well at 1.6 to 2.2 grams per kilogram of body weight per day. A 70 kilogram person, about 154 pounds, lands between 112 and 154 grams. Sedentary people can use the lower end or slightly below, while lean dieters training hard usually benefit from the top end. More than that is not harmful for healthy people, but it rarely adds benefit.",
    },
  ],
  relatedSlugs: ["tdee-calculator", "protein-calculator", "one-rep-max-calculator"],
};
