# From Linear Handoffs to Spiral Building with AI

[中文版本](./from-linear-handoffs-to-spiral-building-with-ai.zh-CN.md)

One of the biggest changes I had to make as an independent builder was not learning a new tool. It was changing my expectation of how product development should move.

In teams, the process I knew was roughly:

**Product → Design → Engineering → QA → Launch**

Reality was never perfectly linear, but the handoffs mattered. Designers needed a sufficiently clear problem. Engineers needed sufficiently stable requirements and designs. QA needed a definition of what “done” meant.

The process was partly about product quality, but also about coordination: many people needed to share roughly the same understanding at a particular moment.

When I started building with AI tools, much of that coordination constraint disappeared.

I could discuss a requirement in the morning, ask a coding agent to implement it in the afternoon, see the real result, realize the product logic was incomplete, revise the flow, and continue the same day.

At first, this felt like an incomplete process.

Eventually I started seeing it differently.

The workflow had not become “no process.” It had become more iterative — closer to a spiral than a relay race.

The important question was no longer:

> How do I think everything through before development starts?

It became:

> What must be decided early, what should wait for real product evidence, and when should I stop building long enough to consolidate what I have learned?

## AI makes implementation faster than product judgment

This is the structural change that matters most to me.

A feature can now move from idea to working UI very quickly. But code being finished does not mean the product decision is mature.

A page can render while the information hierarchy is still wrong.

A workflow can run while the user goal is still unclear.

A feature can technically work while the product does not need it.

In a traditional team, implementation time and handoffs naturally create pauses. Requirements get reviewed. Designs get discussed. Engineers challenge feasibility. QA finds mismatches.

When one person can move directly from thought to implementation through AI tools, many of those pauses disappear.

That is powerful, but it creates a new risk:

**the product can grow faster than the underlying judgment becomes clear.**

So speed needs new checkpoints.

## 1. Decide early what is expensive to reverse

Not everything should remain fluid.

Some decisions have a large downstream radius. If they are wrong, later work multiplies the cost of the mistake.

I try to decide these earlier and more deliberately:

- who the product is for;
- what core problem it solves;
- the main user journey for the current stage;
- core objects and important data relationships;
- explicit non-goals;
- security, permission, compliance, or other high-risk boundaries.

The principle is not “architecture first” or “write a perfect PRD.”

It is simpler:

**the harder a decision is to reverse, and the larger the consequences of getting it wrong, the earlier it deserves real scrutiny.**

Fast implementation is not a reason to be casual about foundational choices. It can actually make foundational mistakes more expensive because the wrong direction gets built out so quickly.

## 2. Let real product evidence answer what documents cannot

Other questions are difficult to answer well before something exists.

For example:

- should a result page lead with the conclusion or the evidence?
- should an action happen in a modal or a separate page?
- which sections should be expanded by default?
- is a feature important enough to deserve its own surface?
- how much AI output can fit before the page becomes cognitively heavy?

These questions can be debated in a document for a long time.

Then the real content appears and the answer becomes obvious.

Information that sounded manageable becomes too dense. A flow that looked clean feels awkward when clicked through. A feature that seemed necessary in a PRD becomes redundant once the full journey exists.

So I no longer force every product detail into a “final answer” before implementation.

If a decision depends heavily on real content, state, behavior, or user interaction, I am more comfortable starting with a reasonable hypothesis and revisiting it after the product is tangible.

This is not “build first, think later.”

It is choosing a better time to think about different kinds of questions.

## 3. Build one real path before filling the whole product

AI-assisted development makes it very easy to progress horizontally:

finish one page, then another page, then add filters, settings, notifications, and secondary flows.

Everything looks productive because many boxes are being checked.

I now prefer to establish one end-to-end path first.

For a simple product, that might be:

**start → perform the core action → see the result → make a decision → save or continue**

A complete path forces multiple layers of the product to meet each other at once:

- requirements;
- data;
- UX;
- system states;
- AI output;
- error handling;
- technical structure.

This reveals problems that isolated feature work often hides.

The goal is not to finish the smallest number of screens. It is to make one meaningful user outcome real enough to learn from.

## 4. Add deliberate pauses, because the old ones are gone

This became one of the most important habits in my solo workflow.

Coding agents are very good at continuing.

A task finishes, so I can give them the next task. A page works, so I can add the next feature. There is very little natural friction forcing the project to stop.

But in teams, many useful checks existed precisely because work crossed role boundaries.

Without those handoffs, I need to create the pause myself.

After a meaningful loop, I try to look at the product from several perspectives:

**Product** — Does this thing deserve to exist? Did the scope move without a deliberate decision?

**User** — Can someone understand where they are, what matters, and what happens next?

**Design** — Is the hierarchy clear? Do similar actions behave consistently? Do the pages still feel like one product?

**Engineering** — Is the implementation supporting the next stage, or accumulating temporary structures and patches?

**AI quality** — If AI is part of the workflow, are the outputs good enough, grounded enough, and appropriately reviewed? What is the cost and failure behavior?

The purpose is not to create ceremony.

It is to replace coordination-driven checkpoints with learning-driven checkpoints.

## 5. Design cannot wait until the feature set is complete

This was a painful lesson for me.

I initially treated design as something that could be cleaned up after the functional product existed.

But the moment a coding agent implements a feature, it has already made design decisions:

- where the user enters;
- what appears first;
- how information is grouped;
- whether an action uses a modal, drawer, or page;
- what loading, empty, and error states look like;
- what happens after completion.

If these choices are undefined, the agent still has to choose something.

Each local choice may be defensible. Across many tasks, the product can drift into inconsistent patterns.

So I now think design should enter in layers:

**Before implementation:** define the experience skeleton — user goal, entry and exit, primary flow, hierarchy, important states, and open questions.

**After one real path exists:** review actual content and interaction, then establish the visual and interaction patterns that are worth reusing.

**As the product changes:** revisit design when a new workflow pattern appears or the existing system starts to drift.

Design does not need to be finished before coding starts.

But it cannot make its first serious appearance after everything else is finished either.

## 6. Each loop should leave the product less ambiguous

A spiral process can easily become an excuse for chaos:

> We are iterating, so everything is temporary.

That is not what I mean.

After each meaningful loop, I want to preserve what has actually become clearer:

- update the product definition if the product boundary changed;
- update the relevant spec if the workflow changed;
- record an important decision if the trade-off will matter later;
- remove stale requirements or abandoned directions;
- turn repeated UI patterns into shared components;
- replace temporary code when it starts becoming structural;
- add tests or validation where a failure has become important enough to prevent.

The loop is only useful if learning survives into the next loop.

Otherwise the project simply keeps moving while people — or agents — repeatedly rediscover the same decisions.

## What “spiral” means to me now

I do not think AI means product teams should abandon upfront thinking.

I also do not think faster implementation means “just build and see.”

The more useful distinction is:

- **high-risk, hard-to-reverse decisions:** decide earlier;
- **questions that depend on real usage or content:** allow them to mature later;
- **implementation:** use it as a source of product evidence, not just execution;
- **after each loop:** consolidate what has become true.

The process becomes less like a sequence of finished departments and more like repeated passes through product, design, engineering, and validation.

But each pass should move forward.

The metric I increasingly care about is not:

> How many features did I finish this week?

It is:

> After this loop, is the product less ambiguous than it was before?

AI makes it much easier to build before everything is clear.

The discipline is learning which uncertainty is productive, which uncertainty is dangerous, and when to stop long enough to turn new evidence into a better product decision.

---

*Adapted from notes written during my 100 Days Building experiment.*
