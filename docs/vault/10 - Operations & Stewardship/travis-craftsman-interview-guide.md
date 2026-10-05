# Travis Kloss Craftsman Discovery & Operations Questionnaire

**Document Purpose**: Direct, craftsman-friendly questionnaire to discover Travis Kloss's exact current shop workflow, equipment capabilities, and base cue sources so the website, pricing, and turnaround promises match shop reality 100%.  
**Interviewer**: Antonio Moses (Managing Partner & Registrar)  
**Interviewee**: Travis Kloss (Master Craftsman & Head of Product)  
**Date Created**: October 2026  
**Context**: Used prior to finalizing site tiers, lead times, and client intake workflows.

---

## 1. Ground Rules & Conversational Framing

When sitting down with Travis, **frame the meeting as building the business around his superpower**, not conducting an audit:

> *"Travis, I’m building our site and handling customer orders so you never have to deal with DMs, haggling, or shipping boxes again. To quote accurate prices and delivery dates on the site, I need to know your exact current setup so I never overpromise to a client or stress your shop."*

---

## 2. The 5 Discovery Buckets

### Bucket 1: The Core Build Model (Scratch vs. Donor Cues)
*Goal: Determine if he turns wood from square blanks, buys production blanks, or transforms existing cues.*

1. **"Right now, when someone asks you for a cue, where does the wood start?"**
   - [ ] A customer brings/ships me their personal cue to customize.
   - [ ] I buy finished blank cues (e.g., Players, Lucky, Action) and strip them down.
   - [ ] I buy turning blanks (cured wood dowels) and turn the forearm/butt on my lathe.
   - [ ] A combination depending on what the customer wants.
2. **"If a customer wants a 100% turnkey cue from us, how do we source the base cue right now?"**
3. **"Do you prefer working on customer-supplied cues (re-skins) or sourcing our own blanks to sell complete?"**

---

### Bucket 2: The Decoupage & Coating Chemistry
*Goal: Capture authentic technical facts to put on the website's specs list.*

4. **"What kind of paper/comics work best for your process?"**
   - Do you use original physical vintage comic pages, or high-res color laser prints on specialty paper?
   - How do you prevent ink bleeding when the glue/resin touches the page?
5. **"Walk me through your clear-coat and curing process:"**
   - What finish do you use? (Epoxy resin, automotive 2K polyurethane, UV-cured resin, or CA finish?)
   - Approximately how many coats do you apply?
   - How many days does the finish need to cure before it can be buffed and played with?
6. **"How durable is the finish under real match play?"**
   - Can it handle moisture, chalk dust, and hard case travel without chipping?

---

### Bucket 3: Joints, Shafts & Hardware Specs
*Goal: Ensure the website's configurator only lists options Travis can actually build.*

7. **"What joint pins do you currently work with or feel most comfortable threading?"**
   - [ ] 5/16 x 18 (Standard production pin)
   - [ ] 3/8 x 10 (Custom wood-to-wood)
   - [ ] Radial Pin
   - [ ] Uni-Loc Quick Release
   - [ ] Other: `_____________`
8. **"What about the shaft?"**
   - Do you turn shafts from raw maple dowels on the lathe, or do you pair your butts with aftermarket shafts (like Predator, Cuetec Cynergy, or standard maple shafts)?
9. **"Can you adjust cue weights?"**
   - Do your cues have a standard threaded weight bolt system in the butt, or is the weight fixed once built?

---

### Bucket 4: Shop Capacity & Turnaround Reality
*Goal: Establish true lead times so customers don't send angry emails.*

10. **"From the day you start a cue to the day it's ready to pack in a box, how many bench hours does it take?"**
    - Stripping/Prep: `_____` hours
    - Layout & Comic Decoupage: `_____` hours
    - Clear Coating & Cure Waiting: `_____` days
    - Final Sanding, Lathe Turning & Hand Buffing: `_____` hours
11. **"Realistically, working at your preferred pace, how many finished cues can you comfortably complete per month?"**
    - [ ] 1 to 2 cues/month
    - [ ] 3 to 5 cues/month
    - [ ] 6 to 10 cues/month
12. **"What is the single biggest bottleneck in your shop right now?"** (e.g., drying time, clear coat fumes, finding good comics, sanding by hand).

---

### Bucket 5: Economics & The Division of Labor
*Goal: Lock in your partnership boundaries and fair pricing.*

13. **"In the past, what were you charging people for a cue, and did that feel fair for your time?"**
14. **"What dollar amount in your pocket per cue makes you excited to get into the shop every weekend?"**
15. **"What parts of this do you hate doing that you want me to take 100% off your plate?"**
    - [ ] Sourcing comics and hunting down rare issues
    - [ ] Answering customer DMs and text messages
    - [ ] Collecting deposits and haggling on price
    - [ ] Packaging, boxing, and shipping at the post office
    - [ ] Running social media and taking nice photos

---

## 3. Antonio's Strategic Interpretation Matrix

| If Travis Says... | What It Means for the Website & Business Model |
| :--- | :--- |
| **"I mostly customize cues people hand me."** | **Pivot to the "Bespoke Re-Skin & Restomod" model.** Add a prominent `"Send In Your Cue"` mail-in intake form ($395–$495). Frame it as giving a beloved cue a legendary second life. |
| **"I buy finished blanks from a catalog and wrap them."** | **Feature "Turnkey FahCues Weapons" ($650–$850).** State clearly: *"Built on hand-tested, zero-runout tournament straight maple foundations, transformed with 360° vintage comic decoupage."* |
| **"I turn the wood myself on my lathe from raw squares."** | **Keep the "Bespoke Full Custom" tier ($1,250+).** Highlight the lathe tolerances, wood curing, and bespoke taper options. |
| **"I only do 2 cues a month max."** | **Lean 100% into the Scarcity Vault Drops.** Keep 1-of-1 serial numbers and require 50% non-refundable deposits to prevent anyone from wasting his limited shop hours. |
| **"I hate sourcing comics and talking to tire-kickers."** | **Antonio's value proposition is solidified.** Antonio handles all comic curation, customer concierge intake, 50% deposit locking, and shipping logistics. |

---

## 4. Post-Interview Action Checklist

- [ ] Update [src/cuesData.ts](file:///Users/thunda/Desktop/Development/FahCues/src/cuesData.ts) specs to reflect Travis's actual joint pin inventory.
- [ ] If applicable, add a "Mail-In / Bring Your Own Cue" tier to [src/commission.ts](file:///Users/thunda/Desktop/Development/FahCues/src/commission.ts).
- [ ] Confirm baseline pricing floor (ensuring Travis nets his target dollar amount per build).
- [ ] Update estimated completion lead times on the site (e.g., 2–3 weeks for Re-Skins vs. 8–10 weeks for Full Builds).
