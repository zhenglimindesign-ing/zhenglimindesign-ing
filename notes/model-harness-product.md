# Model + Harness + Product: What Makes an AI Product Work

[中文版本](./model-harness-product.zh-CN.md)

When I first started comparing AI products, I naturally focused on the model.

Which model is stronger? Which one reasons better? Which one writes better code?

But after using AI more deeply for product work and software building, that framing started to feel incomplete.

The same or similar model family can behave very differently depending on where it is used. A general chat product can understand code, but a coding agent can inspect a repository, edit files, run tests, read the result, and continue. A design-oriented environment can give a model a canvas, components, and rendered feedback that a normal chat does not have.

The difference is not just intelligence.

It is the system around the model.

I now use a simple three-layer mental model:

**Model → Harness → Product**

- **Model** provides the underlying language, reasoning, and generation capability.
- **Harness** organizes that capability around a task: context, tools, runtime, permissions, execution loops, and verification.
- **Product** decides what the user is trying to accomplish, what control they keep, what the system exposes, and what experience is built around the capability.

This changed how I evaluate AI products — and how I think about building them.

## The model sets capability, but not the whole behavior

A strong model can understand a bug report, propose a fix, or explain an architecture.

But understanding what to do is different from being able to complete the work inside a real system.

Suppose I ask an AI to fix a bug.

In a normal chat, it may only see:

- the code I pasted;
- the error message;
- uploaded files;
- the conversation so far.

A coding agent may also have access to:

- the repository structure;
- related source files;
- Git state and diffs;
- project instructions;
- build output;
- test results;
- the state produced by its own previous action.

That extra environment changes the quality of the task, not merely the quantity of information.

Many software problems do not live inside one file. A failing request may depend on a schema, a service boundary, an old migration, or a recent change elsewhere in the repository.

So when an agent appears to “understand the project better,” the explanation may be partly model capability — but it may also be that the product has given the model better access to the real work context.

## Context is part of the product architecture

This was one of the first lessons that carried over from coding agents into broader AI product thinking.

An AI system needs more than information. It needs a way to distinguish which information is current, relevant, and trustworthy.

A large context window does not solve this automatically.

A workspace can contain:

- current product definitions;
- old requirements;
- abandoned directions;
- temporary scripts;
- duplicated documents;
- AI-generated notes that were never confirmed.

If the system simply exposes everything, the model may have more context but a weaker source of truth.

So the design question becomes:

**What should the model see, when should it see it, and which source should win when information conflicts?**

That is not only a prompt question. It is a data and product architecture question.

The same principle appears in user-facing AI products. If an assistant is meant to give career advice, for example, it matters whether it is reasoning from confirmed career facts, old resume drafts, inferred assumptions, or the latest job source snapshot. Access is not the same as grounding.

## Tools turn understanding into action

A model can say:

> You should run the tests.

A tool-enabled agent can actually run them.

That difference sounds obvious, but it changes the entire workflow.

Depending on the environment, a model may be able to:

- read and write files;
- execute shell commands;
- query a database;
- call APIs;
- operate a browser;
- create a pull request;
- inspect logs;
- trigger or observe deployment.

Once tools exist, the model is no longer limited to producing an answer. It can change the state of a system.

That makes the product more useful — and raises the importance of boundaries.

A model that can suggest a refund is one thing.

A model that can issue the refund is a different product.

The PM question therefore cannot stop at “can the model do this?” It has to continue into:

- should this capability be advisory or executable?
- what data can the model read?
- which actions can happen automatically?
- which actions require confirmation?
- what must remain unavailable entirely?

## The execution loop matters as much as the tool list

Tools alone are not enough.

The next difference is whether the system can observe the result of an action and decide what to do next.

A chat workflow often looks like:

**I ask → AI answers → I execute → I bring the result back → AI answers again**

An agentic workflow can look more like:

**understand → act → observe → judge → adjust → act again**

This loop matters because real work rarely succeeds perfectly on the first attempt.

Code fails tests. APIs time out. Data is missing. A generated output violates a rule. A page renders differently from what the implementation suggested.

If every new state has to be manually carried back to the model, the human still owns most of the execution loop.

If the system can observe what happened and continue inside a bounded scope, AI starts to become an execution system rather than only an answer system.

But this is also where uncontrolled retries, tool calls, and cost can emerge. A useful loop therefore needs a stopping rule, not just autonomy.

## Verification is not an afterthought

A model saying “done” is not evidence that the task is done.

This became painfully clear to me while working with coding agents.

Different conclusions require different kinds of evidence:

