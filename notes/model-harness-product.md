# Model + Harness + Product: What Makes an AI Product Work

[中文版本](./model-harness-product.zh-CN.md)

When I first started comparing AI products, I naturally focused on the model.

Which model is stronger? Which one reasons better? Which one writes better code?

After using AI more deeply for product work and software building, that framing started to feel incomplete.

A general chat product can understand code, but a coding agent can inspect a repository, edit files, run tests, read the result, and continue. A design-oriented environment can give a model a canvas, components, and rendered feedback that a normal chat does not have.

The difference is not just intelligence. It is the system around the model.

I now use a simple three-layer mental model:

**Model → Harness → Product**

- **Model** provides the underlying language, reasoning, and generation capability.
- **Harness** organizes that capability around a task: context, tools, runtime, permissions, execution loops, and verification.
- **Product** decides what the user is trying to accomplish, what control they keep, and what experience is built around the capability.

This changed how I evaluate AI products — and how I think about building them.

## The model is not the whole product

A strong model can understand a bug report, propose a fix, or explain an architecture.

But understanding what to do is different from being able to complete the work inside a real system.

Suppose I ask an AI to fix a bug.

In a normal chat, it may only see the code I pasted, an error message, uploaded files, and the conversation so far.

A coding agent may also have access to:

- the repository structure and related source files;
- Git state and diffs;
- project instructions;
- build and test output;
- the state produced by its own previous action.

Many software problems do not live inside one file. A failing request may depend on a schema, a service boundary, an old migration, or a recent change elsewhere in the repository.

So when an agent appears to “understand the project better,” the explanation may be partly model capability — but also better access to the real work context.

That same principle applies beyond coding.

An AI system needs more than information. It needs a way to distinguish which information is current, relevant, and trustworthy.

A workspace may contain current product definitions, old requirements, abandoned directions, temporary files, and AI-generated notes that were never confirmed. Exposing everything creates more context, but not necessarily a better source of truth.

The product question becomes:

**What should the model see, when should it see it, and which source should win when information conflicts?**

Access is not the same as grounding.

## Tools and execution loops change what the AI can actually do

A model can say:

> You should run the tests.

A tool-enabled agent can actually run them.

Depending on the environment, it may be able to read and write files, execute commands, query a database, call APIs, operate a browser, inspect logs, or create a pull request.

Once tools exist, the model is no longer limited to producing an answer. It can change the state of a system.

That immediately creates a product distinction:

A model that can **recommend** a refund is one thing. A model that can **issue** the refund is a different product.

The PM question therefore cannot stop at “can the model do this?” It has to continue into:

- should this capability be advisory or executable?
- what data can the model read?
- which actions can happen automatically?
- which actions require confirmation?
- what must remain unavailable entirely?

Tools alone are not enough. The next question is whether the system can observe the result of an action and decide what to do next.

A chat workflow often looks like:

**I ask → AI answers → I execute → I bring the result back → AI answers again**

An agentic workflow can look more like:

**understand → act → observe → judge → adjust → act again**

That loop matters because real work rarely succeeds perfectly on the first attempt. Tests fail, APIs time out, data is missing, and generated outputs violate rules.

If every new state has to be manually carried back to the model, the human still owns most of the execution loop.

If the system can observe what happened and continue inside a bounded scope, AI starts to become an execution system rather than only an answer system.

But autonomy also creates retries, tool calls, cost, and failure modes. A useful loop therefore needs a stopping rule, not just the ability to continue.

## Verification and permissions determine whether autonomy is trustworthy

A model saying “done” is not evidence that the task is done.

This became very concrete for me while working with coding agents.

Different conclusions require different kinds of evidence:

- a type check can verify type consistency;
- a test can verify specific behavior;
- a database query can verify stored state;
- a rendered page can verify visual output;
- a production check can verify deployed behavior.

One form of validation cannot stand in for another.

So verification is not merely a final QA step. It is part of the environment the AI works inside.

A useful system should make it possible to answer:

- what evidence counts as completion?
- which checks run automatically?
- what remains unverified?
- can the user inspect the result?
- can a failed action be recovered or rolled back?

Permissions have a similar structure.

I once assumed that if I explicitly authorized a long coding task end to end — implement, test, commit, push, open a PR, merge, deploy, verify — the agent should simply continue through the chain.

In practice, at least three different layers were involved:

1. **Task authorization** — what I want the agent to accomplish.
2. **System execution permission** — what the runtime allows it to do without another approval.
3. **External identity and authorization** — whether GitHub, a deployment platform, a database, or another service recognizes the current credentials and permits the action.

These layers are independent.

A user can authorize deployment while the runtime still blocks network access. The runtime can allow network access while an external service rejects the credentials.

That changed my view of autonomy.

The goal is not to remove every approval. The better goal is:

**make routine actions flow inside known boundaries, and escalate only when a decision genuinely needs a person.**

## Harness is where many product decisions become operating rules

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
- what context is handed to a person when the agent escalates.

Engineering implements these mechanisms.

But the underlying choices — information access, action authority, stopping conditions, human review, acceptable failure — are product decisions too.

This is where I think AI PM work becomes more technical without becoming engineering ownership.

The PM does not need to build the sandbox. The PM does need to understand what the sandbox is protecting and why.

## Product still sits above the harness

A strong harness can make an AI system more capable, reliable, and controllable.

It still does not answer the most important product question:

**What should the user experience be?**

Product design still decides:

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

I also ask:

- **What can it see?** Is the working context trustworthy and current?
- **What can it do?** Can it only recommend, or can it change real systems?
- **Can it work through a loop?** Can it observe results and continue within a bounded scope?
- **How does it know it is right?** Are there tests, sources, deterministic checks, real system state, or human review?
- **Where are the boundaries?** What requires approval, what is never allowed, and what stops retries or autonomous work?
- **What does the user control?** Can the user inspect evidence, edit, reject, recover, and understand what happened?

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
