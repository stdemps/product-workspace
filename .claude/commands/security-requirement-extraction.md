---
name: security-requirement-extraction
description: Derive security requirements from threat models and business context. Use when translating threats into actionable requirements, creating security user stories, or building security test cases.
---

# Security Requirement Extraction

Transform threat analysis into actionable security requirements.

## When to Use

- Converting threat models to requirements
- Writing security user stories
- Creating security test cases
- Building security acceptance criteria
- Compliance requirement mapping
- Security architecture documentation

## Core Concepts

### Requirement Flow

```
Business Requirements --> Security Requirements --> Technical Controls
         |                       |                      |
  "Protect customer    "Encrypt PII at rest"   "AES-256 encryption
   data"                                        with KMS key rotation"
```

### Requirement Types

| Type               | Focus                   | Example                               |
| ------------------ | ----------------------- | ------------------------------------- |
| **Functional**     | What system must do     | "System must authenticate users"      |
| **Non-functional** | How system must perform | "Authentication must complete in <2s"  |
| **Constraint**     | Limitations imposed     | "Must use approved crypto libraries"  |

### Requirement Attributes

| Attribute        | Description                 |
| ---------------- | --------------------------- |
| **Traceability** | Links to threats/compliance |
| **Testability**  | Can be verified             |
| **Priority**     | Business importance         |
| **Risk Level**   | Impact if not met           |

## STRIDE-to-Requirements Mapping

| STRIDE Category | Security Domains | Requirement Patterns |
|-----------------|-----------------|---------------------|
| Spoofing | Authentication, Session Mgmt | Strong auth, token validation, session management |
| Tampering | Input Validation, Data Protection | Input validation, integrity checks, modification protection |
| Repudiation | Audit Logging | Event logging, non-repudiation, log protection |
| Info Disclosure | Data Protection, Crypto | Encryption, access controls, information leakage prevention |
| Denial of Service | Availability, Input Validation | Rate limiting, availability assurance, resource quotas |
| Elevation of Privilege | Authorization | Authorization enforcement, least privilege, server-side validation |

## Security User Story Format

```
As a [security-conscious role],
I want the system to [security requirement],
So that [security rationale].

Acceptance Criteria:
- [ ] [Specific testable criterion 1]
- [ ] [Specific testable criterion 2]
- [ ] [Specific testable criterion 3]

Priority: [Critical/High/Medium/Low]
Domain: [Authentication/Authorization/Data Protection/etc.]
Threat References: [Threat IDs from threat model]
```

## Compliance Framework Mapping

Map requirements to relevant frameworks:

| Framework  | Key Control Areas |
|-----------|------------------|
| PCI-DSS   | Authentication (8.x), Authorization (7.x), Data Protection (3.x, 4.x), Logging (10.x) |
| HIPAA     | Access Control (164.312(a)), Authentication (164.312(d)), Audit (164.312(b)) |
| GDPR      | Data Protection (Art. 32), Privacy by Design (Art. 25), Records (Art. 30) |
| OWASP ASVS | Auth (V2), Session (V3), Input (V5), Crypto (V6), Error Handling (V7), Data (V8) |

## Process

1. **Gather Threats** — From STRIDE analysis, attack trees, or threat models
2. **Map to Domains** — Assign each threat to security domains
3. **Generate Requirements** — Create specific, testable requirements per threat
4. **Add Acceptance Criteria** — Define how to verify each requirement
5. **Create Test Cases** — Build automated and manual test plans
6. **Map to Compliance** — Link requirements to regulatory controls
7. **Prioritize** — Score by impact x likelihood, focus on critical first
8. **Track** — Maintain traceability from threat to requirement to implementation

## Best Practices

- **Trace to threats** — Every requirement should map to threats
- **Be specific** — Vague requirements can't be tested
- **Include acceptance criteria** — Define "done"
- **Consider compliance** — Map to frameworks early
- **Review regularly** — Requirements evolve with threats
- **Don't be generic** — "Be secure" is not a requirement
- **Don't skip rationale** — Explain why it matters

## Resources

- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/)
- [NIST SP 800-53](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)