- a type check can verify type consistency;
- a test can verify specific behavior;
- a database query can verify stored state;
- a rendered page can verify visual output;
- a production check can verify deployed behavior.

One form of validation cannot stand in for another.

That led me to think about verification as part of the harness itself.

A useful AI environment should help answer:

- what evidence counts as completion?
- which checks should run automatically?
- what remains unverified?
- can the user inspect the result?
- can a failed change be rolled back?

This applies outside software too.

For a customer-support agent, verification might mean checking the actual order state before drafting a response.

For a research assistant, it might mean keeping source links and distinguishing quoted facts from synthesis.

For a recommendation product, it might mean showing which user evidence supports the recommendation.

The important point is that “good output” needs an observable basis.

## Permissions are a product capability, not just a security setting

One of the most useful things I learned from long coding-agent tasks was that “permission” is not one thing.

I had assumed that if I explicitly authorized a task end to end — implement, test, commit, push, open a PR, merge, deploy, verify — the agent should be able to continue through the chain.

In practice, there were still separate boundaries:

1. **Task authorization** — what I want the agent to accomplish.
2. **System execution permission** — what the environment allows it to do without another approval.
3. **External identity and authorization** — whether GitHub, a deployment platform, a database, or another service recognizes the current credentials and permits the action.

These layers are independent.

A user can authorize a deployment while the runtime still blocks network access. The runtime can allow network access while the external service rejects the credentials.

This changed my view of autonomy.

The goal is not “remove all approvals.”

The better goal is:

**make routine actions flow inside known boundaries, and escalate only when a decision genuinely needs a person.**

For a product manager, the important part is deciding which boundaries reflect business or user intent — not configuring every sandbox rule personally.

## Harness is where many product decisions become real

“Harness engineering” sounds like an engineering topic, and much of the implementation is.

But once AI can access real data or take real action, the harness starts encoding product policy.

Consider an AI customer-support agent.

Evaluation may define what a good result means:

- do not invent an order state;
- follow the refund policy;
- escalate security-sensitive cases;
- do not promise compensation without authority.

The harness turns part of those requirements into operating conditions:

- where the agent reads the latest policy;
- which account fields it can access;
- whether it can issue a refund or only recommend one;
- what amount requires approval;
- what checks run before a reply is sent;
- what context is handed to a human when the agent escalates.

Engineering implements these mechanisms.

But the underlying decisions — information access, action authority, stopping conditions, human review, acceptable failure — are product decisions too.

That is the point where I think AI PM work becomes more technical without becoming engineering ownership.

The PM does not need to build the sandbox.

The PM does need to understand what the sandbox is protecting and why.

## Product design still sits above the harness

A strong harness can make an AI system more capable, reliable, and controllable.

It still does not answer the most important product question:

**What should the user experience be?**

A product decides:

- what task the AI is helping with;
- what information is visible;
- what actions are suggested or automatic;
- where the user reviews or edits;
- how uncertainty is expressed;
- what happens when the system cannot complete the task;
- how much control the user keeps.

Two products can use the same model and similar tools while feeling completely different because they make different choices about control, transparency, and workflow.

So I no longer evaluate an AI product by asking only:

> Which model does it use?

I ask a broader set of questions.

## The questions I now use to evaluate an AI product

### What can it see?

Does it only see the current prompt, or can it access the real working context? How is source-of-truth information separated from stale or inferred context?

### What can it do?

Can it only recommend, or can it change files, data, transactions, messages, or external systems?

### Can it work through a loop?

Can it observe results and continue, or does every new state require the user to restart the reasoning process?

### How does it know it is right?

Are there tests, source links, deterministic checks, real system state, or human review — or only a plausible-looking answer?

### What are the boundaries?

What requires approval? What is never allowed? What stops retries or autonomous work from continuing indefinitely?

### What does the user control?

Can the user inspect evidence, edit the output, reject the action, recover from failure, and understand what happened?

These questions often tell me more about real product capability than a benchmark score alone.

## The takeaway

Models still matter enormously. They set much of the underlying capability ceiling.

But a usable AI product is not just a model wrapped in a UI.

It is closer to:

**Model + Context + Tools + Runtime + Execution Loop + Permissions + Verification + Product Design**

I use **Harness** as shorthand for much of the middle layer: the system that gives the model the right working conditions and constrains how it operates.

The lesson I would carry forward is not that every AI PM needs to become a harness engineer.

It is that once AI moves from generating text to working with real context, tools, and actions, product judgment has to extend beyond the model output.

We have to design what the AI can know, what it can do, when it must stop, how it proves completion, and where control returns to the user.

That is where a large part of the product actually lives.

---

*Adapted from notes written during my 100 Days Building experiment.*
