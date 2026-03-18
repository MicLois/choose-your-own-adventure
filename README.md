# choose your own adventure

This map explains the flow in the sequence of choices and outcomes for the dive scenario.

Start: continue-dive
├─ contactSurface
│ ├─ surface
│ │ ├─ retreat → END SCENE (1)
│ │ └─ observe
│ │ ├─ end-ascend → END SCENE (3)
│ │ └─ holdGround → END SCENE (2)
│ └─ ignoreRadio → loops to ignoreRadio
└─ ignoreRadio
├─ retreat → END SCENE (1)
└─ holdGround → END SCENE (2)
