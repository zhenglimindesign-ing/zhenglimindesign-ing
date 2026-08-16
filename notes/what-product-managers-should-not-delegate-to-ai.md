# What Product Managers Should—and Shouldn’t—Delegate to AI

[中文版本](./what-product-managers-should-not-delegate-to-ai.zh-CN.md)

The more I use AI in product work, the less useful I find the question:

> What can AI do for a PM?

The answer is already: a lot.

AI can summarize research, draft PRDs, map workflows, surface edge cases, compare options, propose acceptance criteria, and turn messy discussion into structured requirements.

The harder question is:

> Which parts of product work can AI help perform, and which decisions still need an explicit human owner?

I do not think the right boundary is “AI executes, PM thinks.” AI can contribute meaningfully to thinking too: challenge a framing, expose an inconsistency, propose a better scope split, or reveal a failure path I had not considered.

The boundary I find more useful is:

**AI can expand, organize, and recommend. Consequential product choices still need an accountable owner.**

## Generation is not decision

A product document usually mixes several kinds of work:

1. organizing known facts;
2. expanding missing details;
3. proposing options;
4. choosing between options;
5. defining how the product will actually behave.

AI is excellent at the first three. The risk begins when those outputs silently become the last two.

A generated PRD might say:

> If generation fails, the system automatically retries and replaces the previous result.

That sounds like ordinary exception handling. But it has already decided:

- whether retry is automatic;
- whether another paid call is allowed;
- whether the previous result remains available;
- whether the user is informed;
- what happens after repeated failure.

The model may simply have filled a gap because a complete document needed an answer.

That does not mean the product actually decided it.

**AI-generated completeness should not be mistaken for product agreement.**

## 1. AI can help frame the problem; it should not silently define it

AI can turn a vague idea into a coherent user, pain point, value proposition, and opportunity very quickly.

That is useful — and dangerous if coherence is mistaken for evidence.

I still use AI heavily here. I ask it to challenge my first framing, propose alternative explanations, separate symptoms from causes, identify missing evidence, and point out where I may already be jumping to a solution.

But the product owner still needs to decide:

- what problem is actually worth solving;
- whether it is a real user problem or an internally convenient one;
- whether the product addresses a root cause or adds another layer of workflow;
- what evidence would be enough to continue.

AI can improve the framing process. It cannot turn an unvalidated assumption into a validated problem simply by writing it well.

## 2. AI can propose scope; a human should own the boundary

Given a broad goal, AI can decompose work into stages, identify dependencies, propose MVP variants, and compare trade-offs.

That is often much better than starting from a blank page.

But AI also tends to make a plan feel complete. It can keep adding states, edge cases, supporting features, and operational detail because each one is individually reasonable.

Product scope is not a list of everything that would make the product complete.

It is the decision to stop deliberately.

The human owner needs to confirm:

- what this stage is trying to learn or prove;
- which users and scenarios are covered now;
- which imperfections are acceptable for the moment;
- which risks must be solved before launch;
- which problems are explicitly deferred.

This matters even more with AI-assisted development. When implementation becomes faster, scope can expand without creating the friction that used to force a team to stop and reconsider.

AI can make scope options visible. It should not get the default right to expand the product simply because the extra work looks feasible.

## 3. AI can expose missing product rules; it should not invent them invisibly

Some of the most consequential product decisions live inside workflow rules:

- when does an item change state?
- who can perform an action?
- when must the user confirm?
- what happens when evidence is missing?
- does the system continue under uncertainty or stop?
- can a previous result be restored?

AI is very good at finding these gaps. That is one reason I want it involved early.

But there is a crucial difference between:

> You have not decided what happens when confidence is low.

and:

> When confidence is low, the system automatically proceeds with a warning.

The first exposes a product question. The second makes a policy decision.

So when AI expands a workflow, I want new rules to be distinguishable as:

- **confirmed** — already decided;
- **proposed** — reasonable, but still needs a decision;
- **unknown** — a gap that should remain open rather than be guessed.

The labels are not important. The visibility is.

A plausible completion should not become product behavior without anyone noticing.

## 4. AI can enumerate risk; a human should decide what risk the product accepts

Models are useful for surfacing risks: wrong data, misunderstood output, irreversible actions, external-service failure, low confidence.

But identifying risk and accepting risk are different jobs.

There may be no universally correct answer to questions such as:

- should an action be automatic or advisory?
- should low-confidence output be shown, blocked, or escalated?
- how much friction is acceptable before a high-risk action?
- when should the system stop and return control to a person?

These choices reflect the users, business model, regulatory environment, reversibility, and cost of failure.

AI can compare the trade-offs.

It should not quietly choose the organization’s risk tolerance.

## The real boundary is assistance vs. default authority

I do not want to reduce AI to a drafting assistant.

Some of my best product thinking now happens in interaction with it. AI proposes a different scope and I realize what the real objective is. It expands an automation path and I notice that one step should remain under human control. It lists edge cases and exposes an incomplete state model.

Those are real contributions to product judgment.

So the workflow is not:

**PM thinks → AI executes**

It is closer to:

**PM provides goals, facts, and constraints → AI explores and expands → PM confirms consequential choices → AI continues from the confirmed state.**

The thinking can be collaborative. The authority should still be explicit.

This also changes how I review AI-generated product work. I care less about whether the document looks complete and more about whether I can answer:

- What did we actually decide?
- Why?
- What remains a hypothesis?
- What did AI propose that we did not accept?
- What is still unresolved?

The PM does not need to write every sentence personally. But someone needs to understand and own the decisions encoded by those sentences.

## A practical test

When AI produces something that looks like a product decision, I ask:

**If this turns out to be wrong, who needs to explain why we chose it?**

If the answer is the PM, product lead, or team, that choice should not enter the product merely because the model filled a blank elegantly.

I am especially careful with:

- problem definition;
- priorities and scope boundaries;
- product rules;
- autonomy and permissions;
- risk tolerance;
- irreversible or high-impact actions;
- success criteria and final acceptance.

AI can challenge every one of these. It can propose better answers and make the trade-offs clearer.

But someone still needs to say:

> I understand this choice, I know what evidence supports it, and I accept the consequences.

That, to me, is the part of product management that should not be delegated by default.

---

*Adapted from notes written during my 100 Days Building experiment.*
