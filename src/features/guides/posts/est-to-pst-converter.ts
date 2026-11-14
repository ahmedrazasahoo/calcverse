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
        "The continental United States is split into four main time zones, each one hour behind the one to its east. Eastern is furthest ahead, then Central, Mountain, and Pacific three hours behind Eastern. When it is 3:00 PM in New York, it is 2:00 PM in Chicago, 1:00 PM in Denver and 12:00 PM in Los Angeles.",
        "That staircase is the whole trick. Because Pacific sits three steps below Eastern, you subtract three hours, every time, with no exceptions for the date or the season. If your standup is at 10:30 AM Eastern, your California teammates join at 7:30 AM Pacific.",
        "Going the other way works in reverse: add three hours. A support shift that ends at 6:00 PM in Seattle ends at 9:00 PM for the manager reviewing it in Boston. If you need to flip a whole list of times, the [PST to EST converter](/converters/pst-to-est) handles the reverse direction. The [EST to CST converter](/converters/est-to-cst) covers the single hour jump between Eastern and Central.",
        "The only moment the subtraction needs care is around midnight. If it is 1:00 AM Tuesday in Miami, subtracting three hours lands at 10:00 PM in San Francisco on Monday, the previous day. The date changes, and forgetting that is how people end up booked onto the wrong day of a red eye flight. When a conversion crosses midnight, write the day down next to the time.",
      ],
    },
    {
      heading: "EST or EDT, PST or PDT: the daylight saving shift",
      paragraphs: [
        "EST stands for Eastern Standard Time and PST for Pacific Standard Time, the winter versions, used from early November to mid March. EST is UTC minus 5, and PST is UTC minus 8. When people say EST in July, they almost always mean Eastern time generally, but strictly speaking EST is not in effect in July at all.",
        "On the second Sunday in March, most of the US springs forward one hour. Eastern becomes EDT, at UTC minus 4, and Pacific becomes PDT, at UTC minus 7. Both zones jump by exactly one hour on the same morning, so the distance between them stays three hours. On the first Sunday in November, both fall back together.",
        "This is why a good converter asks for the date. On March 8 in a year when the change falls on March 9, 4:00 PM EST equals 1:00 PM PST. Two days later, 4:00 PM EDT equals 1:00 PM PDT. Same clocks, same three hour gap, different labels.",
        "A couple of places refuse to play along. Arizona stays on Mountain Standard Time all year, apart from the Navajo Nation. Hawaii stays on Hawaii Standard Time year round. For those states, the gap with the coasts changes twice a year: Phoenix is two hours behind New York in summer and three in winter.",
      ],
    },
    {
      heading: "The full US time zone picture",
      paragraphs: [
        "Eastern and Pacific are the two ends of the staircase. In between sit Central and Mountain, and beyond the mainland there are Alaska and Hawaii Aleutian zones. Chicago and Dallas sit in Central, Denver and Phoenix in Mountain, Anchorage one hour behind Pacific, and Honolulu two hours behind Pacific in winter and three in summer.",
        "The table below shows every US zone at the same moment, using noon Eastern as the reference point. It is a handy reality check before you propose a time, because a slot that feels polite in New York can land at 6:00 AM in Honolulu.",
        "International callers add one more layer. The gap between London and New York is usually five hours, but it shrinks to four for a couple of weeks each spring and fall because the US and the UK change clocks on different dates. Using UTC as the neutral reference keeps everyone honest. The [GMT to EST converter](/converters/gmt-to-est) is built for that job, and our guide to the [military time converter](/guides/military-time-converter) explains the 24 hour clock international schedules often use.",
      ],
      table: {
        caption: "Every US time zone when it is 12:00 PM Eastern",
        headers: ["Zone", "Winter label", "Summer label", "Clock at noon Eastern (winter)", "Clock at noon Eastern (summer)"],
        rows: [
          ["Eastern", "EST (UTC-5)", "EDT (UTC-4)", "12:00 PM", "12:00 PM"],
          ["Central", "CST (UTC-6)", "CDT (UTC-5)", "11:00 AM", "11:00 AM"],
          ["Mountain", "MST (UTC-7)", "MDT (UTC-6)", "10:00 AM", "10:00 AM"],
          ["Pacific", "PST (UTC-8)", "PDT (UTC-7)", "9:00 AM", "9:00 AM"],
        ],
      },
    },
    {
      heading: "Meeting hours: the conversion table worth bookmarking",
      paragraphs: [
        "Most EST to PST searches are about picking a meeting time that does not punish anyone. A standard 9 to 5 day on both sides overlaps for only five hours. The shared window runs from 12:00 PM to 5:00 PM Eastern, which is 9:00 AM to 2:00 PM Pacific.",
        "The table below converts the working day hour by hour during standard time. During daylight saving the same table works with EDT and PDT swapped in, because the gap is still three hours.",
        "Maya manages a support team split between Charlotte and San Diego. She puts the daily standup at 12:30 PM Eastern, which is 9:30 AM Pacific, and the team review at 3:00 PM Eastern, noon Pacific. Anything with the whole group goes inside that window.",
      ],
      table: {
        caption: "Eastern to Pacific meeting hours during standard time (EST to PST)",
        headers: ["Eastern (EST)", "Pacific (PST)", "Sensible for both coasts?"],
        rows: [
          ["9:00 AM", "6:00 AM", "No, still before West Coast hours"],
          ["12:00 PM", "9:00 AM", "Yes, the shared window opens"],
          ["3:00 PM", "12:00 PM", "Yes, a good default slot"],
          ["5:00 PM", "2:00 PM", "Yes, the shared window closes at the east end of the day"],
          ["8:00 PM", "5:00 PM", "No for the east, end of the West Coast day"],
        ],
      },
    },
    {
      heading: "Worked examples from real scheduling situations",
      paragraphs: [
        "Example one: a webinar. A team in Atlanta schedules a live demo for 1:00 PM Eastern. The listing for West Coast attendees should read 10:00 AM Pacific. If the team advertises 1:00 PM to everyone, California attendees who log on at 1:00 PM their time arrive three hours after the event ended. This is why national webinars print both times, as 1:00 PM ET / 10:00 AM PT.",
        "Example two: a flight. Jordan flies from Boston to San Francisco, departing 8:15 AM and arriving 11:45 AM. The trip looks like three and a half hours, but the real duration is about six and a half, because arrival is quoted in Pacific time: 11:45 AM Pacific is 2:45 PM Eastern.",
        "Example three: a deadline. A grant portal in Washington, DC, closes at 11:59 PM Eastern. A writer in Portland who submits at 11:00 PM Pacific is actually submitting at 2:00 AM Eastern the next day. Her real deadline is 8:59 PM Pacific. Run the exact time through the [EST to PST converter](/converters/est-to-pst) and set your deadline from its answer.",
        "Example four: adding up hours. When a support lead in Raleigh logs her shift in Eastern and a contractor in San Jose logs his in Pacific, payroll needs one consistent set of numbers. Converting each time first avoids a shift that appears to end before it starts. Our guide to the [hours calculator](/guides/hours-calculator) shows how to total those times, and the [epoch converter](/guides/epoch-converter) guide explains how computers store time.",
      ],
    },
    {
      heading: "How to convert EST to PST in four steps",
      paragraphs: [
        "Once you know the gap is always three hours, converting by hand becomes a short routine. The steps below work for any pair of US zones if you swap in the right gap: one hour for Central, two for Mountain, three for Pacific.",
      ],
      steps: [
        "Note the full Eastern time, including the date and whether it is AM or PM.",
        "Subtract three hours. If the result dips below 12:00 AM, roll back to the previous day and write it down.",
        "Check the date against the daylight saving calendar: from the second Sunday in March to the first Sunday in November, label the result PDT and the original EDT. Otherwise, use PST and EST.",
        "Send the converted time with its zone label attached, like 9:30 AM PDT, and ask the other person to confirm in their own zone.",
      ],
    },
    {
      heading: "Common mistakes that still catch people out",
      paragraphs: [
        "The most common mistake is assuming the gap changes with daylight saving. It does not, because both coasts move together. If your gap ever seems to be anything other than three hours, you have almost certainly mixed up a label or compared against Arizona or Hawaii.",
        "The second mistake is trusting a calendar invite without checking its zone. Calendar apps display events correctly in local time, until someone types a time into the title as plain text. That typed 2 PM never converts. Put times in the event fields, and if you must write a time in words, write it twice, once per coast.",
        "A third trap is the clock change weekends. On the spring forward Sunday, 2:00 AM to 2:59 AM simply does not exist. On the fall back Sunday, 1:00 AM to 1:59 AM happens twice, and only the label tells the two apart. Flights and overnight shifts on those dates deserve an extra check.",
        "Finally, watch for EST and PST used as generic labels all year. Servers, contracts and broadcast schedules often take the label literally. When precision matters, write PT and ET, or spell out Pacific Time and Eastern Time. Those neutral labels cover both versions.",
      ],
    },
    {
      heading: "Making coast to coast time painless",
      paragraphs: [
        "Teams that never miss a cross country meeting keep one shared reference, usually the organizer zone, and state it in every invite. They schedule recurring meetings inside the 12:00 PM to 5:00 PM Eastern window, and they rotate the pain for anything outside that window.",
        "Let your tools carry more of the load. Pin a world clock with New York and Los Angeles on your phone, and turn on the second time zone display in your calendar app. For anything you convert more than once a week, run it through the [EST to PST converter](/converters/est-to-pst) and save the answer where the team can see it. More everyday explainers are on the [guides hub](/guides).",
        "None of this requires talent for mental arithmetic. Treat the time zone as part of the time itself, the way you would never quote a price without its currency. Three hours, one staircase, two label changes a year.",
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
