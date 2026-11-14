import type { GuidePost } from "@/lib/guides";

export const guide: GuidePost = {
  slug: "est-to-pst-converter",
  keyword: "est to pst converter",
  title: "EST to PST Converter: The 3 Hour Gap, Daylight Saving, and Every US Zone Between",
  metaTitle: "EST to PST Converter Guide: US Time Zones Explained",
  metaDescription: "Convert EST to PST with the fixed three hour gap, see how daylight saving changes the labels, and plan coast to coast calls with a full meeting hours table.",
  excerpt: "Why Eastern and Pacific time are always three hours apart, what changes when daylight saving starts, and how to schedule coast to coast without doing the math in your head.",
  category: "Everyday",
  toolSlug: "est-to-pst",
  updatedAt: "2026-11-14",
  intro: [
    "You are in New York, your client is in Los Angeles, and the invite just says Thursday at 2. Two what, though? If you guess wrong, one of you sits in an empty video call for an hour, or worse, sleeps through the meeting entirely. Coast to coast scheduling trips up more people than almost any other everyday calculation, mostly because the zone names keep changing with the seasons.",
    "Here is the reassuring part: the gap itself never changes. Eastern time is always three hours ahead of Pacific time, in January, in July, on every day of the year. What changes is only the label each zone uses. Use the free [EST to PST converter](/converters/est-to-pst) whenever you need an exact answer in seconds, then read on to understand the whole US time zone picture well enough that you rarely need to check at all.",
    "This guide walks through the fixed three hour gap, the daylight saving shifts that turn EST into EDT and PST into PDT, and the zones in between that matter when a meeting stretches from coast to coast. You will also find a meeting hours table you can keep open during planning, plus the mistakes that cause most missed calls, like trusting a calendar invite that quietly dropped its time zone.",
  ],
  keyPoints: [
    "Eastern time is always exactly three hours ahead of Pacific time. Subtract three hours to go from EST to PST, and add three hours to go the other way.",
    "In winter the pair is EST and PST. From March to November both zones spring forward and the pair becomes EDT and PDT, but the gap stays three hours.",
    "EST is five hours behind UTC and PST is eight hours behind UTC. During daylight saving, EDT is UTC minus 4 and PDT is UTC minus 7.",
    "The overlap of a 9 to 5 workday on both coasts is 12:00 PM to 5:00 PM Eastern, which is 9:00 AM to 2:00 PM Pacific.",
    "Arizona and Hawaii do not observe daylight saving, so their gap with the rest of the country changes twice a year even though yours does not.",
    "Always state the zone when you send a time. A bare 2 PM is an accident waiting to happen on any cross country invite.",
  ],
  sections: [
    {
      heading: "The three hour gap, and why it never changes",
      paragraphs: [
        "The continental United States is split into four main time zones, and each one sits exactly one hour behind the one to its east. Eastern is the furthest ahead, then Central is one hour behind Eastern, Mountain is two hours behind, and Pacific is three hours behind. So when it is 3:00 PM in New York, it is 2:00 PM in Chicago, 1:00 PM in Denver and 12:00 PM in Los Angeles. The country runs like a set of stairs, and each step down is one hour.",
        "That staircase is the whole trick behind an EST to PST conversion. Because Pacific sits three steps below Eastern, you subtract three hours, every time, with no exceptions for the date, the day of the week or the season. If your standup is at 10:30 AM Eastern, your California teammates join at 7:30 AM Pacific. If a product launch goes live at 9:00 AM Pacific, East Coast users see it at noon. The rule fits in one sentence, and it is worth memorizing, because it covers the conversion people search for more than any other in the US.",
        "Going the other direction works the same way in reverse. Add three hours to a Pacific time to get the Eastern equivalent. A support shift that ends at 6:00 PM in Seattle ends at 9:00 PM for the manager reviewing it in Boston. If you need to flip a whole list of times rather than one, the [PST to EST converter](/converters/pst-to-est) handles the reverse direction just as quickly. And if your meeting only crosses one step of the staircase, the [EST to CST converter](/converters/est-to-cst) covers the single hour jump between Eastern and Central.",
        "The only moment the subtraction needs a second of care is around midnight. If it is 1:00 AM Tuesday in Miami, subtracting three hours lands at 10:00 PM in San Francisco, but that is 10:00 PM on Monday, the previous day. The hour math is identical, yet the date changes, and forgetting that is how people end up booked onto the wrong day of a red eye flight. Any time a conversion crosses midnight, write the day down next to the time, not just the hour.",
      ],
    },
    {
      heading: "EST or EDT, PST or PDT: the daylight saving shift",
      paragraphs: [
        "The letters after the zone name are where most confusion starts. EST stands for Eastern Standard Time and PST stands for Pacific Standard Time. Those are the winter versions of the zones, used from early November to mid March. EST runs five hours behind Coordinated Universal Time, written as UTC minus 5, and PST runs eight hours behind, UTC minus 8. When people say EST in July, they almost always mean Eastern time generally, but strictly speaking EST is not in effect in July at all.",
        "On the second Sunday in March, most of the US springs forward one hour at 2:00 AM local time. Eastern becomes EDT, Eastern Daylight Time, at UTC minus 4, and Pacific becomes PDT, Pacific Daylight Time, at UTC minus 7. Both zones jump by exactly one hour on the same morning, so the distance between them stays three hours. On the first Sunday in November, both fall back to standard time together, and the gap, once again, stays three hours. The labels change twice a year. The arithmetic never does.",
        "This is why a good converter asks for the date, not just the time. Take March 8 as an example in a year when the change falls on March 9. On March 8, 4:00 PM EST equals 1:00 PM PST. Two days later, on March 10, 4:00 PM EDT equals 1:00 PM PDT. Same clocks on the wall, same three hour gap, different labels. If your recurring meeting was created in January with EST typed into the notes, the note is technically wrong by April, even though the meeting time itself is fine.",
        "A couple of places refuse to play along. Arizona stays on Mountain Standard Time all year, apart from the Navajo Nation in the northeast of the state, which does observe daylight saving. Hawaii stays on Hawaii Standard Time year round. For those states, the gap with the coasts really does change twice a year. Phoenix is two hours behind New York in summer, when it lines up with Pacific Daylight Time, and three hours behind in winter. If your calls involve Arizona or Hawaii, check the date carefully instead of trusting a gap you memorized in a different season.",
      ],
    },
    {
      heading: "The full US time zone picture",
      paragraphs: [
        "Eastern and Pacific are just the two ends of the staircase. In between sit Central and Mountain, and beyond the mainland there are Alaska and Hawaii Aleutian zones as well. Knowing the whole picture helps the moment a meeting includes a third city, because you can place every participant on the staircase at a glance. Chicago and Dallas sit in Central, one hour behind Eastern. Denver and Phoenix sit in Mountain, two hours behind Eastern, though Phoenix ignores daylight saving as explained above. Anchorage in Alaska sits one hour behind Pacific, and Honolulu sits two hours behind Pacific in winter and three in summer, because Hawaii never springs forward.",
        "The table below shows every US zone at the same moment, using noon Eastern as the reference point. Read across a row to see what the clock says everywhere else in the country at that instant. It is a handy reality check before you propose a time, because a slot that feels polite in New York can land at 6:00 AM in Honolulu, which nobody will thank you for.",
        "International callers add one more layer. London sits on Greenwich Mean Time in winter and British Summer Time in summer, and the gap between London and New York is usually five hours, but it shrinks to four for a couple of weeks each spring and fall because the US and the UK change their clocks on different dates. If a meeting includes both London and Los Angeles, using UTC as the neutral reference keeps everyone honest. The [GMT to EST converter](/converters/gmt-to-est) is built for exactly that job, and our guide to the [military time converter](/guides/military-time-converter) explains the 24 hour clock that international schedules often use, which removes the AM and PM guessing entirely.",
      ],
      table: {
        caption: "Every US time zone when it is 12:00 PM Eastern",
        headers: ["Zone", "Winter label", "Summer label", "Clock at noon Eastern (winter)", "Clock at noon Eastern (summer)"],
        rows: [
          ["Eastern", "EST (UTC-5)", "EDT (UTC-4)", "12:00 PM", "12:00 PM"],
          ["Central", "CST (UTC-6)", "CDT (UTC-5)", "11:00 AM", "11:00 AM"],
          ["Mountain", "MST (UTC-7)", "MDT (UTC-6)", "10:00 AM", "10:00 AM"],
          ["Pacific", "PST (UTC-8)", "PDT (UTC-7)", "9:00 AM", "9:00 AM"],
          ["Alaska", "AKST (UTC-9)", "AKDT (UTC-8)", "8:00 AM", "8:00 AM"],
          ["Hawaii", "HST (UTC-10)", "HST (UTC-10)", "7:00 AM", "6:00 AM"],
        ],
      },
    },
    {
      heading: "Meeting hours: the conversion table worth bookmarking",
      paragraphs: [
        "Most EST to PST searches are not about trivia. They are about picking a meeting time that does not punish anyone. The hard truth of coast to coast work is that a standard 9 to 5 day on both sides overlaps for only five hours. The East Coast starts at 9:00 AM, which is 6:00 AM on the West Coast, far too early to ask anyone to present. The West Coast works until 5:00 PM, which is 8:00 PM in the east, long after most Eastern offices have emptied. The shared window where both sides are inside normal office hours runs from 12:00 PM to 5:00 PM Eastern, which is 9:00 AM to 2:00 PM Pacific.",
        "The table below converts the working day hour by hour during standard time. During daylight saving the same table works with EDT and PDT swapped in, because the gap is still three hours. Use it to sanity check any proposed slot before you send the invite, especially recurring meetings that will roll across the March and November clock changes.",
        "A practical example shows how teams use the window. Maya manages a support team split between Charlotte and San Diego. She puts the daily standup at 12:30 PM Eastern, which is 9:30 AM Pacific: late enough that California has coffee in hand, early enough that North Carolina still has the whole afternoon after it. The team review goes at 3:00 PM Eastern, noon Pacific, which suits both sides. Anything that has to include the whole group goes inside that window, and one to one calls fill the edges, where only two people need to agree.",
      ],
      table: {
        caption: "Eastern to Pacific meeting hours during standard time (EST to PST)",
        headers: ["Eastern (EST)", "Pacific (PST)", "Sensible for both coasts?"],
        rows: [
          ["8:00 AM", "5:00 AM", "No, far too early on the West Coast"],
          ["9:00 AM", "6:00 AM", "No, still before West Coast hours"],
          ["10:00 AM", "7:00 AM", "Only for early risers in the west"],
          ["11:00 AM", "8:00 AM", "Workable, west is just starting"],
          ["12:00 PM", "9:00 AM", "Yes, the shared window opens"],
          ["1:00 PM", "10:00 AM", "Yes"],
          ["2:00 PM", "11:00 AM", "Yes"],
          ["3:00 PM", "12:00 PM", "Yes, a good default slot"],
          ["4:00 PM", "1:00 PM", "Yes"],
          ["5:00 PM", "2:00 PM", "Yes, the shared window closes at the east end of the day"],
          ["6:00 PM", "3:00 PM", "Late for the east, fine for the west"],
          ["7:00 PM", "4:00 PM", "Only if the east agrees to stay late"],
          ["8:00 PM", "5:00 PM", "No for the east, end of the West Coast day"],
        ],
      },
    },
    {
      heading: "Worked examples from real scheduling situations",
      paragraphs: [
        "Example one: a webinar. A marketing team in Atlanta schedules a live demo for 1:00 PM Eastern and promotes it nationally. The listing for West Coast attendees should read 10:00 AM Pacific. Subtract three hours, done. If the same team forgets and advertises 1:00 PM to everyone, California attendees who log on at 1:00 PM their time arrive three hours after the event ended. This exact mistake is why national webinars now almost always print both times, written as 1:00 PM ET / 10:00 AM PT.",
        "Example two: a flight. Jordan flies from Boston to San Francisco on a flight listed as departing 8:15 AM and arriving 11:45 AM. The clock difference makes the trip look like three and a half hours, but the real duration is about six and a half hours, because arrival is quoted in Pacific time and departure in Eastern. Add the three hour gap back to see the truth: 11:45 AM Pacific is 2:45 PM Eastern, and 2:45 PM minus 8:15 AM is a six and a half hour journey. Knowing this keeps you from booking a tight connection or promising to be at lunch in San Francisco at a time you will still be over Nevada.",
        "Example three: a deadline. A grant portal based in Washington, DC, closes applications at 11:59 PM Eastern. A writer in Portland who treats that as local time plans to submit at 11:00 PM Pacific, which is 2:00 AM Eastern the next day, three hours after the portal shut. Her real deadline is 8:59 PM Pacific. Any national deadline quoted in Eastern time is three hours earlier than it feels on the West Coast, and four hours earlier in the summer if you misread which label applies. Run the exact time through the [EST to PST converter](/converters/est-to-pst) once and set your personal deadline from its answer, not from a guess.",
        "Example four: adding up the hours around a big day. When a support lead in Raleigh covers a launch, she logs her shift in Eastern and the contractor in San Jose logs his in Pacific, and payroll needs one consistent set of numbers. Converting each start and end time first, then working out durations, avoids nonsense like a shift that appears to end before it starts. Our guide to the [hours calculator](/guides/hours-calculator) shows how to total those converted times cleanly, and for anyone dealing with timestamps in software logs instead of meetings, the [epoch converter](/guides/epoch-converter) guide explains how computers store time so time zones stop distorting it.",
      ],
    },
    {
      heading: "How to convert EST to PST in four steps",
      paragraphs: [
        "Once you know the gap is always three hours, converting by hand becomes a short routine. The steps below work for any pair of US zones if you swap in the right gap: one hour for Central, two for Mountain, three for Pacific. The routine matters most on the two weekends a year when the clocks change, because those are the days when a memorized label can quietly be wrong.",
      ],
      steps: [
        "Note the full Eastern time, including the date and whether it is AM or PM. A time with no date attached is where most errors begin.",
        "Subtract three hours. If the result dips below 12:00 AM, roll back to the previous day and say so out loud or write it down.",
        "Check the date against the daylight saving calendar. Between the second Sunday in March and the first Sunday in November, label the result PDT and the original EDT. Outside that window, use PST and EST.",
        "Send the converted time with its zone label attached, like 9:30 AM PDT, and ask the other person to confirm in their own zone.",
      ],
    },
    {
      heading: "Common mistakes that still catch people out",
      paragraphs: [
        "The single most common mistake is assuming the gap changes with daylight saving. It does not, because both coasts move together. People hear that Eastern sprang forward and worry the difference is now two or four hours, but Pacific sprang forward on the same night by the same hour. If your gap ever seems to be anything other than three hours between Eastern and Pacific, you have almost certainly mixed up a label or compared against Arizona or Hawaii, the two states that play by different rules.",
        "The second mistake is trusting a calendar invite without checking its zone. Most calendar apps store the event at the right absolute moment and display it correctly in each person's local time, which is wonderful until someone types a time into the title or description as plain text. That typed 2 PM never converts. It just sits there being wrong for half the attendees. Put times in the event fields, let the app do its job, and if you must write a time in words, write it twice, once per coast.",
        "A third trap is the two clock change weekends themselves. On the spring forward Sunday, 2:00 AM to 2:59 AM simply does not exist in zones that observe daylight saving, so a meeting can never be scheduled then. On the fall back Sunday, 1:00 AM to 1:59 AM happens twice, once in daylight time and once in standard time, and only the label tells the two apart. Early morning flights and overnight shifts on those dates deserve an extra check with a converter rather than a confident guess.",
        "Finally, watch for people using EST and PST as generic labels all year. Half the country writes PST in July when they mean Pacific time, and most listeners understand them, but servers, contracts and broadcast schedules often take the label literally. When precision matters, write PT and ET, or spell out Pacific Time and Eastern Time. Those neutral labels cover both the standard and daylight versions and cannot be read the wrong way.",
      ],
    },
    {
      heading: "Making coast to coast time painless",
      paragraphs: [
        "The teams that never miss a cross country meeting do three boring things well. They keep one shared reference, usually the organizer's zone, and state it in every invite. They schedule recurring meetings inside the 12:00 PM to 5:00 PM Eastern window so nobody's slot is permanently terrible. And they rotate the pain for anything outside that window: if a monthly call with London or with early rising East Coast clients has to sit at an awkward hour, the awkwardness takes turns instead of always landing on the same coast.",
        "You can also let your tools carry more of the load. Pin a world clock with New York and Los Angeles on your phone. Turn on the second time zone display in your calendar app if it offers one, so both coasts are visible when you drag a meeting around. For anything you convert more than once a week, like a standing class, a broadcast time or a support rota, run it through the [EST to PST converter](/converters/est-to-pst) and save the answer where the team can see it. There are plenty more everyday explainers like this one on the [guides hub](/guides), covering everything from pay periods to file sizes.",
        "None of this requires talent for mental arithmetic. It only requires treating the time zone as part of the time itself, the same way you would never quote a price without its currency. Three hours, one staircase, two label changes a year: hold onto those three facts and the whole US map becomes easy to read.",
      ],
    },
  ],
  faqs: [
    {
      q: "How many hours is EST ahead of PST?",
      a: "Eastern time is exactly three hours ahead of Pacific time, all year round. When it is noon in New York it is 9:00 AM in Los Angeles. The gap stays three hours in summer too, because both zones move to daylight time on the same day and shift by the same one hour.",
    },
    {
      q: "How do I convert 2:00 PM EST to PST?",
      a: "Subtract three hours. 2:00 PM EST is 11:00 AM PST. In summer the same wall clock conversion uses the daylight labels, so 2:00 PM EDT is 11:00 AM PDT. Only the letters change, never the three hour difference.",
    },
    {
      q: "What is the difference between EST and EDT?",
      a: "EST is Eastern Standard Time, UTC minus 5, used from November to March. EDT is Eastern Daylight Time, UTC minus 4, used from the second Sunday in March to the first Sunday in November. Your phone and calendar switch automatically, but written notes and older invites often keep the wrong label.",
    },
    {
      q: "Does the EST to PST difference ever change?",
      a: "No. Both zones start and end daylight saving on the same dates, so the three hour gap holds every day of the year. Gaps do change against places that skip daylight saving, like Arizona and Hawaii, which is where most confusion about a changing difference comes from.",
    },
    {
      q: "What is the best time for a meeting between New York and Los Angeles?",
      a: "Aim for 12:00 PM to 5:00 PM Eastern, which is 9:00 AM to 2:00 PM Pacific. Inside that window both sides are in normal office hours. A 3:00 PM Eastern and noon Pacific slot is the most common compromise because it suits both coasts equally.",
    },
    {
      q: "If it is 9:00 AM PST, what time is it in EST?",
      a: "Add three hours, so 9:00 AM PST is 12:00 PM EST. Going from Pacific to Eastern always means adding three hours, and going from Eastern to Pacific always means subtracting three hours, whatever the season.",
    },
  ],
  relatedSlugs: ["military-time-converter", "hours-calculator", "epoch-converter"],
};
