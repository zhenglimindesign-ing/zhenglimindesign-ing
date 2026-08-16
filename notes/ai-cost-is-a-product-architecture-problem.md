# AI Cost Is a Product Architecture Problem

[中文版本](./ai-cost-is-a-product-architecture-problem.zh-CN.md)

While testing an AI product I was building, I ran into a problem I had considered too late: one complete user flow could cost several dollars.

No single feature looked unreasonable on its own. The product could discover roles, read job descriptions, assess fit, research companies, and generate application materials. But once those steps were connected, one user action was no longer “one model call.” It could trigger search, page reading, multiple model steps, repeated context, retries, and follow-up generation.

That changed how I thought about AI cost.

I had initially treated it as an engineering optimization problem: reduce tokens, shorten prompts, maybe use a cheaper model.

The deeper issue was product architecture.

## A feature is not a model call

The UI may show one button, but the system behind it can contain an entire paid chain.

For example, “research this company” might involve:

- searching several sources;
- reading multiple pages;
- filling missing information;
- analyzing different dimensions;
- synthesizing the final result;
- retrying or continuing when one step fails.

The final answer may only be a few paragraphs, while the system has already processed far more information than the user ever sees.

Repeated context creates another hidden cost. The same job description, career history, preferences, and previous outputs can be sent again and again across different steps.

So I stopped asking only:

> How much does this model cost per token?

and started asking:

> What does it cost to produce one useful user outcome?

That question immediately exposed product decisions that model pricing alone could not answer.

## 1. The cheapest call is the one that never needs to happen

My first change was not model selection. It was deciding which work should not use an LLM at all.

A surprising amount of an AI workflow is deterministic:

- deduplication;
- parsing and format conversion;
- salary, location, and other hard-constraint checks;
- fixed calculations;
- caching repeated company or page data;
- formatting known output structures.

These tasks are usually cheaper, more stable, and easier to test with ordinary code.

The model should be reserved for work that genuinely benefits from language judgment: interpreting ambiguous requirements, comparing evidence, resolving conflicting signals, or synthesizing a context-specific recommendation.

This changed the workflow from:

**let the model search, read, filter, judge, and write**

into something closer to:

**code fetches, parses, filters, and reuses; the model handles the remaining judgment.**

This was not only a cost improvement. It made the system easier to reason about.

## 2. Context should be selected, not repeatedly dumped

The next problem was input size.

Different tasks need different evidence. A short LinkedIn note does not need the same context as a full fit report or tailored resume.

Instead of repeatedly sending the user’s entire history, I moved toward a reusable evidence layer and task-specific selection:

- keep confirmed career facts in a stable source;
- select only the evidence relevant to the current task;
- reuse job and company data instead of fetching it again;
- avoid passing large previous outputs forward unless the next step truly depends on them.

This lowers cost, but there is another benefit: less irrelevant context can also improve model focus.

“More context” is not automatically “better context.”

## 3. Paid calls need one controlled gateway

Once a product has several AI features, letting each feature call a model independently becomes difficult to control.

Different paths may silently use different models, output limits, search settings, retries, or SDK defaults. A new feature can bypass whatever cost discipline existed elsewhere.

I therefore started thinking of every paid call as passing through a shared gateway — a toll booth before dispatch.

Before a request is allowed to run, the system should know:

- which capability is requesting the call;
- which model is allowed;
- the input and output limits;
- whether search or other paid tools are allowed;
- retry and continuation limits;
- the worst-case cost of the action;
- whether the user and product still have budget available.

This is different from looking at a monthly bill after the fact.

A dashboard tells you where the money went.

A gateway decides whether the money is allowed to be spent in the first place.

## 4. Reserve worst-case cost before dispatch

One detail became important once I thought about concurrency and retries.

If the system only checks an optimistic estimated cost, several requests can all believe there is enough budget and collectively overspend it.

A safer pattern is to reserve the worst-case allowed cost before dispatch, then settle against actual usage afterward.

The mental model is similar to a hotel deposit:

1. reserve the maximum allowed amount;
2. run the request;
3. record actual usage;
4. release the unused portion.

This also changes how timeouts should be handled. A timeout does not necessarily mean the provider did no work. Immediately releasing the reservation and retrying can create duplicate paid work.

Cost control therefore becomes entangled with reliability and request state. That is exactly why I no longer see it as a simple finance layer.

## 5. A gateway controls the future; a ledger explains the past

Pre-dispatch control is only half the system.

I also wanted every real provider attempt to leave a record, even when the user never receives a successful result.

For each attempt, the useful questions are:

- what was called;
- how much input and output was used;
- whether search or another tool ran;
- whether this was an initial attempt, retry, or continuation;
- where failure occurred;
- what it actually cost;
- whether settlement is complete or still uncertain.

This distinction matters because:

> product output failed

and

> no paid work happened

are not the same thing.

The gateway controls future spending. The ledger makes past spending explainable.

You need both.

## 6. Different capabilities should have different budgets

A short message, a fit analysis, a tailored resume, and external research do not have the same value or complexity.

They should not all inherit one vague “AI budget.”

I started treating each capability as having its own price envelope, based on:

- user value;
- expected complexity;
- model requirements;
- tool usage;
- acceptable retry behavior.

There can also be outer limits: per-user daily budgets, stricter budgets for background automation, and a product-wide monthly ceiling.

The exact numbers will change as models and prices change. The useful idea is structural:

**every AI capability should have an explicit cost boundary that matches the value it is supposed to create.**

## 7. Cost optimization is incomplete until quality is checked again

There are many easy ways to make an AI feature cheaper:

- remove context;
- skip analysis steps;
- shorten outputs;
- use a weaker model;
- remove research;
- reduce retries.

But if the result becomes materially worse, the product has not really been optimized. It has simply moved cost from the API bill into lower user value.

So any meaningful cost change needs to be evaluated alongside quality.

I find it useful to separate three kinds of evidence:

- **Measured:** real cost, token usage, latency, failure records, evaluated output quality.
- **Estimated:** savings expected from fewer calls, smaller context, or more caching.
- **Unknown:** quality or behavior that still needs real testing.

This keeps a projected saving from quietly turning into a claimed result.

## What I would do earlier next time

If I were designing another AI product from scratch, I would bring cost into product definition much earlier.

For every AI capability, I would ask:

1. Does this step actually need a model?
2. Is it user-triggered or automatic?
3. How many paid attempts can one action create?
4. Does it use search or other variable-cost tools?
5. What is the maximum acceptable cost of one useful result?
6. What happens when the call fails, times out, or retries?
7. What evidence will tell us that a cheaper design is still good enough?

The biggest lesson for me was simple:

**AI cost is not something to calculate after the product is built. It helps determine what the product should automate, how the workflow should be split, where limits belong, and how reliability should work.**

A cheaper model can help.

But the more important optimization is making every paid call intentional, bounded, observable, and worth the value it creates.

---

*Adapted from notes written during my 100 Days Building experiment.*