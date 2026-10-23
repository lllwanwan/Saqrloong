/* Seeded repository used by the workspace. Replace the adapter with a real API/database later. */
(function () {
  const seed = {
    "meta": {
      "version": 7,
      "productContentVersion": 7,
      "updatedAt": "2026-10-23T00:00:00Z",
      "sampleData": true,
      "currencyVersion": 1,
      "currency": "USD"
    },
    "companies": [
      {
        "id": "co-nura",
        "name": "Nura Systems",
        "country": "Saudi Arabia",
        "city": "Riyadh",
        "initials": "NS",
        "color": "#aee94b",
        "verified": true,
        "description": "Arabic-first enterprise search and knowledge workflows for regulated teams."
      },
      {
        "id": "co-hanriver",
        "name": "HanRiver AI",
        "country": "China",
        "city": "Shanghai",
        "initials": "HA",
        "color": "#5a45e8",
        "verified": true,
        "description": "Private retrieval systems with multilingual document processing and deployment services."
      },
      {
        "id": "co-dunetech",
        "name": "DuneTech Labs",
        "country": "Saudi Arabia",
        "city": "Jeddah",
        "initials": "DT",
        "color": "#f47639",
        "verified": true,
        "description": "Operations copilots for field teams, service desks and professional services."
      },
      {
        "id": "co-lattice",
        "name": "LatticeWorks",
        "country": "China",
        "city": "Shenzhen",
        "initials": "LW",
        "color": "#47b7b1",
        "verified": true,
        "description": "Document intelligence and contract review products for enterprise workflows."
      },
      {
        "id": "co-redsea",
        "name": "Red Sea Vision",
        "country": "Saudi Arabia",
        "city": "Dammam",
        "initials": "RV",
        "color": "#f0b43c",
        "verified": false,
        "description": "Visual inspection and safety reporting for industrial operators."
      },
      {
        "id": "co-levant",
        "name": "Levant Compute",
        "country": "Jordan",
        "city": "Amman",
        "initials": "LC",
        "color": "#dd6b9a",
        "verified": true,
        "description": "Arabic speech, call center automation and secure regional inference."
      },
      {
        "id": "co-oasis",
        "name": "Oasis Data Works",
        "country": "Saudi Arabia",
        "city": "Al Khobar",
        "initials": "OD",
        "color": "#6c8df5",
        "verified": true,
        "description": "Industrial data pipelines, dashboards and forecasting for operations teams."
      },
      {
        "id": "co-pixel",
        "name": "PixelRoute AI",
        "country": "United Arab Emirates",
        "city": "Dubai",
        "initials": "PR",
        "color": "#58b9a7",
        "verified": true,
        "description": "Multimodal customer support and document intake for regional businesses."
      }
    ],
    "users": [
      {
        "id": "USR-BUY-001",
        "email": "buyer@almanar.sa",
        "password": "111111",
        "name": "Al Manar Advisory",
        "company": "Al Manar Advisory",
        "role": "buyer",
        "country": "Saudi Arabia",
        "city": "Riyadh",
        "phone": "+966 11 555 0101",
        "avatar": "AM",
        "address": "Olaya Street, Riyadh",
        "postalCode": "12221",
        "taxId": "310987654300003",
        "preferredCurrency": "USD"
      },
      {
        "id": "USR-SELL-001",
        "email": "seller@nura.sa",
        "password": "111111",
        "name": "Nura Systems Sales",
        "company": "Nura Systems",
        "companyId": "co-nura",
        "role": "seller",
        "country": "Saudi Arabia",
        "city": "Riyadh",
        "phone": "+966 11 555 0188",
        "avatar": "NS",
        "address": "King Fahd Road, Al Olaya, Riyadh",
        "postalCode": "12211",
        "taxId": "310456789100003",
        "preferredCurrency": "USD",
        "website": "https://nura.sa"
      },
      {
        "id": "USR-SELL-002",
        "email": "seller@hanriver.ai",
        "password": "111111",
        "name": "HanRiver AI Commerce",
        "company": "HanRiver AI",
        "companyId": "co-hanriver",
        "role": "seller",
        "country": "China",
        "city": "Shanghai",
        "phone": "+86 21 5555 0102",
        "avatar": "HA",
        "preferredCurrency": "USD"
      },
      {
        "id": "USR-SELL-003",
        "email": "seller@dunetech.sa",
        "password": "111111",
        "name": "DuneTech Labs Sales",
        "company": "DuneTech Labs",
        "companyId": "co-dunetech",
        "role": "seller",
        "country": "Saudi Arabia",
        "city": "Jeddah",
        "phone": "+966 12 555 0166",
        "avatar": "DT",
        "preferredCurrency": "USD"
      },
      {
        "id": "USR-SELL-004",
        "email": "seller@latticeworks.cn",
        "password": "111111",
        "name": "LatticeWorks Commerce",
        "company": "LatticeWorks",
        "companyId": "co-lattice",
        "role": "seller",
        "country": "China",
        "city": "Shenzhen",
        "phone": "+86 755 5555 0144",
        "avatar": "LW",
        "preferredCurrency": "USD"
      },
      {
        "id": "USR-SELL-005",
        "email": "seller@levantcompute.jo",
        "password": "111111",
        "name": "Levant Compute Partnerships",
        "company": "Levant Compute",
        "companyId": "co-levant",
        "role": "seller",
        "country": "Jordan",
        "city": "Amman",
        "phone": "+962 6 555 0175",
        "avatar": "LC",
        "preferredCurrency": "USD"
      },
      {
        "id": "USR-SELL-006",
        "email": "seller@oasisdata.sa",
        "password": "111111",
        "name": "Oasis Data Works Sales",
        "company": "Oasis Data Works",
        "companyId": "co-oasis",
        "role": "seller",
        "country": "Saudi Arabia",
        "city": "Al Khobar",
        "phone": "+966 13 555 0199",
        "avatar": "OD",
        "preferredCurrency": "USD"
      },
      {
        "id": "USR-SELL-007",
        "email": "seller@pixelroute.ae",
        "password": "111111",
        "name": "PixelRoute AI Commerce",
        "company": "PixelRoute AI",
        "companyId": "co-pixel",
        "role": "seller",
        "country": "United Arab Emirates",
        "city": "Dubai",
        "phone": "+971 4 555 0124",
        "avatar": "PR",
        "preferredCurrency": "USD"
      },
      {
        "id": "USR-SELL-008",
        "email": "seller@redseavision.sa",
        "password": "111111",
        "name": "Red Sea Vision Sales",
        "company": "Red Sea Vision",
        "companyId": "co-redsea",
        "role": "seller",
        "country": "Saudi Arabia",
        "city": "Dammam",
        "phone": "+966 13 555 0210",
        "avatar": "RV",
        "preferredCurrency": "USD"
      },
      {
        "id": "USR-BUY-002",
        "email": "procurement@najdlogistics.sa",
        "password": "111111",
        "name": "Najd Logistics Procurement",
        "company": "Najd Logistics Group",
        "role": "buyer",
        "country": "Saudi Arabia",
        "city": "Riyadh",
        "phone": "+966 11 555 0222",
        "avatar": "NL",
        "preferredCurrency": "USD"
      },
      {
        "id": "USR-BUY-003",
        "email": "ops@redlinehealth.sa",
        "password": "111111",
        "name": "Redline Health Operations",
        "company": "Redline Health",
        "role": "buyer",
        "country": "Saudi Arabia",
        "city": "Jeddah",
        "phone": "+966 12 555 0233",
        "avatar": "RH",
        "preferredCurrency": "USD"
      }
    ],
    "orders": [
      {
        "id": "ORD-001",
        "publisherUserId": "USR-SELL-001",
        "sellerUserId": "USR-SELL-001",
        "buyerUserId": "USR-BUY-001",
        "productId": "prd-nura-knowledge",
        "title": "Nura Knowledge Cloud · Professional services pilot",
        "status": "In delivery",
        "orderedAt": "2026-10-19",
        "monthly": 1200,
        "setup": 800,
        "total": 2000,
        "currency": "USD",
        "nextStep": "Confirm approved sample documents"
      },
      {
        "id": "ORD-002",
        "publisherUserId": "USR-SELL-001",
        "sellerUserId": "USR-SELL-001",
        "buyerUserId": "USR-BUY-001",
        "productId": "prd-nura-knowledge",
        "title": "Nura Knowledge Cloud · Renewal",
        "status": "Awaiting renewal",
        "orderedAt": "2026-09-18",
        "monthly": 1200,
        "setup": 0,
        "total": 1200,
        "currency": "USD",
        "nextStep": "Review monthly usage"
      },
      {
        "id": "ORD-003",
        "publisherUserId": "USR-SELL-002",
        "sellerUserId": "USR-SELL-002",
        "buyerUserId": "USR-BUY-001",
        "productId": "prd-hanriver-documind",
        "title": "DocuMind Enterprise · Connector assessment",
        "status": "Completed",
        "orderedAt": "2026-10-04",
        "monthly": 1400,
        "setup": 1100,
        "total": 2500,
        "currency": "USD",
        "nextStep": "Archive evaluation report"
      },
      {
        "id": "ORD-004",
        "publisherUserId": "USR-SELL-003",
        "sellerUserId": "USR-SELL-003",
        "buyerUserId": "USR-BUY-001",
        "productId": "prd-dunetech-ops",
        "title": "DuneOps Copilot · Field workflow review",
        "status": "Quote sent",
        "orderedAt": "2026-10-16",
        "monthly": 1000,
        "setup": 650,
        "total": 1650,
        "currency": "USD",
        "nextStep": "Waiting for scope approval"
      },
      {
        "id": "ORD-005",
        "publisherUserId": "USR-SELL-004",
        "sellerUserId": "USR-SELL-004",
        "buyerUserId": "USR-BUY-002",
        "productId": "prd-lattice-contract",
        "title": "Lattice Contract Lens · Renewal review",
        "status": "In delivery",
        "orderedAt": "2026-10-12",
        "monthly": 750,
        "setup": 500,
        "total": 1250,
        "currency": "USD",
        "nextStep": "Upload contract sample set"
      },
      {
        "id": "ORD-006",
        "publisherUserId": "USR-SELL-005",
        "sellerUserId": "USR-SELL-005",
        "buyerUserId": "USR-BUY-003",
        "productId": "prd-levant-voice",
        "title": "Levant Voice Desk · Contact center test",
        "status": "Completed",
        "orderedAt": "2026-09-26",
        "monthly": 850,
        "setup": 400,
        "total": 1250,
        "currency": "USD",
        "nextStep": "Review acceptance notes"
      },
      {
        "id": "ORD-007",
        "publisherUserId": "USR-SELL-006",
        "sellerUserId": "USR-SELL-006",
        "buyerUserId": "USR-BUY-001",
        "productId": "prd-oasis-forecast",
        "title": "Oasis Forecast Hub · Demand planning",
        "status": "Quote sent",
        "orderedAt": "2026-10-11",
        "monthly": 1150,
        "setup": 600,
        "total": 1750,
        "currency": "USD",
        "nextStep": "Confirm data connector scope"
      },
      {
        "id": "ORD-008",
        "publisherUserId": "USR-SELL-007",
        "sellerUserId": "USR-SELL-007",
        "buyerUserId": "USR-BUY-002",
        "productId": "prd-pixel-intake",
        "title": "PixelRoute Intake · Multimodal support",
        "status": "Awaiting renewal",
        "orderedAt": "2026-08-30",
        "monthly": 1350,
        "setup": 700,
        "total": 2050,
        "currency": "USD",
        "nextStep": "Review monthly case volume"
      }
    ],
    "conversations": [
      {
        "id": "CONV-001",
        "participantIds": [
          "USR-BUY-001",
          "USR-SELL-001"
        ],
        "orderId": "ORD-001",
        "messages": [
          {
            "id": "MSG-001",
            "senderId": "USR-BUY-001",
            "language": "Arabic",
            "original": "الحد الأقصى للشهر الأول هو 2,200 USD. هل يمكن أن نبدأ بدون تكامل مخصص؟",
            "translations": {
              "EN": "First-month cap is USD 2,200. Can we start without a custom integration?",
              "ZH": "首月预算上限是 2,200 USD。我们可以先不做定制集成吗？"
            },
            "createdAt": "2026-10-19T08:30:00Z"
          },
          {
            "id": "MSG-002",
            "senderId": "USR-SELL-001",
            "language": "English",
            "original": "Yes. We can start with manual document uploads. Setup is USD 800 and monthly is USD 1,200.",
            "translations": {
              "ZH": "可以。我们可以先手动上传文档，实施费 800 USD，月费 1,200 USD。",
              "SA": "نعم. يمكننا البدء برفع المستندات يدوياً. الإعداد 800 USD والشهري 1,200 USD."
            },
            "createdAt": "2026-10-19T09:05:00Z"
          }
        ]
      },
      {
        "id": "CONV-002",
        "participantIds": [
          "USR-BUY-001",
          "USR-SELL-002"
        ],
        "orderId": "ORD-003",
        "messages": [
          {
            "id": "MSG-003",
            "senderId": "USR-BUY-001",
            "language": "English",
            "original": "Please share the connector requirements and deployment options.",
            "translations": {
              "ZH": "请分享连接器要求和部署选项。",
              "SA": "يرجى مشاركة متطلبات الموصلات وخيارات النشر."
            },
            "createdAt": "2026-10-04T10:20:00Z"
          }
        ]
      }
    ],
    "products": [
      {
        "id": "prd-nura-knowledge",
        "companyId": "co-nura",
        "name": "Nura Knowledge Cloud",
        "category": "Knowledge assistant",
        "summary": "Private Arabic-English answers from approved company documents.",
        "description": "Nura Knowledge Cloud gives professional-services teams a controlled way to find answers across approved Arabic and English policies, proposals, service manuals and internal playbooks. Staff ask questions in everyday language and receive concise answers linked to the source passages, so reviewers can verify the context before acting. Administrators can organize content by team and document permissions, while Arabic OCR helps bring scanned files into the same search experience. A pilot can begin with manual document uploads and a defined sample set; custom connectors and broader rollout are scoped separately after the buyer validates relevance, access rules and answer quality.",
        "productInfo": {
          "audience": [
            "Professional-services teams",
            "Knowledge managers",
            "IT and compliance leads"
          ],
          "problems": [
            "Staff lose time searching across approved internal documents",
            "Answers need a traceable source passage",
            "Arabic and English content must be handled in one workflow"
          ],
          "useCases": [
            "Find policy requirements",
            "Search proposal and service knowledge",
            "Answer internal process questions with citations"
          ],
          "inputs": [
            "Approved PDF, DOCX and text documents",
            "Scanned Arabic documents for OCR",
            "Document owner and access-group metadata"
          ],
          "outputs": [
            "Arabic or English answer",
            "Source citations and passages",
            "Search result with document title"
          ],
          "workflow": [
            "Provider and buyer agree an approved pilot sample",
            "Buyer uploads documents manually",
            "Admin assigns document access groups",
            "Users ask questions and review cited evidence",
            "Both parties record missed answers and acceptance feedback"
          ],
          "integrations": [
            "Manual upload in pilot",
            "Custom repository connectors require separate scoping"
          ],
          "governance": [
            "Document-level permissions are part of the offer",
            "Use only buyer-approved documents",
            "Citations support review; a user remains responsible for decisions",
            "Hosting and retention configuration must be confirmed in the pilot"
          ],
          "deploymentNotes": "Saudi private-cloud deployment or buyer-controlled VPC; environment, residency and access configuration are confirmed during discovery.",
          "implementation": [
            "Scope workshop and sample-set selection",
            "Workspace and access-group configuration",
            "Document ingestion and retrieval setup",
            "User acceptance session and handover"
          ],
          "deliverables": [
            "Configured pilot workspace",
            "Ingested approved sample set",
            "Admin and user walkthrough",
            "Pilot findings and next-phase scope"
          ],
          "exclusions": [
            "Custom integrations",
            "Unapproved external content",
            "Legal or professional advice",
            "Guaranteed answer accuracy without buyer acceptance testing"
          ],
          "acceptanceCriteria": [
            "Test questions are agreed by both parties",
            "Answers show a relevant source citation where supporting content exists",
            "Users from different access groups can only see permitted content",
            "Known gaps and unresolved questions are documented"
          ],
          "pricingNotes": "Illustrative listing price: USD 1,200 per month plus USD 800 one-time setup; tax treatment and final pilot scope are confirmed in the quote.",
          "evidenceNotes": "Capabilities and deployment options are listing claims for evaluation; confirm hosting, retention, OCR coverage and access behavior before production use."
        },
        "monthly": 1200,
        "setup": 800,
        "languages": [
          "Arabic",
          "English"
        ],
        "deployment": [
          "Saudi private cloud",
          "Buyer VPC"
        ],
        "users": 50,
        "support": "Business hours · Arabic support",
        "capabilities": [
          "Citations",
          "Document permissions",
          "Arabic OCR",
          "Manual upload"
        ],
        "evidence": 92,
        "availability": "Available in 2 weeks",
        "featured": true,
        "contentLanguage": "en",
        "currency": "USD"
      },
      {
        "id": "prd-hanriver-documind",
        "companyId": "co-hanriver",
        "name": "DocuMind Enterprise",
        "category": "Knowledge assistant",
        "summary": "Multilingual retrieval with connectors for enterprise content systems.",
        "description": "DocuMind Enterprise helps organizations search information distributed across approved drives, wikis and business systems. It combines multilingual retrieval with source citations and role-aware access so employees can explore content without losing sight of where an answer came from. A connector assessment identifies systems, authentication methods, content ownership and permission behavior before any production synchronization begins. The evaluation kit supports a measured trial using agreed questions and a representative document set, giving buyers a way to review retrieval quality and connector coverage before committing to a larger rollout.",
        "productInfo": {
          "audience": [
            "Enterprise IT teams",
            "Knowledge operations",
            "Multilingual business units"
          ],
          "problems": [
            "Knowledge is spread across content systems",
            "Search results need citations and access controls",
            "Teams need to evaluate connector fit before rollout"
          ],
          "useCases": [
            "Cross-system internal search",
            "Policy and procedure discovery",
            "Multilingual knowledge retrieval"
          ],
          "inputs": [
            "Approved repositories and connector credentials",
            "Content and permission metadata",
            "Buyer-provided evaluation questions"
          ],
          "outputs": [
            "Search results with source citations",
            "Answers across Chinese, English and Arabic content",
            "Evaluation observations for retrieval quality"
          ],
          "workflow": [
            "Inventory repositories and identity model",
            "Run a connector and permission assessment",
            "Select a representative evaluation corpus",
            "Review results against agreed questions",
            "Approve the target rollout scope"
          ],
          "integrations": [
            "Enterprise content connectors, subject to system and permission compatibility review"
          ],
          "governance": [
            "Role permissions are listed as a capability",
            "Connector access is scoped to buyer-approved sources",
            "Identity, retention and regional processing terms require contract review"
          ],
          "deploymentNotes": "Listed options are China cloud and global SaaS; confirm supported region, data routing and buyer policy fit before uploading content.",
          "implementation": [
            "Repository discovery",
            "Connector feasibility review",
            "Evaluation workspace configuration",
            "Quality review and rollout recommendation"
          ],
          "deliverables": [
            "Connector assessment",
            "Configured evaluation space",
            "Evaluation kit and findings",
            "Documented rollout dependencies"
          ],
          "exclusions": [
            "Unsupported repository adapters",
            "Changes to the buyer's source permissions",
            "Guaranteed retrieval quality before testing"
          ],
          "acceptanceCriteria": [
            "In-scope repositories and access groups are documented",
            "Agreed test questions return reviewable source results",
            "Permission behavior is verified with buyer test accounts",
            "Connector limitations are recorded"
          ],
          "pricingNotes": "Illustrative listing price: USD 1,400 per month plus USD 1,100 setup; connector count and support scope are finalized in a quote.",
          "evidenceNotes": "Confirm regional hosting, connector availability, permission synchronization and language-specific quality with the provider."
        },
        "monthly": 1400,
        "setup": 1100,
        "languages": [
          "Chinese",
          "English",
          "Arabic"
        ],
        "deployment": [
          "China cloud",
          "Global SaaS"
        ],
        "users": 100,
        "support": "24/5 · English and Chinese",
        "capabilities": [
          "Citations",
          "Connectors",
          "Role permissions",
          "Evaluation kit"
        ],
        "evidence": 88,
        "availability": "Available in 4 weeks",
        "featured": true,
        "contentLanguage": "en",
        "currency": "USD"
      },
      {
        "id": "prd-dunetech-ops",
        "companyId": "co-dunetech",
        "name": "DuneOps Copilot",
        "category": "Operations agent",
        "summary": "Turns service procedures and work orders into an assistant for field teams.",
        "description": "DuneOps Copilot gives dispatchers and field technicians a searchable guide to approved procedures, service manuals and work-order context. A technician can find the next relevant instruction, capture a handoff and leave an auditable note for the person who owns the next step. Arabic OCR supports scanned operational forms, while the workflow is designed to keep a human operator in control of safety-sensitive actions. A pilot starts with selected procedures and a small group of users, then uses observed task completion and escalation behavior to plan broader deployment.",
        "productInfo": {
          "audience": [
            "Field-service organizations",
            "Dispatch teams",
            "Operations and safety managers"
          ],
          "problems": [
            "Technicians need a consistent view of procedures in the field",
            "Work-order handoffs are difficult to track",
            "Scanned Arabic forms are hard to search"
          ],
          "useCases": [
            "Find approved service steps",
            "Summarize work-order context",
            "Hand off unresolved tasks with an audit note"
          ],
          "inputs": [
            "Approved SOPs and service manuals",
            "Work-order fields",
            "Scanned Arabic forms and technician notes"
          ],
          "outputs": [
            "Procedure search results",
            "Suggested next task and source",
            "Handoff note and activity record"
          ],
          "workflow": [
            "Choose one team and a set of low-risk procedures",
            "Load approved manuals and sample work orders",
            "Configure routing and escalation owners",
            "Run field tests with human confirmation",
            "Review exceptions before expansion"
          ],
          "integrations": [
            "Work-order data import and task-system handoff are scoped against buyer systems"
          ],
          "governance": [
            "Recommendations do not replace safety procedures or supervisor approval",
            "Audit trail records configured actions",
            "Access roles and offline synchronization behavior require pilot validation"
          ],
          "deploymentNotes": "Saudi private-cloud or on-premise deployment; network, device and offline requirements are checked during technical discovery.",
          "implementation": [
            "Procedure and workflow mapping",
            "Content preparation",
            "User and escalation setup",
            "Field pilot and review"
          ],
          "deliverables": [
            "Configured operations workspace",
            "Mapped pilot procedures",
            "Handoff and escalation configuration",
            "Pilot observations and expansion plan"
          ],
          "exclusions": [
            "Autonomous execution of safety-critical work",
            "Replacement of the official work-order system",
            "Unscoped hardware or device procurement"
          ],
          "acceptanceCriteria": [
            "Pilot users can locate in-scope procedures",
            "Handoffs identify an owner and preserve task context",
            "Safety escalation paths are tested",
            "Offline behavior is documented for pilot devices"
          ],
          "pricingNotes": "Illustrative listing price: USD 1,000 per month plus USD 650 setup; site count, workflow integrations and device scope may change the quote.",
          "evidenceNotes": "Confirm OCR coverage, offline behavior, audit retention and deployment prerequisites in the pilot."
        },
        "monthly": 1000,
        "setup": 650,
        "languages": [
          "Arabic",
          "English"
        ],
        "deployment": [
          "Saudi private cloud",
          "On-premise"
        ],
        "users": 60,
        "support": "Arabic support · 12/6",
        "capabilities": [
          "Procedure search",
          "Task handoff",
          "Audit trail",
          "Arabic OCR"
        ],
        "evidence": 84,
        "availability": "Available in 3 weeks",
        "featured": false,
        "contentLanguage": "en",
        "currency": "USD"
      },
      {
        "id": "prd-lattice-contract",
        "companyId": "co-lattice",
        "name": "Lattice Contract Lens",
        "category": "Document intelligence",
        "summary": "Extracts clauses, obligations and renewal risks from contracts.",
        "description": "Lattice Contract Lens helps legal and procurement teams review contract collections by extracting selected clauses, obligations, dates and review signals into a searchable queue. Each extracted item links back to the relevant source passage so a reviewer can confirm language in context instead of relying on a bare summary. Teams can define the fields and risk categories for an initial corpus, triage uncertain results and record reviewer decisions. It is intended to speed up document review and renewal discovery while keeping legal judgment and final approval with the buyer's qualified staff.",
        "productInfo": {
          "audience": [
            "Legal operations",
            "Procurement teams",
            "Contract administrators"
          ],
          "problems": [
            "Obligations and renewal dates are buried in long agreements",
            "Reviewers need traceable evidence for extracted fields",
            "Large contract queues need prioritization"
          ],
          "useCases": [
            "Identify renewal and notice dates",
            "Extract selected clauses and obligations",
            "Prioritize documents for human review"
          ],
          "inputs": [
            "Buyer-approved PDF and DOCX contracts",
            "Extraction schema and clause definitions",
            "Reviewer decisions for the pilot corpus"
          ],
          "outputs": [
            "Structured clause and date fields",
            "Source passage citations",
            "Review queue with risk flags"
          ],
          "workflow": [
            "Agree document types and extraction fields",
            "Ingest a controlled sample set",
            "Review extracted data and source passages",
            "Tune categories and exception handling",
            "Export approved results for downstream work"
          ],
          "integrations": [
            "Export and workflow integrations depend on buyer requirements and are scoped separately"
          ],
          "governance": [
            "Risk flags are review prompts, not legal conclusions",
            "Human review is required before acting on dates or clauses",
            "Buyer controls the document set and reviewer access"
          ],
          "deploymentNotes": "Buyer VPC or global SaaS options; verify data location and confidentiality terms for the contract corpus before ingestion.",
          "implementation": [
            "Schema workshop",
            "Sample contract preparation",
            "Extraction and queue configuration",
            "Reviewer calibration session"
          ],
          "deliverables": [
            "Configured extraction fields",
            "Pilot review queue",
            "Source-linked sample results",
            "Exception and rollout notes"
          ],
          "exclusions": [
            "Legal advice or legal interpretation",
            "Automated execution of notices",
            "Guarantee that every clause is extracted without review"
          ],
          "acceptanceCriteria": [
            "Agreed fields are populated when present in the sample",
            "Each output can be traced to source text",
            "Uncertain or missing values are visibly reviewable",
            "Buyer reviewers approve the pilot schema"
          ],
          "pricingNotes": "Illustrative listing price: USD 750 per month plus USD 500 setup; document volume and workflow scope should be confirmed in the quote.",
          "evidenceNotes": "Validate supported file quality, Arabic clause coverage, date extraction and security controls against buyer documents."
        },
        "monthly": 750,
        "setup": 500,
        "languages": [
          "Chinese",
          "English",
          "Arabic"
        ],
        "deployment": [
          "Buyer VPC",
          "Global SaaS"
        ],
        "users": 40,
        "support": "English and Chinese",
        "capabilities": [
          "Clause extraction",
          "Risk flags",
          "Citations",
          "Review queues"
        ],
        "evidence": 79,
        "availability": "Available in 2 weeks",
        "featured": false,
        "contentLanguage": "en",
        "currency": "USD"
      },
      {
        "id": "prd-redsea-inspect",
        "companyId": "co-redsea",
        "name": "Red Sea Inspect",
        "category": "Vision workflow",
        "summary": "Captures inspection evidence and creates structured safety reports.",
        "description": "Red Sea Inspect gives site teams one workflow for collecting inspection photos, observations and checklist results. Inspectors can compare submitted evidence with an agreed checklist, document the reason for a finding and route serious issues to a designated supervisor. Offline capture is intended to help teams keep working in low-connectivity areas, with synchronization behavior tested for the devices and network in scope. The service creates structured reports for operational review; site owners retain responsibility for safety decisions, corrective actions and regulatory reporting.",
        "productInfo": {
          "audience": [
            "Industrial site operators",
            "Inspection supervisors",
            "Health and safety teams"
          ],
          "problems": [
            "Inspection evidence is scattered across photos and notes",
            "Serious findings need a clear escalation owner",
            "Sites may have limited connectivity"
          ],
          "useCases": [
            "Routine equipment or site inspections",
            "Checklist-based evidence collection",
            "Supervisor review of flagged findings"
          ],
          "inputs": [
            "Inspection checklist",
            "Photos and field notes",
            "Site, asset and inspector identifiers"
          ],
          "outputs": [
            "Structured inspection record",
            "Evidence-linked findings",
            "Escalation notification and report"
          ],
          "workflow": [
            "Configure a buyer-approved checklist",
            "Capture evidence on a pilot device",
            "Review and classify findings",
            "Escalate configured conditions",
            "Export or review the inspection report"
          ],
          "integrations": [
            "Asset-management and notification integrations require separate scope confirmation"
          ],
          "governance": [
            "A model flag is a prompt for a qualified reviewer",
            "The buyer defines checklist and escalation thresholds",
            "Image access, retention and device security require configuration"
          ],
          "deploymentNotes": "Saudi private-cloud deployment is listed; confirm site connectivity, device compatibility and offline sync limits before field use.",
          "implementation": [
            "Checklist workshop",
            "Pilot-site and device setup",
            "Escalation mapping",
            "Field test and supervisor review"
          ],
          "deliverables": [
            "Configured checklist workflow",
            "Pilot user access",
            "Evidence-linked sample reports",
            "Field readiness and limitation notes"
          ],
          "exclusions": [
            "Certification of equipment or site safety",
            "Replacing qualified inspection staff",
            "Guaranteed detection of hazards from images"
          ],
          "acceptanceCriteria": [
            "Inspectors can submit the agreed evidence fields",
            "Reports retain links to submitted evidence",
            "Escalation reaches the agreed supervisor in test cases",
            "Offline capture and sync outcomes are documented"
          ],
          "pricingNotes": "Illustrative listing price: USD 1,650 per month plus USD 950 setup; site and device count are confirmed in the quote.",
          "evidenceNotes": "The provider profile is unverified; validate image handling, offline synchronization and operational suitability before use."
        },
        "monthly": 1650,
        "setup": 950,
        "languages": [
          "Arabic",
          "English"
        ],
        "deployment": [
          "Saudi private cloud"
        ],
        "users": 80,
        "support": "Arabic support · 24/7",
        "capabilities": [
          "Image review",
          "Safety report",
          "Escalation rules",
          "Offline capture"
        ],
        "evidence": 66,
        "availability": "Pilot slots in 5 weeks",
        "featured": false,
        "contentLanguage": "en",
        "currency": "USD"
      },
      {
        "id": "prd-levant-voice",
        "companyId": "co-levant",
        "name": "Levant Voice Desk",
        "category": "AI Agents",
        "summary": "Arabic voice agent for contact centers with handoff and call summaries.",
        "description": "Levant Voice Desk supports contact-center intake in Arabic and English by capturing the caller's request, identifying a likely intent and preparing a concise summary for the next support employee. When a case needs a person, the workflow can hand it to an agreed queue while retaining the original conversation for review. Supervisors can inspect call summaries and configured escalation signals to help prioritize follow-up. A limited pilot should begin with non-sensitive test calls and an agreed set of intents before live traffic, telephony integration or regulated use is approved.",
        "productInfo": {
          "audience": [
            "Contact-center leaders",
            "Customer operations",
            "Support quality teams"
          ],
          "problems": [
            "High call volumes create repetitive intake work",
            "Agents need concise handoff context",
            "Arabic callers need a supported service path"
          ],
          "useCases": [
            "Classify common service requests",
            "Summarize calls for an employee",
            "Route requests to a human support queue"
          ],
          "inputs": [
            "Caller audio through an agreed channel",
            "Intent and routing definitions",
            "Approved service content and escalation rules"
          ],
          "outputs": [
            "Call transcript or summary subject to configuration",
            "Intent classification",
            "Handoff details and escalation signal"
          ],
          "workflow": [
            "Define supported intents and out-of-scope requests",
            "Test with approved scripts and voices",
            "Review transcription and handoff quality",
            "Approve limited live traffic if policy allows",
            "Monitor exceptions and human transfers"
          ],
          "integrations": [
            "Telephony and CRM connections depend on provider and buyer system compatibility"
          ],
          "governance": [
            "Caller disclosure, consent and recording policy are buyer responsibilities to confirm",
            "Sensitive or uncertain requests route to people",
            "Retention and access must be agreed before real calls"
          ],
          "deploymentNotes": "Regional cloud or Buyer VPC options are listed; confirm telephony path, data location and voice-processing terms.",
          "implementation": [
            "Call-flow workshop",
            "Intent and escalation configuration",
            "Test-call review",
            "Queue and integration setup if scoped"
          ],
          "deliverables": [
            "Configured pilot call flow",
            "Intent and handoff map",
            "Test-call findings",
            "Operational review guide"
          ],
          "exclusions": [
            "Emergency response decisions",
            "Unreviewed automated commitments to callers",
            "Telephony charges unless included in a quote"
          ],
          "acceptanceCriteria": [
            "Agreed intents are recognized on a buyer-approved test set",
            "Human handoff preserves required context",
            "Out-of-scope requests follow the approved fallback",
            "Recording, disclosure and retention behavior are verified"
          ],
          "pricingNotes": "Illustrative listing price: USD 850 per month plus USD 400 setup; usage, channels and telephony costs require quote confirmation.",
          "evidenceNotes": "Confirm dialect coverage, transcription quality, call-data handling, integrations and 24/7 escalation arrangements."
        },
        "monthly": 850,
        "setup": 400,
        "languages": [
          "Arabic",
          "English"
        ],
        "deployment": [
          "Regional cloud",
          "Buyer VPC"
        ],
        "users": 120,
        "support": "Arabic support · 24/7",
        "capabilities": [
          "Voice agent",
          "Call summary",
          "Human handoff",
          "Sentiment"
        ],
        "evidence": 87,
        "availability": "Available in 3 weeks",
        "featured": true,
        "contentLanguage": "en",
        "currency": "USD"
      },
      {
        "id": "prd-oasis-forecast",
        "companyId": "co-oasis",
        "name": "Oasis Forecast Hub",
        "category": "Models & Data",
        "summary": "Demand forecasting and operational dashboards for distributors.",
        "description": "Oasis Forecast Hub helps distributors turn historical sales, inventory and operational data into a recurring demand-planning workflow. Planning teams can review forecast outputs, compare scenarios and inspect the assumptions behind a recommendation before updating their plans. The implementation begins by checking data quality, product and location identifiers, calendar effects and the planning horizon; buyer teams decide how forecasts should influence procurement or replenishment. A pilot can use an agreed data extract and weekly review cadence before adding automated connectors or wider business-unit coverage.",
        "productInfo": {
          "audience": [
            "Distributor operations",
            "Demand planners",
            "Supply-chain and finance teams"
          ],
          "problems": [
            "Planning relies on fragmented historical data",
            "Forecast assumptions are difficult to compare",
            "Teams need a repeatable weekly review"
          ],
          "useCases": [
            "Demand planning by product or location",
            "Scenario comparison",
            "Weekly operations dashboards"
          ],
          "inputs": [
            "Historical sales and order data",
            "Inventory and stockout context",
            "Product, location and calendar mappings"
          ],
          "outputs": [
            "Forecast series for agreed horizons",
            "Scenario comparisons",
            "Dashboard views and assumption notes"
          ],
          "workflow": [
            "Profile buyer data and agree the grain",
            "Map product, location and time fields",
            "Generate baseline forecasts",
            "Review scenarios with planners",
            "Adjust scope and cadence from feedback"
          ],
          "integrations": [
            "File-based pilot data; automated connectors are scoped against buyer platforms"
          ],
          "governance": [
            "Forecasts support planning and do not commit inventory or purchase orders",
            "Buyer validates data quality and business assumptions",
            "Access and refresh schedule are configured with the buyer"
          ],
          "deploymentNotes": "Saudi private-cloud or Buyer VPC options are listed; confirm data refresh, connectivity and residency needs.",
          "implementation": [
            "Data readiness review",
            "Field mapping",
            "Forecast and dashboard configuration",
            "Planner review and handover"
          ],
          "deliverables": [
            "Data mapping notes",
            "Configured planning view",
            "Baseline and scenario outputs",
            "Pilot review summary"
          ],
          "exclusions": [
            "Guaranteed forecast accuracy",
            "Automatic inventory purchases",
            "Data cleansing beyond the agreed scope"
          ],
          "acceptanceCriteria": [
            "Input fields and exclusions are documented",
            "Forecast outputs can be traced to the agreed data period",
            "Planners can compare at least the agreed scenarios",
            "Known data gaps and limitations are visible"
          ],
          "pricingNotes": "Illustrative listing price: USD 1,150 per month plus USD 600 setup; data volume, refresh cadence and connector scope require a quote.",
          "evidenceNotes": "Validate data readiness, forecast horizon, refresh frequency and dashboard access with the provider."
        },
        "monthly": 1150,
        "setup": 600,
        "languages": [
          "Arabic",
          "English"
        ],
        "deployment": [
          "Saudi private cloud",
          "Buyer VPC"
        ],
        "users": 80,
        "support": "Arabic and English · 12/6",
        "capabilities": [
          "Forecasting",
          "Data connectors",
          "Scenario planning",
          "Usage dashboard"
        ],
        "evidence": 83,
        "availability": "Available in 4 weeks",
        "featured": true,
        "contentLanguage": "en",
        "currency": "USD"
      },
      {
        "id": "prd-pixel-intake",
        "companyId": "co-pixel",
        "name": "PixelRoute Intake",
        "category": "Automation",
        "summary": "Multimodal customer intake that classifies files, images and service requests.",
        "description": "PixelRoute Intake organizes incoming customer requests that arrive through forms, documents and images. It classifies each submission, extracts agreed fields and routes the case to a review queue or downstream workflow. Human review can handle low-confidence or incomplete records, and the REST API provides a connection point for a buyer portal or service desk when the systems are compatible. A pilot should use a representative set of redacted or approved examples, with field-level acceptance rules and exception paths agreed before the workflow handles production customer data.",
        "productInfo": {
          "audience": [
            "Customer operations",
            "Shared-service teams",
            "Digital product and integration teams"
          ],
          "problems": [
            "Requests arrive in inconsistent formats",
            "Staff re-enter fields from files and images",
            "Cases need reliable routing with an exception queue"
          ],
          "useCases": [
            "Classify customer submissions",
            "Extract agreed form or document fields",
            "Route service cases to a team"
          ],
          "inputs": [
            "Web-form text",
            "PDF and image attachments",
            "Routing rules and reference values"
          ],
          "outputs": [
            "Request category",
            "Extracted structured fields",
            "Queue assignment and review status"
          ],
          "workflow": [
            "Define categories and required fields",
            "Prepare representative approved test files",
            "Configure validation and exception rules",
            "Connect the test API or upload channel",
            "Review accuracy and routing before rollout"
          ],
          "integrations": [
            "REST API listed; authentication, payload and target-system fit are confirmed during technical discovery"
          ],
          "governance": [
            "Low-confidence results should enter human review",
            "Use redacted or approved data for testing",
            "Retention, access controls and transfer location require confirmation"
          ],
          "deploymentNotes": "Global SaaS or Buyer VPC options are listed; confirm regional processing, storage and network requirements.",
          "implementation": [
            "Intake schema workshop",
            "Sample and exception review",
            "API or upload workflow configuration",
            "User acceptance and integration handoff"
          ],
          "deliverables": [
            "Configured categories and fields",
            "Test workflow and API notes",
            "Exception queue",
            "Pilot results and open issues"
          ],
          "exclusions": [
            "Guaranteed extraction from every file quality",
            "Unreviewed automated decisions on customer eligibility",
            "Unscoped CRM or ticketing changes"
          ],
          "acceptanceCriteria": [
            "Agreed fields are extracted on the representative test set",
            "Uncertain submissions enter the review path",
            "Each case is routed according to approved test rules",
            "Integration errors and retention behavior are documented"
          ],
          "pricingNotes": "Illustrative listing price: USD 1,350 per month plus USD 700 setup; request volume, channels and integrations must be confirmed in a quote.",
          "evidenceNotes": "Confirm supported formats, language and image quality, API behavior, hosting region and human-review controls."
        },
        "monthly": 1350,
        "setup": 700,
        "languages": [
          "Arabic",
          "English",
          "Chinese"
        ],
        "deployment": [
          "Global SaaS",
          "Buyer VPC"
        ],
        "users": 100,
        "support": "English and Arabic · 24/5",
        "capabilities": [
          "Image review",
          "Document intake",
          "Workflow routing",
          "REST API"
        ],
        "evidence": 81,
        "availability": "Available in 2 weeks",
        "featured": false,
        "contentLanguage": "en",
        "currency": "USD"
      },
      {
        "id": "prd-hanriver-token",
        "companyId": "co-hanriver",
        "name": "HanRiver Embed API",
        "category": "Tokens & APIs",
        "summary": "Multilingual embeddings and inference endpoints for search and agent products.",
        "description": "HanRiver Embed API provides a developer-facing entry point for multilingual semantic search and agent retrieval workflows. Application teams can submit approved text, generate embedding representations and connect the returned output to a vector index or search pipeline. The offer is aimed at teams building their own products rather than buyers looking for a complete end-user knowledge workspace. A pilot should verify the actual endpoint contract, model version, dimensions, language behavior, usage limits and costs against a representative test set before the API is connected to a production application.",
        "productInfo": {
          "audience": [
            "Application developers",
            "Search engineers",
            "AI platform teams"
          ],
          "problems": [
            "An application needs multilingual semantic retrieval",
            "Teams want a common API for embeddings",
            "Usage and deployment need to fit an existing stack"
          ],
          "useCases": [
            "Vector search prototypes",
            "Retrieval for custom agents",
            "Semantic similarity workflows"
          ],
          "inputs": [
            "Approved text payloads",
            "Client credentials",
            "Application configuration and test queries"
          ],
          "outputs": [
            "Embedding vectors according to the agreed API contract",
            "API response and usage metadata"
          ],
          "workflow": [
            "Review the endpoint specification and data-handling terms",
            "Create development credentials",
            "Run a representative retrieval evaluation",
            "Validate limits and error handling",
            "Approve production usage and monitoring"
          ],
          "integrations": [
            "REST API",
            "Buyer-managed vector index and application layer"
          ],
          "governance": [
            "Buyer controls submitted text and client credentials",
            "Data retention and model-training terms require confirmation",
            "Production clients should validate response schemas and handle rate-limit errors"
          ],
          "deploymentNotes": "Global SaaS and Buyer VPC options are listed; VPC sizing and commercial terms are scoped separately.",
          "implementation": [
            "API access setup",
            "Schema and client review",
            "Retrieval sample evaluation",
            "Usage and error-monitoring handoff"
          ],
          "deliverables": [
            "Development endpoint access",
            "API contract and example requests",
            "Usage configuration",
            "Pilot evaluation notes"
          ],
          "exclusions": [
            "Complete end-user search application",
            "Buyer database hosting",
            "Guaranteed latency or retrieval accuracy before benchmark review"
          ],
          "acceptanceCriteria": [
            "The agreed endpoint accepts the test payload",
            "Response schema and model identifier are documented",
            "Usage limits and error responses are tested",
            "Buyer confirms retrieval suitability on its sample"
          ],
          "pricingNotes": "Illustrative starting listing price: USD 250 per month and no setup fee; included usage, overage rates and VPC pricing must be confirmed before purchase.",
          "evidenceNotes": "Token or request quotas, model dimensions, benchmarks, latency and retention terms are not published in this demo listing. Ask the provider before sizing a production system."
        },
        "monthly": 250,
        "setup": 0,
        "languages": [
          "Chinese",
          "English",
          "Arabic"
        ],
        "deployment": [
          "Global SaaS",
          "Buyer VPC"
        ],
        "users": 1000,
        "support": "API support · English and Chinese",
        "capabilities": [
          "Embeddings",
          "REST API",
          "Usage dashboard"
        ],
        "tags": [
          "Embeddings",
          "API",
          "Multilingual"
        ],
        "evidence": 82,
        "availability": "Available now",
        "featured": true,
        "contentLanguage": "en",
        "currency": "USD"
      },
      {
        "id": "prd-dunetech-gpu",
        "companyId": "co-dunetech",
        "name": "Dune GPU Private Server",
        "category": "Compute & Servers",
        "summary": "Managed GPU capacity for private model serving and agent workloads in Saudi Arabia.",
        "description": "Dune GPU Private Server is a managed infrastructure offer for teams that need a private environment for model serving, embeddings or agent workloads. The provider works with the buyer to agree the compute profile, network boundaries, runtime requirements and operational responsibilities before provisioning. Monitoring and infrastructure support help the buyer operate its application stack, while deployment choices accommodate Saudi private-cloud or on-premise requirements. The published price is a starting point for discovery; GPU model, memory, storage, capacity, throughput and service terms must be specified in the final configuration and quote.",
        "productInfo": {
          "audience": [
            "Enterprise infrastructure teams",
            "AI platform operators",
            "Application teams with private model workloads"
          ],
          "problems": [
            "A workload needs a private model-serving environment",
            "Infrastructure ownership and support must be defined",
            "Compute sizing depends on the selected model and traffic"
          ],
          "useCases": [
            "Private model inference",
            "Agent backend hosting",
            "Embedding and retrieval infrastructure"
          ],
          "inputs": [
            "Model and runtime requirements",
            "Capacity and concurrency estimates",
            "Network, identity and storage requirements"
          ],
          "outputs": [
            "Provisioned agreed server environment",
            "Access and network configuration",
            "Infrastructure monitoring and handover notes"
          ],
          "workflow": [
            "Collect workload and model requirements",
            "Agree hardware and operating responsibilities",
            "Confirm location and network design",
            "Provision and run a buyer-defined benchmark",
            "Hand over monitoring and support procedures"
          ],
          "integrations": [
            "Buyer application runtime",
            "Private network connectivity and monitoring, subject to scope"
          ],
          "governance": [
            "Buyer and provider agree patching, access and backup responsibilities",
            "Model licenses and data rights remain subject to buyer review",
            "Capacity, uptime and incident terms require a written service agreement"
          ],
          "deploymentNotes": "Saudi private cloud or on-premise; site prerequisites, lead time and physical ownership depend on the final deployment scope.",
          "implementation": [
            "Workload discovery",
            "Configuration and network review",
            "Provisioning",
            "Performance test and infrastructure handover"
          ],
          "deliverables": [
            "Agreed compute environment",
            "Access and configuration record",
            "Monitoring setup",
            "Support and escalation guide"
          ],
          "exclusions": [
            "A specified GPU model or memory capacity without a quote",
            "Application or model license fees",
            "Guaranteed model throughput without benchmarking"
          ],
          "acceptanceCriteria": [
            "Provisioned resources match the signed configuration",
            "Buyer can access approved network endpoints",
            "Monitoring is visible to the agreed operators",
            "The agreed benchmark and handover checklist are completed"
          ],
          "pricingNotes": "Illustrative starting listing price: USD 2,100 per month plus USD 350 setup; final hardware, storage, traffic and support terms require a written quote.",
          "evidenceNotes": "GPU SKU, VRAM, CPU, RAM, storage, SLA and benchmark results are not specified in the demo listing and must not be inferred."
        },
        "monthly": 2100,
        "setup": 350,
        "languages": [
          "Arabic",
          "English"
        ],
        "deployment": [
          "Saudi private cloud",
          "On-premise"
        ],
        "users": 20,
        "support": "24/7 infrastructure support",
        "capabilities": [
          "GPU hosting",
          "Private network",
          "Monitoring"
        ],
        "tags": [
          "GPU",
          "Server",
          "Private cloud"
        ],
        "evidence": 76,
        "availability": "Provision in 2 weeks",
        "featured": true,
        "contentLanguage": "en",
        "currency": "USD"
      }
    ],
    "requests": [
      {
        "id": "REQ-001",
        "title": "Private knowledge assistant for professional services",
        "owner": "Al Manar Advisory",
        "status": "Matching",
        "users": 50,
        "languages": [
          "Arabic",
          "English"
        ],
        "deployment": "Saudi private cloud",
        "monthlyCap": 1400,
        "firstMonthCap": 2200,
        "need": "Employees spend too long looking for answers across approved Arabic and English company documents.",
        "createdAt": "2026-10-19",
        "preferredCapabilities": [
          "Citations",
          "Document permissions",
          "Arabic OCR"
        ],
        "shortlisted": [
          "prd-nura-knowledge",
          "prd-hanriver-documind",
          "prd-dunetech-ops"
        ],
        "currency": "USD"
      },
      {
        "id": "REQ-002",
        "title": "Contract renewal risk review",
        "owner": "Najd Logistics Group",
        "status": "Brief confirmed",
        "users": 40,
        "languages": [
          "Arabic",
          "English"
        ],
        "deployment": "Buyer VPC",
        "monthlyCap": 1000,
        "firstMonthCap": 1800,
        "need": "Legal and procurement teams need a searchable view of obligations and renewal dates.",
        "createdAt": "2026-10-18",
        "preferredCapabilities": [
          "Clause extraction",
          "Risk flags",
          "Citations"
        ],
        "shortlisted": [
          "prd-lattice-contract",
          "prd-nura-knowledge"
        ],
        "currency": "USD"
      },
      {
        "id": "REQ-003",
        "title": "Arabic contact center assistant",
        "owner": "Redline Health",
        "status": "Matching",
        "users": 120,
        "languages": [
          "Arabic",
          "English"
        ],
        "deployment": "Buyer VPC",
        "monthlyCap": 1200,
        "firstMonthCap": 1900,
        "need": "The support desk needs Arabic voice intake, summaries and human handoff for patient requests.",
        "createdAt": "2026-10-17",
        "preferredCapabilities": [
          "Voice agent",
          "Call summary",
          "Human handoff"
        ],
        "shortlisted": [
          "prd-levant-voice",
          "prd-pixel-intake"
        ],
        "currency": "USD"
      },
      {
        "id": "REQ-004",
        "title": "Distributor demand forecasting",
        "owner": "Najd Logistics Group",
        "status": "Brief confirmed",
        "users": 80,
        "languages": [
          "Arabic",
          "English"
        ],
        "deployment": "Saudi private cloud",
        "monthlyCap": 1400,
        "firstMonthCap": 2200,
        "need": "Operations leaders need weekly demand forecasts with scenario planning and data connectors.",
        "createdAt": "2026-10-15",
        "preferredCapabilities": [
          "Forecasting",
          "Scenario planning",
          "Data connectors"
        ],
        "shortlisted": [
          "prd-oasis-forecast",
          "prd-dunetech-ops"
        ],
        "currency": "USD"
      }
    ],
    "evaluations": [
      {
        "id": "EVAL-001",
        "requestId": "REQ-001",
        "status": "Complete",
        "createdAt": "2026-10-20",
        "title": "REQ-001 fit and budget evaluation",
        "method": "Hard constraints + weighted evidence",
        "recommendation": "Nura Knowledge Cloud",
        "report": {
          "summary": "Nura Knowledge Cloud is the only shortlisted option that meets the Saudi private cloud requirement and stays within the recurring cap. Its original first-month quote exceeds the cap by USD 500; a manual-upload pilot resolves the gap.",
          "criteria": [
            {
              "name": "Deployment",
              "winner": "Nura Knowledge Cloud",
              "detail": "Saudi private cloud available; HanRiver global SaaS is not confirmed for the required environment."
            },
            {
              "name": "Recurring budget",
              "winner": "Nura Knowledge Cloud",
              "detail": "USD 1,200/month, USD 200 below the cap."
            },
            {
              "name": "First-month budget",
              "winner": "Nura Knowledge Cloud · revised scope",
              "detail": "Quote v1 is USD 2,700; Quote v2 reduces setup to USD 800 and totals USD 2,000."
            },
            {
              "name": "Evidence",
              "winner": "Nura Knowledge Cloud",
              "detail": "92% evidence completeness across language, deployment, support and pricing fields."
            }
          ],
          "scores": [
            {
              "productId": "prd-nura-knowledge",
              "score": 91,
              "verdict": "Recommended"
            },
            {
              "productId": "prd-hanriver-documind",
              "score": 62,
              "verdict": "Deployment mismatch"
            },
            {
              "productId": "prd-dunetech-ops",
              "score": 74,
              "verdict": "Budget fit · capability gap"
            }
          ],
          "currency": "USD"
        }
      }
    ],
    "deals": [
      {
        "id": "DEAL-001",
        "requestId": "REQ-001",
        "productId": "prd-nura-knowledge",
        "quote": {
          "version": "Quote v2",
          "monthly": 1200,
          "setup": 800,
          "firstMonth": 2000,
          "scope": [
            "Manual document upload",
            "Arabic-English knowledge answers",
            "Citations and permissions"
          ],
          "exclusions": [
            "Custom system integration"
          ],
          "currency": "USD"
        },
        "approvals": {
          "provider": true,
          "requester": true
        },
        "messages": [
          {
            "id": 1,
            "side": "requester",
            "language": "Arabic",
            "original": "الحد الأقصى للشهر الأول هو 2,200 USD. هل يمكن أن نبدأ بدون تكامل مخصص؟",
            "translation": "First-month cap is USD 2,200. Can we start without a custom integration?"
          },
          {
            "id": 2,
            "side": "provider",
            "language": "Chinese",
            "original": "可以。先手动上传文档。实施费 800，每月 1,200。",
            "translation": "Yes. Start with manual document uploads. Setup is USD 800, monthly is USD 1,200."
          }
        ]
      }
    ],
    "revenueReports": [],
    "pilots": [
      {
        "id": "PILOT-001",
        "requestId": "REQ-001",
        "dealId": "DEAL-001",
        "status": "Ready to start",
        "tasks": [
          {
            "title": "Confirm scope and quote",
            "owner": "Both",
            "status": "Confirmed"
          },
          {
            "title": "Provide approved sample documents",
            "owner": "Requester",
            "status": "Pending"
          },
          {
            "title": "Confirm hosting and access",
            "owner": "Both",
            "status": "Pending"
          },
          {
            "title": "Configure retrieval and permissions",
            "owner": "Provider",
            "status": "Pending"
          },
          {
            "title": "Test answers, citations and permissions",
            "owner": "Both",
            "status": "Pending"
          }
        ]
      }
    ]
  };
  // Historic seed orders are one-month records, without payment evidence.
  for (const order of seed.orders) Object.assign(order, { subscriptionMonths: 1, subtotal: order.monthly });
  const clone = value => JSON.parse(JSON.stringify(value));
  // Seed copy has one original language. Supported languages describe product capability.
  seed.products.forEach(product => { product.contentLanguage = "en"; });
  // Exact historical UI substitutions only: never translate arbitrary provider text.
  const legacyProductUiTranslations = {
    ZH: {
      "Requests": "需求",
      "Review": "待复核",
      "users": "位用户",
      "Approved": "已批准",
      "Model": "模型",
      "AI Agents": "AI 智能体",
      "Tokens & APIs": "模型接口与 API",
      "Compute & Servers": "算力与服务器",
      "Models & Data": "模型与数据",
      "Automation": "自动化工具",
      "Available now": "现货可用",
      "Private Arabic-English answers from approved company documents.": "基于已授权企业文档，提供阿拉伯语和英语问答。",
      "Multilingual retrieval with connectors for enterprise content systems.": "连接企业内容系统，提供多语言检索与问答。",
      "Turns service procedures and work orders into an assistant for field teams.": "把服务流程和工单整理成现场团队可以直接使用的助手。",
      "Extracts clauses, obligations and renewal risks from contracts.": "从合同中提取条款、义务和续约风险。",
      "Captures inspection evidence and creates structured safety reports.": "采集巡检证据，自动整理成结构化安全报告。",
      "Multilingual embeddings and inference endpoints for search and agent products.": "为搜索和智能体产品提供多语言向量与推理接口。",
      "Managed GPU capacity for private model serving and agent workloads in Saudi Arabia.": "在沙特提供托管 GPU 算力，用于私有模型服务和智能体工作负载。",
      "Citations": "引用溯源",
      "Document permissions": "文档权限",
      "Arabic OCR": "阿拉伯语 OCR",
      "Manual upload": "手动上传",
      "Connectors": "系统连接",
      "Role permissions": "角色权限",
      "Evaluation kit": "评测工具包",
      "Procedure search": "流程检索",
      "Task handoff": "任务交接",
      "Audit trail": "操作留痕",
      "Clause extraction": "条款提取",
      "Risk flags": "风险标记",
      "Review queues": "审核队列",
      "Image review": "图像审核",
      "Safety report": "安全报告",
      "Escalation rules": "升级规则",
      "Offline capture": "离线采集",
      "Embeddings": "向量嵌入",
      "Usage dashboard": "用量看板",
      "GPU hosting": "GPU 托管",
      "Private network": "私有网络",
      "Monitoring": "运行监控",
      "Chinese": "中文",
      "English": "英语",
      "Arabic": "阿拉伯语",
      "Available in 2 weeks": "预计两周内可用",
      "Available in 3 weeks": "预计三周内可用",
      "Available in 4 weeks": "预计四周内可用",
      "Provision in 2 weeks": "预计两周内完成配置",
      "Pilot slots in 5 weeks": "预计五周后有试点名额",
      "Evidence": "证据完整度",
      "products": "个产品",
      "across": "覆盖",
      "Task": "任务",
      "Both": "双方",
      "Provider": "服务商",
      "Complete": "已完成",
      "Saudi Arabia": "沙特阿拉伯",
      "China": "中国",
      "Business hours · Arabic support": "工作时间支持 · 阿拉伯语",
      "24/5 · English and Chinese": "每周 5 天、每天 24 小时 · 英语和中文",
      "Arabic support · 12/6": "阿拉伯语支持 · 每周 6 天、每天 12 小时",
      "English and Chinese": "英语和中文",
      "Arabic support · 24/7": "阿拉伯语支持 · 全天候",
      "evidence": "证据",
      "Multilingual": "多语言",
      "Private cloud": "私有云",
      "Server": "服务器",
      "Saudi private cloud": "沙特私有云",
      "Buyer VPC": "买方 VPC",
      "China cloud": "中国云",
      "Global SaaS": "全球 SaaS",
      "On-premise": "本地部署",
      "support": "支持服务",
      "manual upload": "手动上传",
      "Product": "商品",
      "Buyer": "买家",
      "orders": "笔订单",
      "Recommendations": "建议",
      "Capabilities": "能力",
      "Support": "支持方式"
    },
    SA: {
      "Requests": "الطلبات",
      "Review": "قيد المراجعة",
      "users": "مستخدمون",
      "Approved": "تمت الموافقة",
      "Model": "النموذج",
      "products": "منتجات",
      "across": "لدى",
      "Task": "المهمة",
      "Both": "الطرفان",
      "Provider": "المقدم",
      "Complete": "مكتمل",
      "Evidence": "اكتمال الأدلة",
      "Saudi Arabia": "المملكة العربية السعودية",
      "China": "الصين",
      "Available in 2 weeks": "متاح خلال أسبوعين",
      "Available in 3 weeks": "متاح خلال ثلاثة أسابيع",
      "Available in 4 weeks": "متاح خلال أربعة أسابيع",
      "Provision in 2 weeks": "التجهيز خلال أسبوعين",
      "Pilot slots in 5 weeks": "مواعيد التجربة بعد خمسة أسابيع",
      "Business hours · Arabic support": "دعم بالعربية خلال ساعات العمل",
      "24/5 · English and Chinese": "24/5 · الإنجليزية والصينية",
      "Arabic support · 12/6": "دعم بالعربية · 12/6",
      "English and Chinese": "الإنجليزية والصينية",
      "Arabic support · 24/7": "دعم بالعربية · 24/7",
      "Private Arabic-English answers from approved company documents.": "إجابات خاصة بالعربية والإنجليزية من مستندات الشركة المعتمدة.",
      "Multilingual retrieval with connectors for enterprise content systems.": "استرجاع متعدد اللغات مع موصلات لأنظمة محتوى المؤسسات.",
      "Turns service procedures and work orders into an assistant for field teams.": "يحوّل إجراءات الخدمة وأوامر العمل إلى مساعد للفرق الميدانية.",
      "Extracts clauses, obligations and renewal risks from contracts.": "يستخرج البنود والالتزامات ومخاطر التجديد من العقود.",
      "Captures inspection evidence and creates structured safety reports.": "يلتقط أدلة التفتيش وينشئ تقارير سلامة منظمة.",
      "Multilingual embeddings and inference endpoints for search and agent products.": "واجهات Embeddings واستدلال متعددة اللغات للبحث ومنتجات Agent.",
      "Managed GPU capacity for private model serving and agent workloads in Saudi Arabia.": "سعة GPU مُدارة لخدمة النماذج الخاصة وأعمال Agent في السعودية.",
      "Citations": "استشهادات المصدر",
      "Document permissions": "صلاحيات المستندات",
      "Arabic OCR": "OCR عربي",
      "Manual upload": "رفع يدوي",
      "Connectors": "موصلات",
      "Role permissions": "صلاحيات الأدوار",
      "Evaluation kit": "حزمة التقييم",
      "Procedure search": "بحث الإجراءات",
      "Task handoff": "تسليم المهام",
      "Audit trail": "سجل التدقيق",
      "Clause extraction": "استخراج البنود",
      "Risk flags": "مؤشرات المخاطر",
      "Review queues": "قوائم المراجعة",
      "Image review": "مراجعة الصور",
      "Safety report": "تقرير السلامة",
      "Escalation rules": "قواعد التصعيد",
      "Offline capture": "التقاط دون اتصال",
      "Usage dashboard": "لوحة الاستخدام",
      "GPU hosting": "استضافة GPU",
      "Private network": "شبكة خاصة",
      "Monitoring": "المراقبة",
      "Chinese": "الصينية",
      "English": "الإنجليزية",
      "Arabic": "العربية",
      "Tokens & APIs": "واجهات النماذج و API",
      "Compute & Servers": "الحوسبة والخوادم",
      "Models & Data": "النماذج والبيانات",
      "Automation": "الأتمتة",
      "AI Agents": "وكلاء AI",
      "evidence": "الأدلة",
      "Multilingual": "متعدد اللغات",
      "Available now": "متاح الآن",
      "Private cloud": "سحابة خاصة",
      "Server": "خادم",
      "Saudi private cloud": "سحابة خاصة سعودية",
      "Buyer VPC": "VPC المشتري",
      "China cloud": "سحابة الصين",
      "Global SaaS": "SaaS عالمي",
      "On-premise": "داخل الموقع",
      "support": "الدعم",
      "manual upload": "رفع يدوي",
      "Product": "المنتج",
      "Buyer": "المشتري",
      "orders": "طلبات",
      "Recommendations": "التوصيات",
      "Capabilities": "القدرات",
      "Support": "الدعم"
    }
  };
  const legacyDescriptions = {
    "prd-nura-knowledge": "Nura Knowledge Cloud turns approved Arabic and English company documents into a private, cited answer workspace. Teams upload policies, proposals, service manuals and internal playbooks, then ask questions in natural language. Every answer can show its source passage, while role permissions keep sensitive documents visible only to the right teams. The pilot starts with manual uploads and Saudi private-cloud hosting so the buyer can validate answer quality before adding custom connectors.",
    "prd-hanriver-documind": "DocuMind Enterprise is a multilingual retrieval and document intelligence workspace for organisations with content spread across drives, wikis and business systems. It combines connectors, document permissions, citation views and an evaluation kit so a team can measure retrieval quality before production rollout. The service supports Chinese, English and Arabic content and can start with a connector assessment before the wider knowledge rollout.",
    "prd-dunetech-ops": "DuneOps Copilot converts field procedures, service manuals and work orders into a guided operations assistant. Dispatchers and technicians can find the right procedure, hand a task to the next owner and leave an auditable record of what happened. Arabic OCR helps teams work with scanned forms, while Saudi private-cloud and on-premise options support sites with strict data and connectivity requirements.",
    "prd-lattice-contract": "Lattice Contract Lens gives legal and procurement teams a searchable review layer for contracts. It extracts clauses, obligations, renewal dates and risk signals, then links each finding back to the source text for review. The product is designed for a controlled Buyer VPC or global SaaS pilot and supports Arabic, Chinese and English contract sets with review queues for human approval.",
    "prd-redsea-inspect": "Red Sea Inspect helps industrial operators collect inspection photos and notes, compare evidence against safety checklists and produce structured reports. Escalation rules route serious findings to the right supervisor, offline capture keeps field work moving with limited connectivity, and the final report preserves the evidence used for each finding. It is suited to a measured pilot before wider site deployment.",
    "prd-levant-voice": "Levant Voice Desk is an Arabic-first contact-centre agent for intake, call summaries and human handoff. It captures the caller's request, identifies the intent and produces a concise summary for the next support employee without hiding the original conversation. Sentiment and escalation signals help supervisors prioritise sensitive cases, while regional hosting and Buyer VPC deployment support regulated service teams.",
    "prd-oasis-forecast": "Oasis Forecast Hub combines distributor data, demand forecasting and scenario planning in one operations workspace. Teams can connect their existing data, compare forecast scenarios and share a clear view of the assumptions behind each recommendation. The product is designed for Arabic and English operations teams and can begin with a limited data connector scope before moving into weekly planning cycles.",
    "prd-pixel-intake": "PixelRoute Intake classifies incoming files, images and service requests, extracts the fields a workflow needs and routes each case to the right queue. Its REST API makes it easy to connect a help desk or customer portal, while human review handles uncertain cases. Arabic, English and Chinese support makes it suitable for regional service operations that receive mixed document and image formats."
  };
  const legacySubstitutions = Object.values(legacyProductUiTranslations).map(dictionary => {
    const keys = Object.keys(dictionary).sort((a, b) => b.length - a.length);
    const escaped = keys.map(key => key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    const pattern = new RegExp(escaped.join("|"), "g");
    return text => text.replace(pattern, key => dictionary[key]);
  });
  const knownCopyVariants = new Map();
  function knownOriginal(value, original) {
    if (typeof value !== "string" || typeof original !== "string") return false;
    if (value === original) return true;
    if (!knownCopyVariants.has(original)) {
      const variants = new Set([original]);
      // Old switches could substitute the remaining English text a second time.
      legacySubstitutions.forEach(first => {
        const once = first(original);
        variants.add(once);
        legacySubstitutions.forEach(second => variants.add(second(once)));
      });
      knownCopyVariants.set(original, variants);
    }
    return knownCopyVariants.get(original).has(value);
  }
  function restoreKnownProductCopy(existing, source) {
    let changed = false;
    for (const key of ["name", "summary", "description", "support", "availability", "category"]) {
      if (existing[key] !== source[key] && knownOriginal(existing[key], source[key])) { existing[key] = source[key]; changed = true; }
    }
    for (const key of ["capabilities", "tags", "languages", "deployment"]) {
      if (!Array.isArray(existing[key])) continue;
      const originals = source[key] || [];
      existing[key] = existing[key].map(value => {
        const original = originals.find(candidate => knownOriginal(value, candidate));
        if (original !== undefined && original !== value) { changed = true; return original; }
        return value;
      });
    }
    if (existing.productInfo && source.productInfo) {
      for (const [key, original] of Object.entries(source.productInfo)) {
        const value = existing.productInfo[key];
        if (Array.isArray(value) && Array.isArray(original)) {
          existing.productInfo[key] = value.map(item => {
            const match = original.find(candidate => knownOriginal(item, candidate));
            if (match !== undefined && match !== item) { changed = true; return match; }
            return item;
          });
        } else if (value !== original && knownOriginal(value, original)) { existing.productInfo[key] = original; changed = true; }
      }
    }
    return changed;
  }
  // Keep provider edits and uploaded listings while repairing only recognized seed copy.
  function enrichStoredProducts(db) {
    if (window.SaqrFilmDemo?.enabled) return false;
    if (!Array.isArray(db.products)) return false;
    let changed = false;
    seed.products.forEach(source => {
      const existing = db.products.find(product => product.id === source.id);
      if (!existing) { db.products.push(clone(source)); changed = true; return; }
      // Explicit original-language metadata or an uploaded source is provider-owned.
      if (existing.sourceFile || existing.contentLanguage && !/^en(?:-|$)/i.test(existing.contentLanguage)) return;
      if (restoreKnownProductCopy(existing, source)) changed = true;
      const legacyDescription = legacyDescriptions[source.id];
      const generatedFallback = source.summary + " This listing includes structured pricing, deployment, support and evidence fields so buyers can review the offer before contacting the provider.";
      const isLegacySeedDescription = !existing.description || knownOriginal(existing.description, legacyDescription) || knownOriginal(existing.description, generatedFallback);
      if (isLegacySeedDescription) { existing.description = source.description; changed = true; }
      if (!existing.productInfo && existing.description === source.description) { existing.productInfo = clone(source.productInfo); changed = true; }
      // Unknown edited prose keeps its metadata rather than receiving an inferred language.
      if (!existing.contentLanguage && existing.summary === source.summary && existing.description === source.description) { existing.contentLanguage = source.contentLanguage; changed = true; }
    });
    if (changed) db.meta = { ...(db.meta || {}), productContentVersion: 7 };
    return changed;
  }
  // One-time demo migration uses fixed illustrative rates, never live FX.
  const legacyFinancialSeed = {
    "productPrices": {
      "prd-nura-knowledge": {
        "monthly": 4600,
        "setup": 3000
      },
      "prd-hanriver-documind": {
        "monthly": 5200,
        "setup": 4200
      },
      "prd-dunetech-ops": {
        "monthly": 3900,
        "setup": 2400
      },
      "prd-lattice-contract": {
        "monthly": 2800,
        "setup": 1800
      },
      "prd-redsea-inspect": {
        "monthly": 6100,
        "setup": 3500
      },
      "prd-levant-voice": {
        "monthly": 3200,
        "setup": 1500
      },
      "prd-oasis-forecast": {
        "monthly": 4400,
        "setup": 2100
      },
      "prd-pixel-intake": {
        "monthly": 5100,
        "setup": 2600
      },
      "prd-hanriver-token": {
        "monthly": 900,
        "setup": 0
      },
      "prd-dunetech-gpu": {
        "monthly": 7800,
        "setup": 1200
      }
    },
    "requestCaps": {
      "REQ-001": {
        "monthlyCap": 5000,
        "firstMonthCap": 8000
      },
      "REQ-002": {
        "monthlyCap": 4000,
        "firstMonthCap": 7000
      },
      "REQ-003": {
        "monthlyCap": 4500,
        "firstMonthCap": 7000
      },
      "REQ-004": {
        "monthlyCap": 5000,
        "firstMonthCap": 8000
      }
    },
    "copyPairs": {
      "Illustrative listing price: SAR 4,600 per month plus SAR 3,000 one-time setup; tax treatment and final pilot scope are confirmed in the quote.": "Illustrative listing price: USD 1,200 per month plus USD 800 one-time setup; tax treatment and final pilot scope are confirmed in the quote.",
      "Illustrative listing price: SAR 5,200 per month plus SAR 4,200 setup; connector count and support scope are finalized in a quote.": "Illustrative listing price: USD 1,400 per month plus USD 1,100 setup; connector count and support scope are finalized in a quote.",
      "Illustrative listing price: SAR 3,900 per month plus SAR 2,400 setup; site count, workflow integrations and device scope may change the quote.": "Illustrative listing price: USD 1,000 per month plus USD 650 setup; site count, workflow integrations and device scope may change the quote.",
      "Illustrative listing price: SAR 2,800 per month plus SAR 1,800 setup; document volume and workflow scope should be confirmed in the quote.": "Illustrative listing price: USD 750 per month plus USD 500 setup; document volume and workflow scope should be confirmed in the quote.",
      "Illustrative listing price: SAR 6,100 per month plus SAR 3,500 setup; site and device count are confirmed in the quote.": "Illustrative listing price: USD 1,650 per month plus USD 950 setup; site and device count are confirmed in the quote.",
      "Illustrative listing price: SAR 3,200 per month plus SAR 1,500 setup; usage, channels and telephony costs require quote confirmation.": "Illustrative listing price: USD 850 per month plus USD 400 setup; usage, channels and telephony costs require quote confirmation.",
      "Illustrative listing price: SAR 4,400 per month plus SAR 2,100 setup; data volume, refresh cadence and connector scope require a quote.": "Illustrative listing price: USD 1,150 per month plus USD 600 setup; data volume, refresh cadence and connector scope require a quote.",
      "Illustrative listing price: SAR 5,100 per month plus SAR 2,600 setup; request volume, channels and integrations must be confirmed in a quote.": "Illustrative listing price: USD 1,350 per month plus USD 700 setup; request volume, channels and integrations must be confirmed in a quote.",
      "Illustrative starting listing price: SAR 900 per month and no setup fee; included usage, overage rates and VPC pricing must be confirmed before purchase.": "Illustrative starting listing price: USD 250 per month and no setup fee; included usage, overage rates and VPC pricing must be confirmed before purchase.",
      "Illustrative starting listing price: SAR 7,800 per month plus SAR 1,200 setup; final hardware, storage, traffic and support terms require a written quote.": "Illustrative starting listing price: USD 2,100 per month plus USD 350 setup; final hardware, storage, traffic and support terms require a written quote.",
      "الحد الأقصى للشهر الأول هو 8,000 ريال سعودي. هل يمكن أن نبدأ بدون تكامل مخصص؟": "الحد الأقصى للشهر الأول هو 2,200 USD. هل يمكن أن نبدأ بدون تكامل مخصص؟",
      "First-month cap is SAR 8,000. Can we start without a custom integration?": "First-month cap is USD 2,200. Can we start without a custom integration?",
      "首月预算上限是 8,000 SAR。我们可以先不做定制集成吗？": "首月预算上限是 2,200 USD。我们可以先不做定制集成吗？",
      "Yes. We can start with manual document uploads. Setup is SAR 3,000 and monthly is SAR 4,600.": "Yes. We can start with manual document uploads. Setup is USD 800 and monthly is USD 1,200.",
      "可以。我们可以先手动上传文档，实施费 3,000 SAR，月费 4,600 SAR。": "可以。我们可以先手动上传文档，实施费 800 USD，月费 1,200 USD。",
      "نعم. يمكننا البدء برفع المستندات يدوياً. الإعداد 3,000 SAR والشهري 4,600 SAR.": "نعم. يمكننا البدء برفع المستندات يدوياً. الإعداد 800 USD والشهري 1,200 USD.",
      "Nura Knowledge Cloud is the only shortlisted option that meets the Saudi private cloud requirement and stays within the recurring cap. Its original setup exceeds the first-month cap by SAR 600; a manual-upload pilot resolves the gap.": "Nura Knowledge Cloud is the only shortlisted option that meets the Saudi private cloud requirement and stays within the recurring cap. Its original first-month quote exceeds the cap by USD 500; a manual-upload pilot resolves the gap.",
      "SAR 4,600/month, SAR 400 below the cap.": "USD 1,200/month, USD 200 below the cap.",
      "Quote v1 is SAR 8,600; Quote v2 reduces setup to SAR 3,000 and totals SAR 7,600.": "Quote v1 is USD 2,700; Quote v2 reduces setup to USD 800 and totals USD 2,000.",
      "可以。先手动上传文档。实施费 3,000，每月 4,600。": "可以。先手动上传文档。实施费 800，每月 1,200。",
      "Yes. Start with manual document uploads. Setup is SAR 3,000, monthly is SAR 4,600.": "Yes. Start with manual document uploads. Setup is USD 800, monthly is USD 1,200."
    }
  };
  const demoUsdRates = { USD: 1, SAR: 1 / 3.75, AED: 1 / 3.6725, EUR: 1.08, GBP: 1.27, CNY: 1 / 7.2, RMB: 1 / 7.2 };
  const roundMoney = value => Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  function checkoutQuote(product, months = 1) {
    if (!product || product.currency !== "USD") throw new TypeError("Checkout requires a confirmed USD product price.");
    if (!Number.isInteger(months) || months < 1 || months > 36) throw new RangeError("Subscription months must be an integer from 1 to 36.");
    const cents = key => {
      const value = product[key];
      if (!(typeof value === "number" || typeof value === "string" && value.trim() !== "") || !Number.isFinite(Number(value)) || Number(value) < 0) throw new TypeError(`Invalid ${key} price.`);
      const amount = Math.round((Number(value) + Number.EPSILON) * 100);
      if (!Number.isSafeInteger(amount)) throw new RangeError(`${key} price exceeds the supported amount.`);
      return amount;
    };
    const monthlyCents = cents("monthly"), setupCents = cents("setup"), subtotalCents = monthlyCents * months, totalCents = subtotalCents + setupCents;
    if (!Number.isSafeInteger(subtotalCents) || !Number.isSafeInteger(totalCents)) throw new RangeError("Checkout total exceeds the supported amount.");
    return { monthly: monthlyCents / 100, months, subtotal: subtotalCents / 100, setup: setupCents / 100, total: totalCents / 100, currency: "USD" };
  }
  function convertLegacyAmount(value, fromCurrency = "SAR") {
    const rate = demoUsdRates[String(fromCurrency).toUpperCase()];
    return value == null || value === "" || !Number.isFinite(Number(value)) || rate == null ? null : roundMoney(Number(value) * rate);
  }
  function restoreFinancialSeedCopy(record) {
    if (!record || typeof record !== "object") return false;
    let changed = false;
    for (const [key, value] of Object.entries(record)) {
      if (typeof value === "string") {
        const pair = Object.entries(legacyFinancialSeed.copyPairs).find(([original]) => knownOriginal(value, original));
        if (pair) { record[key] = pair[1]; changed = true; }
      } else if (value && typeof value === "object" && restoreFinancialSeedCopy(value)) changed = true;
    }
    return changed;
  }
  function migrateCurrency(db) {
    const legacyDatabase = !db.meta?.currencyVersion;
    let changed = false;
    const migrateAmounts = (record, keys, knownPrices, newPrices) => {
      if (!record || typeof record !== "object") return;
      const fromCurrency = String(record.currency || (legacyDatabase ? "SAR" : "USD")).toUpperCase();
      if (fromCurrency === "USD") {
        if (record.currency !== "USD") { record.currency = "USD"; changed = true; }
        return;
      }
      const originalAmounts = Object.fromEntries(keys.filter(key => record[key] != null && record[key] !== "").map(key => [key, record[key]]));
      const rate = demoUsdRates[fromCurrency];
      const seedPrice = fromCurrency === "SAR" && knownPrices && newPrices && !record.sourceFile && keys.filter(key => knownPrices[key] != null).every(key => Number(record[key]) === knownPrices[key] || key === "setup" && Number(record[key]) === 0);
      for (const key of keys) {
        if (record[key] == null || record[key] === "") continue;
        const original = Number(record[key]);
        record[key] = seedPrice && original === knownPrices[key] ? newPrices[key] : convertLegacyAmount(original, fromCurrency);
      }
      // Reconcile only matching historic formulas; multi-month totals charge setup once.
      const { monthly, setup } = originalAmounts;
      const months = Number.isInteger(record.subscriptionMonths) && record.subscriptionMonths >= 1 && record.subscriptionMonths <= 36 ? record.subscriptionMonths : 1;
      if (originalAmounts.subtotal != null && monthly != null && Math.abs(Number(originalAmounts.subtotal) - Number(monthly) * months) < 0.001 && record.monthly != null) record.subtotal = roundMoney(record.monthly * months);
      for (const key of ["total", "firstMonth"]) {
        const count = key === "firstMonth" ? 1 : months;
        if (originalAmounts[key] != null && monthly != null && setup != null && Math.abs(Number(originalAmounts[key]) - Number(monthly) * count - Number(setup)) < 0.001 && record.monthly != null && record.setup != null) record[key] = roundMoney(record.monthly * count + record.setup);
      }
      record.currency = "USD";
      record.currencyMigration = { version: 1, fromCurrency, originalAmounts, ...(rate == null ? { method: "requires-new-usd-quote" } : { method: seedPrice ? "seed-reprice-and-fixed-demo-rate" : "fixed-demo-rate", rate }) };
      changed = true;
    };
    for (const product of db.products || []) {
      const source = seed.products.find(item => item.id === product.id), old = legacyFinancialSeed.productPrices[product.id];
      migrateAmounts(product, ["monthly", "setup"], old, source);
      if (source && product.productInfo && restoreFinancialSeedCopy(product.productInfo)) changed = true;
    }
    for (const order of db.orders || []) {
      const source = seed.products.find(item => item.id === order.productId), old = legacyFinancialSeed.productPrices[order.productId];
      migrateAmounts(order, ["monthly", "subtotal", "setup", "total"], old, source);
      if (order.subscriptionMonths == null) { order.subscriptionMonths = 1; changed = true; }
      if (order.subtotal == null && order.monthly != null && Number.isFinite(Number(order.monthly)) && Number.isInteger(order.subscriptionMonths) && order.subscriptionMonths >= 1 && order.subscriptionMonths <= 36) { order.subtotal = roundMoney(Number(order.monthly) * order.subscriptionMonths); changed = true; }
    }
    for (const request of db.requests || []) {
      const source = seed.requests.find(item => item.id === request.id), old = legacyFinancialSeed.requestCaps[request.id];
      migrateAmounts(request, ["monthlyCap", "firstMonthCap"], old, source);
    }
    for (const deal of db.deals || []) {
      const source = seed.products.find(item => item.id === deal.productId), old = legacyFinancialSeed.productPrices[deal.productId];
      migrateAmounts(deal.quote, ["monthly", "setup", "firstMonth"], old, source);
      if (seed.deals.some(item => item.id === deal.id) && restoreFinancialSeedCopy(deal.messages)) changed = true;
    }
    for (const conversation of db.conversations || []) {
      const source = seed.conversations.find(item => item.id === conversation.id);
      if (!source) continue;
      for (const message of conversation.messages || []) if (source.messages.some(item => item.id === message.id) && restoreFinancialSeedCopy(message)) changed = true;
    }
    for (const evaluation of db.evaluations || []) {
      if (seed.evaluations.some(item => item.id === evaluation.id) && restoreFinancialSeedCopy(evaluation.report)) changed = true;
      if (evaluation.report && evaluation.report.currency !== "USD") { evaluation.report.currency = "USD"; changed = true; }
    }
    for (const user of db.users || []) if (user.preferredCurrency !== "USD") { user.preferredCurrency = "USD"; changed = true; }
    if (legacyDatabase) {
      // Old generated analytics are historical snapshots; recalculation uses migrated orders.
      for (const report of db.revenueReports || []) if (!report.archivedAt) { report.archivedAt = "2026-10-23T00:00:00Z"; report.status = "Archived"; report.archiveReason = "Currency migration: recalculate from current USD orders."; }
      db.meta = { ...(db.meta || {}), currencyVersion: 1, currency: "USD" };
      changed = true;
    }
    return changed;
  }
  const orderLabels = {
    status: [
      ["Placed", "已下单", "تم إنشاء الطلب", "订单已创建", "已创建"],
      ["In delivery", "交付中", "قيد التسليم", "正在交付"],
      ["Awaiting renewal", "待续费", "بانتظار التجديد", "等待续约", "待续约"],
      ["Completed", "已完成", "مكتمل", "完成"],
      ["Quote sent", "已发送报价", "تم إرسال العرض", "报价已发送"],
      ["Cancelled", "已取消", "ملغى", "Canceled"],
      ["Refunded", "已退款", "تم الاسترداد"],
      ["Unknown", "未知", "غير معروف"]
    ],
    nextStep: [
      ["Confirm approved sample documents", "确认已批准的样本文档", "تأكيد المستندات النموذجية المعتمدة", "确认已授权的样本文档", "确认样本文档"],
      ["Review monthly usage", "查看月度使用情况", "مراجعة الاستخدام الشهري", "复核月度用量", "待复核 monthly usage", "Review monthly 用量", "مراجعة monthly usage"],
      ["Archive evaluation report", "归档评测报告", "أرشفة تقرير التقييم", "归档评估报告"],
      ["Waiting for scope approval", "等待范围审批", "بانتظار الموافقة على النطاق", "等待范围确认"],
      ["Upload contract sample set", "上传合同样本集", "رفع مجموعة عقود نموذجية", "上传合同样本"],
      ["Review acceptance notes", "查看验收记录", "مراجعة ملاحظات القبول", "复核验收记录"],
      ["Confirm data connector scope", "确认数据连接器范围", "تأكيد نطاق موصل البيانات", "确认数据连接范围"],
      ["Review monthly case volume", "查看月度工单量", "مراجعة حجم الحالات الشهري", "复核月度案件量"],
      ["Awaiting provider scope confirmation", "等待服务商确认范围", "بانتظار تأكيد المقدم للنطاق", "等待服务商确认", "等待提供方确认范围"]
    ]
  };
  function orderText(value, field, language = "EN") {
    const text = String(value ?? "");
    const row = (orderLabels[field] || []).find(labels => labels.includes(text));
    return row ? row[({ EN: 0, ZH: 1, SA: 2, en: 0, zh: 1, ar: 2 })[language] ?? 0] : text;
  }
  window.SaqrDB = { key: "saqrloong-workspace-db-v5", seed, clone, currency: "USD", roundMoney, convertLegacyAmount, checkoutQuote, orderText, load() { try { const raw = localStorage.getItem(this.key); if (raw) { const stored = JSON.parse(raw); const currencyChanged = migrateCurrency(stored); if (enrichStoredProducts(stored) || currencyChanged) this.save(stored); return stored; } } catch {} const fresh = clone(seed); this.save(fresh); return fresh; }, save(db) { localStorage.setItem(this.key, JSON.stringify(db)); return db; }, reset() { const fresh = clone(seed); this.save(fresh); return fresh; }, company(id, db) { return db.companies.find(x => x.id === id); }, product(id, db) { return db.products.find(x => x.id === id); }, request(id, db) { return db.requests.find(x => x.id === id); }, update(table, id, patch, db) { const record = db[table].find(x => x.id === id); if (record) Object.assign(record, patch); this.save(db); return record; } };
})();
