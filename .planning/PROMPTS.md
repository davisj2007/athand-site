# Session prompts

Start a new Claude Code session for each prompt. Replace NN with the phase number. Paste the prompt as the first message and nothing else. After each session, merge its PR on GitHub before starting the next session.

## STATUS

```
STATUS. Follow .planning/README.md, step STATUS.
```

## DISCUSS

```
DISCUSS phase NN. Follow .planning/README.md, step DISCUSS.
```

## ANSWERS

```
ANSWERS phase NN. Follow .planning/README.md, step ANSWERS. Answers:

1. ...
2. ...

Copy: approved as drafted, except:

1. ...
```

Use "Copy: not applicable." for a phase with no copy. Use "Copy: not yet approved." to answer questions without approving copy.

## PLAN

```
PLAN phase NN. Follow .planning/README.md, step PLAN.
```

## REVISE

```
REVISE phase NN. Follow .planning/README.md, step REVISE. Changes:

1. ...
```

## EXECUTE (run once per wave)

```
EXECUTE phase NN. I have reviewed PLAN.md for this phase and approve it. Follow .planning/README.md, step EXECUTE.
```

## VERIFY

```
VERIFY phase NN. Follow .planning/README.md, step VERIFY.
```

## FIX

```
FIX phase NN. Follow .planning/README.md, step FIX.
```

## SHIP

```
SHIP phase NN. Browser result: PASS (or FAIL, or not applicable). Notes: ... Follow .planning/README.md, step SHIP.
```

## Phase 05 only

Phase 05 is gated on App Store approval. Its DISCUSS prompt adds the approval:

```
DISCUSS phase 05. Apple approved atHand and the listing is live at https://apps.apple.com/app/id6817842698. Follow .planning/README.md, step DISCUSS.
```
