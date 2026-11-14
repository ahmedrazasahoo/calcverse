import type { GuidePost } from "@/lib/guides";

export const guide: GuidePost = {
  slug: "pace-calculator",
  keyword: "pace calculator",
  title: "Pace Calculator: Find Your Running Pace, Race Time and Splits",
  metaTitle: "Pace Calculator Guide: Running Pace and Race Times",
  metaDescription: "Learn how to find your running pace per mile and per kilometer, predict race times, plan splits, and set training paces with clear worked examples today.",
  excerpt: "Your running pace explained with simple formulas, real race examples, split tables and training paces, so you can stop guessing and start planning your next run properly.",
  category: "Health",
  toolSlug: "pace-calculator",
  updatedAt: "2026-11-14",
  intro: [
    "You finish a training run, look at your watch, and it says 42 minutes for 4.5 miles. Is that fast? Slow? On target for the 10K you signed up for next month? Most runners have asked some version of that question, and the honest answer is that a total time on its own tells you very little. Pace, the time it takes you to cover one mile or one kilometer, is the number that makes a run make sense, because it lets you compare a short weekday jog with a long Sunday run and with the race day goal sitting in the back of your mind.",
    "The quickest way to get that number is to drop your time and distance into the free [pace calculator](/calculators/pace-calculator) and read off your pace per mile and per kilometer side by side. The arithmetic takes seconds, but the real skill is knowing what to do with the result: how to turn a recent 5K into a realistic marathon goal, how to split a race so you do not burn out at mile 10, and how fast your easy days should actually feel. That is what this guide covers, with worked examples you can check by hand.",
    "Everything here is general training information, not medical advice. Pace targets are estimates, and your own response to training varies with health, sleep, weather and history. If you are returning from injury, managing a medical condition, or building a serious race plan, a qualified coach or clinician who knows your situation can help you set targets that fit you personally.",
  ],
  keyPoints: [
    "Pace is time divided by distance, usually shown as minutes and seconds per mile or per kilometer.",
    "A 30 minute 5K works out to 6:00 per kilometer and about 9:39 per mile. Same run, two different rulers.",
    "Predict a longer race time from a recent shorter race with the Riegel formula, then sanity check it against your training.",
    "Even or slightly negative splits beat going out fast. Most blow ups start in the first third of a race.",
    "Easy runs should feel genuinely easy. Most runners run their easy days too fast and their hard days too slow.",
    "Convert treadmill speed to pace with a simple rule: pace per mile is 60 divided by speed in miles per hour.",
  ],
  sections: [
    {
      heading: "What pace is, and why runners think in pace instead of speed",
      paragraphs: [
        "Pace answers a very practical question: at the rate I am moving right now, how long will each mile or kilometer take me? If you run a steady 9:00 pace, every mile costs you nine minutes. Run for an hour at that pace and you will cover about 6.67 miles. Speed flips the question around and asks how much ground you cover in an hour, which is why cars and treadmills use miles per hour. Runners prefer pace because races are planned in time. You do not aim to cover 26.2 miles at 7.5 miles per hour. You aim to hold 8:00 per mile and finish a marathon in about 3 hours 30 minutes.",
        "The distinction sounds small but it changes how you feel a run. A difference between 9:00 and 9:30 per mile sounds trivial, yet over a half marathon that half minute per mile adds up to more than six minutes of finish time. Pace also scales cleanly across distances. Your 5K pace, 10K pace, half marathon pace and marathon pace form a ladder, each rung a little slower than the one before, and that ladder is the backbone of almost every sensible training plan. Learn your current rungs and you can predict, plan and pace almost any race.",
        "There is one more reason pace matters: effort is not linear in speed. Going from a 12:00 mile to an 11:00 mile is a gentle nudge for a fit runner. Going from 6:00 to 5:00 per mile is an enormous jump in effort, even though both changes are one minute. Pace makes that visible in a way speed hides, because the minutes and seconds on the clock are what your legs actually experience, split after split, all the way to the finish line.",
      ],
    },
    {
      heading: "How to calculate pace: the formula and two worked examples",
      paragraphs: [
        "The formula could not be simpler. Pace equals total time divided by total distance. The only fiddly part is handling minutes and seconds cleanly, because time is not decimal. The reliable method is to convert your finish time into seconds, divide by the distance, then convert the answer back into minutes and seconds. Take a runner named Daniel who finishes a 10K in 55 minutes. That is 3,300 seconds. Divide by 10 kilometers and you get 330 seconds per kilometer, which is 5:30 per kilometer. Clean, checkable, and exactly what the calculator does behind the screen.",
        "Now try a mile based example. Sarah runs 5K in 30 minutes on a Saturday parkrun course measured in kilometers, but her training plan is written in miles. Her pace per kilometer is 1,800 seconds divided by 5, which is 360 seconds, or 6:00 per kilometer. To express the same effort per mile, divide 1,800 seconds by 3.107 miles, the mile equivalent of 5 kilometers. That gives about 579 seconds per mile, or 9:39 per mile. Nothing about her run changed. Only the ruler changed, which is why mixing units mid race causes so much confusion.",
        "A second check keeps you honest. Multiply your pace back by the distance and you should land on your finish time. Sarah at 9:39 per mile for 3.107 miles gives roughly 30 minutes, so the conversion holds. If your back calculation is off by minutes, you probably divided by the wrong distance or dropped a minute somewhere. This is also where a tool earns its keep: run the same numbers through the [pace calculator](/calculators/pace-calculator) once, compare it with your hand calculation, and after that you can trust your mental math on the run itself.",
      ],
      steps: [
        "Convert your total time into seconds. For 55 minutes, that is 55 times 60, or 3,300 seconds.",
        "Divide the seconds by your distance in the unit you want, kilometers or miles.",
        "Turn the result back into minutes and seconds. 330 seconds is 5 full minutes with 30 seconds left over, so 5:30.",
        "Check your work by multiplying pace by distance. You should get your original finish time, give or take a few seconds of rounding.",
        "Write the pace down next to the distance and date. A single pace means little; a series of them shows your fitness moving.",
      ],
    },
    {
      heading: "Converting between minutes per mile and minutes per kilometer",
      paragraphs: [
        "A mile is about 1.609 kilometers, and that single fact drives every pace conversion. To turn a per mile pace into a per kilometer pace, divide by 1.609. To go the other way, multiply by 1.609. A 9:00 mile, which is 540 seconds, becomes 540 divided by 1.609, about 336 seconds, or 5:36 per kilometer. A 5:00 kilometer becomes 5 times 1.609, about 8:03 per mile. Runners who race in Europe after training in the United States feel this difference at every course marker, because the splits arrive sooner and the numbers look faster even at identical effort.",
        "The trap is treating the two paces as interchangeable. A runner who targets 8:00 per mile but follows kilometer splits of 8:00 is actually running far slower than planned and will miss a goal by a wide margin. The opposite error is worse: chasing 5:00 per mile because your plan said 5:00 per kilometer will put you on the ground well before halfway. Pick one unit for race day, write your split targets in that unit only, and tape them to your wrist or set your watch to match. Most watches will display either unit, so set it the night before, not on the start line.",
        "It also helps to learn a few anchor paces in both units so conversions become instinct. A 10:00 mile is about 6:13 per kilometer. An 8:00 mile is about 4:58 per kilometer. A 7:00 mile is about 4:21 per kilometer, and a 6:00 mile is about 3:44 per kilometer. Notice how the kilometer numbers always look quicker. That is an illusion of the shorter unit, not extra fitness. The table below collects the anchors runners ask about most often, including common finish times for the classic race distances.",
      ],
      table: {
        caption: "Common race times with pace per mile and per kilometer",
        headers: ["Race and finish time", "Pace per mile", "Pace per kilometer"],
        rows: [
          ["5K in 25:00", "8:03", "5:00"],
          ["5K in 30:00", "9:39", "6:00"],
          ["10K in 50:00", "8:03", "5:00"],
          ["10K in 60:00", "9:39", "6:00"],
          ["Half marathon in 2:00:00", "9:09", "5:41"],
          ["Half marathon in 1:45:00", "8:01", "4:59"],
          ["Marathon in 4:00:00", "9:09", "5:41"],
          ["Marathon in 3:30:00", "8:01", "4:59"],
          ["Marathon in 3:00:00", "6:52", "4:16"],
        ],
      },
    },
    {
      heading: "Predicting a race time from a recent result",
      paragraphs: [
        "Once you have one honest recent race result, you can estimate what you should be capable of at other distances. Coaches often use the Riegel formula for this: your predicted time at the new distance equals your known time multiplied by the ratio of the distances raised to the power of 1.06. In symbols, T2 equals T1 times (D2 divided by D1) to the power 1.06. The exponent above 1 is the whole point. It builds in the reality that you slow down as distance grows, so doubling the distance a little more than doubles the time.",
        "Work it through with a real case. Marcus runs 10K in 50 minutes and wants a half marathon target. The distance ratio is 21.0975 divided by 10, about 2.11. Raise 2.11 to the power 1.06 and you get roughly 2.206. Multiply 50 minutes by 2.206 and the prediction is about 110 minutes, or 1 hour 50 minutes for the half marathon, at a pace near 5:13 per kilometer. Push the same 10K result out to a full marathon and the formula gives roughly 3 hours 50 minutes. Those numbers assume Marcus trains properly for the longer distance, with long runs that actually prepare him for it. A prediction is a ceiling set by current fitness, not a promise the distance will hand over for free.",
        "Use predictions as a range, not a single magic number. A prediction from a race run last weekend on a flat course means more than one from eight months ago. Heat, hills, wind and a bad night of sleep can each cost several percent. Smart runners set three targets: a stretch goal near the prediction, a realistic goal a few minutes slower, and a floor they will accept on a rough day. That way race day becomes an execution problem instead of an all or nothing bet. Fueling and recovery shape whether you can hold the pace, too, and our guide to the [TDEE calculator](/guides/tdee-calculator) shows how to estimate the daily energy a heavy training block actually burns.",
      ],
    },
    {
      heading: "Splits: how to spread your pace across a race",
      paragraphs: [
        "A split is simply your time for one segment of a race, usually one mile or one kilometer. How you distribute those splits decides how the last third feels. Three basic strategies exist. Even splits mean holding the same pace throughout, which suits flat courses and experienced runners. Negative splits mean running the second half slightly faster than the first, the approach behind most world records and most satisfying personal bests. Positive splits mean starting faster and slowing down, which is sometimes forced by a downhill start or a tactical race, but as a deliberate plan it usually ends badly.",
        "Here is what a negative split looks like in practice. A runner targeting a 1 hour 50 minute half marathon needs an average of about 5:13 per kilometer. Instead of locking onto 5:13 from the gun, she runs the first 5 kilometers near 5:20 per kilometer, settles at 5:13 through the middle, and lets the last 5 kilometers come down toward 5:05 if she still feels strong. Her average lands on target, but she never had to fight the early miles, and she passes fading runners late in the race instead of becoming one of them. The psychological lift of finishing fast is worth as much as the seconds.",
        "The most common pacing mistake is banking time: going out hard because the legs feel fresh and the crowd is loud, on the theory that early speed is money in the bank. It is not a bank, it is a loan with steep interest. Running the first mile of a marathon 30 seconds too fast can cost several minutes at the end, because the glycogen you burned and the muscle damage you took cannot be refunded. Start a touch slower than goal pace, let the first split or two look almost too easy, and trust the plan. If you want a full split chart for your own goal time, generate your average pace first, then write each checkpoint down before race morning.",
      ],
      bullets: [
        "First 10 percent of the race: run 5 to 10 seconds per mile slower than goal pace and stay relaxed.",
        "Middle of the race: settle exactly on goal pace and focus on rhythm, breathing and fueling on schedule.",
        "Final 25 percent: hold pace while effort rises, then push only when you are sure you can reach the finish.",
        "Hilly courses: pace by effort, not by the clock. Give time away uphill and take some back downhill without sprinting.",
        "Check splits at set markers only. Staring at your watch every 30 seconds wastes focus and invites panic adjustments.",
      ],
    },
    {
      heading: "Training paces: easy, tempo, interval and long run",
      paragraphs: [
        "A single fitness level produces a whole family of training paces, and using the right one on the right day is what turns random running into training. Easy pace is the foundation, usually 60 to 90 seconds per mile slower than your marathon pace, and it should feel conversational enough that you could speak in full sentences. Most weekly mileage belongs here. Tempo pace, sometimes called threshold pace, sits near the effort you could hold for about an hour, roughly your 10K to half marathon pace for many runners. It feels comfortably hard: you can speak a few words at a time, but not chat. Interval pace is faster still, close to 5K pace or a touch quicker, run in short repeats with recovery jogs between them.",
        "Consider a runner whose recent 10K is 50 minutes, a 5:00 per kilometer effort. Her easy runs might sit around 6:00 to 6:30 per kilometer, her tempo work near 5:15 to 5:25 per kilometer, and her 1 kilometer intervals near 4:50 per kilometer with easy jogging between reps. Notice that none of her training except the intervals touches her 5K race pace, and her easy pace is a full minute per kilometer slower than her tempo pace. That spread is normal and healthy. Runners who squeeze every session into a narrow band around moderately hard tend to plateau, because no day is easy enough to recover from and no day is hard enough to force adaptation.",
        "Strength work supports the same goal from a different angle, since stronger legs hold form when pace gets uncomfortable late in a race. Our guide to the [one rep max calculator](/guides/one-rep-max-calculator) explains how to estimate your lifting capacity safely if you add gym sessions to a running plan. Whatever mix you choose, change one thing at a time and give it two or three weeks. Fitness shows up in your paces gradually: the same route at the same heart rate starts coming back 10 or 15 seconds per mile faster, and that quiet trend is more trustworthy than any single heroic workout.",
      ],
      subsections: [
        {
          heading: "Treadmill pace: converting speed settings to real pace",
          paragraphs: [
            "Treadmills speak in speed, not pace, so a quick conversion keeps indoor sessions aligned with your outdoor plan. Pace per mile is 60 divided by speed in miles per hour. At 6 miles per hour you are running exactly 10:00 per mile. At 7 miles per hour the pace is about 8:34 per mile, at 8 miles per hour it is 7:30, and at 9 miles per hour it is 6:40. For kilometers, divide 60 by kilometers per hour instead: 10 kilometers per hour is 6:00 per kilometer, and 12 kilometers per hour is 5:00 per kilometer. Many runners add a small incline, often around 1 percent, to better mimic the feel of outdoor running, though the right setting depends on the machine and your goals.",
          ],
        },
      ],
    },
    {
      heading: "Common pace mistakes, and how to fix them",
      paragraphs: [
        "The first mistake is averaging a run that was never even. A 4 mile run with a fast downhill mile and a slow uphill mile can average out to your goal pace while training almost none of it. Look at the individual splits, not just the average, before you judge a session. The second mistake is trusting a GPS trace in difficult conditions. Tall buildings, dense tree cover, tunnels and sharp switchbacks all bend the signal, and your watch may show a pace that jumps 30 seconds per mile from one glance to the next. On those days, run by time and effort, and judge the workout by its total distance and duration afterward.",
        "The third mistake is chasing pace on easy days because a slower number feels like failure. Easy pace exists to build aerobic base and absorb hard training, and it drifts with heat, fatigue and life stress. A runner training through a hot July will often see easy pace slow by 20 to 40 seconds per mile at the same effort, and that is the body working correctly, not fitness leaking away. Recovery is part of the system: our guide to the [sleep calculator](/guides/sleep-calculator) walks through timing your sleep in full cycles, which matters more to next day pace than most runners admit. The fourth mistake is copying someone else target pace from social media. Their ladder of paces belongs to their fitness, their course and their day. Yours is the only one that counts.",
        "So build the habit this week. Take your most recent honest race or time trial, run it through the [pace calculator](/calculators/pace-calculator), and write down your pace per mile and per kilometer, plus predicted times for your next goal distance. Set your training paces from those numbers, plan your splits before race day, and review the actual splits afterward without emotion. Do that for a few training cycles and pace stops being a confusing number on a watch. It becomes the language your whole training plan is written in. For more tools and explainers like this one, browse the full [guides hub](/guides) and pick the next number you want to understand properly.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I calculate my pace per mile?",
      a: "Convert your total time to seconds, divide by the distance in miles, then convert back to minutes and seconds. A 4 mile run in 36 minutes is 2,160 seconds divided by 4, which is 540 seconds, or a 9:00 pace per mile. The same method works for kilometers if you divide by kilometers instead.",
    },
    {
      q: "What is a good pace for a beginner runner?",
      a: "There is no single good pace, because it depends on your fitness, age and health rather than a universal standard. Many new runners average somewhere between 10:00 and 13:00 per mile on easy runs, and walking breaks are a normal, effective part of building up. Judge progress against your own past paces at the same effort, not against other runners.",
    },
    {
      q: "What pace do I need for a sub 4 hour marathon?",
      a: "A 3 hour 59 minute marathon requires an average pace of about 9:09 per mile, or 5:41 per kilometer, held for the full 26.2 miles. In practice, plan to run the first miles a few seconds per mile slower than that and the closing miles right on it, so your average still lands under the barrier with a small cushion.",
    },
    {
      q: "How accurate are race time predictions from a 5K or 10K?",
      a: "Formulas like the Riegel model give a reasonable estimate when the test race was recent, run hard and raced on a similar course, and when you train specifically for the longer distance. Expect real results to land within a few percent of the prediction. Heat, hills, fueling problems and undertrained long runs push actual times slower, so treat the prediction as a target range.",
    },
    {
      q: "Should my training pace be the same as my race pace?",
      a: "No. Most training should be slower than race pace, with easy runs often 60 to 90 seconds per mile below marathon pace, plus smaller doses of tempo and interval work at or above race pace. That mix builds fitness without breaking you down. Running every day at race pace usually leads to stagnation or injury rather than faster racing.",
    },
    {
      q: "Why does my watch show a different pace from the calculator?",
      a: "Your watch estimates pace from GPS in real time, so buildings, trees and turns can make the live number jump around, while a calculator uses only total time and total distance. Small differences of a few seconds per mile are normal. If the gap is large, check that the watch recorded the right distance and that you entered the same distance and units into the calculator.",
    },
  ],
  relatedSlugs: ["tdee-calculator", "one-rep-max-calculator", "sleep-calculator"],
};
