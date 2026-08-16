# What Product Managers Should—and Shouldn’t—Delegate to AI

[中文版本](./what-product-managers-should-not-delegate-to-ai.zh-CN.md)

The more I use AI in product work, the less useful I find the question:

> What can AI do for a PM?

The answer is already: a lot.

AI can summarize research, draft PRDs, map workflows, generate edge cases, compare options, turn discussion into requirements, propose acceptance criteria, and help inspect whether something is missing.

The harder question is:

> Which parts of product work can AI help perform, and which decisions still need an explicit human owner?

I do not think the right boundary is “AI executes, PM thinks.” In practice, AI can contribute meaningfully to thinking too. It can challenge a framing, surface an inconsistency, propose a better scope split, or reveal a failure path I had not considered.

The boundary I find more useful is this:

**AI can expand, organize, and recommend. Product decisions still need an accountable owner.**

That distinction matters because AI-generated product work is often polished enough to look decided before it actually is.

## Generation is not decision

A product document usually contains several kinds of work mixed together:

1. organizing known facts;
2. expanding missing details;
3. proposing possible options;
4. choosing between options;
5. defining how the product will actually behave.

AI is very effective at the first three.

It can take scattered discussion and produce a clean workflow. It can identify missing states. It can suggest alternative scopes. It can turn rough requirements into structured acceptance criteria.

The risk begins when those outputs slide silently into the last two categories.

A generated PRD can contain a sentence such as:

> If generation fails, the system automatically retries and replaces the previous result.

That sentence may look like ordinary exception handling. But it has already made several product decisions:

- whether retry is automatic;
- whether another paid call is allowed;
- whether the previous result remains available;
- whether the user is informed;
- what happens after repeated failure.

The AI may have filled the gap because a complete document needed an answer.

That does not mean the answer was actually decided.

So one of my strongest rules now is:

**AI-generated completeness must not be mistaken for product agreement.**

## 1. AI can help frame the problem; it should not silently define the problem

AI is good at turning a vague idea into a coherent problem statement.

That is useful, but coherence can create false confidence.

A model can generate a plausible user, pain point, value proposition, and opportunity from very little evidence. The result may read like a validated product thesis even when it is only a well-structured hypothesis.

I still use AI heavily here. I ask it to:

- challenge my first framing;
- propose alternative explanations;
- separate symptoms from causes;
- identify what evidence is missing;
- show me where I may already be jumping to a solution.

But the product owner still needs to decide:

- what problem is actually worth solving;
- whether it is a real user problem or an internally convenient one;
- whether the product is addressing a root cause or adding another layer of workflow;
- what evidence would be enough to continue.

AI can improve the framing process. It cannot convert an unvalidated assumption into a validated problem simply by writing it well.

## 2. AI can propose scope; a human should own the boundary

Scope is another area where AI is extremely useful.

Given a broad goal, it can decompose the work into stages, identify dependencies, propose MVP variants, and compare trade-offs.

That is often better than starting from a blank page.

But AI has a tendency to make a plan feel complete. It can add states, edge cases, supporting features, and operational details because each one is individually reasonable.

Product scope is not the exercise of listing everything that would make the product complete.

It is the decision to stop deliberately.

The human owner needs to confirm:

- what this stage is trying to learn or prove;
- which users and scenarios are covered now;
- which experiences may remain imperfect for the moment;
- which risks must be solved before launch;
- which problems are explicitly deferred.

This matters even more with AI-assisted development because implementation can happen quickly. A scope expansion that would once have triggered weeks of planning may now become a few extra prompts and a surprising amount of product complexity.

AI can make scope options visible.

It should not get the default right to expand the product simply because the extra work looks feasible.

## 3. AI can expand product rules; it should not invent them invisibly

Some of the most consequential product decisions are not in the headline feature. They appear inside the rules that make the workflow behave consistently.

For example:

- when does an item move to the next state?
- who is allowed to perform an action?
- when must the user confirm?
- what happens when evidence is missing?
- what happens when two rules conflict?
- does the system continue under uncertainty or stop?
- can a previous result be restored?

AI is very good at finding these gaps.

That is one of the reasons I want it involved early: it can expose questions I would otherwise discover much later in implementation.

But there is a crucial difference between:

> You have not decided what happens when confidence is low.

and:

> When confidence is low, the system automatically proceeds with a warning.

The first is useful product support.

The second has made a policy decision.

So when AI expands a workflow, I want new rules to be visible as one of three things:

- **confirmed** — already decided;
- **proposed** — a reasonable option that still needs a decision;
- **unknown** — a gap that should remain open rather than be guessed.

The important thing is not the labels themselves. It is preventing a plausible completion from becoming product behavior without anyone noticing.

## 4. AI can enumerate risk; a human should decide what risk the product accepts

Models can generate long risk lists very quickly.

That is valuable. They are good at asking:

- what if the data is wrong?
- what if the user misunderstands the output?
- what if an action cannot be undone?
- what if an external service fails?
- what if confidence is low?

But identifying risk and accepting risk are different jobs.

Consider an AI system that can recommend or perform an action.

There may be no universally correct answer to questions such as:

- should this action be automatic or advisory?
- should low-confidence output be shown, blocked, or escalated?
- how much friction is acceptable before a high-risk action?
- what level of error is tolerable if the action can be reversed?
- when should the system stop and hand control back to a person?

These choices reflect the product’s values, users, business model, regulatory environment, and cost of failure.

AI can help compare the trade-offs.

It should not quietly choose the organization’s risk tolerance.

## 5. AI can generate evidence; the human owner still needs to know what was actually decided

The more AI contributes to product work, the easier it becomes to produce a large amount of polished material:

- PRDs;
- flow diagrams;
- edge-case lists;
- decision tables;
- user stories;
- acceptance criteria;
- rollout plans.

The bottleneck moves from writing to review.

So I now care less about whether AI can generate the document and more about whether the document makes decisions inspectable.

At the end of a meaningful product discussion, I want to be able to answer:

- What did we actually decide?
- Why did we decide it?
- What remains a hypothesis?
- What did the AI propose that we did not accept?
- What is still unresolved?
- What behavior will engineering implement because of this decision?

If I cannot answer those questions, a complete-looking document is not enough.

The PM does not need to write every sentence personally.

But someone needs to understand and own the decisions encoded by those sentences.

## The boundary is not “human vs. AI”; it is “assistance vs. default authority”

I do not want to reduce AI to a drafting assistant.

Some of my best product thinking now happens in interaction with it.

AI proposes a different scope, and I realize what the real objective is.

It expands an automation path, and I notice that one step should stay under human control.

It lists edge cases, and I discover that the original state model is incomplete.

Those are real contributions to product judgment.

So the workflow is not:

**PM thinks → AI executes**

It is closer to:

**PM provides goals, facts, and constraints → AI explores and expands → PM confirms consequential choices → AI continues from the confirmed state.**

The thinking can be collaborative.

The authority should still be explicit.

## A practical test I now use

When AI produces something that looks like a product decision, I ask:

**If this turns out to be wrong, who needs to explain why we chose it?**

If the answer is the PM, product lead, or team, then that choice should not enter the product merely because the model filled a blank elegantly.

The areas I treat most carefully are:

- problem definition;
- priorities;
- scope boundaries;
- product rules;
- autonomy and permissions;
- risk tolerance;
- irreversible or high-impact actions;
- success criteria and final acceptance.

AI can challenge every one of them.

It can propose better answers.

It can make the decision easier to reason about.

But someone still needs to say:

> I understand this choice, I know what evidence supports it, and I accept the consequences.

That, to me, is the part of product management that should not be delegated by default.

---

*Adapted from notes written during my 100 Days Building experiment.*
